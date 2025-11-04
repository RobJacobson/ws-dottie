import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./fareLineItems.input";
import * as o from "./fareLineItems.output";

export const fareLineItemsGroup: EndpointGroup = {
  name: "fare-line-items",
  documentation: {
    resourceDescription:
      "Each FareLineItem item represents individual fare components for Washington State Ferries routes, including passenger categories, vehicle types, and pricing structures. These items form the building blocks for calculating total journey costs based on route, vehicle dimensions, and passenger demographics.",
    businessContext:
      "Use to display fare options and enable price calculations by providing detailed fare breakdowns for different passenger types, vehicle categories, and route combinations for accurate ticket pricing.",
  },
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
        "Returns multiple of FareLineItem for specific terminal combination.",
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
        "Returns multiple of FareLineItem for popular fare options.",
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
        "Returns multiple of FareLineItem for all terminal combinations.",
    } satisfies EndpointDefinition<
      i.FareLineItemsVerboseInput,
      o.LineItemVerboseResponse
    >,
  },
};
