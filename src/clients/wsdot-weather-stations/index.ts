import { getWeatherStationsMeta } from "./getWeatherStations";
import { defineEndpoint } from "@/shared/endpoints";

export const getWeatherStations = defineEndpoint(getWeatherStationsMeta);

// Re-export input types from client files
export type { WeatherStationsInput } from "./getWeatherStations";
