import type { ApiDefinition } from "@/apis/types";
import { wsdotHighwayCamerasApiMeta } from "./apiMeta";
import { camerasGroup } from "./cameras/shared/cameras.endpoints";

export const wsdotHighwayCameras: ApiDefinition = {
  api: wsdotHighwayCamerasApiMeta,
  endpointGroups: [camerasGroup],
};
