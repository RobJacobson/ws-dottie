import { z } from "zod";

import {
  type WeatherInfo,
  weatherInfoSchema,
} from "@/schemas/wsdot-weather-information/weatherInfo.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getWeatherInformationByStationId */
const weatherInformationByStationIdInput = z
  .object({
    StationID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the specific weather station to retrieve. This ID corresponds to specific monitoring stations like 1909 (S 144th St on SB I-5), 1928 (EB I-90 Echo Lake), 1966 (NE 130th Street on I-5), or 1983 (Satus Pass on US 97). The ID is assigned by the WSDOT system and can be obtained from the getWeatherInformation endpoint response."
      ),
  })
  .describe(
    "Parameters for retrieving weather information for a specific weather station by its unique identifier"
  );

/** Endpoint metadata for getWeatherInformationByStationId */
export const getWeatherInformationByStationIdMeta: EndpointDefinition<
  WeatherInformationByStationIdInput,
  WeatherInfo
> = {
  api: "wsdot-weather-information",
  function: "getWeatherInformationByStationId",
  endpoint:
    "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationByStationIDAsJson?StationID={StationID}",
  inputSchema: weatherInformationByStationIdInput,
  outputSchema: weatherInfoSchema,
  sampleParams: { StationID: 1909 },
  cacheStrategy: "FREQUENT",
};

// Type exports
export type WeatherInformationByStationIdInput = z.infer<
  typeof weatherInformationByStationIdInput
>;
