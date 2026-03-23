import { Page } from "@playwright/test";

export async function SetPageProperty(
  page: Page,
  apiURL: string,
  propertyName: string,
  propertyValue: boolean
) {
  await page.route(apiURL, async (route) => {
    const response = await route.fetch();
    const originalResponse = await response.json();
    const updatedResponse = {
      ...originalResponse,
      [propertyName]: propertyValue,
    };
    await route.fulfill({ json: updatedResponse });
  });
}

export async function triggerNewTabFromLink(
  page: Page,
  propertyName: string,
  propertyValue: string
): Promise<Page> {
  const locator =
    propertyName === "getByTestId"
      ? page.getByTestId(propertyValue)
      : page.locator(propertyValue);
  const [newTab] = await Promise.all([
    page.context().waitForEvent("page"),
    locator.click(),
  ]);
  await newTab.waitForLoadState("load");
  return newTab;
}
