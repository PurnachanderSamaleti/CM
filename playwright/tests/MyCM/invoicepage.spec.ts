import { cmTest, expect } from "../test-fixtures";
import { Constants } from "../../constants/index.constants";
import { getByDataTest } from "../../shared/dataTestLocator.utils";
import { SetPageProperty } from "../../shared/apiHelper";

cmTest(
  "To validate the info alert accordion",
  { tag: ["@testOnly", "@myCMTest"] },
  async ({ cmMFAPage }) => {
    await cmMFAPage
      .getByTestId(
        Constants.myCowManager.myCMInvoicesPage.dataTestId.invoicesPage
      )
      .click();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMInvoicesPage.dataTestId.invoicesPageTitle
      )
    ).toBeVisible();
    await cmMFAPage.getByRole("button", { name: "Outstanding" }).click();
    await getByDataTest(
      cmMFAPage,
      Constants.myCowManager.myCMInvoicesPage.dataTest.infoAlertButton
    ).click();
    await expect(
      cmMFAPage.getByText(
        Constants.myCowManager.myCMInvoicesPage.constants.infoAlertOne
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByText(
        Constants.myCowManager.myCMInvoicesPage.constants.infoAlertTwo
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByText(
        Constants.myCowManager.myCMInvoicesPage.constants.infoAlertThree
      )
    ).toBeVisible();
  }
);

cmTest(
  "To validate the Outstanding Tab Record Count",
  { tag: ["@testOnly", "@myCMTest"] },
  async ({ cmMFAPage }) => {
    await cmMFAPage
      .getByTestId(
        Constants.myCowManager.myCMInvoicesPage.dataTestId.invoicesPage
      )
      .click();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMInvoicesPage.dataTestId.invoicesPageTitle
      )
    ).toBeVisible();
    await cmMFAPage.getByRole("button", { name: "Outstanding" }).click();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMInvoicesPage.dataTestId.invoicesTable
      )
    ).toBeVisible();
    const outstandingBadgeCount = Number(
      await cmMFAPage
        .getByRole("button", { name: "Outstanding" })
        .locator(
          Constants.myCowManager.myCMInvoicesPage.locators.outstandingTabCount
        )
        .textContent()
    );
    const rowCount = await cmMFAPage
      .locator(
        Constants.myCowManager.myCMInvoicesPage.locators.invoiceRecordCount
      )
      .count();
    expect(outstandingBadgeCount).toBe(rowCount);
  }
);

cmTest(
  "To validate the Info Icon when the auto payments are set to true",
  { tag: ["@testOnly", "@myCMTest"] },
  async ({ cmMFAPage }) => {
    await SetPageProperty(
      cmMFAPage,
      Constants.myCowManager.myCMInvoicesPage.apiEndpoints.getInvoiceApiURL,
      "isAutoPaymentEnabled",
      true
    );
    await cmMFAPage
      .getByTestId(
        Constants.myCowManager.myCMInvoicesPage.dataTestId.invoicesPage
      )
      .click();
    await getByDataTest(
      cmMFAPage,
      Constants.myCowManager.myCMInvoicesPage.dataTest.invoicesInfoIcon
    ).click();
    await expect(
      cmMFAPage.getByText(
        Constants.myCowManager.myCMInvoicesPage.constants.toolTipAutopayments
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByText(
        Constants.myCowManager.myCMInvoicesPage.constants.infoIconAutopayments
      )
    ).toBeVisible();
  }
);

cmTest(
  "To validate the Info Icon when the auto payments are set to false",
  { tag: ["@testOnly", "@myCMTest"] },
  async ({ cmMFAPage }) => {
    await SetPageProperty(
      cmMFAPage,
      Constants.myCowManager.myCMInvoicesPage.apiEndpoints.getInvoiceApiURL,
      "isAutoPaymentEnabled",
      false
    );
    await cmMFAPage
      .getByTestId(
        Constants.myCowManager.myCMInvoicesPage.dataTestId.invoicesPage
      )
      .click();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMInvoicesPage.dataTestId.invoicesPageTitle
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMInvoicesPage.dataTestId.invoicesTable
      )
    ).toBeVisible();
    await expect(
      getByDataTest(
        cmMFAPage,
        Constants.myCowManager.myCMInvoicesPage.dataTest.invoicesInfoIcon
      )
    ).toBeHidden();
  }
);
