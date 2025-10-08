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
      function: "getHighwayCamera",
      endpoint: "/getCameraAsJson?CameraID={CameraID}",
      inputSchema: i.getCameraSchema,
      outputSchema: o.cameraSchema,
      sampleParams: { CameraID: 9818 },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<i.GetCameraInput, o.Camera>,
    {
      function: "getHighwayCameras",
      endpoint: "/getCamerasAsJson",
      inputSchema: i.getCamerasSchema,
      outputSchema: z.array(o.cameraSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<i.GetCamerasInput, o.Camera[]>,
    {
      function: "searchHighwayCameras",
      endpoint: "/searchCamerasAsJson",
      inputSchema: i.searchCamerasSchema,
      outputSchema: z.array(o.cameraSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<i.SearchCamerasInput, o.Camera[]>,
  ],
};
