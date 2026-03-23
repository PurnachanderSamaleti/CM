import { Page } from "@playwright/test";

/**
 * Blocks any requests to the walkme cdn.
 * This should block the entire walkme module from loading and also prevent popups appearing during our tests.
 */
export async function BlockWalkMeRequests(page: Page) {
  await page.route(/.*(?:cdn|ec)\.walkme\.com.*/, async (route) => {
    await route.abort();
  });
}

/**
 * Blocks endofsupport requests to avoid the Windows 10 pop-up
 */
export async function BlockEndOfSupportRequests(page: Page) {
  await page.route(/.*endofsupport$/, async (route) => {
    await route.abort();
  });
}
