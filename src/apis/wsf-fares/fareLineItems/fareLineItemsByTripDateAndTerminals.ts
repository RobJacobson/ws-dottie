import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfFaresApiMeta } from "../apiMeta";
import {
  type FareLineItemsByTripDateAndTerminalsInput,
  fareLineItemsByTripDateAndTerminalsInputSchema,
} from "./shared/fareLineItems.input";
import { type LineItem, lineItemSchema } from "./shared/fareLineItems.output";

/**
 * Metadata for the fetchFareLineItemsByTripDateAndTerminals endpoint
 */
export const fareLineItemsByTripDateAndTerminalsMeta = {
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
  toolDescription: {
    purpose:
      "List complete fare components for a specific terminal pair and trip type.",
    useWhen: [
      "getting all available fare options for a route (not just popular ones)",
      "building detailed fare selection with all passenger/vehicle categories",
      "analyzing complete fare structures for specific journeys",
    ],
    avoidWhen: [
      "you need fare totals (prefer fetchFareTotalsByTripDateAndRoute)",
      "you need all terminal combinations (prefer fetchFareLineItemsVerbose)",
    ],
    inputs: [
      "TripDate: YYYY-MM-DD format",
      "DepartingTerminalID: from fetchTerminalsAndMates → TerminalID",
      "ArrivingTerminalID: from fetchTerminalsAndMates → TerminalID",
      "RoundTrip: boolean, from terminal endpoints",
    ],
    returns: "array — one item per fare component",
    outputHighlights: [
      "FareLineItemID: numeric identifier for the fare component",
      "FareLineItem: human-readable fare description",
      "Category: grouping like 'Passenger' or 'Vehicle'",
      "DirectionIndependent: whether fare is same in both directions",
      "Amount: cost in dollars for this fare component",
      "includes all fare types available for the specific route",
    ],
    chaining: [
      "fetchTerminalMatesFares → extract ArrivingTerminalID → call fetchFareLineItemsByTripDateAndTerminals",
      "fetchFareLineItemsByTripDateAndTerminals → extract FareLineItemID → call fetchFareTotalsByTripDateAndRoute",
    ],
  },
} satisfies EndpointMeta<FareLineItemsByTripDateAndTerminalsInput, LineItem[]>;

/**
 * Factory result for fare line items by trip date and terminals
 */
const fareLineItemsByTripDateAndTerminalsFactory = createFetchAndHook<
  FareLineItemsByTripDateAndTerminalsInput,
  LineItem[]
>({
  api: wsfFaresApiMeta,
  endpoint: fareLineItemsByTripDateAndTerminalsMeta,
  getEndpointGroup: () =>
    require("./shared/fareLineItems.endpoints").fareLineItemsGroup,
});

/**
 * Fetch function and React Query hook for retrieving all fare line items for a specific terminal combination and trip type
 */
export const {
  fetch: fetchFareLineItemsByTripDateAndTerminals,
  hook: useFareLineItemsByTripDateAndTerminals,
} = fareLineItemsByTripDateAndTerminalsFactory;
