import { createApiDefinition } from "../utils";
import { input, output } from "./schemas";

export const wsdotHighwayCamerasApi = createApiDefinition(
  "wsdot-highway-cameras",
  [
    {
      function: "getHighwayCamera",
      endpoint:
        "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCameraAsJson?CameraID={CameraID}",
      inputSchema: input.getCameraSchema,
      outputSchema: output.cameraSchema,
      sampleParams: { CameraID: 9818 },
      cacheStrategy: "STATIC",
    },
    {
      function: "getHighwayCameras",
      endpoint:
        "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCamerasAsJson",
      inputSchema: input.getCamerasSchema,
      outputSchema: output.camerasListSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    },
    {
      function: "searchHighwayCameras",
      endpoint:
        "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/SearchCamerasAsJson",
      inputSchema: input.searchCamerasSchema,
      outputSchema: output.camerasListSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    },
  ]
);
