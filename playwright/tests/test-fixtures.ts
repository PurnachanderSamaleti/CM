import { Page, test as base, expect, Browser } from "@playwright/test";
import UserLogins, { User } from "../constants/auth.constants";
import { GetAuthenticatedSession } from "../shared/authentication.utils";
import { Constants } from "../constants/index.constants";

type TestFixtures = {
  cmMainTestUserPage: Page;
  cmSubTestUserPage: Page;
  cmDealerTestUserPage: Page;
  cmSupportTestUserPage: Page;
  cmSuperSupportTestUserPage: Page;
  cmBetaSubVeenstraUser: Page;
  cmLanguageTestUserPage: Page;
  cmBetaSupportMelkRuitenburgUser: Page;
  cmBetaSubBruijnUser: Page;
  cmSignInPage: Page;
  cmMFAMailPage: Page;
  cmBetaGriffioenTestUser: Page;
  cmBetaSterreschansTestUser: Page;
  cmMFAPage: Page;
};

export const cmTest = base.extend<TestFixtures>({
  cmMainTestUserPage: async ({ browser }, use) => {
    await GetAuthenticatedSessionWithoutWalkMe(browser, User.MainTestUser, use);
  },
  cmSubTestUserPage: async ({ browser }, use) => {
    await GetAuthenticatedSessionWithoutWalkMe(browser, User.SubTestUser, use);
  },
  cmDealerTestUserPage: async ({ browser }, use) => {
    await GetAuthenticatedSessionWithoutWalkMe(
      browser,
      User.DealerTestUser,
      use
    );
  },
  cmSupportTestUserPage: async ({ browser }, use) => {
    await GetAuthenticatedSessionWithoutWalkMe(
      browser,
      User.SupportTestUser,
      use
    );
  },
  cmSuperSupportTestUserPage: async ({ browser }, use) => {
    await GetAuthenticatedSessionWithoutWalkMe(
      browser,
      User.SuperSupportTestUser,
      use
    );
  },
  cmBetaSubVeenstraUser: async ({ browser }, use) => {
    await GetAuthenticatedSessionWithoutWalkMe(
      browser,
      User.SubBetaVeenstraUser,
      use
    );
  },
  cmLanguageTestUserPage: async ({ browser }, use) => {
    await GetAuthenticatedSessionWithoutWalkMe(
      browser,
      User.LanguageTestUser,
      use
    );
  },
  //Unused user due to removal AgroVision beta test
  //Keep user in list as it's still a valid test user to be used
  //Remove comments when starting to use this user
  cmBetaSupportMelkRuitenburgUser: async ({ browser }, use) => {
    await GetAuthenticatedSessionWithoutWalkMe(
      browser,
      User.SupportBetaMelkRuitenburgUser,
      use
    );
  },
  cmMFAMailPage: async ({ browser }, use) => {
    await GetAuthenticatedSessionWithoutWalkMe(
      browser,
      User.MFAMailSuperSupportTestSedieneUser,
      use
    );
  },
  cmMFAPage: async ({ browser }, use) => {
    await GetAuthenticatedSessionWithoutWalkMe(
      browser,
      User.MfaSupportTestSedieneUser,
      use
    );
  },
  cmSignInPage: async ({ browser }, use) => {
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();

    await page.goto("/");
    await expect(
      page.locator(Constants.signIn.locators.signInForm)
    ).toBeVisible({
      timeout: 15000,
    });

    await use(page);
  },
  cmBetaSubBruijnUser: async ({ browser }, use) => {
    await GetAuthenticatedSessionWithoutWalkMe(
      browser,
      User.SubBetaBruijnUser,
      use
    );
  },
  cmBetaGriffioenTestUser: async ({ browser }, use) => {
    await GetAuthenticatedSessionWithoutWalkMe(
      browser,
      User.SubBetaGriffioenTestUser,
      use
    );
  },
  cmBetaSterreschansTestUser: async ({ browser }, use) => {
    await GetAuthenticatedSessionWithoutWalkMe(
      browser,
      User.SupportBetaSterreschansTestUser,
      use
    );
  },
});

async function GetAuthenticatedSessionWithoutWalkMe(
  browser: Browser,
  user: User,
  use: (r: Page) => Promise<void>
) {
  const currentUser = UserLogins[user];
  const currentEnvironment = (process.env.ENVIRONMENTSHORT || "dev").trim();
  const companyForCurrentEnvironment =
    currentUser.environmentCompanySelection.find(
      (e) => e.environment === currentEnvironment
    );

  //Only auth when it has access to the env
  //If statement needed, instead of expect, to ensure that companyForCurrentEnvironment is filled so that Typescript doesn't complain that it can be undefined
  if (companyForCurrentEnvironment === undefined) {
    throw new Error("Current user doesn't have access on this environment.");
  } else {
    //when the account number is undefined, the user only has access to one company
    currentUser.currentEnvironment = companyForCurrentEnvironment;
    const page = await GetAuthenticatedSession(browser, currentUser);
    await use(page);
  }
}

export { expect };
