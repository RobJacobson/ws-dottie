import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Weather station data provides current information from weather stations across the state. Each station includes location coordinates, station code, and station name. Coverage Area: Statewide. Data updates frequently.";

export const weatherStationsResource = {
  name: "weather-stations",
  description: DESCRIPTION,
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    all: {
      function: "getWeatherStations",
      endpoint: "/GetCurrentStationsAsJson",
      inputSchema: i.getCurrentStationsSchema,
      outputSchema: z.array(o.weatherStationSchema),
      sampleParams: {},
      cacheStrategy: "FREQUENT",
      description: `Returns current weather station data for all stations. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.GetCurrentStationsInput,
      o.WeatherStation[]
    >,
  },
};
