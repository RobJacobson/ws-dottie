import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { weatherStationsInputSchema } from "./weatherStations.input";
import { weatherStationSchema } from "./weatherStations.output";

export const weatherStationsGroup: EndpointGroup = {
  name: "weather-stations",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary:
      "Weather station metadata and location information for WSDOT Road Weather Information System stations statewide.",
    description:
      "Station identifiers, names, and location coordinates for weather stations that collect atmospheric and pavement condition data.",
    useCases: [
      "Discover weather stations by location for weather data queries.",
      "Identify station identifiers and names for weather data lookups.",
      "Support location-based weather station searches.",
    ],
    updateFrequency: "daily",
  },
};

export const fetchWeatherStations = createEndpoint({
  api: apis.wsdotWeatherStations,
  group: weatherStationsGroup,
  functionName: "fetchWeatherStations",
  endpoint: "/GetCurrentStationsAsJson",
  inputSchema: weatherStationsInputSchema,
  outputSchema: weatherStationSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List weather station metadata for all stations statewide.",
});
