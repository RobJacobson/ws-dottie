import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfFaresApiMeta } from "../apiMeta";
import { fareLineItemsGroup } from "./shared/fareLineItems.endpoints";
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
 * Fetch function for retrieving all fare line items for a specific terminal combination and trip type
 */
export const fetchFareLineItemsByTripDateAndTerminals: FetchFactory<
  FareLineItemsByTripDateAndTerminalsInput,
  LineItem[]
> = createFetchFunction({
  api: wsfFaresApiMeta,
  endpoint: fareLineItemsByTripDateAndTerminalsMeta,
});

/**
 * React Query hook for retrieving all fare line items for a specific terminal combination and trip type
 */
export const useFareLineItemsByTripDateAndTerminals: HookFactory<
  FareLineItemsByTripDateAndTerminalsInput,
  LineItem[]
> = createHook({
  apiName: wsfFaresApiMeta.name,
  endpointName: fareLineItemsByTripDateAndTerminalsMeta.functionName,
  fetchFn: fetchFareLineItemsByTripDateAndTerminals,
  cacheStrategy: fareLineItemsGroup.cacheStrategy,
});
