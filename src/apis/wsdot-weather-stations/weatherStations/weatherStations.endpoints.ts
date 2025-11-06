import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import type { WeatherStationsInput } from "./weatherStations.input";
import { weatherStationsInputSchema } from "./weatherStations.input";
import type { WeatherStation } from "./weatherStations.output";
import { weatherStationSchema } from "./weatherStations.output";

export const weatherStationsResource = {
  name: "weather-stations",
  documentation: {
    resourceDescription:
      "Each WeatherStation item represents a road weather information system station location across Washington state. These stations collect atmospheric and pavement condition data to support transportation operations and traveler safety.",
    businessContext:
      "Use to monitor weather conditions by providing location coordinates, station identifiers, and names for road weather monitoring and maintenance decision support.",
  },
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    getWeatherStations: {
      function: "getWeatherStations",
      endpoint: "/GetCurrentStationsAsJson",
      inputSchema: weatherStationsInputSchema,
      outputSchema: z.array(weatherStationSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple WeatherStation items for statewide coverage.",
    } satisfies EndpointDefinition<WeatherStationsInput, WeatherStation[]>,
  },
} satisfies EndpointGroup;
