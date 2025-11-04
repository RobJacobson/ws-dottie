import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./cameras.input";
import * as o from "./cameras.output";

export const camerasGroup: EndpointGroup = {
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
      inputSchema: i.getCamerasSchema,
      outputSchema: z.array(o.cameraSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple Camera items for statewide coverage.",
    } satisfies EndpointDefinition<i.GetCamerasInput, o.Camera[]>,
    searchHighwayCamerasByRouteAndMilepost: {
      function: "searchHighwayCamerasByRouteAndMilepost",
      endpoint: "/searchCamerasAsJson",
      inputSchema: i.searchCamerasSchema,
      outputSchema: z.array(o.cameraSchema),
      sampleParams: {
        StateRoute: "I-5",
        StartingMilepost: 10,
        EndingMilepost: 20,
      },
      endpointDescription:
        "Returns multiple Camera items for specified route and milepost range.",
    } satisfies EndpointDefinition<i.SearchCamerasInput, o.Camera[]>,
    getHighwayCameraByCameraId: {
      function: "getHighwayCameraByCameraId",
      endpoint: "/getCameraAsJson?CameraID={CameraID}",
      inputSchema: i.getCameraSchema,
      outputSchema: o.cameraSchema,
      sampleParams: { CameraID: 9818 },
      endpointDescription:
        "Returns single Camera item for specific camera identifier.",
    } satisfies EndpointDefinition<i.GetCameraInput, o.Camera>,
  },
};
