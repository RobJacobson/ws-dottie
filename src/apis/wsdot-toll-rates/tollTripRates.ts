import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "TollTripRates provides current toll rates for specific trips with detailed pricing information, messages, and version tracking. Supports retrieval by current data, date ranges, and specific versions.";

export const tollTripRatesResource = {
  name: "toll-trip-rates",
  description: DESCRIPTION,
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    current: {
      function: "getTollTripRates",
      endpoint: "/getTollTripRatesAsJson",
      inputSchema: i.getTollTripRatesSchema,
      outputSchema: o.tollTripsRatesSchema,
      sampleParams: {},
      cacheStrategy: "FREQUENT",
      description: `Returns current toll trip rates with pricing and message information. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.GetTollTripRatesInput, o.TollTripsRates>,
    byDate: {
      function: "getTripRatesByDate",
      endpoint: "/getTripRatesByDateAsJson?FromDate={FromDate}&ToDate={ToDate}",
      inputSchema: i.getTripRatesByDateSchema,
      outputSchema: z.array(o.tollTripsRatesSchema),
      sampleParams: {
        FromDate: datesHelper.startOfMonth(),
        ToDate: datesHelper.yesterday(),
      },
      cacheStrategy: "FREQUENT",
      description: `Returns toll trip rates for a specific date range. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.GetTripRatesByDateInput,
      o.TollTripsRates[]
    >,
    byVersion: {
      function: "getTripRatesByVersion",
      endpoint: "/getTripRatesByVersionAsJson?Version={Version}",
      inputSchema: i.getTripRatesByVersionSchema,
      outputSchema: o.tollTripsRatesSchema,
      sampleParams: { Version: 352417 },
      cacheStrategy: "FREQUENT",
      description: `Returns toll trip rates for a specific version. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.GetTripRatesByVersionInput,
      o.TollTripsRates
    >,
  },
};
