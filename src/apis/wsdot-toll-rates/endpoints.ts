import { datesHelper } from "@/shared/utils/dateUtils";
import { createApiDefinition } from "../utils";
import {
  getTollRatesInputSchema,
  getTollTripInfoInputSchema,
  getTollTripRatesInputSchema,
  getTollTripVersionInputSchema,
  getTripRatesByDateInputSchema,
  getTripRatesByVersionInputSchema,
} from "./original/inputSchemas.original";
import {
  tollRatesListSchema,
  tollTripInfoListSchema,
  tollTripsSchema,
  tollTripVersionSchema,
  tripRatesListSchema,
} from "./original/outputSchemas.original";

export const wsdotTollRatesApi = createApiDefinition("wsdot-toll-rates", [
  {
    function: "getTollRates",
    endpoint: "/Traffic/api/TollRates/TollRatesREST.svc/GetTollRatesAsJson",
    inputSchema: getTollRatesInputSchema,
    outputSchema: tollRatesListSchema,
    sampleParams: {},
    cacheStrategy: "FREQUENT",
  },
  {
    function: "getTollTripInfo",
    endpoint: "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripInfoAsJson",
    inputSchema: getTollTripInfoInputSchema,
    outputSchema: tollTripInfoListSchema,
    sampleParams: {},
    cacheStrategy: "FREQUENT",
  },
  {
    function: "getTollTripRates",
    endpoint: "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripRatesAsJson",
    inputSchema: getTollTripRatesInputSchema,
    outputSchema: tollTripsSchema,
    sampleParams: {},
    cacheStrategy: "FREQUENT",
  },
  {
    function: "getTollTripVersion",
    endpoint:
      "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripVersionAsJson",
    inputSchema: getTollTripVersionInputSchema,
    outputSchema: tollTripVersionSchema,
    sampleParams: {},
    cacheStrategy: "FREQUENT",
  },
  {
    function: "getTripRatesByDate",
    endpoint:
      "/Traffic/api/TollRates/TollRatesREST.svc/GetTripRatesByDateAsJson?TripDate={TripDate}",
    inputSchema: getTripRatesByDateInputSchema,
    outputSchema: tripRatesListSchema,
    sampleParams: {
      fromDate: datesHelper.tomorrow(),
      toDate: datesHelper.tomorrow(),
    },
    cacheStrategy: "FREQUENT",
  },
  {
    function: "getTripRatesByVersion",
    endpoint:
      "/Traffic/api/TollRates/TollRatesREST.svc/GetTripRatesByVersionAsJson?Version={Version}",
    inputSchema: getTripRatesByVersionInputSchema,
    outputSchema: tripRatesListSchema,
    sampleParams: { version: 2024 },
    cacheStrategy: "FREQUENT",
  },
]);
