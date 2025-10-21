import { z } from "zod";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./cameras.input";
import * as o from "./cameras.output";

export const camerasResource: EndpointGroup = {
  name: "cameras",
  documentation: {
    resourceDescription:
      "Camera operations provide access to traffic camera information including individual camera details and search functionality by route and milepost. Data updates infrequently and represents the current state of traffic cameras across the state.",
    businessContext: "",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
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
