import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const fareLineItemsResource = {
  name: "fare-line-items",
  resourceDescription:
    "Provides fare line item information for WSF routes including basic fare listings, detailed fare listings, and comprehensive fare data for all terminal combinations. Fare data includes pricing, categories, and directional information. Data updates infrequently.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getFareLineItemsByTripDateAndTerminals: {
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
      endpointDescription:
        "Returns detailed fare line items for the specified terminal combination and trip type (round trip or one-way).",
    } satisfies EndpointDefinition<i.FareLineItemsInput, o.LineItemResponse[]>,
    getFareLineItemsBasic: {
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
      endpointDescription:
        "Returns basic fare line items (most popular fares) for the specified terminal combination and trip type.",
    } satisfies EndpointDefinition<
      i.FareLineItemsBasicInput,
      o.LineItemResponse[]
    >,
    getFareLineItemsVerbose: {
      function: "getFareLineItemsVerbose",
      endpoint: "/fareLineItemsVerbose/{TripDate}",
      inputSchema: i.fareLineItemsVerboseSchema,
      outputSchema: o.lineItemVerboseResponseSchema,
      sampleParams: { TripDate: datesHelper.today() },
      endpointDescription:
        "Returns comprehensive fare line items for all valid terminal combinations on the specified trip date, including both one-way and round trip options.",
    } satisfies EndpointDefinition<
      i.FareLineItemsVerboseInput,
      o.LineItemVerboseResponse
    >,
  },
};
