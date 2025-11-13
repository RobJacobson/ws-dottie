import { fetchWeatherReadings } from "./weatherReadings.endpoints";

export const useWeatherReadings = fetchWeatherReadings.useQuery;
