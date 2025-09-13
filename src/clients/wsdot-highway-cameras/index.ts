export * from "./getHighwayCamera";
export * from "./getHighwayCameras";
export * from "./searchHighwayCameras";

// Re-export output types from schemas
export type {
  Camera,
  Cameras,
} from "@/schemas/wsdot-highway-cameras";
