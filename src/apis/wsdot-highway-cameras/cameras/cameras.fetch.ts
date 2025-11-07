import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsdotHighwayCamerasApi } from "../apiDefinition";
import { camerasGroup } from "./cameras.endpoints";
import type {
  HighwayCameraByCameraIdInput,
  HighwayCamerasByRouteAndMilepostInput,
  HighwayCamerasInput,
} from "./cameras.input";
import type { Camera } from "./cameras.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
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
