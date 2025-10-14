import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Provides fare line item information for WSF routes including basic fare listings, detailed fare listings, and comprehensive fare data for all terminal combinations. Fare data includes pricing, categories, and directional information. Data updates infrequently.";

export const fareLineItemsResource = {
  name: "fare-line-items",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    detailed: {
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
      description: `Returns detailed fare line items for the specified terminal combination and trip type (round trip or one-way). ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.FareLineItemsInput, o.LineItemResponse[]>,
    basic: {
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
      description: `Returns basic fare line items (most popular fares) for the specified terminal combination and trip type. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.FareLineItemsBasicInput,
      o.LineItemResponse[]
    >,
    verbose: {
      function: "getFareLineItemsVerbose",
      endpoint: "/fareLineItemsVerbose/{TripDate}",
      inputSchema: i.fareLineItemsVerboseSchema,
      outputSchema: o.lineItemVerboseResponseSchema,
      sampleParams: { TripDate: datesHelper.today() },
      cacheStrategy: "STATIC",
      description: `Returns comprehensive fare line items for all valid terminal combinations on the specified trip date, including both one-way and round trip options. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.FareLineItemsVerboseInput,
      o.LineItemVerboseResponse
    >,
  },
};
