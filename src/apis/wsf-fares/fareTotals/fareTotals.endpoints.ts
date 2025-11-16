import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { datesHelper } from "@/shared/utils";
import { fareTotalsByTripDateAndRouteInputSchema } from "./fareTotals.input";
import { fareTotalSchema } from "./fareTotals.output";

export const fareTotalsGroup: EndpointGroup = {
  name: "fare-totals",
  cacheStrategy: "STATIC",
  documentation: {
    summary:
      "Calculated fare totals for WSF journeys by selected line items and quantities.",
    description:
      "Fare totals combine individual fare line items with quantities to provide complete pricing breakdowns including departing, return, direction-independent, and grand totals. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Calculate complete journey costs for ticket pricing.",
      "Display fare breakdowns by leg and total amount.",
      "Process payment amounts for ferry trips.",
    ],
    updateFrequency: "daily",
  },
};

export const fetchFareTotalsByTripDateAndRoute = createEndpoint({
  api: apis.wsfFares,
  group: fareTotalsGroup,
  functionName: "fetchFareTotalsByTripDateAndRoute",
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
    "Calculate fare totals for a terminal combination with selected line items and quantities.",
});
