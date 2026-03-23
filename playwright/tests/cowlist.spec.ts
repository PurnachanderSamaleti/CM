import { cmTest, expect } from "./test-fixtures";
import { Constants } from "../constants/index.constants";

cmTest("Open cowlist page", async ({ cmMainTestUserPage }) => {
  // Click the cow list button
  await cmMainTestUserPage
    .locator(Constants.mainApplication.locators.cowListButton)
    .click();

  //Additional checks for webkit
  await cmMainTestUserPage.waitForURL("**/cowList");
  await expect(
    cmMainTestUserPage.locator(Constants.mainApplication.locators.isTestable)
  ).toBeVisible({ timeout: 10000 });

  // Wait for a grid to appear
  await expect(
    cmMainTestUserPage.locator(Constants.cowList.locators.grid)
  ).toBeVisible();
});
