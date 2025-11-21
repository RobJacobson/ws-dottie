import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotHighwayCamerasApiMeta } from "../apiMeta";
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
 * Factory result for highway camera by camera ID
 */
const highwayCameraByCameraIdFactory = createFetchAndHook<
  HighwayCameraByCameraIdInput,
  Camera
>({
  api: wsdotHighwayCamerasApiMeta,
  endpoint: highwayCameraByCameraIdMeta,
  getEndpointGroup: () => require("./shared/cameras.endpoints").camerasGroup,
});

/**
 * Fetch function and React Query hook for retrieving camera details by camera ID
 */
export const {
  fetch: fetchHighwayCameraByCameraId,
  hook: useHighwayCameraByCameraId,
} = highwayCameraByCameraIdFactory;
