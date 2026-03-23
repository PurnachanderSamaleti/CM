import { cmTest, expect } from "../test-fixtures";
import { Constants } from "../../constants/index.constants";
import { getByDataTest } from "../../shared/dataTestLocator.utils";

cmTest(
  "Verify My CowManager MyCompany page Address tab",
  { tag: ["@testOnly", "@myCMTest"] },
  async ({ cmMFAPage }) => {
    await cmMFAPage
      .getByTestId(
        Constants.myCowManager.myCMMyCompanyPage.dataTestId.myCompanyButton
      )
      .click();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMMyCompanyPage.dataTestId.myCompanyPageTitle
      )
    ).toHaveText("My Company");
    await getByDataTest(
      cmMFAPage,
      Constants.myCowManager.myCMMyCompanyPage.dataTest.myCompanyTabs
    )
      .filter({ hasText: "Address" })
      .click();
    await expect(cmMFAPage.getByText("Billing address")).toBeVisible();
    await expect(
      getByDataTest(
        cmMFAPage,
        Constants.myCowManager.myCMMyCompanyPage.dataTest
          .deliveryAddressAccordion
      )
    ).toBeVisible();
  }
);

cmTest(
  "Validate My CowManager MyCompany e-mail link on Address tab page",
  { tag: ["@testOnly", "@myCMTest"] },
  async ({ cmMFAPage }) => {
    await cmMFAPage
      .getByTestId(
        Constants.myCowManager.myCMMyCompanyPage.dataTestId.myCompanyButton
      )
      .click();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMMyCompanyPage.dataTestId.myCompanyPageTitle
      )
    ).toHaveText("My Company");
    await getByDataTest(
      cmMFAPage,
      Constants.myCowManager.myCMMyCompanyPage.dataTest.myCompanyTabs
    )
      .filter({ hasText: "Address" })
      .click();
    await cmMFAPage.getByText("E-MAIL COWMANAGER").click();
    await expect(cmMFAPage.getByText("E-MAIL COWMANAGER")).toBeVisible();
  }
);

cmTest(
  "Validate My CowManager your network button of Address page on your network plan accordion",
  { tag: ["@testOnly", "@myCMTest"] },
  async ({ cmMFAPage }) => {
    await cmMFAPage
      .getByTestId(
        Constants.myCowManager.myCMMyCompanyPage.dataTestId.myCompanyButton
      )
      .click();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMMyCompanyPage.dataTestId.myCompanyPageTitle
      )
    ).toHaveText("My Company");
    await getByDataTest(
      cmMFAPage,
      Constants.myCowManager.myCMMyCompanyPage.dataTest.myCompanyTabs
    )
      .filter({ hasText: "Address" })
      .click();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMMyCompanyPage.dataTestId.yourNetworkAccordion
      )
    ).toBeVisible();
    await cmMFAPage
      .getByTestId(
        Constants.myCowManager.myCMMyCompanyPage.dataTestId.yourNetworkButton
      )
      .click();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMMyCompanyPage.dataTestId.networkPlanHeader
      )
    ).toHaveText("Network plan");
  }
);
