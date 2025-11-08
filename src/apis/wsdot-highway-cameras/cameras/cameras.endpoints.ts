import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod";
import {
  type HighwayCameraByCameraIdInput,
  type HighwayCamerasByRouteAndMilepostInput,
  type HighwayCamerasInput,
  highwayCameraByCameraIdInputSchema,
  highwayCamerasByRouteAndMilepostInputSchema,
  highwayCamerasInputSchema,
} from "./cameras.input";
import { type Camera, cameraSchema } from "./cameras.output";

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
    fetchHighwayCameras: {
      endpoint: "/getCamerasAsJson",
      inputSchema: highwayCamerasInputSchema,
      outputSchema: z.array(cameraSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple Camera items for statewide coverage.",
    } satisfies EndpointDefinition<HighwayCamerasInput, Camera[]>,
    searchHighwayCamerasByRouteAndMilepost: {
      endpoint: "/searchCamerasAsJson",
      inputSchema: highwayCamerasByRouteAndMilepostInputSchema,
      outputSchema: z.array(cameraSchema),
      sampleParams: {
        StateRoute: "I-5",
        StartingMilepost: 10,
        EndingMilepost: 20,
      },
      endpointDescription:
        "Returns multiple Camera items for specified route and milepost range.",
    } satisfies EndpointDefinition<
      HighwayCamerasByRouteAndMilepostInput,
      Camera[]
    >,
    fetchHighwayCameraByCameraId: {
      endpoint: "/getCameraAsJson?CameraID={CameraID}",
      inputSchema: highwayCameraByCameraIdInputSchema,
      outputSchema: cameraSchema,
      sampleParams: { CameraID: 9818 },
      endpointDescription:
        "Returns single Camera item for specific camera identifier.",
    } satisfies EndpointDefinition<HighwayCameraByCameraIdInput, Camera>,
  },
} satisfies EndpointGroup;
