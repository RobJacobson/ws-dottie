import type { ApiDefinition } from "@/apis/shared/apis";
import { apis } from "@/apis/shared/apis";
import { camerasGroup } from "./cameras/shared/cameras.endpoints";

export const wsdotHighwayCamerasApi = {
  api: apis.wsdotHighwayCameras,
  endpointGroups: [camerasGroup],
} satisfies ApiDefinition;
