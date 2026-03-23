import { MyCowManagerConstantsIndex } from "./MyCM/myCM-index.constants";
import { MainApplicationConstants } from "./main-application.constants";
import { AddEventConstants } from "./add-event.constants";
import { SignInConstants } from "./sign-in.constants";
import { MenuConstants } from "./menu.constants";
import { TabConstants } from "./tab.constants";
import { ActivateFmcConstants } from "./activate-fmc.constants";
import { CompanyListConstants } from "./company-list.constants";
import { CowListConstants } from "./cow-list.constants";
import { GridConstants } from "./grid.constants";
import { SensorConstants } from "./sensors.constants";
import { SolarChargerDailyStatusConstants } from "./solar-charger.constants";

export class Constants {
  public static readonly mainApplication = MainApplicationConstants;
  public static readonly addEvent = AddEventConstants;
  public static readonly myCowManager = MyCowManagerConstantsIndex;
  public static readonly signIn = SignInConstants;
  public static readonly menu = MenuConstants;
  public static readonly tab = TabConstants;
  public static readonly activateFmc = ActivateFmcConstants;
  public static readonly companyList = CompanyListConstants;
  public static readonly cowList = CowListConstants;
  public static readonly grid = GridConstants;
  public static readonly sensor = SensorConstants;
  public static readonly solarCharger = SolarChargerDailyStatusConstants;
}
