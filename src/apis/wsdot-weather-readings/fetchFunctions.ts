import { createFetchFunctions } from "@/shared/utils/createFetchFunctions";
import { wsdotWeatherReadingsApi } from "./apiDefinition";

export const {
  fetchWeatherReadings,
  fetchSurfaceMeasurements,
  fetchSubSurfaceMeasurements,
} = createFetchFunctions(wsdotWeatherReadingsApi);
