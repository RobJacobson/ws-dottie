import type { ApiDefinition } from "@/apis/types";
import { cameraDetailsResource } from "./cameraDetails";
// Import all resources
import { cameraListResource } from "./cameraList";

// Combine all resources into the legacy format for backward compatibility
export const wsdotHighwayCamerasApi: ApiDefinition = {
  name: "wsdot-highway-cameras",
  baseUrl:
    "http://www.wsdot.wa.gov/traffic/api/highwaycameras/highwaycamerasrest.svc",
  endpoints: [
    // Flatten all endpoints from all resources
    ...Object.values(cameraListResource.endpoints),
    ...Object.values(cameraDetailsResource.endpoints),
  ],
};

// Export individual resources for direct use
export { cameraListResource, cameraDetailsResource };
