import { datesHelper } from "@/shared/utils";
import { createApiDefinition } from "../utils";
import { input, output } from "./schemas";

export const wsdotTollRatesApi = createApiDefinition("wsdot-toll-rates", [
  {
    function: "getTollRates",
    endpoint: "/Traffic/api/TollRates/TollRatesREST.svc/GetTollRatesAsJson",
    inputSchema: input.getTollRatesSchema,
    outputSchema: output.tollRatesListSchema,
    sampleParams: {},
    cacheStrategy: "FREQUENT",
  },
  {
    function: "getTollTripInfo",
    endpoint: "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripInfoAsJson",
    inputSchema: input.getTollTripInfoSchema,
    outputSchema: output.tollTripInfoListSchema,
    sampleParams: {},
    cacheStrategy: "FREQUENT",
  },
  {
    function: "getTollTripRates",
    endpoint: "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripRatesAsJson",
    inputSchema: input.getTollTripRatesSchema,
    outputSchema: output.tollTripsSchema,
    sampleParams: {},
    cacheStrategy: "FREQUENT",
  },
  {
    function: "getTollTripVersion",
    endpoint:
      "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripVersionAsJson",
    inputSchema: input.getTollTripVersionSchema,
    outputSchema: output.tollTripVersionSchema,
    sampleParams: {},
    cacheStrategy: "FREQUENT",
  },
  {
    function: "getTripRatesByDate",
    endpoint:
      "/Traffic/api/TollRates/TollRatesREST.svc/GetTripRatesByDateAsJson?FromDate={FromDate}&ToDate={ToDate}",
    inputSchema: input.getTripRatesByDateSchema,
    outputSchema: output.tollTripsListSchema,
    sampleParams: {
      FromDate: datesHelper.startOfMonth(),
      ToDate: datesHelper.yesterday(),
    },
    cacheStrategy: "FREQUENT",
  },
  {
    function: "getTripRatesByVersion",
    endpoint:
      "/Traffic/api/TollRates/TollRatesREST.svc/GetTripRatesByVersionAsJson?Version={Version}",
    inputSchema: input.getTripRatesByVersionSchema,
    outputSchema: output.tripRatesListSchema,
    sampleParams: { Version: 352417 },
    cacheStrategy: "FREQUENT",
  },
]);
