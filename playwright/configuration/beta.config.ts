import { PlaywrightTestConfig, devices } from "@playwright/test";

const betaPlaywrightConfig: PlaywrightTestConfig = {
  grepInvert: /@devTestOnly|@testOnly|@smokeTest/,
  use: {
    baseURL: "https://sensor.beta-cowmanager.com/",
  },
  //Restrict beta to these project(s)
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
};

export default betaPlaywrightConfig;
