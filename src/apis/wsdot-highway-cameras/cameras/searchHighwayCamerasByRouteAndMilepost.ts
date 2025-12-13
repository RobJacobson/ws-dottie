import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotHighwayCamerasApiMeta } from "../apiMeta";
import {
  type HighwayCamerasByRouteAndMilepostInput,
  highwayCamerasByRouteAndMilepostInputSchema,
} from "./shared/cameras.input";
import { type Camera, cameraSchema } from "./shared/cameras.output";

/**
 * Metadata for the searchHighwayCamerasByRouteAndMilepost endpoint
 */
export const searchHighwayCamerasByRouteAndMilepostMeta = {
  functionName: "searchHighwayCamerasByRouteAndMilepost",
  endpoint: "/searchCamerasAsJson",
  inputSchema: highwayCamerasByRouteAndMilepostInputSchema,
  outputSchema: cameraSchema.array(),
  sampleParams: {
    StateRoute: "I-5",
    StartingMilepost: 10,
    EndingMilepost: 20,
  },
  endpointDescription: "Search cameras by route and milepost range.",
  toolDescription: {
    purpose:
      "Search highway cameras using flexible filters for route, region, and milepost range.",
    useWhen: [
      "finding cameras along specific highways or routes",
      "getting cameras within milepost ranges on highways",
      "building route-specific camera displays",
      "filtering cameras by geographic regions",
    ],
    avoidWhen: [
      "you need all statewide cameras (prefer fetchHighwayCameras)",
      "you only need one specific camera (prefer fetchHighwayCameraByCameraId)",
    ],
    inputs: [
      "StateRoute: like 'I-5', 'I-90'",
      "Region: optional region filter",
      "StartingMilepost: optional milepost range",
      "EndingMilepost: optional milepost range",
    ],
    returns: "array — one item per camera matching search criteria",
    outputHighlights: [
      "IDs: CameraID (unique numeric identifier)",
      "Location: CameraLocation (route, milepost, direction), DisplayLatitude/DisplayLongitude",
      "Image: ImageURL (camera feed URL), ImageWidth/ImageHeight (dimensions)",
      "Status: IsActive (true = operational)",
      "Metadata: Title (display name), Description (purpose/location info)",
      "Ownership: CameraOwner, OwnerURL, Region (administrative area)",
      "Display: SortOrder (for location-based sorting)",
      "Filtered results: smaller payload than statewide fetchHighwayCameras",
    ],
    chaining: [
      "searchHighwayCamerasByRouteAndMilepost → extract CameraID → call fetchHighwayCameraByCameraId with { CameraID: ... }",
      "fetchHighwayCameras → extract CameraLocation.RoadName → call searchHighwayCamerasByRouteAndMilepost with { StateRoute: ... }",
    ],
  },
} satisfies EndpointMeta<HighwayCamerasByRouteAndMilepostInput, Camera[]>;

/**
 * Factory result for search highway cameras by route and milepost
 */
const searchHighwayCamerasByRouteAndMilepostFactory = createFetchAndHook<
  HighwayCamerasByRouteAndMilepostInput,
  Camera[]
>({
  api: wsdotHighwayCamerasApiMeta,
  endpoint: searchHighwayCamerasByRouteAndMilepostMeta,
  getEndpointGroup: () => require("./shared/cameras.endpoints").camerasGroup,
});

/**
 * Fetch function and React Query hook for searching cameras by route and milepost range
 */
export const {
  fetch: searchHighwayCamerasByRouteAndMilepost,
  hook: useSearchHighwayCamerasByRouteAndMilepost,
} = searchHighwayCamerasByRouteAndMilepostFactory;
