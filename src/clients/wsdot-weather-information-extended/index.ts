import { defineEndpoint } from "@/shared/endpoints";
import { getWeatherInformationExtendedMeta } from "./getWeatherInformationExtended";

export const getWeatherInformationExtended = defineEndpoint(
  getWeatherInformationExtendedMeta
);

// Re-export output types from schemas
export type {
  ScanwebSubSurfaceMeasurements,
  ScanwebSurfaceMeasurements,
  WeatherReading,
  WeatherReadings,
} from "@/schemas/wsdot-weather-information-extended";
// Re-export input types from client files
export type { WeatherInformationExtendedInput } from "./getWeatherInformationExtended";
