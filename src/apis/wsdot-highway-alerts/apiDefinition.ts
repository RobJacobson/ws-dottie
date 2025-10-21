import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { alertsResource } from "./alerts/alerts";
import { areasResource } from "./areas/areas";
import { eventCategoriesResource } from "./eventCategories/eventCategories";

export const wsdotHighwayAlertsApi: ApiDefinition = {
  name: "wsdot-highway-alerts",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/highwayalerts/highwayalertsrest.svc",
  endpointGroups: [alertsResource, areasResource, eventCategoriesResource],
};

// Export individual resources for direct use
export { alertsResource, areasResource, eventCategoriesResource };
