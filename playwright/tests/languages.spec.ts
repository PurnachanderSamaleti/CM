import { cmTest, expect } from "./test-fixtures";
import { Constants } from "../constants/index.constants";
import { Page } from "@playwright/test";
import { getByDataTest } from "../shared/dataTestLocator.utils";

cmTest(
  "Change language",
  { tag: ["@devTestOnly"] },
  async ({ cmLanguageTestUserPage }) => {
    //Change language constants
    const changeLanguageConstants =
      Constants.mainApplication.constants.changeLanguage;

    //Change the language from German to English
    await changeLanguage(
      cmLanguageTestUserPage,
      changeLanguageConstants.fromLanguage,
      changeLanguageConstants.toLanguage
    );

    //Validate text to be correctly translated
    //Get all module name text
    const locatorModuleNames = cmLanguageTestUserPage.locator(
      Constants.mainApplication.locators.moduleLabel
    );

    //Get all expected module name text
    const expectedModuleText =
      Constants.mainApplication.constants.expectedModuleTextEnglish;

    await expect(locatorModuleNames).toHaveText(expectedModuleText, {
      ignoreCase: true,
    });
  }
);

async function changeLanguage(
  page: Page,
  fromLanguage: string,
  toLanguage: string
) {
  let changingLanguageTo: string;
  let navigateToLanguage = false;

  const selectedLanguageText = getByDataTest(
    page,
    Constants.mainApplication.dataTest.cmSelectText,
    Constants.mainApplication.dataTestId.languageSelector
  );

  //Convert language shorts to language in full
  const languageConverter: { [languageShort: string]: string } =
    Constants.mainApplication.constants.languageConverter;

  //Get the current language selected
  const currentLanguage = await selectedLanguageText.textContent();

  //Open the language dropdown
  await selectedLanguageText.click();

  if (currentLanguage == fromLanguage) {
    //Select the language you want to have when finishing changing language
    changingLanguageTo = toLanguage;
  } else {
    //Select the language you want to change from
    //This is done as we cannot guarantee that the language we want to change from is selected
    changingLanguageTo = fromLanguage;
    navigateToLanguage = true;
  }

  //Select the language you want change to
  await page.getByText(languageConverter[changingLanguageTo]).click();

  //Wait for the page to load correctly
  await expect(selectedLanguageText).toHaveText(changingLanguageTo, {
    timeout: 15000,
    ignoreCase: true,
  });
  await expect(
    page.locator(Constants.mainApplication.locators.isTestable)
  ).toBeVisible();

  if (navigateToLanguage) {
    //Relaunch function to finish changing the language
    await changeLanguage(page, fromLanguage, toLanguage);
  }
}
