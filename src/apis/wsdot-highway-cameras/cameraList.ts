import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Camera list operations provide access to traffic camera information including search functionality by route and milepost. Data updates infrequently and represents the current state of traffic cameras across the state.";

export const cameraListResource = {
  name: "camera-list",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    all: {
      function: "getHighwayCameras",
      endpoint: "/getCamerasAsJson",
      inputSchema: i.getCamerasSchema,
      outputSchema: z.array(o.cameraSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns a list of all traffic cameras. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.GetCamerasInput, o.Camera[]>,
    search: {
      function: "searchHighwayCamerasByRouteAndMilepost",
      endpoint: "/searchCamerasAsJson",
      inputSchema: i.searchCamerasSchema,
      outputSchema: z.array(o.cameraSchema),
      sampleParams: {
        StateRoute: "I-5",
        StartingMilepost: 10,
        EndingMilepost: 20,
      },
      cacheStrategy: "STATIC",
      description: `Search for traffic cameras by route and milepost range. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.SearchCamerasInput, o.Camera[]>,
  },
};
