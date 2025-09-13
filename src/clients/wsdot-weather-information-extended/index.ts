import { defineEndpoint } from "@/shared/endpoints";
import { getWeatherInformationExtendedMeta } from "./getWeatherInformationExtended";

export const getWeatherInformationExtended = defineEndpoint(
  getWeatherInformationExtendedMeta
);

// Re-export input types from client files
export type { WeatherInformationExtendedInput } from "./getWeatherInformationExtended";
