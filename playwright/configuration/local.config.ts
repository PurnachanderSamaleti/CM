import { PlaywrightTestConfig } from "@playwright/test";

const localPlaywrightConfig: PlaywrightTestConfig = {
  grepInvert: /@testOnly|@betaOnly|@devTestOnly|@testBetaProdOnly|@smokeTest/,
  use: {
    baseURL: "http://localhost:3000/",
  },
  workers: 1,
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
};

export default localPlaywrightConfig;
