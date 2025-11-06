import { createFetchFunctions } from "@/shared/utils/createFetchFunctions";
import { wsdotWeatherInformationApi } from "./apiDefinition";

export const {
  fetchWeatherInformation,
  fetchWeatherInformationByStationId,
  fetchCurrentWeatherForStations,
  searchWeatherInformation,
} = createFetchFunctions(wsdotWeatherInformationApi);
