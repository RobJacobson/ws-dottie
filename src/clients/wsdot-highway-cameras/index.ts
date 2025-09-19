import { getHighwayCameraMeta } from "./getHighwayCamera";
import { getHighwayCamerasMeta } from "./getHighwayCameras";
import { searchHighwayCamerasMeta } from "./searchHighwayCameras";
import { defineEndpoint } from "@/shared/endpoints";

export const getHighwayCamera = defineEndpoint(getHighwayCameraMeta);
export const getHighwayCameras = defineEndpoint(getHighwayCamerasMeta);
export const searchHighwayCameras = defineEndpoint(searchHighwayCamerasMeta);

// Re-export input types from client files
export type { HighwayCameraInput } from "./getHighwayCamera";
export type { HighwayCamerasInput } from "./getHighwayCameras";
export type { SearchHighwayCamerasInput } from "./searchHighwayCameras";
