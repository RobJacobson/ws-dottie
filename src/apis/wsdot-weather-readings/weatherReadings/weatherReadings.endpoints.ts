import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsdotWeatherReadingsApi } from "../apiDefinition";
import { weatherReadingsInputSchema } from "./weatherReadings.input";
import { weatherReadingSchema } from "./weatherReadings.output";

const group = defineEndpointGroup({
  api: wsdotWeatherReadingsApi,
  name: "weather-readings",
  documentation: {
    resourceDescription:
      "WeatherReading provides current information from weather stations including temperature, humidity, wind conditions, visibility, precipitation data, and atmospheric pressure. Coverage Area: Statewide.",
    businessContext: "",
  },
  cacheStrategy: "FREQUENT",
});

export const fetchWeatherReadings = defineEndpoint({
  group,
  functionName: "fetchWeatherReadings",
  definition: {
    endpoint: "/Scanweb",
    inputSchema: weatherReadingsInputSchema,
    outputSchema: weatherReadingSchema.array(),
    sampleParams: {},
    endpointDescription:
      "Returns current weather readings from all weather stations.",
  },
});

export const weatherReadingsResource = group.descriptor;
