import { z } from "zod";
import { weatherInfoSchema } from "@/schemas/wsdot-weather-information";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getWeatherInformationByStationId */
export const getWeatherInformationByStationIdParamsSchema = z
  .object({
    stationId: z
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

/** Endpoint definition for getWeatherInformationByStationId */
export const getWeatherInformationByStationIdDef = defineEndpoint({
  moduleGroup: "wsdot-weather-information",
  functionName: "getWeatherInformationByStationId",
  endpoint:
    "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationByStationIDAsJson?StationID={stationId}",
  inputSchema: getWeatherInformationByStationIdParamsSchema,
  outputSchema: weatherInfoSchema,
  sampleParams: { stationId: 1909 },
  cacheStrategy: "MINUTE_UPDATES",
});

/** GetWeatherInformationByStationId params type */
