import type { ApiDefinition } from "@/apis/types";
import { input, output } from "./schemas";

export const wsdotHighwayCamerasApi: ApiDefinition = {
  name: "wsdot-highway-cameras",
  baseUrl:
    "http://www.wsdot.wa.gov/traffic/api/highwaycameras/highwaycamerasrest.svc",
  endpoints: [
    {
      function: "getHighwayCamera",
      endpoint: "/getCameraAsJson?CameraID={CameraID}",
      inputSchema: input.getCameraSchema,
      outputSchema: output.cameraSchema,
      sampleParams: { CameraID: 9818 },
      cacheStrategy: "STATIC",
    },
    {
      function: "getHighwayCameras",
      endpoint: "/getCamerasAsJson",
      inputSchema: input.getCamerasSchema,
      outputSchema: output.camerasListSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    },
    {
      function: "searchHighwayCameras",
      endpoint: "/searchCamerasAsJson",
      inputSchema: input.searchCamerasSchema,
      outputSchema: output.camerasListSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    },
  ],
};
