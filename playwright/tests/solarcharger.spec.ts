import { Page } from "@playwright/test";
import { Constants } from "../constants/index.constants";
import { cmTest, expect } from "./test-fixtures";

// Test skipped due to broken event hub
cmTest.skip(
  "Solar chargers are reporting",
  {
    tag: ["@betaOnly"],
  },
  async ({ cmBetaSterreschansTestUser }) => {
    // go directly to solar charger page
    await cmBetaSterreschansTestUser.goto("/support/SolarChargerDailyStatus");
    await expect(
      cmBetaSterreschansTestUser.locator(
        Constants.mainApplication.locators.isTestable
      )
    ).toBeVisible();
    await expect(
      cmBetaSterreschansTestUser.getByTestId(
        Constants.mainApplication.dataTestId.pageHeader
      )
    ).toBeVisible();
    // make sure the grid is visible by clicking Grid radio button
    await cmBetaSterreschansTestUser
      .locator(Constants.solarCharger.locators.solarChargerGridSelector)
      .click();

    // Use the same locale as the browser doesn't apply here because of a bug. The date is always displayed in ISO format
    const date = new Date();
    const currentDate = date.toISOString().split("T")[0];
    date.setDate(date.getDate() - 1);
    const yesterdayDate = date.toISOString().split("T")[0];

    // Regex pattern for matching today: date for today and 'Unknown'
    const expectedFormatToday = new RegExp(
      `^${currentDate}(?:Unknown|[0-9.,])+$`
    );

    // Regex pattern for matching yesterday: date of yesterday and no 'Unknown' with some digits (which represent solar panel data)
    const expectedFormatYesterday = new RegExp(
      `^${yesterdayDate}(?:Unknown|[0-9.,])+$`
    );

    // Check both available solar chargers
    const resultArray: boolean[] = [];
    const tempList = Constants.solarCharger.constants.availableSolarChargerIds;
    for (const id of tempList) {
      const result = await CheckSolarCharger(
        cmBetaSterreschansTestUser,
        id,
        expectedFormatToday,
        expectedFormatYesterday
      );
      resultArray.push(result);
    }

    // Only one of the two has to be true.
    // This is due to the communication of a solar charger. It only communicates when it has sun/power.
    expect(resultArray).toContain(true);
  }
);

async function CheckSolarCharger(
  page: Page,
  solarChargerId: string,
  expectedFormatToday: RegExp,
  expectedFormatYesterday: RegExp
) {
  const selectSolarChargerLocator = page.locator(
    Constants.solarCharger.locators.selectSolarCharger
  );
  await selectSolarChargerLocator.selectOption(solarChargerId);
  await expect(selectSolarChargerLocator).toHaveValue(solarChargerId);

  await expect(page.locator(Constants.grid.locators.gridOverlay)).toHaveClass(
    /ag-hidden/,
    {
      timeout: 5000,
    }
  );

  // This locator collects all rows of the grid
  const allRows = page
    .locator(Constants.grid.locators.gridTableRowContainer)
    .getByRole("row");

  const correctRowTodayPresent = await allRows
    .getByText(expectedFormatToday)
    .isVisible();
  const correctRowYesterdayPresent = await allRows
    .getByText(expectedFormatYesterday)
    .isVisible();

  return correctRowTodayPresent && correctRowYesterdayPresent;
}
