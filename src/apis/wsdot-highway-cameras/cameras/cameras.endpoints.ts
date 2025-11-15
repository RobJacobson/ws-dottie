import { apis } from "@/apis/shared/apis";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import {
  highwayCameraByCameraIdInputSchema,
  highwayCamerasByRouteAndMilepostInputSchema,
  highwayCamerasInputSchema,
} from "./cameras.input";
import { cameraSchema } from "./cameras.output";

export const camerasGroup = defineEndpointGroup({
  name: "cameras",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each Camera item represents a traffic monitoring camera located on Washington state highways. Cameras provide real-time visual information about current traffic conditions, weather impacts, and roadway status for travelers and traffic management centers.",
    businessContext:
      "Use to monitor real-time traffic conditions by providing camera locations, images, and metadata for route planning and traffic management decisions.",
  },
});

export const fetchHighwayCameras = defineEndpoint({
  api: apis.wsdotBorderCrossings,
  group: camerasGroup,
  functionName: "fetchHighwayCameras",
  endpoint: "/getCamerasAsJson",
  inputSchema: highwayCamerasInputSchema,
  outputSchema: cameraSchema.array(),
  sampleParams: {},
  endpointDescription: "Returns multiple Camera items for statewide coverage.",
});

export const searchHighwayCamerasByRouteAndMilepost = defineEndpoint({
  api: apis.wsdotBorderCrossings,
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
  endpointDescription:
    "Returns multiple Camera items for specified route and milepost range.",
});

export const fetchHighwayCameraByCameraId = defineEndpoint({
  api: apis.wsdotBorderCrossings,
  group: camerasGroup,
  functionName: "fetchHighwayCameraByCameraId",
  endpoint: "/getCameraAsJson?CameraID={CameraID}",
  inputSchema: highwayCameraByCameraIdInputSchema,
  outputSchema: cameraSchema,
  sampleParams: { CameraID: 9818 },
  endpointDescription:
    "Returns single Camera item for specific camera identifier.",
});
