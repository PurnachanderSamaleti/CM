import { IFeatureFlags } from "@/interfaces/IFeatureFlags";
import { Page } from "@playwright/test";

export async function isFeatureEnabled(page: Page, flagName: string) {
  //Get the feature flags out of the local storage
  const localStorage = await page.evaluate(() =>
    window.localStorage.getItem("cm-data-cache_featureFlags")
  );

  //If no feature flag data can be found in the local storage, return false
  let localStorageParsed: IFeatureFlags;
  if (localStorage != null) {
    //Parse feature flag data
    localStorageParsed = JSON.parse(localStorage)["data"];
  } else {
    return false;
  }

  //If data failed to parse, return false
  if (localStorageParsed == undefined) {
    return false;
  }

  //Check the value of the feature flag
  const flagValue = localStorageParsed[flagName];
  return flagValue === true;
}
