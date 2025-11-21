import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotHighwayCamerasApiMeta } from "../apiMeta";
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
 * Factory result for search highway cameras by route and milepost
 */
const searchHighwayCamerasByRouteAndMilepostFactory = createFetchAndHook<
  HighwayCamerasByRouteAndMilepostInput,
  Camera[]
>({
  api: wsdotHighwayCamerasApiMeta,
  endpoint: searchHighwayCamerasByRouteAndMilepostMeta,
  getEndpointGroup: () => require("./shared/cameras.endpoints").camerasGroup,
});

/**
 * Fetch function and React Query hook for searching cameras by route and milepost range
 */
export const {
  fetch: searchHighwayCamerasByRouteAndMilepost,
  hook: useSearchHighwayCamerasByRouteAndMilepost,
} = searchHighwayCamerasByRouteAndMilepostFactory;
