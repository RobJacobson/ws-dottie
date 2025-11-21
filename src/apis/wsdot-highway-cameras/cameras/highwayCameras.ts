import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotHighwayCamerasApiMeta } from "../apiMeta";
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
 * Factory result for highway cameras
 */
const highwayCamerasFactory = createFetchAndHook<HighwayCamerasInput, Camera[]>(
  {
    api: wsdotHighwayCamerasApiMeta,
    endpoint: highwayCamerasMeta,
    getEndpointGroup: () => require("./shared/cameras.endpoints").camerasGroup,
  }
);

/**
 * Fetch function and React Query hook for retrieving all highway cameras statewide
 */
export const { fetch: fetchHighwayCameras, hook: useHighwayCameras } =
  highwayCamerasFactory;
