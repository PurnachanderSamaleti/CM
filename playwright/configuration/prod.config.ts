import { PlaywrightTestConfig } from "@playwright/test";

const prodPlaywrightConfig: PlaywrightTestConfig = {
  grepInvert: /@testOnly|@betaOnly|@devTestOnly|@smokeTest/,
  use: {
    baseURL: "https://sensor.cowmanager.com/",
  },
};

export default prodPlaywrightConfig;
