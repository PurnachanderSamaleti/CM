import { PlaywrightTestConfig } from "@playwright/test";

const devPlaywrightConfig: PlaywrightTestConfig = {
  grepInvert: /@testOnly|@betaOnly|@testBetaProdOnly|@smokeTest/,
  use: {
    baseURL: "https://sensor.dev-cowmanager.com/",
  },
};

export default devPlaywrightConfig;
