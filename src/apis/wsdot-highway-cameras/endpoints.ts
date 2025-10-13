import { z } from "zod";
import type { ApiDefinition, EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const wsdotHighwayCamerasApi: ApiDefinition = {
  name: "wsdot-highway-cameras",
  baseUrl:
    "http://www.wsdot.wa.gov/traffic/api/highwaycameras/highwaycamerasrest.svc",
  endpoints: [
    /**
     * Camera response
     */
    {
      function: "getHighwayCameraByCameraId",
      endpoint: "/getCameraAsJson?CameraID={CameraID}",
      inputSchema: i.getCameraSchema,
      outputSchema: o.cameraSchema,
      sampleParams: { CameraID: 9818 },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.GetCameraInput, o.Camera>,
    {
      function: "getAllHighwayCameras",
      endpoint: "/getCamerasAsJson",
      inputSchema: i.getCamerasSchema,
      outputSchema: z.array(o.cameraSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.GetCamerasInput, o.Camera[]>,
    {
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
      description: "",
    } satisfies EndpointDefinition<i.SearchCamerasInput, o.Camera[]>,
  ],
};
