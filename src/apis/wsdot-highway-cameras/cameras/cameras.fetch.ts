import { wsdotHighwayCamerasApi } from "@/apis/wsdot-highway-cameras/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
import { camerasGroup } from "./cameras.endpoints";
import type {
  HighwayCameraByCameraIdInput,
  HighwayCamerasByRouteAndMilepostInput,
  HighwayCamerasInput,
} from "./cameras.input";
import type { Camera } from "./cameras.output";

const fetchFunctions = createFetchFunctions(
  wsdotHighwayCamerasApi,
  camerasGroup
);

export const fetchHighwayCameras: (
  params?: FetchFunctionParams<HighwayCamerasInput>
) => Promise<Camera[]> = fetchFunctions.fetchHighwayCameras;

export const searchHighwayCamerasByRouteAndMilepost: (
  params?: FetchFunctionParams<HighwayCamerasByRouteAndMilepostInput>
) => Promise<Camera[]> = fetchFunctions.searchHighwayCamerasByRouteAndMilepost;

export const fetchHighwayCameraByCameraId: (
  params?: FetchFunctionParams<HighwayCameraByCameraIdInput>
) => Promise<Camera> = fetchFunctions.fetchHighwayCameraByCameraId;
