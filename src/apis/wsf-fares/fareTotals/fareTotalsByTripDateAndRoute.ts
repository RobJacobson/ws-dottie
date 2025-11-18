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
import { fareTotalsGroup } from "./shared/fareTotals.endpoints";
import {
  type FareTotalsByTripDateAndRouteInput,
  fareTotalsByTripDateAndRouteInputSchema,
} from "./shared/fareTotals.input";
import {
  type FareTotal,
  fareTotalSchema,
} from "./shared/fareTotals.output";

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
} satisfies EndpointMeta<FareTotalsByTripDateAndRouteInput, FareTotal[]>;

/**
 * Fetch function for calculating fare totals for a terminal combination with selected line items and quantities
 */
export const fetchFareTotalsByTripDateAndRoute: (
  params?: FetchFunctionParams<FareTotalsByTripDateAndRouteInput>
) => Promise<FareTotal[]> = createFetchFunction(
  wsfFaresApi.api,
  fareTotalsGroup,
  fareTotalsByTripDateAndRouteMeta
);

/**
 * React Query hook for calculating fare totals for a terminal combination with selected line items and quantities
 */
export const useFareTotalsByTripDateAndRoute: (
  params?: FetchFunctionParams<FareTotalsByTripDateAndRouteInput>,
  options?: QueryHookOptions<FareTotal[]>
) => UseQueryResult<FareTotal[], Error> = createHook(
  wsfFaresApi.api,
  fareTotalsGroup,
  fareTotalsByTripDateAndRouteMeta
);

