import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsdotWeatherStationsApi } from "../apiDefinition";
import { weatherStationsInputSchema } from "./weatherStations.input";
import { weatherStationSchema } from "./weatherStations.output";

const group = defineEndpointGroup({
  api: wsdotWeatherStationsApi,
  name: "weather-stations",
  documentation: {
    resourceDescription:
      "Each WeatherStation item represents a road weather information system station location across Washington state. These stations collect atmospheric and pavement condition data to support transportation operations and traveler safety.",
    businessContext:
      "Use to monitor weather conditions by providing location coordinates, station identifiers, and names for road weather monitoring and maintenance decision support.",
  },
  cacheStrategy: "FREQUENT",
});

export const fetchWeatherStations = defineEndpoint({
  group,
  functionName: "fetchWeatherStations",
  definition: {
    endpoint: "/GetCurrentStationsAsJson",
    inputSchema: weatherStationsInputSchema,
    outputSchema: weatherStationSchema.array(),
    sampleParams: {},
    endpointDescription:
      "Returns multiple WeatherStation items for statewide coverage.",
  },
});

export const weatherStationsResource = group.descriptor;
