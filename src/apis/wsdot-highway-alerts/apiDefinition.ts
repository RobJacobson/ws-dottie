import type { ApiDefinition } from "@/apis/types";
import { alertAreasGroup } from "./alertAreas/alertAreas.endpoints";
import { eventCategoriesGroup } from "./eventCategories/eventCategories.endpoints";
// Import all resources
import { highwayAlertsGroup } from "./highwayAlerts/highwayAlerts.endpoints";

export const wsdotHighwayAlertsApi = {
  name: "wsdot-highway-alerts",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/highwayalerts/highwayalertsrest.svc",
  endpointGroups: [highwayAlertsGroup, alertAreasGroup, eventCategoriesGroup],
} satisfies ApiDefinition;
