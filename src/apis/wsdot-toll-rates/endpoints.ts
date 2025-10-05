import { z } from "zod";
import type { ApiDefinition, EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const wsdotTollRatesApi: ApiDefinition = {
  name: "wsdot-toll-rates",
  baseUrl: "https://www.wsdot.wa.gov/traffic/api/tollrates/tollratesrest.svc",
  endpoints: [
    /**
     * TollRate response
     */
    {
      function: "getTollRates",
      endpoint: "/getTollRatesAsJson",
      inputSchema: i.getTollRatesSchema,
      outputSchema: z.array(o.tollRateSchema),
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    } satisfies EndpointDefinition<i.GetTollRatesInput, o.TollRate[]>,
    /**
     * TollTripInfo response
     */
    {
      function: "getTollTripInfo",
      endpoint: "/getTollTripInfoAsJson",
      inputSchema: i.getTollTripInfoSchema,
      outputSchema: z.array(o.tollTripInfoSchema),
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    } satisfies EndpointDefinition<i.GetTollTripInfoInput, o.TollTripInfo[]>,
    /**
     * TollTripsRates response
     */
    {
      function: "getTollTripRates",
      endpoint: "/getTollTripRatesAsJson",
      inputSchema: i.getTollTripRatesSchema,
      outputSchema: o.tollTripsRatesSchema,
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    } satisfies EndpointDefinition<i.GetTollTripRatesInput, o.TollTripsRates>,
    {
      function: "getTripRatesByDate",
      endpoint: "/getTripRatesByDateAsJson?FromDate={FromDate}&ToDate={ToDate}",
      inputSchema: i.getTripRatesByDateSchema,
      outputSchema: z.array(o.tollTripsRatesSchema),
      sampleParams: {
        FromDate: datesHelper.startOfMonth(),
        ToDate: datesHelper.yesterday(),
      },
      cacheStrategy: "FREQUENT",
    } satisfies EndpointDefinition<
      i.GetTripRatesByDateInput,
      o.TollTripsRates[]
    >,
    {
      function: "getTripRatesByVersion",
      endpoint: "/getTripRatesByVersionAsJson?Version={Version}",
      inputSchema: i.getTripRatesByVersionSchema,
      outputSchema: o.tollTripsRatesSchema,
      sampleParams: { Version: 352417 },
      cacheStrategy: "FREQUENT",
    } satisfies EndpointDefinition<
      i.GetTripRatesByVersionInput,
      o.TollTripsRates
    >,
    /**
     * TollTripVersion response
     */
    {
      function: "getTollTripVersion",
      endpoint: "/getTollTripVersionAsJson",
      inputSchema: i.getTollTripVersionSchema,
      outputSchema: o.tollTripVersionSchema,
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    } satisfies EndpointDefinition<
      i.GetTollTripVersionInput,
      o.TollTripVersion
    >,
  ],
};
