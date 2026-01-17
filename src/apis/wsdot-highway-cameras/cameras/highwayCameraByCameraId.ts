import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotHighwayCamerasApiMeta } from "../apiMeta";
import {
  type HighwayCameraByCameraIdInput,
  highwayCameraByCameraIdInputSchema,
} from "./shared/cameras.input";
import { type Camera, cameraSchema } from "./shared/cameras.output";

/**
 * Metadata for the fetchHighwayCameraByCameraId endpoint
 */
export const highwayCameraByCameraIdMeta = {
  functionName: "fetchHighwayCameraByCameraId",
  endpoint: "/getCameraAsJson?CameraID={CameraID}",
  inputSchema: highwayCameraByCameraIdInputSchema,
  outputSchema: cameraSchema,
  sampleParams: { CameraID: 9818 },
  endpointDescription: "Get camera details by camera ID.",
  toolDescription: {
    purpose:
      "Get complete details for a single highway camera by its unique ID.",
    useWhen: [
      "getting full details for a specific camera",
      "enriching camera data from bulk queries",
      "displaying individual camera detail pages",
      "minimizing payload when you only need one camera",
    ],
    avoidWhen: [
      "you need multiple cameras (prefer bulk endpoints like fetchHighwayCameras or searchHighwayCamerasByRouteAndMilepost)",
      "you don't have a CameraID (prefer bulk endpoints to discover IDs)",
    ],
    inputs: [
      "CameraID: numeric ID from bulk camera queries like fetchHighwayCameras → CameraID",
    ],
    returns: "object — complete details for one highway camera",
    outputHighlights: [
      "IDs: CameraID, links to related location data",
      "Location: CameraLocation (route, milepost, direction), DisplayLatitude/DisplayLongitude (precise coordinates)",
      "Image: ImageURL (live camera feed), ImageWidth/ImageHeight (dimensions for display)",
      "Status: IsActive (true = operational and updating)",
      "Metadata: Title (display name), Description (purpose/location context)",
      "Ownership: CameraOwner (agency), OwnerURL (agency website), Region (administrative area)",
      "Display: SortOrder (for location-based sorting in interfaces)",
      "Complete details: includes all available camera information and metadata",
    ],
    chaining: [
      "fetchHighwayCameras → extract CameraID → call fetchHighwayCameraByCameraId with { CameraID: ... }",
      "searchHighwayCamerasByRouteAndMilepost → extract CameraID → call fetchHighwayCameraByCameraId with { CameraID: ... }",
    ],
  },
} satisfies EndpointMeta<HighwayCameraByCameraIdInput, Camera>;

/**
 * Factory result for highway camera by camera ID
 */
const highwayCameraByCameraIdFactory = createFetchAndHook<
  HighwayCameraByCameraIdInput,
  Camera
>({
  api: wsdotHighwayCamerasApiMeta,
  endpoint: highwayCameraByCameraIdMeta,
  getEndpointGroup: () => require("./shared/cameras.endpoints").camerasGroup,
});

/**
 * Fetch function and React Query hook for retrieving camera details by camera ID
 */
export const {
  fetch: fetchHighwayCameraByCameraId,
  hook: useHighwayCameraByCameraId,
} = highwayCameraByCameraIdFactory;
