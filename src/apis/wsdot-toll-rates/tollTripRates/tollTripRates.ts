import { z } from "zod";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./tollTripRates.input";
import * as o from "./tollTripRates.output";

export const tollTripRatesResource: EndpointGroup = {
  name: "toll-trip-rates",
  documentation: {
    resourceDescription:
      "Each TollTripRates item represents comprehensive toll rate data for specific trips including pricing details, informational messages, and version tracking. Each container supports current data retrieval, historical date ranges, and version-specific queries.",
    businessContext:
      "Use to analyze toll pricing trends and retrieve historical rate data by providing detailed trip information, version tracking, and date range filtering for transportation planning.",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    getTollTripRates: {
      function: "getTollTripRates",
      endpoint: "/getTollTripRatesAsJson",
      inputSchema: i.getTollTripRatesSchema,
      outputSchema: o.tollTripsRatesSchema,
      sampleParams: {},
      endpointDescription:
        "Returns single TollTripRates item with current pricing and message data.",
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
      endpointDescription:
        "Returns multiple TollTripRates items for specified date range.",
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
      endpointDescription:
        "Returns single TollTripRates item for specific version.",
    } satisfies EndpointDefinition<
      i.GetTripRatesByVersionInput,
      o.TollTripsRates
    >,
  },
};
