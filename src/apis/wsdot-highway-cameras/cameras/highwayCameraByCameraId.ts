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
} from "@/shared/factories/metaEndpointFactory";
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
export const fetchHighwayCameraByCameraId: (
  params?: FetchFunctionParams<HighwayCameraByCameraIdInput>
) => Promise<Camera> = createFetchFunction(
  apis.wsdotHighwayCameras,
  camerasGroup,
  highwayCameraByCameraIdMeta
);

/**
 * React Query hook for retrieving camera details by camera ID
 */
export const useHighwayCameraByCameraId: (
  params?: FetchFunctionParams<HighwayCameraByCameraIdInput>,
  options?: QueryHookOptions<Camera>
) => UseQueryResult<Camera, Error> = createHook(
  apis.wsdotHighwayCameras,
  camerasGroup,
  highwayCameraByCameraIdMeta
);
