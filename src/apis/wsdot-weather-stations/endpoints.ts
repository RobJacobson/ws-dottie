import { z } from "zod";
import type { ApiDefinition, EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const wsdotWeatherStationsApi: ApiDefinition = {
  name: "wsdot-weather-stations",
  baseUrl:
    "https://wsdot.wa.gov/traffic/api/WeatherStations/WeatherStationsREST.svc",
  endpoints: [
    /**
     * WeatherStation response
     */
    {
      function: "getWeatherStations",
      endpoint: "/GetCurrentStationsAsJson",
      inputSchema: i.getCurrentStationsSchema,
      outputSchema: z.array(o.weatherStationSchema),
      sampleParams: {},
      cacheStrategy: "FREQUENT",
      description: "",
    } satisfies EndpointDefinition<
      i.GetCurrentStationsInput,
      o.WeatherStation[]
    >,
  ],
};
