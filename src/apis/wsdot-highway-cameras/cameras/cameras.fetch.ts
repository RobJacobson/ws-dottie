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

export const fetchHighwayCameras = fetchFunctions.fetchHighwayCameras as (
  params?: FetchFunctionParams<HighwayCamerasInput>
) => Promise<Camera[]>;

export const searchHighwayCamerasByRouteAndMilepost =
  fetchFunctions.searchHighwayCamerasByRouteAndMilepost as (
    params?: FetchFunctionParams<HighwayCamerasByRouteAndMilepostInput>
  ) => Promise<Camera[]>;

export const fetchHighwayCameraByCameraId =
  fetchFunctions.fetchHighwayCameraByCameraId as (
    params?: FetchFunctionParams<HighwayCameraByCameraIdInput>
  ) => Promise<Camera>;
