import { PlaywrightTestConfig } from "@playwright/test";

const testPlaywrightConfig: PlaywrightTestConfig = {
  grepInvert: /@betaOnly|@smokeTest|@myCMTest/,
  use: {
    baseURL: "https://sensor.test-cowmanager.com/",
  },
};

export default testPlaywrightConfig;
