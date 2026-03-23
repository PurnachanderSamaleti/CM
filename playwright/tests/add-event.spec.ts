import { Locator, Page } from "@playwright/test";
import { Constants } from "../constants/index.constants";
import { cmTest, expect } from "./test-fixtures";

// These tests perform a CRUD (Create, Read, Update, Delete) cycle for cow events and group events

cmTest(
  "Add cow event",
  {
    tag: ["@betaOnly"],
  },
  async ({ cmBetaGriffioenTestUser }) => {
    // go directly to cow event page; Griffioen farm, cow 460, id 2743318 -> the id is n the constants file
    await cmBetaGriffioenTestUser.goto(
      `/cow/${Constants.addEvent.constants.cowId}/events/eventList`
    );
    // is-testable doesn't appear to be present on this page
    await expect(
      cmBetaGriffioenTestUser.getByRole("button", { name: "ALERT HISTORY" })
    ).toBeVisible();

    //Ensure the Events checkbox to be checked
    await cmBetaGriffioenTestUser
      .locator("#show_only_events")
      .check({ force: true });

    // CREATE
    // Click the Add event button
    const addEventButton = cmBetaGriffioenTestUser.getByRole("button", {
      name: "Add event",
    });
    await addEventButton.click();
    // Wait for the modal to be visible
    await expect(
      cmBetaGriffioenTestUser.locator(Constants.addEvent.locators.modalTitle)
    ).toBeVisible();
    // Open pulldown with events
    const selectEventButton = cmBetaGriffioenTestUser.getByRole("button", {
      name: "Select event ...",
    });
    await selectEventButton.click();
    // Because sometimes the pulldown appears empty, it will be checked if there is content (check it first item of pulldown is visible)
    // If it's empty, the modal will be closed and opened again, after which it will always show content (if not, it's broken)
    const dropdownTextsVisible = await cmBetaGriffioenTestUser
      .getByText(Constants.addEvent.constants.topEventFromPulldown)
      .isVisible();
    if (!dropdownTextsVisible) {
      await cmBetaGriffioenTestUser
        .getByRole("button", { name: "Cancel" })
        .click();
      await addEventButton.click();
      await expect(
        cmBetaGriffioenTestUser.locator(Constants.addEvent.locators.modalTitle)
      ).toBeVisible();
      await selectEventButton.click();
    }
    // Choose "Corona (virus)"
    await cmBetaGriffioenTestUser
      .getByRole("table")
      .getByText(Constants.addEvent.constants.testEvent)
      .click();
    // Fill in remark text so we can identify the event
    await cmBetaGriffioenTestUser
      .locator(Constants.addEvent.locators.addEventRemarkInput)
      .fill(Constants.addEvent.constants.remarkText[0]);
    // Click "Save"
    await cmBetaGriffioenTestUser.getByRole("button", { name: "Save" }).click();
    // Wait for the confirmation to appear
    await expect(
      cmBetaGriffioenTestUser.getByText("Successfully saved")
    ).toBeVisible({ timeout: 10000 });
    // Wait for the confirmation to disappear, otherwise it might still be visible when confirming the next action
    // Set timeout to 10 seconds, because sometimes the environment is slow to save results
    await expect(
      cmBetaGriffioenTestUser.getByText("Successfully saved")
    ).not.toBeVisible({ timeout: 10000 });

    // READ AND UPDATE
    // Select row with remark text (to confirm the row is actually there) and click edit symbol
    await cmBetaGriffioenTestUser
      .getByText(Constants.addEvent.constants.remarkText[0])
      .click();
    await cmBetaGriffioenTestUser
      .locator(Constants.addEvent.locators.editIcon)
      .first()
      .click();
    await cmBetaGriffioenTestUser
      .locator(Constants.addEvent.locators.addEventRemarkInput)
      .fill(Constants.addEvent.constants.remarkText[1]);
    // Click "Change event"
    await cmBetaGriffioenTestUser
      .getByRole("button", { name: "Change event" })
      .click();
    // Wait for the confirmation to appear
    await expect(
      cmBetaGriffioenTestUser.getByText(
        Constants.addEvent.constants.savedSuccess
      )
    ).toBeVisible({ timeout: 10000 });
    // Wait for the confirmation to disappear, otherwise it might still be visible when confirming the next action
    // Set timeout to 10 seconds, because sometimes the environment is slow to save results
    await expect(
      cmBetaGriffioenTestUser.getByText(
        Constants.addEvent.constants.savedSuccess
      )
    ).not.toBeVisible({ timeout: 10000 });

    // DELETE
    await cmBetaGriffioenTestUser
      .getByText(Constants.addEvent.constants.remarkText[1])
      .click();
    await cmBetaGriffioenTestUser
      .locator(Constants.addEvent.locators.trashIcon)
      .first()
      .click();
    // Confirm delete
    await cmBetaGriffioenTestUser
      .getByRole("button", { name: "I agree" })
      .click();
    // Successfully saved means successfully deleted, this is a bug
    await expect(
      cmBetaGriffioenTestUser.getByText(
        Constants.addEvent.constants.savedSuccess
      )
    ).toBeVisible({ timeout: 10000 });
    await expect(
      cmBetaGriffioenTestUser.getByText(
        Constants.addEvent.constants.remarkText[1]
      )
    ).not.toBeVisible();
  }
);

