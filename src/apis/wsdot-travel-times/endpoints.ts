import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { travelTimeRoutesResource } from "./travelTimeRoutes/travelTimeRoutes";

export const wsdotTravelTimesApi: ApiDefinition = {
  name: "wsdot-travel-times",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/traveltimes/traveltimesrest.svc",
  endpointGroups: [travelTimeRoutesResource],
};

// Export individual resources for direct use
export { travelTimeRoutesResource };
