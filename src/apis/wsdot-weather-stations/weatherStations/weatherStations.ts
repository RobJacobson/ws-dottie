import { z } from "zod";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./weatherStations.input";
import * as o from "./weatherStations.output";

export const weatherStationsResource: EndpointGroup = {
  name: "weather-stations",
  documentation: {
    resourceDescription:
      "Weather station data provides current information from weather stations across the state. Each station includes location coordinates, station code, and station name. Coverage Area: Statewide. Data updates frequently.",
    businessContext: "",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
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
