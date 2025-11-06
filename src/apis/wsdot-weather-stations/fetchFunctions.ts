import { createFetchFunctions } from "@/shared/utils/createFetchFunctions";
import { wsdotWeatherStationsApi } from "./apiDefinition";

export const { fetchWeatherStations } = createFetchFunctions(
  wsdotWeatherStationsApi
);
