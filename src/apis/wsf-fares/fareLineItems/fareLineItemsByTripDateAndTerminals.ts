import type { UseQueryResult } from "@tanstack/react-query";
import { apis } from "@/apis/shared/apis";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
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
export const fetchFareLineItemsByTripDateAndTerminals: (
  params?: FetchFunctionParams<FareLineItemsByTripDateAndTerminalsInput>
) => Promise<LineItem[]> = createFetchFunction(
  apis.wsfFares,
  fareLineItemsGroup,
  fareLineItemsByTripDateAndTerminalsMeta
);

/**
 * React Query hook for retrieving all fare line items for a specific terminal combination and trip type
 */
export const useFareLineItemsByTripDateAndTerminals: (
  params?: FetchFunctionParams<FareLineItemsByTripDateAndTerminalsInput>,
  options?: QueryHookOptions<LineItem[]>
) => UseQueryResult<LineItem[], Error> = createHook(
  apis.wsfFares,
  fareLineItemsGroup,
  fareLineItemsByTripDateAndTerminalsMeta
);
