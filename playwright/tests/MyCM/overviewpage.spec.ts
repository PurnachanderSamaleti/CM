import { cmTest, expect } from "../test-fixtures";
import { Constants } from "../../constants/index.constants";
import { SetPageProperty } from "../../shared/apiHelper";
import { getByDataTest } from "../../shared/dataTestLocator.utils";

cmTest(
  "Verify My CowManager overview page",
  { tag: ["@testOnly", "@myCMTest"] },
  async ({ cmMFAPage }) => {
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMOverviewPage.dataTestId.overviewPage
      )
    ).toBeVisible({ timeout: 50000 });
  }
);

cmTest(
  "Verify My CowManager overview page all accordions visibility",
  { tag: ["@testOnly", "@myCMTest"] },
  async ({ cmMFAPage }) => {
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMOverviewPage.dataTestId.invoicesAccordion
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMOverviewPage.dataTestId.ordersAccordion
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMOverviewPage.dataTestId.productsAccordion
      )
    ).toBeVisible();
  }
);

cmTest(
  "Navigating to invoices page from overview page",
  { tag: ["@testOnly", "@myCMTest"] },
  async ({ cmMFAPage }) => {
    await getByDataTest(
      cmMFAPage,
      Constants.myCowManager.myCMOverviewPage.dataTest.allCardsFooterButton,
      Constants.myCowManager.myCMOverviewPage.dataTestId.invoicesAccordion
    ).click();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMInvoicesPage.dataTestId.invoicesPage
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMInvoicesPage.dataTestId.invoicesTable
      )
    ).toBeVisible();
  }
);

cmTest(
  "Navigating to Orders page from overview page",
  { tag: ["@testOnly", "@myCMTest"] },
  async ({ cmMFAPage }) => {
    await getByDataTest(
      cmMFAPage,
      Constants.myCowManager.myCMOverviewPage.dataTest.allCardsFooterButton,
      Constants.myCowManager.myCMOverviewPage.dataTestId.ordersAccordion
    ).click();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMOrdersPage.dataTestId.ordersPageTitle
      )
    ).toBeVisible();
  }
);

cmTest(
  "Navigating to Products page from overview page",
  { tag: ["@testOnly", "@myCMTest"] },
  async ({ cmMFAPage }) => {
    await getByDataTest(
      cmMFAPage,
      Constants.myCowManager.myCMOverviewPage.dataTest.allCardsFooterButton,
      Constants.myCowManager.myCMOverviewPage.dataTestId.productsAccordion
    ).click();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMProductsPage.dataTestId.productsPageTitle
      )
    ).toBeVisible();
  }
);

cmTest(
  "To validate the toaster message on Invoice Card when the auto payments are set to true",
  { tag: ["@testOnly", "@myCMTest"] },
  async ({ cmMFAPage }) => {
    await SetPageProperty(
      cmMFAPage,
      Constants.myCowManager.myCMOverviewPage.apiEndpoints.getOverviewApiURL,
      "isAutoPaymentEnabled",
      true
    );
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMOverviewPage.dataTestId.overviewPage
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByText(
        Constants.myCowManager.myCMOverviewPage.constants
          .autoPaymentsSetToTrueToaster
      )
    ).toBeVisible();
  }
);

cmTest(
  "To validate the toaster message on Invoice Card when the auto payments are set to false",
  { tag: ["@testOnly", "@myCMTest"] },
  async ({ cmMFAPage }) => {
    await SetPageProperty(
      cmMFAPage,
      Constants.myCowManager.myCMOverviewPage.apiEndpoints.getOverviewApiURL,
      "isAutoPaymentEnabled",
      false
    );
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMOverviewPage.dataTestId.overviewPage
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByText(
        Constants.myCowManager.myCMOverviewPage.constants
          .autoPaymentsSetToTrueToaster
      )
    ).toBeHidden();
  }
);
