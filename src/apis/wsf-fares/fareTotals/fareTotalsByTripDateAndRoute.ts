import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfFaresApiMeta } from "../apiMeta";
import { fareTotalsGroup } from "./shared/fareTotals.endpoints";
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
} satisfies EndpointMeta<FareTotalsByTripDateAndRouteInput, FareTotal[]>;

/**
 * Fetch function for calculating fare totals for a terminal combination with selected line items and quantities
 */
export const fetchFareTotalsByTripDateAndRoute: FetchFactory<
  FareTotalsByTripDateAndRouteInput,
  FareTotal[]
> = createFetchFunction({
  api: wsfFaresApiMeta,
  endpoint: fareTotalsByTripDateAndRouteMeta,
});

/**
 * React Query hook for calculating fare totals for a terminal combination with selected line items and quantities
 */
export const useFareTotalsByTripDateAndRoute: HookFactory<
  FareTotalsByTripDateAndRouteInput,
  FareTotal[]
> = createHook({
  apiName: wsfFaresApiMeta.name,
  endpointName: fareTotalsByTripDateAndRouteMeta.functionName,
  fetchFn: fetchFareTotalsByTripDateAndRoute,
  cacheStrategy: fareTotalsGroup.cacheStrategy,
});
