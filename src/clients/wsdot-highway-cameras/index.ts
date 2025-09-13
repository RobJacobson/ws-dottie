import { defineEndpoint } from "@/shared/endpoints";
import { getHighwayCameraMeta } from "./getHighwayCamera";
import { getHighwayCamerasMeta } from "./getHighwayCameras";
import { searchHighwayCamerasMeta } from "./searchHighwayCameras";

export const getHighwayCamera = defineEndpoint(getHighwayCameraMeta);
export const getHighwayCameras = defineEndpoint(getHighwayCamerasMeta);
export const searchHighwayCameras = defineEndpoint(searchHighwayCamerasMeta);

// Re-export output types from schemas
export type {
  Camera,
  Cameras,
} from "@/schemas/wsdot-highway-cameras";
// Re-export input types from client files
export type { HighwayCameraInput } from "./getHighwayCamera";
export type { HighwayCamerasInput } from "./getHighwayCameras";
export type { SearchHighwayCamerasInput } from "./searchHighwayCameras";
