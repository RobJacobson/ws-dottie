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
  type HighwayCameraByCameraIdInput,
  highwayCameraByCameraIdInputSchema,
} from "./shared/cameras.input";
import { type Camera, cameraSchema } from "./shared/cameras.output";

/**
 * Metadata for the fetchHighwayCameraByCameraId endpoint
 */
export const highwayCameraByCameraIdMeta = {
  functionName: "fetchHighwayCameraByCameraId",
  endpoint: "/getCameraAsJson?CameraID={CameraID}",
  inputSchema: highwayCameraByCameraIdInputSchema,
  outputSchema: cameraSchema,
  sampleParams: { CameraID: 9818 },
  endpointDescription: "Get camera details by camera ID.",
} satisfies EndpointMeta<HighwayCameraByCameraIdInput, Camera>;

/**
 * Fetch function for retrieving camera details by camera ID
 */
export const fetchHighwayCameraByCameraId: FetchFactory<
  HighwayCameraByCameraIdInput,
  Camera
> = createFetchFunction({
  api: wsdotHighwayCamerasApiMeta,
  endpoint: highwayCameraByCameraIdMeta,
});

/**
 * React Query hook for retrieving camera details by camera ID
 */
export const useHighwayCameraByCameraId: HookFactory<
  HighwayCameraByCameraIdInput,
  Camera
> = createHook({
  apiName: wsdotHighwayCamerasApiMeta.name,
  endpointName: highwayCameraByCameraIdMeta.functionName,
  fetchFn: fetchHighwayCameraByCameraId,
  cacheStrategy: camerasGroup.cacheStrategy,
});
