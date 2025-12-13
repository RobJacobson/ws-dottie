import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotHighwayCamerasApiMeta } from "../apiMeta";
import {
  type HighwayCamerasInput,
  highwayCamerasInputSchema,
} from "./shared/cameras.input";
import { type Camera, cameraSchema } from "./shared/cameras.output";

/**
 * Metadata for the fetchHighwayCameras endpoint
 */
export const highwayCamerasMeta = {
  functionName: "fetchHighwayCameras",
  endpoint: "/getCamerasAsJson",
  inputSchema: highwayCamerasInputSchema,
  outputSchema: cameraSchema.array(),
  sampleParams: {},
  endpointDescription: "List all highway cameras statewide.",
  toolDescription: {
    purpose: "List all highway traffic cameras across Washington State.",
    useWhen: [
      "building comprehensive camera directory applications",
      "one-time bulk export of all camera locations",
      "discovering CameraID values for targeted queries",
    ],
    avoidWhen: [
      "you only need cameras on specific routes (prefer searchHighwayCamerasByRouteAndMilepost)",
      "you only need one specific camera (prefer fetchHighwayCameraByCameraId)",
      "building user-facing camera picker interfaces (prefer filtered endpoints)",
    ],
    inputs: [],
    returns: "array — one item per highway camera",
    outputHighlights: [
      "IDs: CameraID (unique numeric identifier)",
      "Location: CameraLocation (route, milepost, direction), DisplayLatitude/DisplayLongitude",
      "Image: ImageURL (camera feed URL), ImageWidth/ImageHeight (dimensions)",
      "Status: IsActive (true = operational)",
      "Metadata: Title (display name), Description (purpose/location info)",
      "Ownership: CameraOwner, OwnerURL, Region (administrative area)",
      "Display: SortOrder (for location-based sorting)",
      "Large payload: ~500+ cameras with detailed location and metadata",
    ],
    chaining: [
      "fetchHighwayCameras → extract CameraID → call fetchHighwayCameraByCameraId with { CameraID: ... }",
      "fetchHighwayCameras → extract CameraLocation.RoadName → call searchHighwayCamerasByRouteAndMilepost with { StateRoute: ... }",
    ],
  },
} satisfies EndpointMeta<HighwayCamerasInput, Camera[]>;

/**
 * Factory result for highway cameras
 */
const highwayCamerasFactory = createFetchAndHook<HighwayCamerasInput, Camera[]>(
  {
    api: wsdotHighwayCamerasApiMeta,
    endpoint: highwayCamerasMeta,
    getEndpointGroup: () => require("./shared/cameras.endpoints").camerasGroup,
  }
);

/**
 * Fetch function and React Query hook for retrieving all highway cameras statewide
 */
export const { fetch: fetchHighwayCameras, hook: useHighwayCameras } =
  highwayCamerasFactory;
