import { cmTest, expect } from "../test-fixtures";
import { Constants } from "../../constants/index.constants";

cmTest(
  "Verify My CowManager contact page",
  { tag: ["@testOnly", "@myCMTest"] },
  async ({ cmMFAPage }) => {
    await cmMFAPage
      .getByTestId(
        Constants.myCowManager.myCMContactPage.dataTestId.contactButton
      )
      .click();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMContactPage.dataTestId.contactPageTitle
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMContactPage.dataTestId.contactPageSupportCard
      )
    ).toBeVisible();
    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMContactPage.dataTestId.contactPageDealerCard
      )
    ).toBeVisible();

    await expect(
      cmMFAPage.getByTestId(
        Constants.myCowManager.myCMContactPage.dataTestId.contactPageAddressCard
      )
    ).toBeVisible();
  }
);
