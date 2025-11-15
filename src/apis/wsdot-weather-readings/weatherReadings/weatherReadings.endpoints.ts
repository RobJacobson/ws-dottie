import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { weatherReadingsInputSchema } from "./weatherReadings.input";
import { weatherReadingSchema } from "./weatherReadings.output";

export const weatherReadingsGroup: EndpointGroup = {
  name: "weather-readings",
  cacheStrategy: "FREQUENT",
  documentation: {
    resourceDescription:
      "WeatherReading provides current information from weather stations including temperature, humidity, wind conditions, visibility, precipitation data, and atmospheric pressure. Coverage Area: Statewide.",
    businessContext: "",
  },
};

export const fetchWeatherReadings = createEndpoint({
  api: apis.wsdotWeatherReadings,
  group: weatherReadingsGroup,
  functionName: "fetchWeatherReadings",
  endpoint: "/Scanweb",
  inputSchema: weatherReadingsInputSchema,
  outputSchema: weatherReadingSchema.array(),
  sampleParams: {},
  endpointDescription:
    "Returns current weather readings from all weather stations.",
});
