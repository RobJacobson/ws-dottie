import type { ApiDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";
import { input, output } from "./schemas";

export const wsdotTollRatesApi: ApiDefinition = {
  name: "wsdot-toll-rates",
  baseUrl: "http://www.wsdot.wa.gov/traffic/api/tollrates/tollratesrest.svc",
  endpoints: [
    {
      function: "getTollRates",
      endpoint: "/getTollRatesAsJson",
      inputSchema: input.getTollRatesSchema,
      outputSchema: output.tollRatesListSchema,
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getTollTripInfo",
      endpoint: "/getTollTripInfoAsJson",
      inputSchema: input.getTollTripInfoSchema,
      outputSchema: output.tollTripInfoListSchema,
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getTollTripRates",
      endpoint: "/getTollTripRatesAsJson",
      inputSchema: input.getTollTripRatesSchema,
      outputSchema: output.tollTripsRatesSchema,
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getTollTripVersion",
      endpoint: "/getTollTripVersionAsJson",
      inputSchema: input.getTollTripVersionSchema,
      outputSchema: output.tollTripVersionSchema,
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getTripRatesByDate",
      endpoint: "/getTripRatesByDateAsJson?FromDate={FromDate}&ToDate={ToDate}",
      inputSchema: input.getTripRatesByDateSchema,
      outputSchema: output.tollTripsRatesListSchema,
      sampleParams: {
        FromDate: datesHelper.startOfMonth(),
        ToDate: datesHelper.yesterday(),
      },
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getTripRatesByVersion",
      endpoint: "/getTripRatesByVersionAsJson?Version={Version}",
      inputSchema: input.getTripRatesByVersionSchema,
      outputSchema: output.tollTripsRatesSchema,
      sampleParams: { Version: 352417 },
      cacheStrategy: "FREQUENT",
    },
  ],
};
