import type { ApiDefinition } from "@/apis/types";
import { camerasResource } from "./cameras/cameras";

export const wsdotHighwayCamerasApi: ApiDefinition = {
  name: "wsdot-highway-cameras",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/highwaycameras/highwaycamerasrest.svc",
  endpointGroups: [camerasResource],
};

// Export individual resources for direct use
export { camerasResource };
