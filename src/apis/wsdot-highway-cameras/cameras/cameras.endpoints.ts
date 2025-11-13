import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsdotHighwayCamerasApi } from "../apiDefinition";
import {
  highwayCameraByCameraIdInputSchema,
  highwayCamerasByRouteAndMilepostInputSchema,
  highwayCamerasInputSchema,
} from "./cameras.input";
import { cameraSchema } from "./cameras.output";

const group = defineEndpointGroup({
  api: wsdotHighwayCamerasApi,
  name: "cameras",
  documentation: {
    resourceDescription:
      "Each Camera item represents a traffic monitoring camera located on Washington state highways. Cameras provide real-time visual information about current traffic conditions, weather impacts, and roadway status for travelers and traffic management centers.",
    businessContext:
      "Use to monitor real-time traffic conditions by providing camera locations, images, and metadata for route planning and traffic management decisions.",
  },
  cacheStrategy: "STATIC",
});

export const fetchHighwayCameras = defineEndpoint({
  group,
  functionName: "fetchHighwayCameras",
  definition: {
    endpoint: "/getCamerasAsJson",
    inputSchema: highwayCamerasInputSchema,
    outputSchema: cameraSchema.array(),
    sampleParams: {},
    endpointDescription:
      "Returns multiple Camera items for statewide coverage.",
  },
});

export const searchHighwayCamerasByRouteAndMilepost = defineEndpoint({
  group,
  functionName: "searchHighwayCamerasByRouteAndMilepost",
  definition: {
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
  },
});

export const fetchHighwayCameraByCameraId = defineEndpoint({
  group,
  functionName: "fetchHighwayCameraByCameraId",
  definition: {
    endpoint: "/getCameraAsJson?CameraID={CameraID}",
    inputSchema: highwayCameraByCameraIdInputSchema,
    outputSchema: cameraSchema,
    sampleParams: { CameraID: 9818 },
    endpointDescription:
      "Returns single Camera item for specific camera identifier.",
  },
});

export const camerasGroup = group.descriptor;
