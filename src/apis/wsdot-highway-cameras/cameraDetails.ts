import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Individual camera details provide specific information about a single traffic camera including location, image URL, and operational status. Data updates infrequently.";

export const cameraDetailsResource = {
  name: "camera-details",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    byId: {
      function: "getHighwayCameraByCameraId",
      endpoint: "/getCameraAsJson?CameraID={CameraID}",
      inputSchema: i.getCameraSchema,
      outputSchema: o.cameraSchema,
      sampleParams: { CameraID: 9818 },
      cacheStrategy: "STATIC",
      description: `Returns detailed information for a specific traffic camera by its unique identifier. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.GetCameraInput, o.Camera>,
  },
};
