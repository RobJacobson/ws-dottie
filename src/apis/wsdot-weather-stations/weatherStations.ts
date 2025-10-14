import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const weatherStationsResource = {
  name: "weather-stations",
  resourceDescription:
    "Weather station data provides current information from weather stations across the state. Each station includes location coordinates, station code, and station name. Coverage Area: Statewide. Data updates frequently.",
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    getWeatherStations: {
      function: "getWeatherStations",
      endpoint: "/GetCurrentStationsAsJson",
      inputSchema: i.getCurrentStationsSchema,
      outputSchema: z.array(o.weatherStationSchema),
      sampleParams: {},
      endpointDescription:
        "Returns current weather station data for all stations.",
    } satisfies EndpointDefinition<
      i.GetCurrentStationsInput,
      o.WeatherStation[]
    >,
  },
};
