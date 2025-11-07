import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsdotHighwayCamerasApi } from "../apiDefinition";
import { camerasGroup } from "./cameras.endpoints";
import * as fetchFunctions from "./cameras.fetch";
import type {
  HighwayCameraByCameraIdInput,
  HighwayCamerasByRouteAndMilepostInput,
  HighwayCamerasInput,
} from "./cameras.input";
import type { Camera } from "./cameras.output";

const hooks = createEndpointGroupHooks(
  wsdotHighwayCamerasApi,
  camerasGroup,
  fetchFunctions
);

export const useHighwayCameras: (
  params?: HighwayCamerasInput,
  options?: QueryHookOptions<Camera[]>
) => UseQueryResult<Camera[], Error> = hooks.useHighwayCameras;

export const useSearchHighwayCamerasByRouteAndMilepost: (
  params?: HighwayCamerasByRouteAndMilepostInput,
  options?: QueryHookOptions<Camera[]>
) => UseQueryResult<Camera[], Error> =
  hooks.useSearchHighwayCamerasByRouteAndMilepost;

export const useHighwayCameraByCameraId: (
  params?: HighwayCameraByCameraIdInput,
  options?: QueryHookOptions<Camera>
) => UseQueryResult<Camera, Error> = hooks.useHighwayCameraByCameraId;
