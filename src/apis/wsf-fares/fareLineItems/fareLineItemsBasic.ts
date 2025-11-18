import type { UseQueryResult } from "@tanstack/react-query";
import { wsfFaresApi } from "../api";
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
} satisfies EndpointMeta<FareLineItemsBasicInput, LineItem[]>;

/**
 * Fetch function for retrieving popular fare line items for a terminal combination
 */
export const fetchFareLineItemsBasic: (
  params?: FetchFunctionParams<FareLineItemsBasicInput>
) => Promise<LineItem[]> = createFetchFunction(
  wsfFaresApi.api,
  fareLineItemsGroup,
  fareLineItemsBasicMeta
);

/**
 * React Query hook for retrieving popular fare line items for a terminal combination
 */
export const useFareLineItemsBasic: (
  params?: FetchFunctionParams<FareLineItemsBasicInput>,
  options?: QueryHookOptions<LineItem[]>
) => UseQueryResult<LineItem[], Error> = createHook(
  wsfFaresApi.api,
  fareLineItemsGroup,
  fareLineItemsBasicMeta
);
