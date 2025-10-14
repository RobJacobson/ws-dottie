import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "WeatherReading provides current information from weather stations including temperature, humidity, wind conditions, visibility, precipitation data, and atmospheric pressure. Coverage Area: Statewide.";

export const weatherReadingsResource = {
  name: "weather-readings",
  description: DESCRIPTION,
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    all: {
      function: "getWeatherReadings",
      endpoint: "/Scanweb",
      inputSchema: i.getWeatherReadingsSchema,
      outputSchema: z.array(o.weatherReadingSchema),
      sampleParams: {},
      cacheStrategy: "FREQUENT",
      description: `Returns current weather readings from all weather stations. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.GetWeatherReadingsInput,
      o.WeatherReading[]
    >,
  },
};
