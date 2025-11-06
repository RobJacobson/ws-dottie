import type { ApiDefinition } from "@/apis/types";
import { camerasGroup } from "./cameras/cameras.endpoints";

export const wsdotHighwayCamerasApi = {
  name: "wsdot-highway-cameras",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/highwaycameras/highwaycamerasrest.svc",
  endpointGroups: [camerasGroup],
} satisfies ApiDefinition;
