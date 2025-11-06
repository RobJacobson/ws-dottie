import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import {
  type CameraInput,
  type CamerasInput,
  type CamerasSearchInput,
  cameraInputSchema,
  camerasInputSchema,
  camerasSearchInputSchema,
} from "./cameras.input";
import { type Camera, camerasOutputSchema } from "./cameras.output";

export const camerasGroup = {
  name: "cameras",
  documentation: {
    resourceDescription:
      "Each Camera item represents a traffic monitoring camera located on Washington state highways. Cameras provide real-time visual information about current traffic conditions, weather impacts, and roadway status for travelers and traffic management centers.",
    businessContext:
      "Use to monitor real-time traffic conditions by providing camera locations, images, and metadata for route planning and traffic management decisions.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getHighwayCameras: {
      function: "getHighwayCameras",
      endpoint: "/getCamerasAsJson",
      inputSchema: camerasInputSchema,
      outputSchema: z.array(camerasOutputSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple Camera items for statewide coverage.",
    } satisfies EndpointDefinition<CamerasInput, Camera[]>,
    searchHighwayCamerasByRouteAndMilepost: {
      function: "searchHighwayCamerasByRouteAndMilepost",
      endpoint: "/searchCamerasAsJson",
      inputSchema: camerasSearchInputSchema,
      outputSchema: z.array(camerasOutputSchema),
      sampleParams: {
        StateRoute: "I-5",
        StartingMilepost: 10,
        EndingMilepost: 20,
      },
      endpointDescription:
        "Returns multiple Camera items for specified route and milepost range.",
    } satisfies EndpointDefinition<CamerasSearchInput, Camera[]>,
    getHighwayCameraByCameraId: {
      function: "getHighwayCameraByCameraId",
      endpoint: "/getCameraAsJson?CameraID={CameraID}",
      inputSchema: cameraInputSchema,
      outputSchema: camerasOutputSchema,
      sampleParams: { CameraID: 9818 },
      endpointDescription:
        "Returns single Camera item for specific camera identifier.",
    } satisfies EndpointDefinition<CameraInput, Camera>,
  },
} satisfies EndpointGroup;
