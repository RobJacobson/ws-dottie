import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsdotHighwayCamerasApiMeta } from "../apiMeta";
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
export const fetchHighwayCameras: FetchFactory<HighwayCamerasInput, Camera[]> =
  createFetchFunction({
    api: wsdotHighwayCamerasApiMeta,
    endpoint: highwayCamerasMeta,
  });

/**
 * React Query hook for retrieving all highway cameras statewide
 */
export const useHighwayCameras: HookFactory<HighwayCamerasInput, Camera[]> =
  createHook({
    apiName: wsdotHighwayCamerasApiMeta.name,
    endpointName: highwayCamerasMeta.functionName,
    fetchFn: fetchHighwayCameras,
    cacheStrategy: camerasGroup.cacheStrategy,
  });
