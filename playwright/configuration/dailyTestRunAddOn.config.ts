import { PlaywrightTestConfig } from "@playwright/test";

//Only set test set params
const dailyTestAddOnPlaywrightConfig: PlaywrightTestConfig = {
  //Override both grep and grepInvert to force the wanted test set
  grep: undefined,
  grepInvert: /@betaOnly|@smokeTest/,
};

export default dailyTestAddOnPlaywrightConfig;
