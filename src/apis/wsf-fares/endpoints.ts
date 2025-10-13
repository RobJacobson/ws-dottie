import { z } from "zod";
import type { ApiDefinition, EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const wsfFaresApi: ApiDefinition = {
  name: "wsf-fares",
  baseUrl: "https://www.wsdot.wa.gov/ferries/api/fares/rest",
  endpoints: [
    /**
     * CacheFlushDateResponse response
     */
    {
      function: "getCacheFlushDate",
      endpoint: "/cacheflushdate",
      inputSchema: i.cacheFlushDateSchema,
      outputSchema: o.cacheFlushDateResponseSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<
      i.FaresCacheFlushDateInput,
      o.FaresCacheFlushDateResponse
    >,
    /**
     * LineItemResponse response
     */
    {
      function: "getFareLineItemsByTripDateAndTerminals",
      endpoint:
        "/fareLineItems/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}",
      inputSchema: i.fareLineItemsSchema,
      outputSchema: z.array(o.lineItemResponseSchema),
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 3,
        ArrivingTerminalID: 7,
        RoundTrip: false,
      },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.FareLineItemsInput, o.LineItemResponse[]>,
    {
      function: "getFareLineItemsBasic",
      endpoint:
        "/fareLineItemsBasic/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}",
      inputSchema: i.fareLineItemsBasicSchema,
      outputSchema: z.array(o.lineItemResponseSchema),
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
        RoundTrip: false,
      },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<
      i.FareLineItemsBasicInput,
      o.LineItemResponse[]
    >,
    /**
     * LineItemVerboseResponse response
     */
    {
      function: "getFareLineItemsVerbose",
      endpoint: "/fareLineItemsVerbose/{TripDate}",
      inputSchema: i.fareLineItemsVerboseSchema,
      outputSchema: o.lineItemVerboseResponseSchema,
      sampleParams: { TripDate: datesHelper.today() },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<
      i.FareLineItemsVerboseInput,
      o.LineItemVerboseResponse
    >,
    /**
     * TerminalResponse response
     */
    {
      function: "getFaresTerminals",
      endpoint: "/terminals/{TripDate}",
      inputSchema: i.terminalsSchema,
      outputSchema: z.array(o.terminalResponseSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.TerminalsInput, o.TerminalResponse[]>,
    {
      function: "getTerminalMates",
      endpoint: "/terminalMates/{TripDate}/{TerminalID}",
      inputSchema: i.terminalMatesSchema,
      outputSchema: z.array(o.terminalResponseSchema),
      sampleParams: { TripDate: datesHelper.tomorrow(), TerminalID: 1 },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.TerminalMatesInput, o.TerminalResponse[]>,
    /**
     * ValidDateRangeResponse response
     */
    {
      function: "getFaresValidDateRange",
      endpoint: "/validdaterange",
      inputSchema: i.validDateRangeSchema,
      outputSchema: o.validDateRangeResponseSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<
      i.ValidDateRangeInput,
      o.ValidDateRangeResponse
    >,
    /**
     * FareTotalResponse response
     */
    {
      function: "getFareTotalsByTripDateAndRoute",
      endpoint:
        "/fareTotals/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}/{FareLineItemID}/{Quantity}",
      inputSchema: i.fareTotalsSchema,
      outputSchema: z.array(o.fareTotalResponseSchema),
      sampleParams: {
        TripDate: datesHelper.today(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
        RoundTrip: false,
        FareLineItemID: "1,2",
        Quantity: "3,1",
      },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.FareTotalsInput, o.FareTotalResponse[]>,
    /**
     * TerminalComboResponse response
     */
    {
      function: "getTerminalCombo",
      endpoint:
        "/terminalCombo/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
      inputSchema: i.terminalComboSchema,
      outputSchema: o.terminalComboResponseSchema,
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
      },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<
      i.TerminalComboInput,
      o.TerminalComboResponse
    >,
    /**
     * TerminalComboVerboseResponse response
     */
    {
      function: "getTerminalComboVerbose",
      endpoint: "/terminalComboVerbose/{TripDate}",
      inputSchema: i.terminalComboVerboseSchema,
      outputSchema: z.array(o.terminalComboVerboseResponseSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<
      i.TerminalComboVerboseInput,
      o.TerminalComboVerboseResponse[]
    >,
  ],
};
