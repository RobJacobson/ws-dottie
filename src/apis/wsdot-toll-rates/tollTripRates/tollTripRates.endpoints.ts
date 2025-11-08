import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import { z } from "@/shared/zod-openapi-init";
import {
  type TollTripRatesInput,
  type TripRatesByDateInput,
  type TripRatesByVersionInput,
  tollTripRatesInputSchema,
  tripRatesByDateInputSchema,
  tripRatesByVersionInputSchema,
} from "./tollTripRates.input";
import {
  type TollTripsRates,
  tollTripsRatesSchema,
} from "./tollTripRates.output";

export const tollTripRatesResource = {
  name: "toll-trip-rates",
  documentation: {
    resourceDescription:
      "Each TollTripRates item represents comprehensive toll rate data for specific trips including pricing details, informational messages, and version tracking. Each container supports current data retrieval, historical date ranges, and version-specific queries.",
    businessContext:
      "Use to analyze toll pricing trends and retrieve historical rate data by providing detailed trip information, version tracking, and date range filtering for transportation planning.",
  },
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    fetchTollTripRates: {
      endpoint: "/getTollTripRatesAsJson",
      inputSchema: tollTripRatesInputSchema,
      outputSchema: tollTripsRatesSchema,
      sampleParams: {},
      endpointDescription:
        "Returns single TollTripRates item with current pricing and message data.",
    } satisfies EndpointDefinition<TollTripRatesInput, TollTripsRates>,
    fetchTripRatesByDate: {
      endpoint: "/getTripRatesByDateAsJson?FromDate={FromDate}&ToDate={ToDate}",
      inputSchema: tripRatesByDateInputSchema,
      outputSchema: z.array(tollTripsRatesSchema),
      sampleParams: {
        FromDate: datesHelper.yesterday(),
        ToDate: datesHelper.today(),
      },
      endpointDescription:
        "Returns multiple TollTripRates items for specified date range.",
    } satisfies EndpointDefinition<TripRatesByDateInput, TollTripsRates[]>,
    fetchTripRatesByVersion: {
      endpoint: "/getTripRatesByVersionAsJson?Version={Version}",
      inputSchema: tripRatesByVersionInputSchema,
      outputSchema: tollTripsRatesSchema,
      sampleParams: { Version: 352417 },
      endpointDescription:
        "Returns single TollTripRates item for specific version.",
    } satisfies EndpointDefinition<TripRatesByVersionInput, TollTripsRates>,
  },
} satisfies EndpointGroup;
