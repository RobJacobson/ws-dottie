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
export const searchHighwayCamerasByRouteAndMilepost: FetchFactory<
  HighwayCamerasByRouteAndMilepostInput,
  Camera[]
> = createFetchFunction({
  api: wsdotHighwayCamerasApiMeta,
  endpoint: searchHighwayCamerasByRouteAndMilepostMeta,
});

/**
 * React Query hook for searching cameras by route and milepost range
 */
export const useSearchHighwayCamerasByRouteAndMilepost: HookFactory<
  HighwayCamerasByRouteAndMilepostInput,
  Camera[]
> = createHook({
  apiName: wsdotHighwayCamerasApiMeta.name,
  endpointName: searchHighwayCamerasByRouteAndMilepostMeta.functionName,
  fetchFn: searchHighwayCamerasByRouteAndMilepost,
  cacheStrategy: camerasGroup.cacheStrategy,
});
