export * from "./getWeatherInformationExtended";

// Re-export output types from schemas
export type {
  WeatherReading,
  WeatherReadings,
  ScanwebSurfaceMeasurements,
  ScanwebSubSurfaceMeasurements,
} from "@/schemas/wsdot-weather-information-extended";
