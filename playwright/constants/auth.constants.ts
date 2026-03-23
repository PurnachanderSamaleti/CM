import fs from "fs";
import { loadEnv } from "vite";

// Define the users here.
export enum User {
  MainTestUser = 1,
  SubTestUser = 2,
  DealerTestUser = 3,
  SupportTestUser = 4,
  SuperSupportTestUser = 5,
  SubBetaVeenstraUser = 6,
  LanguageTestUser = 7,
  SupportBetaMelkRuitenburgUser = 8,
  SubBetaBruijnUser = 9,
  MFAMailSuperSupportTestSedieneUser = 10,
  SubBetaGriffioenTestUser = 11,
  SupportBetaSterreschansTestUser = 12,
  MfaSupportTestSedieneUser = 13,
}

export interface UserInfo {
  username: string;
  isMyCmTestUser: boolean;
  environmentCompanySelection: EnvironmentCompany[];
  currentEnvironment: EnvironmentCompany;
}

export interface EnvironmentCompany {
  environment: string;
  accountNumber: string;
  usesAuthenticator: boolean;
}

// Load the user logins from the userLogins.json file
const UserLoginsFile = JSON.parse(
  fs.readFileSync("./playwright/.users/userLogins.json", "utf8")
);

const UserLogins: {
  [key in User]: UserInfo;
} = UserLoginsFile;

// Load the password from the env file
// If the pipeline is running tests, the process.env is filled with the correct variables
const env = loadEnv("", "../", "VITE_");

export const UserPassword: string =
  process.env.TESTUSERPASSWORD ?? env.VITE_PLAYWRIGHT_TESTUSER_PASSWORD;

export const MailinatorApiToken: string =
  process.env.MAILINATORAPITOKEN ?? env.VITE_PLAYWRIGHT_MAILINATOR_API_TOKEN;
export const MailinatorTOTPSecret: string =
  process.env.MAILINATORTOTPSECRET ?? env.VITE_PLAYWRIGHT_TOTP_SECRET;
export default UserLogins;
