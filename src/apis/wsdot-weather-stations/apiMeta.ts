import type { ApiMeta } from "@/apis/types";

/**
 * API metadata for WSDOT Weather Stations API
 */
export const wsdotWeatherStationsApiMeta: ApiMeta = {
  name: "wsdot-weather-stations",
  baseUrl:
    "https://wsdot.wa.gov/traffic/api/WeatherStations/WeatherStationsREST.svc",
};
