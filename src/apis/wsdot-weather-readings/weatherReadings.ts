import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const weatherReadingsResource = {
  name: "weather-readings",
  resourceDescription:
    "WeatherReading provides current information from weather stations including temperature, humidity, wind conditions, visibility, precipitation data, and atmospheric pressure. Coverage Area: Statewide.",
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    getWeatherReadings: {
      function: "getWeatherReadings",
      endpoint: "/Scanweb",
      inputSchema: i.getWeatherReadingsSchema,
      outputSchema: z.array(o.weatherReadingSchema),
      sampleParams: {},
      endpointDescription:
        "Returns current weather readings from all weather stations.",
    } satisfies EndpointDefinition<
      i.GetWeatherReadingsInput,
      o.WeatherReading[]
    >,
  },
};
