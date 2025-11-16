import * as endpoints from "./cameras.endpoints";

export const fetchHighwayCameras = endpoints.fetchHighwayCameras.fetch;

export const searchHighwayCamerasByRouteAndMilepost =
  endpoints.searchHighwayCamerasByRouteAndMilepost.fetch;

export const fetchHighwayCameraByCameraId =
  endpoints.fetchHighwayCameraByCameraId.fetch;
