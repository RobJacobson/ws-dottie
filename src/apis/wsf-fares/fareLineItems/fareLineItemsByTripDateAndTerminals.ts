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
