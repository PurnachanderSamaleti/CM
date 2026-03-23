import UserLogins, { User } from "../../constants/auth.constants";
import { SignIntoMyCM } from "../../shared/authentication.utils";
import { isFeatureEnabled } from "../../shared/featureFlagHelper";
import { cmTest, expect } from "../test-fixtures";

cmTest(
  "Verify mfa token received via mail",
  { tag: ["@testOnly", "@myCMTest"] },
  async ({ cmMFAMailPage }) => {
    const isMFAEnabled = await isFeatureEnabled(
      cmMFAMailPage,
      "TriggerMFAMyCowManager"
    );

    //Skip test if MFA is not enabled
    cmTest.skip(!isMFAEnabled, "Nothing to test as the MFA is not enabled");

    //Sign into MyCM using the mail validation method
    const user = User.MFAMailSuperSupportTestSedieneUser;
    await SignIntoMyCM(cmMFAMailPage, UserLogins[user]);

    await expect(cmMFAMailPage, {
      message: "Expected the user to be on the MYCM overview page",
    }).toHaveURL(/mycowmanager\/overview/);
  }
);
