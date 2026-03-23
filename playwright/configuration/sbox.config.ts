import { PlaywrightTestConfig } from "@playwright/test";

const sboxPlaywrightConfig: PlaywrightTestConfig = {
  grepInvert: /@testOnly|@betaOnly|@devTestOnly|@testBetaProdOnly|@smokeTest/,
  use: {
    baseURL: "https://sensor.sandbox-cowmanager.com/",
  },
};

export default sboxPlaywrightConfig;
