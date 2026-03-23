import { Constants } from "../constants/index.constants";
import { getByDataTest } from "../shared/dataTestLocator.utils";
import { isFeatureEnabled } from "../shared/featureFlagHelper";
import { cmTest, expect } from "./test-fixtures";

//Test skipped due to lack of data on the Beta environment
cmTest.skip(
  "Activate FmC",
  {
    tag: ["@betaOnly"],
  },
  async ({ cmBetaGriffioenTestUser }) => {
    // Navigate to the Activate Find my Cow page
    await cmBetaGriffioenTestUser
      .getByTestId(Constants.mainApplication.dataTestId.findMyCow)
      .click();
    await cmBetaGriffioenTestUser
      .getByTestId(Constants.mainApplication.dataTestId.activateFindMyCow)
      .click();
    await expect(
      cmBetaGriffioenTestUser.getByTestId(
        Constants.mainApplication.dataTestId.pageHeader
      )
    ).toBeVisible();

    // Select animal 502 - {Sensor} from the dropdown
    await cmBetaGriffioenTestUser
      .getByRole("button", { name: "Select animal" })
      .click();
    await cmBetaGriffioenTestUser
      .locator(Constants.activateFmc.locators.selectAnimal)
      .fill("502");
    await cmBetaGriffioenTestUser.getByText(new RegExp("502 - .+")).click();

    // Select animal 502 - {Sensor} from the grid and click Activate Find my Cow
    await cmBetaGriffioenTestUser
      .getByRole("button", { name: "Activate Find my Cow" })
      .click();

    if (
      await isFeatureEnabled(
        cmBetaGriffioenTestUser,
        "S4164_UseNewFindMyCowModal"
      )
    ) {
      //Select locator method
      await cmBetaGriffioenTestUser
        .getByRole("button", { name: "Locator" })
        .click();

      //Set reason
      await getByDataTest(cmBetaGriffioenTestUser, "CmSelect-button").click();
      await getByDataTest(cmBetaGriffioenTestUser, "CmSelectOption-option")
        .getByText("activate")
        .click();

      //Click activate
      await getByDataTest(
        cmBetaGriffioenTestUser,
        "CmModal-button-primary"
      ).click();
    } else {
      // Confirm in the popup
      await cmBetaGriffioenTestUser.getByRole("button", { name: "OK" }).click();
    }

    //Check if wanted cow is already activated for drafting, skip the test if this is the case
    const validationErrorActivatedForDrafting = getByDataTest(
      cmBetaGriffioenTestUser,
      "validation-error-CreatedByDrafting"
    );
    cmTest.skip(
      await validationErrorActivatedForDrafting?.isVisible(),
      "FMC is already activated for Drafting, so this activation isn't possible."
    );

    //Check success message
    await expect(
      cmBetaGriffioenTestUser.getByText("Successfully saved")
    ).toBeVisible();

    // Now go to Overview Find my Cow to remove the test data
    await cmBetaGriffioenTestUser
      .getByTestId(Constants.mainApplication.dataTestId.overviewFindMyCow)
      .click();
    await expect(
      cmBetaGriffioenTestUser.getByTestId(
        Constants.mainApplication.dataTestId.pageHeader
      )
    ).toBeVisible();

    // Wait for the page to load
    await expect(
      cmBetaGriffioenTestUser.locator(Constants.grid.locators.gridOverlay)
    ).toBeHidden();
    // Wait for animal with nr 502 to appear, then select it by clicking
    await cmBetaGriffioenTestUser
      .getByRole("gridcell", {
        name: "502",
        exact: true,
      })
      .click();

    // Click Deactivate Find my Cow button and wait for deactivation confirmation
    await cmBetaGriffioenTestUser
      .getByRole("button", {
        name: "Deactivate Find my Cow",
      })
      .click();
    await expect(
      cmBetaGriffioenTestUser.getByText("Deactivated: 1")
    ).toBeVisible();
  }
);
