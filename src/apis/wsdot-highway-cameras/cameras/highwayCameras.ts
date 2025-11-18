import type { UseQueryResult } from "@tanstack/react-query";
import { wsdotHighwayCamerasApi } from "../api";
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
  type HighwayCamerasInput,
  highwayCamerasInputSchema,
} from "./shared/cameras.input";
import { type Camera, cameraSchema } from "./shared/cameras.output";

/**
 * Metadata for the fetchHighwayCameras endpoint
 */
export const highwayCamerasMeta = {
  functionName: "fetchHighwayCameras",
  endpoint: "/getCamerasAsJson",
  inputSchema: highwayCamerasInputSchema,
  outputSchema: cameraSchema.array(),
  sampleParams: {},
  endpointDescription: "List all highway cameras statewide.",
} satisfies EndpointMeta<HighwayCamerasInput, Camera[]>;

/**
 * Fetch function for retrieving all highway cameras statewide
 */
export const fetchHighwayCameras: (
  params?: FetchFunctionParams<HighwayCamerasInput>
) => Promise<Camera[]> = createFetchFunction(
  wsdotHighwayCamerasApi,
  camerasGroup,
  highwayCamerasMeta
);

/**
 * React Query hook for retrieving all highway cameras statewide
 */
export const useHighwayCameras: (
  params?: FetchFunctionParams<HighwayCamerasInput>,
  options?: QueryHookOptions<Camera[]>
) => UseQueryResult<Camera[], Error> = createHook(
  wsdotHighwayCamerasApi,
  camerasGroup,
  highwayCamerasMeta
);
