import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import { z } from "@/shared/zod-openapi-init";
import type {
  FareLineItemsBasicInput,
  FareLineItemsByTripDateAndTerminalsInput,
  FareLineItemsVerboseInput,
} from "./fareLineItems.input";
import {
  fareLineItemsBasicInputSchema,
  fareLineItemsByTripDateAndTerminalsInputSchema,
  fareLineItemsVerboseInputSchema,
} from "./fareLineItems.input";
import type { LineItem, LineItemVerbose } from "./fareLineItems.output";
import { lineItemSchema, lineItemVerboseSchema } from "./fareLineItems.output";

export const fareLineItemsGroup = {
  name: "fare-line-items",
  documentation: {
    resourceDescription:
      "Each FareLineItem item represents individual fare components for Washington State Ferries routes, including passenger categories, vehicle types, and pricing structures. These items form the building blocks for calculating total journey costs based on route, vehicle dimensions, and passenger demographics.",
    businessContext:
      "Use to display fare options and enable price calculations by providing detailed fare breakdowns for different passenger types, vehicle categories, and route combinations for accurate ticket pricing.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    fetchFareLineItemsByTripDateAndTerminals: {
      endpoint:
        "/fareLineItems/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}",
      inputSchema: fareLineItemsByTripDateAndTerminalsInputSchema,
      outputSchema: z.array(lineItemSchema),
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 3,
        ArrivingTerminalID: 7,
        RoundTrip: false,
      },
      endpointDescription:
        "Returns multiple of FareLineItem for specific terminal combination.",
    } satisfies EndpointDefinition<
      FareLineItemsByTripDateAndTerminalsInput,
      LineItem[]
    >,
    fetchFareLineItemsBasic: {
      endpoint:
        "/fareLineItemsBasic/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}",
      inputSchema: fareLineItemsBasicInputSchema,
      outputSchema: z.array(lineItemSchema),
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
        RoundTrip: false,
      },
      endpointDescription:
        "Returns multiple of FareLineItem for popular fare options.",
    } satisfies EndpointDefinition<FareLineItemsBasicInput, LineItem[]>,
    fetchFareLineItemsVerbose: {
      endpoint: "/fareLineItemsVerbose/{TripDate}",
      inputSchema: fareLineItemsVerboseInputSchema,
      outputSchema: lineItemVerboseSchema,
      sampleParams: { TripDate: datesHelper.today() },
      endpointDescription:
        "Returns multiple of FareLineItem for all terminal combinations.",
    } satisfies EndpointDefinition<FareLineItemsVerboseInput, LineItemVerbose>,
  },
} satisfies EndpointGroup;
