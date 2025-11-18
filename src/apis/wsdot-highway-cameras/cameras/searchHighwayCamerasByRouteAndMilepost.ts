import type { UseQueryResult } from "@tanstack/react-query";
import { apis } from "@/apis/shared/apis";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
import { camerasGroup } from "./shared/cameras.endpoints";
import {
  type HighwayCamerasByRouteAndMilepostInput,
  highwayCamerasByRouteAndMilepostInputSchema,
} from "./shared/cameras.input";
import { type Camera, cameraSchema } from "./shared/cameras.output";

/**
 * Metadata for the searchHighwayCamerasByRouteAndMilepost endpoint
 */
export const searchHighwayCamerasByRouteAndMilepostMeta = {
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
} satisfies EndpointMeta<HighwayCamerasByRouteAndMilepostInput, Camera[]>;

/**
 * Fetch function for searching cameras by route and milepost range
 */
export const searchHighwayCamerasByRouteAndMilepost: (
  params?: FetchFunctionParams<HighwayCamerasByRouteAndMilepostInput>
) => Promise<Camera[]> = createFetchFunction(
  apis.wsdotHighwayCameras,
  camerasGroup,
  searchHighwayCamerasByRouteAndMilepostMeta
);

/**
 * React Query hook for searching cameras by route and milepost range
 */
export const useSearchHighwayCamerasByRouteAndMilepost: (
  params?: FetchFunctionParams<HighwayCamerasByRouteAndMilepostInput>,
  options?: QueryHookOptions<Camera[]>
) => UseQueryResult<Camera[], Error> = createHook(
  apis.wsdotHighwayCameras,
  camerasGroup,
  searchHighwayCamerasByRouteAndMilepostMeta
);
