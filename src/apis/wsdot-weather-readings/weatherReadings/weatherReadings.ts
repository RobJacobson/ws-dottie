import { z } from "zod";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./weatherReadings.input";
import * as o from "./weatherReadings.output";

export const weatherReadingsResource: EndpointGroup = {
  name: "weather-readings",
  documentation: {
    resourceDescription:
      "WeatherReading provides current information from weather stations including temperature, humidity, wind conditions, visibility, precipitation data, and atmospheric pressure. Coverage Area: Statewide.",
    businessContext: "",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
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
