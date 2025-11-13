import {
  fetchHighwayCameraByCameraId,
  fetchHighwayCameras,
  searchHighwayCamerasByRouteAndMilepost,
} from "./cameras.endpoints";

export const useHighwayCameras = fetchHighwayCameras.useQuery;

export const useSearchHighwayCamerasByRouteAndMilepost =
  searchHighwayCamerasByRouteAndMilepost.useQuery;

export const useHighwayCameraByCameraId = fetchHighwayCameraByCameraId.useQuery;
