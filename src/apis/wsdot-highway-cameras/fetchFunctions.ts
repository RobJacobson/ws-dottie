import { createFetchFunctions } from "@/shared/utils/createFetchFunctions";
import { wsdotHighwayCamerasApi } from "./apiDefinition";

export const {
  fetchHighwayCameras,
  searchHighwayCamerasByRouteAndMilepost,
  fetchHighwayCameraByCameraId,
} = createFetchFunctions(wsdotHighwayCamerasApi);
