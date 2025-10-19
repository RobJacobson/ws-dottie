import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { alertsResource } from "./alerts/alerts";
import { areasResource } from "./areas/areas";
import { eventCategoriesResource } from "./eventCategories/eventCategories";

// Combine all resources into the legacy format for backward compatibility
export const wsdotHighwayAlertsApi: ApiDefinition = {
  name: "wsdot-highway-alerts",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/highwayalerts/highwayalertsrest.svc",
  endpoints: [
    // Flatten all endpoints from all resources
    ...Object.values(alertsResource.endpoints),
    ...Object.values(areasResource.endpoints),
    ...Object.values(eventCategoriesResource.endpoints),
  ],
};

// Export individual resources for direct use
export { alertsResource, areasResource, eventCategoriesResource };
