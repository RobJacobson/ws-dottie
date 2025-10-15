import type { ApiDefinition } from "@/apis/types";
import { camerasResource } from "./cameras/cameras";

// Combine all resources into the legacy format for backward compatibility
export const wsdotHighwayCamerasApi: ApiDefinition = {
  name: "wsdot-highway-cameras",
  baseUrl:
    "http://www.wsdot.wa.gov/traffic/api/highwaycameras/highwaycamerasrest.svc",
  endpoints: [
    // Flatten all endpoints from all resources
    ...Object.values(camerasResource.endpoints),
  ],
};

// Export individual resources for direct use
export { camerasResource };
