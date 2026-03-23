import { Locator, Page } from "@playwright/test";

export function getByDataTest(
  page: Page,
  dataTestValue: string,
  dataTestIdValueOrLocator?: string | Locator
): Locator {
  const dataTestString = `[data-test="${dataTestValue}"]`;

  //Check if the dataTestId is given
  if (dataTestIdValueOrLocator !== undefined) {
    if (typeof dataTestIdValueOrLocator === "string") {
      //Use dataTestId as string
      return page.getByTestId(dataTestIdValueOrLocator).locator(dataTestString);
    } else {
      //Use dataTestId as Locator
      return dataTestIdValueOrLocator.locator(dataTestString);
    }
  }

  //if no data-testId is given, only use the data-test locator
  return page.locator(dataTestString);
}
