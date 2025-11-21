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
