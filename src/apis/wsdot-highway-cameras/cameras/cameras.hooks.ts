import type { UseQueryResult } from "@tanstack/react-query";
import { createHooks, type FetchFunctionParams, type QueryHookOptions } from "@/shared/factories";
import { wsdotHighwayCamerasApi } from "@/apis/wsdot-highway-cameras/apiDefinition";
import { camerasGroup } from "./cameras.endpoints";
import * as fetchFunctions from "./cameras.fetch";
import type {
  HighwayCameraByCameraIdInput,
  HighwayCamerasByRouteAndMilepostInput,
  HighwayCamerasInput,
} from "./cameras.input";
import type { Camera } from "./cameras.output";

const hooks = createHooks(wsdotHighwayCamerasApi, camerasGroup, fetchFunctions);

export const useHighwayCameras: (
  params?: FetchFunctionParams<HighwayCamerasInput>,
  options?: QueryHookOptions<Camera[]>
) => UseQueryResult<Camera[], Error> = hooks.useHighwayCameras;

export const useSearchHighwayCamerasByRouteAndMilepost: (
  params?: FetchFunctionParams<HighwayCamerasByRouteAndMilepostInput>,
  options?: QueryHookOptions<Camera[]>
) => UseQueryResult<Camera[], Error> =
  hooks.useSearchHighwayCamerasByRouteAndMilepost;

export const useHighwayCameraByCameraId: (
  params?: FetchFunctionParams<HighwayCameraByCameraIdInput>,
  options?: QueryHookOptions<Camera>
) => UseQueryResult<Camera, Error> = hooks.useHighwayCameraByCameraId;
