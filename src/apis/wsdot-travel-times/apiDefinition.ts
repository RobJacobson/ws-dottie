import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { travelTimeRoutesGroup } from "./travelTimeRoutes/travelTimeRoutes.endpoints";

export const wsdotTravelTimesApi: ApiDefinition = {
  name: "wsdot-travel-times",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/traveltimes/traveltimesrest.svc",
  endpointGroups: [travelTimeRoutesGroup],
};

// Export individual resources for direct use
export { travelTimeRoutesGroup };
