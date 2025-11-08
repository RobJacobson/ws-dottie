import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsdotHighwayCamerasApi } from "../apiDefinition";
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
