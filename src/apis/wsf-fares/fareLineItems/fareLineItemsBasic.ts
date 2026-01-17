import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfFaresApiMeta } from "../apiMeta";
import {
  type FareLineItemsBasicInput,
  fareLineItemsBasicInputSchema,
} from "./shared/fareLineItems.input";
import { type LineItem, lineItemSchema } from "./shared/fareLineItems.output";

/**
 * Metadata for the fetchFareLineItemsBasic endpoint
 */
export const fareLineItemsBasicMeta = {
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
  toolDescription: {
    purpose:
      "List individual fare components for a specific terminal pair and trip type.",
    useWhen: [
      "building fare selection interfaces with passenger/vehicle options",
      "calculating custom fares based on demographics and vehicle types",
      "understanding available fare categories for a route",
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
    ],
    chaining: [
      "fetchTerminalMatesFares → extract ArrivingTerminalID → call fetchFareLineItemsBasic",
      "fetchFareLineItemsBasic → extract FareLineItemID → call fetchFareTotalsByTripDateAndRoute",
    ],
  },
} satisfies EndpointMeta<FareLineItemsBasicInput, LineItem[]>;

/**
 * Factory result for fare line items basic
 */
const fareLineItemsBasicFactory = createFetchAndHook<
  FareLineItemsBasicInput,
  LineItem[]
>({
  api: wsfFaresApiMeta,
  endpoint: fareLineItemsBasicMeta,
  getEndpointGroup: () =>
    require("./shared/fareLineItems.endpoints").fareLineItemsGroup,
});

/**
 * Fetch function and React Query hook for retrieving popular fare line items for a terminal combination
 */
export const { fetch: fetchFareLineItemsBasic, hook: useFareLineItemsBasic } =
  fareLineItemsBasicFactory;
