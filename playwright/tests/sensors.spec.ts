import { Constants } from "../constants/index.constants";
import { cmTest, expect } from "./test-fixtures";

cmTest(
  "Sensors are reporting",
  {
    tag: ["@betaOnly"],
  },
  async ({ cmBetaSubBruijnUser }) => {
    // go directly to sensor page
    await cmBetaSubBruijnUser.goto("/system/sensors");
    await expect(
      cmBetaSubBruijnUser.locator(Constants.mainApplication.locators.isTestable)
    ).toBeVisible();
    await expect(
      cmBetaSubBruijnUser.getByTestId(
        Constants.mainApplication.dataTestId.pageTitle
      )
    ).toBeVisible();

    // Click the Reset filter button so we know everything is in default state
    await cmBetaSubBruijnUser
      .getByRole("button", { name: "Reset filter" })
      .click();

    // Wait for the page to have loaded
    await expect(
      cmBetaSubBruijnUser.locator(Constants.grid.locators.gridOverlay)
    ).toBeHidden();

    // Open status menu
    await cmBetaSubBruijnUser
      .locator(Constants.sensor.locators.statusMenuSelector)
      .click();

    // Select working sensors
    await cmBetaSubBruijnUser
      .locator(Constants.sensor.locators.selectOkSensorsSelector)
      .click();

    // Close menu by clicking somewhere else on the screen
    await cmBetaSubBruijnUser
      .getByTestId(Constants.mainApplication.dataTestId.pageTitle)
      .click();

    // Use the same locale as the browser
    const date = new Date();
    const currentDate = date.toLocaleDateString(
      Constants.mainApplication.constants.browserLocal
    );

    // Look for current date - if found it is proof the sensors are working
    await expect(
      cmBetaSubBruijnUser.getByRole("gridcell", { name: currentDate }).first()
    ).toBeVisible();
  }
);
