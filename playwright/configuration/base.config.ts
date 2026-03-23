import { PlaywrightTestConfig, devices } from "@playwright/test";
import { createRequire } from "module";

const basePlaywrightConfig: PlaywrightTestConfig = {
  testDir: "./playwright/tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,

  //A test file wil be considered slow when the file takes more then 30 secs to execute all its tests
  reportSlowTests: {
    max: 5, //Default value
    threshold: 30 * 1000, //30 seconds threshold
  },

  timeout: 60 * 1000, //60 seconds timeout per test

  // Global teardown will only run once after all tests.
  globalTeardown: createRequire(import.meta.url).resolve("../global-teardown"),

  // We report both html and junit reports. Html are easy to read directly and junit is used by CI.
  reporter: [
    ["html", { open: "never" }],
    ["junit", { outputFile: "test-results/e2e-junit-results.xml" }],
  ],

  /* Configure projects for major browsers */
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

export default basePlaywrightConfig;
