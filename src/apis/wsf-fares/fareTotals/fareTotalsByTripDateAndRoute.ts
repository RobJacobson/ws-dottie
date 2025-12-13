import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfFaresApiMeta } from "../apiMeta";
import {
  type FareTotalsByTripDateAndRouteInput,
  fareTotalsByTripDateAndRouteInputSchema,
} from "./shared/fareTotals.input";
import { type FareTotal, fareTotalSchema } from "./shared/fareTotals.output";

/**
 * Metadata for the fetchFareTotalsByTripDateAndRoute endpoint
 */
export const fareTotalsByTripDateAndRouteMeta = {
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
  toolDescription: {
    purpose:
      "Calculate total fare costs for selected line items and quantities on a specific route.",
    useWhen: [
      "computing final prices for ferry tickets with specific passenger/vehicle combinations",
      "generating fare quotes based on user selections",
      "processing payment amounts for booking systems",
    ],
    avoidWhen: [
      "you need individual fare components (prefer fetchFareLineItemsBasic or fetchFareLineItemsByTripDateAndTerminals)",
    ],
    inputs: [
      "TripDate: YYYY-MM-DD format",
      "DepartingTerminalID: from fetchTerminalsAndMates → TerminalID",
      "ArrivingTerminalID: from fetchTerminalsAndMates → TerminalID",
      "RoundTrip: boolean",
      "FareLineItemID: comma-separated IDs",
      "Quantity: comma-separated numbers matching FareLineItemID order",
    ],
    returns: "array — fare total breakdowns",
    outputHighlights: [
      "TotalType: 1=Departing, 2=Return, 3=Either (direction independent), 4=Grand Total",
      "Description: human-readable total description",
      "BriefDescription: short form like 'Depart', 'Either', 'Total'",
      "Amount: calculated total cost in dollars",
      "multiple totals showing departing, return, and grand totals",
    ],
    chaining: [
      "fetchFareLineItemsBasic → extract FareLineItemID → call fetchFareTotalsByTripDateAndRoute",
      "fetchFareTotalsByTripDateAndRoute → display total amounts to user",
    ],
  },
} satisfies EndpointMeta<FareTotalsByTripDateAndRouteInput, FareTotal[]>;

/**
 * Factory result for fare totals by trip date and route
 */
const fareTotalsByTripDateAndRouteFactory = createFetchAndHook<
  FareTotalsByTripDateAndRouteInput,
  FareTotal[]
>({
  api: wsfFaresApiMeta,
  endpoint: fareTotalsByTripDateAndRouteMeta,
  getEndpointGroup: () =>
    require("./shared/fareTotals.endpoints").fareTotalsGroup,
});

/**
 * Fetch function and React Query hook for calculating fare totals for a terminal combination with selected line items and quantities
 */
export const {
  fetch: fetchFareTotalsByTripDateAndRoute,
  hook: useFareTotalsByTripDateAndRoute,
} = fareTotalsByTripDateAndRouteFactory;
