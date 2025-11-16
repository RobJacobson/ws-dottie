import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { datesHelper } from "@/shared/utils";
import {
  fareLineItemsBasicInputSchema,
  fareLineItemsByTripDateAndTerminalsInputSchema,
  fareLineItemsVerboseInputSchema,
} from "./fareLineItems.input";
import { lineItemSchema, lineItemVerboseSchema } from "./fareLineItems.output";

export const fareLineItemsGroup: EndpointGroup = {
  name: "fare-line-items",
  cacheStrategy: "STATIC",
  documentation: {
    summary:
      "Individual fare components for WSF routes by passenger and vehicle types.",
    description:
      "Fare line items represent pricing components for different passenger categories, vehicle types, and route combinations. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display fare options for different passenger and vehicle types.",
      "Calculate journey costs based on route and demographics.",
      "Build fare selection interfaces for ticket purchasing.",
    ],
    updateFrequency: "daily",
  },
};

export const fetchFareLineItemsByTripDateAndTerminals = createEndpoint({
  api: apis.wsfFares,
  group: fareLineItemsGroup,
  functionName: "fetchFareLineItemsByTripDateAndTerminals",
  endpoint:
    "/fareLineItems/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}",
  inputSchema: fareLineItemsByTripDateAndTerminalsInputSchema,
  outputSchema: lineItemSchema.array(),
  sampleParams: {
    TripDate: datesHelper.tomorrow(),
    DepartingTerminalID: 3,
    ArrivingTerminalID: 7,
    RoundTrip: false,
  },
  endpointDescription:
    "List all fare line items for a specific terminal combination and trip type.",
});

export const fetchFareLineItemsBasic = createEndpoint({
  api: apis.wsfFares,
  group: fareLineItemsGroup,
  functionName: "fetchFareLineItemsBasic",
  endpoint:
    "/fareLineItemsBasic/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}",
  inputSchema: fareLineItemsBasicInputSchema,
  outputSchema: lineItemSchema.array(),
  sampleParams: {
    TripDate: datesHelper.tomorrow(),
    DepartingTerminalID: 1,
    ArrivingTerminalID: 10,
    RoundTrip: false,
  },
  endpointDescription:
    "List popular fare line items for a terminal combination.",
});

export const fetchFareLineItemsVerbose = createEndpoint({
  api: apis.wsfFares,
  group: fareLineItemsGroup,
  functionName: "fetchFareLineItemsVerbose",
  endpoint: "/fareLineItemsVerbose/{TripDate}",
  inputSchema: fareLineItemsVerboseInputSchema,
  outputSchema: lineItemVerboseSchema,
  sampleParams: { TripDate: datesHelper.today() },
  endpointDescription:
    "Get all fare line items for all terminal combinations on a trip date.",
});
