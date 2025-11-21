import type { ApiMeta } from "@/apis/types";

/**
 * API metadata for WSDOT Weather Information API
 */
export const wsdotWeatherInformationApiMeta: ApiMeta = {
  name: "wsdot-weather-information",
  baseUrl:
    "https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc",
};
