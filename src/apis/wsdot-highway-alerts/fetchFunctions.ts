import { createFetchFunctions } from "@/shared/utils/createFetchFunctions";
import { wsdotHighwayAlertsApi } from "./apiDefinition";

export const {
  fetchAlerts,
  fetchAlertById,
  fetchAlertsByRegionId,
  fetchAlertsByMapArea,
  searchAlerts,
  fetchMapAreas,
  fetchEventCategories,
} = createFetchFunctions(wsdotHighwayAlertsApi);
