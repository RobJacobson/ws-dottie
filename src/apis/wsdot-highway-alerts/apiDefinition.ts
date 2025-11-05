import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { highwayAlertsGroup } from "./highwayAlerts/highwayAlerts.endpoints";
import { alertAreasGroup } from "./alertAreas/alertAreas.endpoints";
import { eventCategoriesGroup } from "./eventCategories/eventCategories.endpoints";

export const wsdotHighwayAlertsApi: ApiDefinition = {
  name: "wsdot-highway-alerts",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/highwayalerts/highwayalertsrest.svc",
  endpointGroups: [highwayAlertsGroup, alertAreasGroup, eventCategoriesGroup],
};

// Export individual resources for direct use
export { highwayAlertsGroup, alertAreasGroup, eventCategoriesGroup };
