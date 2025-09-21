import { defineEndpoint } from "@/shared/endpoints";
import { getWeatherInformationMeta } from "./getWeatherInformation";
import { getWeatherInformationByStationIdMeta } from "./getWeatherInformationByStationId";

export const getWeatherInformation = defineEndpoint(getWeatherInformationMeta);
export const getWeatherInformationByStationId = defineEndpoint(
  getWeatherInformationByStationIdMeta
);

// Re-export input types from client files
export type { WeatherInformationInput } from "./getWeatherInformation";
export type { WeatherInformationByStationIdInput } from "./getWeatherInformationByStationId";
