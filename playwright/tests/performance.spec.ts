import { Constants } from "../constants/index.constants";
import { cmTest, expect } from "./test-fixtures";

cmTest(
  "Performance Veenstra cow list is ok",
  {
    tag: ["@betaOnly"],
  },
  async ({ cmBetaSubVeenstraUser }) => {
    await cmBetaSubVeenstraUser
      .getByTestId(Constants.menu.dataTestId.cowList)
      .click(); //Click on the cow list menu

    await expect(
      cmBetaSubVeenstraUser.locator(
        Constants.mainApplication.locators.isTestable
      )
    ).toBeVisible({ timeout: 10000 }); //Wait for cow list (cow alerts tab) to be loaded in 10 secs (Performance requirement)

    await cmBetaSubVeenstraUser
      .getByTestId(Constants.tab.dataTestId.allCows)
      .click(); //Click on the all cows tab
    await expect(
      cmBetaSubVeenstraUser.locator(
        Constants.mainApplication.locators.isTestable
      )
    ).toBeVisible({ timeout: 10000 }); //Wait for the all cows tab to be loaded in 10 secs (Performance requirement)
  }
);

cmTest(
  "Performance Veenstra sensor list is ok",
  {
    tag: ["@betaOnly"],
  },
  async ({ cmBetaSubVeenstraUser }) => {
    await cmBetaSubVeenstraUser
      .getByTestId(Constants.menu.dataTestId.systemStatusAccordion)
      .click(); //Click on the system status main menu
    await cmBetaSubVeenstraUser
      .getByTestId(Constants.menu.dataTestId.sensors)
      .click(); //Click on the system sensors menu

    await cmBetaSubVeenstraUser.waitForURL(/sensors/);
    await expect(
      cmBetaSubVeenstraUser.locator(Constants.grid.locators.gridOverlay)
    ).toBeHidden({
      timeout: 10000, //Performance requirement
    }); //Wait for the grid to be loaded in 10 secs
  }
);
