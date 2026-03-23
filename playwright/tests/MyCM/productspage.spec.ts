import { cmTest, expect } from "../test-fixtures";
import { Constants } from "../../constants/index.constants";
import { triggerNewTabFromLink } from "../../shared/apiHelper";

cmTest(
  "Verify My Cowmanager Products Page Products Section",
  { tag: ["@testOnly", "@myCMTest"] },
  async ({ cmMFAPage }) => {
    await cmMFAPage
      .getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId.productsMenuButton
      )
      .click();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId.productsPageTitle
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId
          .totalSensorsAmountCard
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId
          .remainingSpareSensorsCard
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId
          .sensorsUntilReplacementCard
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId
          .notActivatedSensorsCard
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId
          .totalActiveSensorsCard
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId
          .activeCoordinatorsCard
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId.activeRoutersCard
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId
          .activeSolarChargersCard
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId.activeSortGateCard
      )
    ).toBeVisible();
  }
);

cmTest(
  "Verify My Cowmanager Products Page Active Modules Section",
  { tag: ["@testOnly", "@myCMTest"] },
  async ({ cmMFAPage }) => {
    await cmMFAPage
      .getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId.productsMenuButton
      )
      .click();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId.moduleTitle
      )
    ).toBeVisible();

    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId.activeModulesTitle
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId.healthModuleCard
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId.fertilityModuleCard
      )
    ).toBeVisible();

    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId.nutritionModuleCard
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId.findMyCowModuleCard
      )
    ).toBeVisible();
  }
);

cmTest(
  "Verify My Cowmanager Products Page Inactive Modules Section",
  { tag: ["@testOnly", "@myCMTest"] },
  async ({ cmMFAPage }) => {
    await cmMFAPage
      .getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId.productsMenuButton
      )
      .click();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId.inactiveModulesTitle
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId.youngStockModuleCard
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId.sortingModuleCard
      )
    ).toBeVisible();
  }
);

cmTest(
  "Verify My Cowmanager Products Page Footer Section",
  { tag: ["@testOnly", "@myCMTest"] },
  async ({ cmMFAPage }) => {
    await cmMFAPage
      .getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId.productsMenuButton
      )
      .click();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId.footerSection
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.locator(
        Constants.myCowManager.myCMProductsPage.locators
          .footerTermsAndConditionsIcon
      )
    ).toBeVisible();
    await triggerNewTabFromLink(
      cmMFAPage,
      "getByTestId",
      Constants.myCowManager.myCMProductsPage.dataTestId
        .footerTermsAndConditionsButton
    );
  }
);
