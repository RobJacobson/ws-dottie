import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod";
import {
  type WeatherReadingsInput,
  weatherReadingsInputSchema,
} from "./weatherReadings.input";
import {
  type WeatherReading,
  weatherReadingSchema,
} from "./weatherReadings.output";

export const weatherReadingsResource = {
  name: "weather-readings",
  documentation: {
    resourceDescription:
      "WeatherReading provides current information from weather stations including temperature, humidity, wind conditions, visibility, precipitation data, and atmospheric pressure. Coverage Area: Statewide.",
    businessContext: "",
  },
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    fetchWeatherReadings: {
      endpoint: "/Scanweb",
      inputSchema: weatherReadingsInputSchema,
      outputSchema: z.array(weatherReadingSchema),
      sampleParams: {},
      endpointDescription:
        "Returns current weather readings from all weather stations.",
    } satisfies EndpointDefinition<WeatherReadingsInput, WeatherReading[]>,
  },
} satisfies EndpointGroup;
