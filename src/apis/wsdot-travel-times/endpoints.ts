import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { travelTimeRoutesResource } from "./travelTimeRoutes/travelTimeRoutes";

// Combine all resources into the legacy format for backward compatibility
export const wsdotTravelTimesApi: ApiDefinition = {
  name: "wsdot-travel-times",
  baseUrl:
    "http://www.wsdot.wa.gov/traffic/api/traveltimes/traveltimesrest.svc",
  endpoints: [
    // Flatten all endpoints from all resources
    ...Object.values(travelTimeRoutesResource.endpoints),
  ],
};

// Export individual resources for direct use
export { travelTimeRoutesResource };
