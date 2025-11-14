import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { datesHelper } from "@/shared/utils";
import { wsfFaresApi } from "../apiDefinition";
import {
  fareLineItemsBasicInputSchema,
  fareLineItemsByTripDateAndTerminalsInputSchema,
  fareLineItemsVerboseInputSchema,
} from "./fareLineItems.input";
import { lineItemSchema, lineItemVerboseSchema } from "./fareLineItems.output";

export const fareLineItemsGroup = defineEndpointGroup({
  name: "fare-line-items",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each FareLineItem item represents individual fare components for Washington State Ferries routes, including passenger categories, vehicle types, and pricing structures. These items form the building blocks for calculating total journey costs based on route, vehicle dimensions, and passenger demographics.",
    businessContext:
      "Use to display fare options and enable price calculations by providing detailed fare breakdowns for different passenger types, vehicle categories, and route combinations for accurate ticket pricing.",
  },
});

export const fetchFareLineItemsByTripDateAndTerminals = defineEndpoint({
  apiName: wsfFaresApi.name,
  baseUrl: wsfFaresApi.baseUrl,
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
    "Returns multiple of FareLineItem for specific terminal combination.",
});

export const fetchFareLineItemsBasic = defineEndpoint({
  apiName: wsfFaresApi.name,
  baseUrl: wsfFaresApi.baseUrl,
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
    "Returns multiple of FareLineItem for popular fare options.",
});

export const fetchFareLineItemsVerbose = defineEndpoint({
  apiName: wsfFaresApi.name,
  baseUrl: wsfFaresApi.baseUrl,
  group: fareLineItemsGroup,
  functionName: "fetchFareLineItemsVerbose",
  endpoint: "/fareLineItemsVerbose/{TripDate}",
  inputSchema: fareLineItemsVerboseInputSchema,
  outputSchema: lineItemVerboseSchema,
  sampleParams: { TripDate: datesHelper.today() },
  endpointDescription:
    "Returns multiple of FareLineItem for all terminal combinations.",
});

