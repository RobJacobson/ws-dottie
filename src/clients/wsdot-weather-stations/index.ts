import { defineEndpoint } from "@/shared/endpoints";
import { getWeatherStationsMeta } from "./getWeatherStations";

export const getWeatherStations = defineEndpoint(getWeatherStationsMeta);

// Re-export output types from schemas
export type {
  WeatherStation,
  WeatherStations,
} from "@/schemas/wsdot-weather-stations";
// Re-export input types from client files
export type { WeatherStationsInput } from "./getWeatherStations";
