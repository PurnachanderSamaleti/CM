export class MainApplicationConstants {
  public static readonly constants = {
    browserLocal: "en-us",
    changeLanguage: {
      fromLanguage: "DE",
      toLanguage: "EN-GB",
    },
    expectedModuleTextEnglish: [
      "health",
      "fertility",
      "transition",
      "nutrition",
      "find my cow",
      "auto sorting",
    ],
    languageConverter: {
      "EN-GB": "English - Great Britain",
      DE: "Deutsch",
    },
  };

  public static readonly dataTestId = {
    languageSelector: "languageSelector",
    userIcon: "userIcon",
    mycmButton: "account-dropdown-open-my-cowmanager",
    pageHeader: "page-header",
    pageTitle: "page-title",
    findMyCow: "menu-FindMyCow",
    activateFindMyCow: "menu-ActivateFindMyCow",
    overviewFindMyCow: "menu-OverviewFindMyCow",
  };

  public static readonly dataTest = {
    cmSelectText: "CmSelect-button-text",
  };

  public static readonly locators = {
    isTestable: ".is-testable",
    companyLogo: "#cm-logo",
    changeCompanyButton: "#change-company-link",
    selectedCompany: "span strong",
    header: "#app nav",
    menu: "#sidebar-scrollable",
    cowListButton: "a[data-testid='menu-CowList']",

    userMenuButton: "div[data-testid='userIcon']",
    userMenuLogoutButton: "//button[contains(text(),'Logout')]",

    logoutModalLogoutButton: "//button/span[contains(text(),'LOGOUT')]",
    moduleLabel: "[data-test='moduleLabel']",

    //MFA locators
    OTPInputFieldMail: "#VerificationCode",
    OTPInputFieldAuth: "#otpCode",
    continueButton: "#continue",
  };
}
