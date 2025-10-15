import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./schemas/tollTripRates.input";
import * as o from "./schemas/tollTripRates.output";

export const tollTripRatesResource = {
  name: "toll-trip-rates",
  resourceDescription:
    "TollTripRates provides current toll rates for specific trips with detailed pricing information, messages, and version tracking. Supports retrieval by current data, date ranges, and specific versions.",
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    getTollTripRates: {
      function: "getTollTripRates",
      endpoint: "/getTollTripRatesAsJson",
      inputSchema: i.getTollTripRatesSchema,
      outputSchema: o.tollTripsRatesSchema,
      sampleParams: {},
      endpointDescription:
        "Returns current toll trip rates with pricing and message information.",
    } satisfies EndpointDefinition<i.GetTollTripRatesInput, o.TollTripsRates>,
    getTripRatesByDate: {
      function: "getTripRatesByDate",
      endpoint: "/getTripRatesByDateAsJson?FromDate={FromDate}&ToDate={ToDate}",
      inputSchema: i.getTripRatesByDateSchema,
      outputSchema: z.array(o.tollTripsRatesSchema),
      sampleParams: {
        FromDate: datesHelper.startOfMonth(),
        ToDate: datesHelper.yesterday(),
      },
      endpointDescription: "Returns toll trip rates for a specific date range.",
    } satisfies EndpointDefinition<
      i.GetTripRatesByDateInput,
      o.TollTripsRates[]
    >,
    getTripRatesByVersion: {
      function: "getTripRatesByVersion",
      endpoint: "/getTripRatesByVersionAsJson?Version={Version}",
      inputSchema: i.getTripRatesByVersionSchema,
      outputSchema: o.tollTripsRatesSchema,
      sampleParams: { Version: 352417 },
      endpointDescription: "Returns toll trip rates for a specific version.",
    } satisfies EndpointDefinition<
      i.GetTripRatesByVersionInput,
      o.TollTripsRates
    >,
  },
};
