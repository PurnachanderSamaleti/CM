import { Page } from "@playwright/test";
import { Constants } from "../constants/index.constants";
import { cmTest, expect } from "./test-fixtures";

cmTest(
  "Initial page load doesn't have any fields filled",
  async ({ cmSignInPage }) => {
    await expect(
      cmSignInPage.locator(Constants.signIn.locators.usernameField)
    ).toBeEmpty(); // username field must be empty, otherwise we have a security issue
  }
);

cmTest(
  "Login without username and password gives error",
  async ({ cmSignInPage }) => {
    await cmSignInPage.locator(Constants.signIn.locators.signInButton).click(); // try to sign in without username

    await expect(
      cmSignInPage.getByText("Please enter your Username")
    ).toBeVisible();
  }
);

cmTest("Login without password gives error", async ({ cmSignInPage }) => {
  await InputExistingUsername(cmSignInPage);

  await cmSignInPage.locator(Constants.signIn.locators.signInButton).click(); // try to sign in without password

  await expect(
    cmSignInPage.locator(Constants.signIn.locators.passwordField)
  ).toBeFocused(); // focus on password field if not filled
});

cmTest("Login with wrong credentials gives error", async ({ cmSignInPage }) => {
  await InputExistingUsername(cmSignInPage);

  await cmSignInPage
    .locator(Constants.signIn.locators.passwordField)
    .fill("nonsense"); // fill with bogus password

  await cmSignInPage.locator(Constants.signIn.locators.signInButton).click(); // try to sign in with invalid username

  await expect(
    cmSignInPage.getByText("The username or password provided are invalid.")
  ).toBeVisible();
});

async function InputExistingUsername(page: Page) {
  await page
    .locator(Constants.signIn.locators.usernameField)
    .fill("test-user@cowmanager.com"); // fill with existing username
}
