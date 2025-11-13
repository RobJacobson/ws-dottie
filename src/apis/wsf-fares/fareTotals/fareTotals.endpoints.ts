import { datesHelper } from "@/shared/utils";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import {
  fareTotalsByTripDateAndRouteInputSchema,
} from "./fareTotals.input";
import { fareTotalSchema } from "./fareTotals.output";
import { wsfFaresApi } from "../apiDefinition";

const group = defineEndpointGroup({
  api: wsfFaresApi,
  name: "fare-totals",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each FareTotal item represents calculated fare costs for Washington State Ferries journeys based on selected fare line items and passenger quantities. These totals combine individual fare components to provide complete pricing for specific routes and travel scenarios.",
    businessContext:
      "Use to calculate complete journey costs by providing fare totals based on selected line items, quantities, and trip parameters for accurate ticket pricing and payment processing.",
  },
});

export const fetchFareTotalsByTripDateAndRoute = defineEndpoint({
  group,
  functionName: "fetchFareTotalsByTripDateAndRoute",
  definition: {
    endpoint:
      "/fareTotals/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}/{FareLineItemID}/{Quantity}",
    inputSchema: fareTotalsByTripDateAndRouteInputSchema,
    outputSchema: fareTotalSchema.array(),
    sampleParams: {
      TripDate: datesHelper.today(),
      DepartingTerminalID: 1,
      ArrivingTerminalID: 10,
      RoundTrip: false,
      FareLineItemID: "1,2",
      Quantity: "3,1",
    },
    endpointDescription:
      "Calculates total fares for the specified terminal combination, trip type, and selected fare line items with quantities.",
  },
});

export const fareTotalsGroup = group.descriptor;
