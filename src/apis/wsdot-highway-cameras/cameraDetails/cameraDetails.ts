import type { EndpointDefinition } from "@/apis/types";
import * as i from "./cameraDetails.input";
import * as o from "./cameraDetails.output";

export const cameraDetailsResource = {
  name: "camera-details",
  resourceDescription:
    "Individual camera details provide specific information about a single traffic camera including location, image URL, and operational status. Data updates infrequently.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getHighwayCameraByCameraId: {
      function: "getHighwayCameraByCameraId",
      endpoint: "/getCameraAsJson?CameraID={CameraID}",
      inputSchema: i.getCameraSchema,
      outputSchema: o.cameraSchema,
      sampleParams: { CameraID: 9818 },
      endpointDescription:
        "Returns detailed information for a specific traffic camera by its unique identifier.",
    } satisfies EndpointDefinition<i.GetCameraInput, o.Camera>,
  },
};
