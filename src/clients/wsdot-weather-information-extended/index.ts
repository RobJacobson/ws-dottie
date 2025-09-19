import { getWeatherInformationExtendedMeta } from "./getWeatherInformationExtended";
import { defineEndpoint } from "@/shared/endpoints";

export const getWeatherInformationExtended = defineEndpoint(
  getWeatherInformationExtendedMeta
);

// Re-export input types from client files
export type { WeatherInformationExtendedInput } from "./getWeatherInformationExtended";
