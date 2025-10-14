import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const cameraListResource = {
  name: "camera-list",
  resourceDescription:
    "Camera list operations provide access to traffic camera information including search functionality by route and milepost. Data updates infrequently and represents the current state of traffic cameras across the state.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getHighwayCameras: {
      function: "getHighwayCameras",
      endpoint: "/getCamerasAsJson",
      inputSchema: i.getCamerasSchema,
      outputSchema: z.array(o.cameraSchema),
      sampleParams: {},
      endpointDescription: "Returns a list of all traffic cameras.",
    } satisfies EndpointDefinition<i.GetCamerasInput, o.Camera[]>,
    searchHighwayCamerasByRouteAndMilepost: {
      function: "searchHighwayCamerasByRouteAndMilepost",
      endpoint: "/searchCamerasAsJson",
      inputSchema: i.searchCamerasSchema,
      outputSchema: z.array(o.cameraSchema),
      sampleParams: {
        StateRoute: "I-5",
        StartingMilepost: 10,
        EndingMilepost: 20,
      },
      endpointDescription:
        "Search for traffic cameras by route and milepost range.",
    } satisfies EndpointDefinition<i.SearchCamerasInput, o.Camera[]>,
  },
};
