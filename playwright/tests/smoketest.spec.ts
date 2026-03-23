import { Constants } from "../constants/index.constants";
import { cmTest, expect } from "./test-fixtures";

const menuDataTestId = Constants.menu.dataTestId;

[
  {
    page: "dashboard",
    header: null,
    navigation: [menuDataTestId.dashboard],
    expectedUrl: "/dashboard",
  },
  {
    page: "cowlist",
    header: null,
    navigation: [menuDataTestId.cowList],
    expectedUrl: "/cowList",
  },
  {
    page: "add cows",
    header: "add cow(s)",
    navigation: [menuDataTestId.inputAccordion, menuDataTestId.addCows],
    expectedUrl: "/input/addcow",
  },
  {
    page: "manage groups",
    header: "manage groups",
    navigation: [menuDataTestId.inputAccordion, menuDataTestId.manageGroups],
    expectedUrl: "/input/managegroups",
  },
  {
    page: "group location management",
    header: "manage group locations",
    navigation: [
      menuDataTestId.inputAccordion,
      menuDataTestId.manageGroupLocations,
    ],
    expectedUrl: "/input/grouplocationmanagement",
  },
  {
    page: "group events",
    header: "group events",
    navigation: [menuDataTestId.inputAccordion, menuDataTestId.groupEvents],
    expectedUrl: "/input/groupEvents",
  },
  {
    page: "linking and delinking",
    header: "(de)linking",
    navigation: [menuDataTestId.inputAccordion, menuDataTestId.deLinking],
    expectedUrl: "/input/linkingAndDelinking",
  },
  {
    page: "replace sensors",
    header: "replace sensors",
    navigation: [menuDataTestId.inputAccordion, menuDataTestId.replaceSensors],
    expectedUrl: "/input/replacesensors",
  },
  {
    page: "group overview",
    header: "group overview",
    navigation: [
      menuDataTestId.nutritionAccordion,
      menuDataTestId.groupOverview,
    ],
    expectedUrl: "/nutrition/groupoverview",
  },
  {
    page: "behavior around event",
    header: "behavior around event",
    navigation: [
      menuDataTestId.nutritionAccordion,
      menuDataTestId.behaviorAroundEvent,
    ],
    expectedUrl: "/nutrition/behavioraroundevent",
  },
  {
    page: "group comparison",
    header: "group comparison",
    navigation: [
      menuDataTestId.nutritionAccordion,
      menuDataTestId.groupComparison,
    ],
    expectedUrl: "/nutrition/groupcomparison",
  },
  {
    page: "transition comparison",
    header: "transition comparison",
    navigation: [
      menuDataTestId.nutritionAccordion,
      menuDataTestId.transitionComparison,
    ],
    expectedUrl: "/nutrition/transitioncomparison",
  },
  {
    page: "system",
    header: "system",
    navigation: [menuDataTestId.systemStatusAccordion, menuDataTestId.system],
    expectedUrl: "/system/systeminfo",
  },
  {
    page: "network plan",
    header: "network plan",
    navigation: [
      menuDataTestId.systemStatusAccordion,
      menuDataTestId.networkPlan,
    ],
    expectedUrl: "/system/networkplan",
  },
  {
    page: "sensors",
    header: "sensors",
    navigation: [menuDataTestId.systemStatusAccordion, menuDataTestId.sensors],
    expectedUrl: "/system/sensors",
  },
  {
    page: "warranty information",
    header: "warranty information",
    navigation: [
      menuDataTestId.systemStatusAccordion,
      menuDataTestId.warrantyInformation,
    ],
    expectedUrl: "/system/warrantyInformation",
  },
  {
    page: "activate find my cow",
    header: "activate find my cow",
    navigation: [
      menuDataTestId.findMyCowAccordion,
      menuDataTestId.activateFindMyCow,
    ],
    expectedUrl: "/findmycow/activatefindmycow",
  },
  {
    page: "find lost sensor",
    header: "find lost sensor",
    navigation: [
      menuDataTestId.findMyCowAccordion,
      menuDataTestId.findLostSensor,
    ],
    expectedUrl: "/findmycow/findlostsensor",
  },
  {
    page: "overview",
    header: "overview find my cow",
    navigation: [
      menuDataTestId.findMyCowAccordion,
      menuDataTestId.overviewFindMyCow,
    ],
    expectedUrl: "/findmycow/overview",
  },
  {
    page: "drafting",
    header: "auto drafting",
    navigation: [menuDataTestId.autoDrafting],
    expectedUrl: "/drafting",
  },
  {
    page: "reports",
    header: "reports",
    navigation: [menuDataTestId.reports],
    expectedUrl: "/reports/navigation",
  },
  {
    page: "multiView",
    header: "multiview",
    navigation: [menuDataTestId.multiView],
    expectedUrl: "/multiView",
  },
  {
    page: "company settings",
    header: "company settings",
    navigation: [menuDataTestId.companySettings],
    expectedUrl: "/settings/companySettings",
  },
  {
    page: "contact",
    header: "contact",
    navigation: [menuDataTestId.contact],
    expectedUrl: "/contact",
  },
].forEach(({ page, header, navigation, expectedUrl }) => {
  cmTest.skip(
    `Smoke test ${page}`,
    { tag: ["@smokeTest"] },
    async ({ cmSupportTestUserPage }) => {
      const hasPageHeader = header !== null;

      //Navigate to the page
      //Click on all given data-testids
      navigation.forEach(async (menuItem) => {
        await cmSupportTestUserPage.getByTestId(menuItem).click();
      });

      //Validate url
      await expect(cmSupportTestUserPage).toHaveURL(new RegExp(expectedUrl), {
        ignoreCase: true,
      });

      //Validate header if expected to be present
      if (hasPageHeader) {
        await expect(
          cmSupportTestUserPage.getByTestId("page-title")
        ).toHaveText(header, { ignoreCase: true });
      }
    }
  );
});
