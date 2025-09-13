import { z } from "zod";
import { weatherStationSchema } from "./weatherStation.zod";

/**
 * WeatherStations schema
 *
 * Return current list of weather stations maintained by WSDOT
 */
export const weatherStationsSchema = z
  .array(weatherStationSchema)
  .describe("Return current list of weather stations maintained by WSDOT");

/** WeatherStations type */
export type WeatherStations = z.infer<typeof weatherStationsSchema>;
