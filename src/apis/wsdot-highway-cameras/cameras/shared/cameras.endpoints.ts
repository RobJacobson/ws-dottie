import type { EndpointGroupMeta } from "@/apis/types";
import { highwayCameraByCameraIdMeta } from "../highwayCameraByCameraId";
import { highwayCamerasMeta } from "../highwayCameras";
import { searchHighwayCamerasByRouteAndMilepostMeta } from "../searchHighwayCamerasByRouteAndMilepost";

/**
 * Endpoint group metadata for cameras endpoints
 */
export const camerasGroup: EndpointGroupMeta = {
  name: "cameras",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Traffic monitoring cameras on Washington state highways.",
    description:
      "Camera locations, image URLs, status, and metadata for real-time traffic condition visibility.",
    useCases: [
      "Display live camera feeds in traffic monitoring applications.",
      "Show road conditions and weather impacts for route planning.",
      "Provide visual traffic status in traveler information systems.",
    ],
    updateFrequency: "5m",
  },
};

/**
 * Aggregated endpoint metadata for the cameras group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const camerasEndpoints = {
  highwayCameras: highwayCamerasMeta,
  searchHighwayCamerasByRouteAndMilepost:
    searchHighwayCamerasByRouteAndMilepostMeta,
  highwayCameraByCameraId: highwayCameraByCameraIdMeta,
} as const;
