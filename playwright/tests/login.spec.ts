import { cmTest, expect } from "./test-fixtures";
import { Constants } from "../constants/index.constants";
import { Page } from "@playwright/test";

cmTest("Validate logged in main user", async ({ cmMainTestUserPage }) => {
  await CheckValidLogin(cmMainTestUserPage);
});

cmTest("Validate logged in sub user", async ({ cmSubTestUserPage }) => {
  await CheckValidLogin(cmSubTestUserPage);
});

cmTest(
  "Validate logged in dealer user",
  { tag: ["@testBetaProdOnly"] },
  async ({ cmDealerTestUserPage }) => {
    await CheckValidLogin(cmDealerTestUserPage);
  }
);

cmTest("Validate logged in support user", async ({ cmSupportTestUserPage }) => {
  await CheckValidLogin(cmSupportTestUserPage);
});

cmTest(
  "Validate logged in super support user",
  async ({ cmSuperSupportTestUserPage }) => {
    await CheckValidLogin(cmSuperSupportTestUserPage);
  }
);

async function CheckValidLogin(page: Page) {
  await expect(
    page.locator(Constants.mainApplication.locators.header)
  ).toBeVisible(); //Check for header to be shown
  await expect(
    page.locator(Constants.mainApplication.locators.menu)
  ).toBeVisible(); //Check for the menu to be shown

  await expect(
    page.locator(Constants.mainApplication.locators.isTestable)
  ).toBeVisible(); //Check for a page to be shown
  await expect(
    page.locator(Constants.mainApplication.locators.selectedCompany)
  ).toHaveText(new RegExp(".+\\s\\(\\d+\\)")); //Check for a company selected in the correct format: '{Company name} ({account number})'
}
