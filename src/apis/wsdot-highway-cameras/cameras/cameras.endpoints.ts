import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import {
  highwayCameraByCameraIdInputSchema,
  highwayCamerasByRouteAndMilepostInputSchema,
  highwayCamerasInputSchema,
} from "./cameras.input";
import { cameraSchema } from "./cameras.output";

export const camerasGroup: EndpointGroup = {
  name: "cameras",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Traffic monitoring cameras on Washington state highways.",
    description:
      "Camera locations, image URLs, status, and metadata for real-time traffic condition visibility.",
    useCases: [
      "Display live camera feeds in traffic monitoring applications.",
      "Show road conditions and weather impacts for route planning.",
      "Provide visual traffic status in traveler information systems.",
    ],
    updateFrequency: "5m",
  },
};

export const fetchHighwayCameras = createEndpoint({
  api: apis.wsdotHighwayCameras,
  group: camerasGroup,
  functionName: "fetchHighwayCameras",
  endpoint: "/getCamerasAsJson",
  inputSchema: highwayCamerasInputSchema,
  outputSchema: cameraSchema.array(),
  sampleParams: {},
  endpointDescription: "List all highway cameras statewide.",
});

export const searchHighwayCamerasByRouteAndMilepost = createEndpoint({
  api: apis.wsdotHighwayCameras,
  group: camerasGroup,
  functionName: "searchHighwayCamerasByRouteAndMilepost",
  endpoint: "/searchCamerasAsJson",
  inputSchema: highwayCamerasByRouteAndMilepostInputSchema,
  outputSchema: cameraSchema.array(),
  sampleParams: {
    StateRoute: "I-5",
    StartingMilepost: 10,
    EndingMilepost: 20,
  },
  endpointDescription: "Search cameras by route and milepost range.",
});

export const fetchHighwayCameraByCameraId = createEndpoint({
  api: apis.wsdotHighwayCameras,
  group: camerasGroup,
  functionName: "fetchHighwayCameraByCameraId",
  endpoint: "/getCameraAsJson?CameraID={CameraID}",
  inputSchema: highwayCameraByCameraIdInputSchema,
  outputSchema: cameraSchema,
  sampleParams: { CameraID: 9818 },
  endpointDescription: "Get camera details by camera ID.",
});
