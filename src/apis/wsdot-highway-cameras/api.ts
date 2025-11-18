import type { ApiDefinition } from "@/apis/types";
import { camerasGroup } from "./cameras/shared/cameras.endpoints";

export const wsdotHighwayCamerasApi: ApiDefinition = {
  api: {
    name: "wsdot-highway-cameras",
    baseUrl:
      "https://www.wsdot.wa.gov/traffic/api/highwaycameras/highwaycamerasrest.svc",
  },
  endpointGroups: [camerasGroup],
};
