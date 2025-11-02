import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { alertsGroup } from "./alerts/alerts.endpoints";
import { areasGroup } from "./areas/areas.endpoints";
import { eventCategoriesGroup } from "./eventCategories/eventCategories.endpoints";

export const wsdotHighwayAlertsApi: ApiDefinition = {
  name: "wsdot-highway-alerts",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/highwayalerts/highwayalertsrest.svc",
  endpointGroups: [alertsGroup, areasGroup, eventCategoriesGroup],
};

// Export individual resources for direct use
export { alertsGroup, areasGroup, eventCategoriesGroup };
