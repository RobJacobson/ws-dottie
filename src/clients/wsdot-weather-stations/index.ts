import { defineEndpoint } from "@/shared/endpoints";
import { getWeatherStationsMeta } from "./getWeatherStations";

export const getWeatherStations = defineEndpoint(getWeatherStationsMeta);

// Re-export input types from client files
export type { WeatherStationsInput } from "./getWeatherStations";
