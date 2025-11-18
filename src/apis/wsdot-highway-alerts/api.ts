import type { ApiDefinition } from "@/apis/types";
import { alertAreasGroup } from "./alertAreas/shared/alertAreas.endpoints";
import { eventCategoriesGroup } from "./eventCategories/shared/eventCategories.endpoints";
import { highwayAlertsGroup } from "./highwayAlerts/shared/highwayAlerts.endpoints";

export const wsdotHighwayAlertsApi: ApiDefinition = {
  api: {
    name: "wsdot-highway-alerts",
    baseUrl:
      "https://www.wsdot.wa.gov/traffic/api/highwayalerts/highwayalertsrest.svc",
  },
  endpointGroups: [highwayAlertsGroup, alertAreasGroup, eventCategoriesGroup],
};