cmTest(
  "Add group event",
  {
    tag: ["@betaOnly"],
  },
  async ({ cmBetaGriffioenTestUser }) => {
    // Go directly to group event page
    await cmBetaGriffioenTestUser.goto("/input/groupEvents");
    // Wait for the page to load
    await expect(
      cmBetaGriffioenTestUser.locator(
        Constants.mainApplication.locators.isTestable
      )
    ).toBeVisible();
    await expect(
      cmBetaGriffioenTestUser.getByTestId(
        Constants.mainApplication.dataTestId.pageHeader
      )
    ).toBeVisible();

    //Clean up previous attempts if they failed at any stage
    await RemovePreviousAttemptsGroupAlerts(cmBetaGriffioenTestUser);

    // CREATE
    await AddGroupEvent(
      cmBetaGriffioenTestUser,
      Constants.addEvent.constants.eventGroup,
      Constants.addEvent.constants.eventText[0]
    );

    // Wait for the confirmation to appear
    await expect(
      cmBetaGriffioenTestUser.getByText(
        Constants.addEvent.constants.savedSuccess
      )
    ).toBeVisible({ timeout: 10000 });
    // Wait for the confirmation to disappear, otherwise it might still be visible when confirming the next action
    await expect(
      cmBetaGriffioenTestUser.getByText(
        Constants.addEvent.constants.savedSuccess
      )
    ).not.toBeVisible({ timeout: 10000 });

    // READ AND UPDATE
    // Select row with event text (to confirm the row is actually there) and click edit symbol
    const rowToEdit = GetLocatorRow(
      cmBetaGriffioenTestUser,
      Constants.addEvent.constants.eventText[0]
    );

    await EditEventNameRow(
      cmBetaGriffioenTestUser,
      rowToEdit,
      Constants.addEvent.constants.eventText[1]
    );

    // DELETE
    //Get the row to delete
    const deleteRowLocator = GetLocatorRow(
      cmBetaGriffioenTestUser,
      Constants.addEvent.constants.eventText[1]
    );

    await DeleteRow(cmBetaGriffioenTestUser, deleteRowLocator);

    // // Confirm delete
    // Sometimes a row with the same value is hidden and then strict mode violation is triggered, so we check the first.
    // This will retry until they are all gone.
    await expect(
      cmBetaGriffioenTestUser
        .getByText(Constants.addEvent.constants.eventText[1])
        .first()
    ).not.toBeVisible();
  }
);

async function AddGroupEvent(
  page: Page,
  eventGroup: string,
  eventName: string
) {
  // Click the Add group event button
  await page.getByRole("button", { name: "Add group event" }).click();
  // Wait for the modal to be visible
  await expect(
    page.locator(Constants.addEvent.locators.modalTitle)
  ).toBeVisible();
  // Open pulldown with groups
  await page.getByText("Select group here").click();
  // Select group "2000" checkbox
  await page
    .locator(Constants.addEvent.locators.dropdownContainer)
    .getByText(eventGroup)
    .click();
  // Wait for group "2000" to be selected and then click the message to close to pulldown
  await page.getByRole("button", { name: eventGroup }).click();
  // Fill the event
  await page.locator(Constants.addEvent.locators.inputEvent).fill(eventName);
  // Click "Save"
  await page.getByRole("button", { name: "Save" }).click();
}

function GetLocatorRow(page: Page, name: string): Locator {
  return page.getByRole("row").filter({
    has: page.getByRole("gridcell", {
      name: name,
    }),
  });
}

async function RemovePreviousAttemptsGroupAlerts(page: Page) {
  const eventTexts = Constants.addEvent.constants.eventText;

  for (const et of eventTexts) {
    const nrOfRecordsToBeRemoved = await page
      .getByRole("row")
      .filter({ has: page.getByRole("gridcell", { name: et }) })
      .count();

    for (let i = 0; i < nrOfRecordsToBeRemoved; i++) {
      const record = page
        .getByRole("row")
        .filter({ has: page.getByRole("gridcell", { name: et }) })
        .first();

      await DeleteRow(page, record);
    }
  }

  await expect(
    page.getByRole("gridcell", {
      name: new RegExp(`${eventTexts[0]}|${eventTexts[1]}`),
    })
  ).not.toBeVisible();
}

async function EditEventNameRow(page: Page, row: Locator, eventName: string) {
  //Open edit modal
  await row.locator(Constants.addEvent.locators.editIcon).click();

  //Edit Event Name
  await page.locator(Constants.addEvent.locators.inputEvent).fill(eventName);
  // Click "Save"
  await page.getByRole("button", { name: "Save" }).click();
  // Wait for the confirmation to appear
  await expect(
    page.getByText(Constants.addEvent.constants.savedSuccess)
  ).toBeVisible({ timeout: 10000 });
  // This time we do not need to wait for the message to disappear, because the deletion message is correctly labeled
}

async function DeleteRow(page: Page, row: Locator) {
  //Open delete modal
  await row.locator(Constants.addEvent.locators.trashIcon).click();

  // Confirm delete
  await page.getByRole("button", { name: "I agree" }).click();
  // Confirmation successfully deleted, event is no longer present

  await expect(
    page.locator(Constants.addEvent.locators.modalContent)
  ).not.toBeVisible();

  await expect(
    page.getByText(Constants.addEvent.constants.deletedSuccess)
  ).toBeVisible({ timeout: 10000 });

  //Remove the success bar in the case we have to delete multiple records
  await page.getByText(Constants.addEvent.constants.deletedSuccess).click();
}
