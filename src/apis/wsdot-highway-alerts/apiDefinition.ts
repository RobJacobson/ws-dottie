import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { alertsGroup } from "./alerts/alerts";
import { areasGroup } from "./areas/areas";
import { eventCategoriesGroup } from "./eventCategories/eventCategories";

export const wsdotHighwayAlertsApi: ApiDefinition = {
  name: "wsdot-highway-alerts",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/highwayalerts/highwayalertsrest.svc",
  endpointGroups: [alertsGroup, areasGroup, eventCategoriesGroup],
};

// Export individual resources for direct use
export { alertsGroup, areasGroup, eventCategoriesGroup };
