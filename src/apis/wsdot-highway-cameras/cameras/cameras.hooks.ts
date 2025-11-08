import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsdotHighwayCamerasApi } from "../apiDefinition";
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
