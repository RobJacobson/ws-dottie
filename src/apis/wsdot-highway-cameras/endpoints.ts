import { createApiDefinition } from "../utils";
import {
  getCameraInputSchema,
  getCamerasInputSchema,
  searchCamerasInputSchema,
} from "./original/inputSchemas.original";
import {
  cameraSchema,
  camerasListSchema,
} from "./original/outputSchemas.original";

export const wsdotHighwayCamerasApi = createApiDefinition(
  "wsdot-highway-cameras",
  [
    {
      function: "getHighwayCamera",
      endpoint:
        "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCameraAsJson?CameraID={CameraID}",
      inputSchema: getCameraInputSchema,
      outputSchema: cameraSchema,
      sampleParams: { CameraID: 9818 },
      cacheStrategy: "STATIC",
    },
    {
      function: "getHighwayCameras",
      endpoint:
        "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCamerasAsJson",
      inputSchema: getCamerasInputSchema,
      outputSchema: camerasListSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    },
    {
      function: "searchHighwayCameras",
      endpoint:
        "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/SearchCamerasAsJson",
      inputSchema: searchCamerasInputSchema,
      outputSchema: camerasListSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    },
  ]
);
