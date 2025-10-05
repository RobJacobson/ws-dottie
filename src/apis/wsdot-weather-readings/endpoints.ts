import { z } from "zod";
import type { ApiDefinition, EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const wsdotWeatherReadingsApi: ApiDefinition = {
  name: "wsdot-weather-readings",
  baseUrl: "http://www.wsdot.wa.gov/traffic/api/api",
  endpoints: [
    /**
     * WeatherReading response
     */
    {
      function: "getWeatherReadings",
      endpoint: "/Scanweb",
      inputSchema: i.getWeatherReadingsSchema,
      outputSchema: z.array(o.weatherReadingSchema),
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    } satisfies EndpointDefinition<
      i.GetWeatherReadingsInput,
      o.WeatherReading[]
    >,
  ],
};
