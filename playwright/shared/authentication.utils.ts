import { Browser, Page, expect } from "@playwright/test";
import { Constants } from "../constants/index.constants";
import {
  MailinatorApiToken,
  MailinatorTOTPSecret,
  UserInfo,
  UserPassword,
} from "../constants/auth.constants";
import fs from "fs";
import * as interceptors from "./interceptors.utils";
import { isFeatureEnabled } from "./featureFlagHelper";

export async function GetAuthenticatedSession(
  browser: Browser,
  user: UserInfo
) {
  const sessionFiles = "./playwright/.sessions";
  const userSession = `${sessionFiles}/${user.username}.json`;
  const userSessionExists = fs.existsSync(userSession);

  const userContext = userSessionExists
    ? await browser.newContext({ storageState: userSession })
    : await browser.newContext();

  const page = await userContext.newPage();

  await interceptors.BlockWalkMeRequests(page);
  await interceptors.BlockEndOfSupportRequests(page);

  await page.goto("/");

  if (!userSessionExists) {
    await expect(
      page.locator(Constants.signIn.locators.signInForm)
    ).toBeVisible({
      timeout: 15000,
    });

    await LoginUser(page, user);
    await page.context().storageState({ path: userSession });
  } else {
    await page
      .locator(Constants.mainApplication.locators.companyLogo)
      .waitFor({ timeout: 15000 });
  }

  //Sign into MyCM via the account dropdown
  if (user.isMyCmTestUser) {
    await SignIntoMyCM(page, user);
  }

  return page;
}

async function LoginUser(page: Page, user: UserInfo) {
  const signInButton = page.locator(Constants.signIn.locators.signInButton);
  await expect(signInButton).toBeVisible();

  // Fill in the username field
  const usernameField = page.locator(Constants.signIn.locators.usernameField);
  await usernameField.clear();
  await usernameField.fill(user.username);

  // Fill in the password field
  const passwordField = page.locator(Constants.signIn.locators.passwordField);
  await passwordField.clear();
  await passwordField.fill(UserPassword);

  // Click the sign in button
  await signInButton.click();

  // Wait for the company logo to appear on the main application page
  await page
    .locator(Constants.mainApplication.locators.companyLogo)
    .waitFor({ timeout: 20000 });
  await expect(
    page.locator(Constants.mainApplication.locators.isTestable)
  ).toBeVisible({
    timeout: 10000,
  });

  //Don't select select company if the user only has 1 company
  if (user.currentEnvironment.accountNumber) {
    //Select company for the users which are connected to multiple companies
    await SelectCompany(page, user.currentEnvironment.accountNumber);
  }
}

export async function SelectCompany(page: Page, accountNumber: string) {
  await page
    .getByLabel(Constants.companyList.locators.byLabelAccountNumberInput)
    .fill(accountNumber);

  await expect(
    page.getByRole("gridcell", { name: accountNumber, exact: true })
  ).toContainText(accountNumber);
  await expect(
    page.locator(Constants.mainApplication.locators.isTestable)
  ).toBeVisible({
    timeout: 20000,
  });

  await page
    .getByRole("gridcell", { name: accountNumber, exact: true })
    .dblclick();

  await page.waitForURL("**/dashboard");
  await expect(
    page.locator(Constants.mainApplication.locators.isTestable)
  ).toBeVisible({
    timeout: 10000,
  });
}

export async function LogoutUser(page: Page) {
  await page.locator(Constants.mainApplication.locators.userMenuButton).click();
  await page
    .locator(Constants.mainApplication.locators.userMenuLogoutButton)
    .click();
  await page
    .locator(Constants.mainApplication.locators.logoutModalLogoutButton)
    .click();

  await expect(page.locator(Constants.signIn.locators.signInForm)).toBeVisible({
    timeout: 15000,
  });
}

export async function SignIntoMyCM(page: Page, user: UserInfo) {
  //Check if the MFA is enabled before navigation
  const isMFAEnabled = await isFeatureEnabled(page, "TriggerMFAMyCowManager");

  //Sign into MyCowManager
  await page.getByTestId(Constants.mainApplication.dataTestId.userIcon).click();
  await page
    .getByTestId(Constants.mainApplication.dataTestId.mycmButton)
    .click({ timeout: 20000 });

  if (isMFAEnabled) {
    const verificationCode = user.currentEnvironment.usesAuthenticator
      ? await fetchLatestOtpFromAuthenticator(page)
      : await fetchLatestOtpFromMail(page);

    if (verificationCode != null) {
      const locatorOTPField = user.currentEnvironment.usesAuthenticator
        ? Constants.mainApplication.locators.OTPInputFieldAuth
        : Constants.mainApplication.locators.OTPInputFieldMail;

      await page.locator(locatorOTPField).fill(verificationCode);
      await page
        .locator(Constants.mainApplication.locators.continueButton)
        .click();
      await page
        .locator(Constants.mainApplication.locators.companyLogo)
        .waitFor({ timeout: 20000 });
    } else {
      expect(verificationCode, {
        message: "No verification code could be retrieved",
      }).not.toBeNull();
    }
  }
}

async function fetchLatestOtpFromAuthenticator(
  page: Page
): Promise<string | null> {
  //Get last received mail
  const totpResponse = await page.request.get(
    `${Constants.myCowManager.myCMMFAPage.constants.baseURL}/totp/${MailinatorTOTPSecret}`,
    { failOnStatusCode: true, headers: { Authorization: MailinatorApiToken } }
  );

  //Disables needed due to this interface being dictated by Mailinator
  interface TOTPResponse {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    time_step: number;
    futurecodes: string[];
    // eslint-disable-next-line @typescript-eslint/naming-convention
    next_reset_secs: number;
    passcode: string;
  }

  const responseJson: TOTPResponse = await totpResponse.json();

  return responseJson.passcode;
}

export async function fetchLatestOtpFromMail(
  page: Page
): Promise<string | null> {
  //This wait is to wait until the OTP is retrieved
  //Feature to wait for new mail coming in a later Mailinator update (https://www.mailinator.com/v4/private/new_api_features.jsp)
  await page.waitForTimeout(5000);

  //Get last received mail
  const inboxWithLastMail = await page.request.get(
    `${Constants.myCowManager.myCMMFAPage.constants.baseURL}/domains/${Constants.myCowManager.myCMMFAPage.constants.domain}/inboxes/?limit=1`,
    { failOnStatusCode: true, headers: { Authorization: MailinatorApiToken } }
  );
  const parsedLastMessageInfo = JSON.parse(await inboxWithLastMail.text());

  // Ensure there are messages in the inbox
  expect(parsedLastMessageInfo.msgs, {
    message: "No messages found in the inbox",
  }).toHaveLength(1);

  const latestMessageId = parsedLastMessageInfo.msgs[0].id;
  const messageResponse = await page.request.get(
    `${Constants.myCowManager.myCMMFAPage.constants.baseURL}/domains/${Constants.myCowManager.myCMMFAPage.constants.domain}/messages/${latestMessageId}`,
    { failOnStatusCode: true, headers: { Authorization: MailinatorApiToken } }
  );
  const parsedLastEmail = JSON.parse(await messageResponse.text());
  const messageBody = parsedLastEmail.parts[0].body;

  if (messageBody != null) {
    const match: string[] = messageBody.match(/\b\d{6}\b/);
    expect(match).toHaveLength(1);
    return match[0];
  }
  return null;
}
