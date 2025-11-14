import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsdotWeatherReadingsApi } from "../apiDefinition";
import { weatherReadingsInputSchema } from "./weatherReadings.input";
import { weatherReadingSchema } from "./weatherReadings.output";

export const weatherReadingsGroup = defineEndpointGroup({
  name: "weather-readings",
  cacheStrategy: "FREQUENT",
  documentation: {
    resourceDescription:
      "WeatherReading provides current information from weather stations including temperature, humidity, wind conditions, visibility, precipitation data, and atmospheric pressure. Coverage Area: Statewide.",
    businessContext: "",
  },
});

export const fetchWeatherReadings = defineEndpoint({
  apiName: wsdotWeatherReadingsApi.name,
  baseUrl: wsdotWeatherReadingsApi.baseUrl,
  group: weatherReadingsGroup,
  functionName: "fetchWeatherReadings",
  endpoint: "/Scanweb",
  inputSchema: weatherReadingsInputSchema,
  outputSchema: weatherReadingSchema.array(),
  sampleParams: {},
  endpointDescription:
    "Returns current weather readings from all weather stations.",
});

