import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsdotTollRatesApiMeta } from "../apiMeta";
import {
  type TripRatesByDateInput,
  tripRatesByDateInputSchema,
} from "./shared/tollTripRates.input";
import {
  type TollTripsRates,
  tollTripsRatesSchema,
} from "./shared/tollTripRates.output";

/**
 * Metadata for the fetchTripRatesByDate endpoint
 */
export const tripRatesByDateMeta = {
  functionName: "fetchTripRatesByDate",
  endpoint: "/getTripRatesByDateAsJson?FromDate={FromDate}&ToDate={ToDate}",
  inputSchema: tripRatesByDateInputSchema,
  outputSchema: tollTripsRatesSchema.array(),
  sampleParams: {
    FromDate: datesHelper.yesterday(),
    ToDate: datesHelper.today(),
  },
  endpointDescription: "Get historical toll rates for a specified date range.",
  toolDescription: {
    purpose: "Get historical toll rates for a specified date range.",
    useWhen: [
      "analyzing toll rate changes over time",
      "historical toll cost comparisons",
      "trend analysis for toll pricing",
    ],
    avoidWhen: [
      "you need current rates only (prefer fetchTollTripRates)",
      "you need rates for a specific version (prefer fetchTripRatesByVersion)",
    ],
    inputsHighlights: "FromDate, ToDate in YYYY-MM-DD format",
    returns:
      "array — one item per day in date range, each containing trip rates for that day",
    outputHighlights: [
      "Array structure: one TollTripsRates object per day in the date range",
      "Each day: LastUpdated, Version, Trips array with rate details",
      "Rate details: TripName, Toll amount, Message text, MessageUpdateTime",
      "Version tracking: each day has its own version number",
      "Large payload: returns historical data for entire date range",
    ],
  },
} satisfies EndpointMeta<TripRatesByDateInput, TollTripsRates[]>;

/**
 * Factory result for trip rates by date
 */
const tripRatesByDateFactory = createFetchAndHook<
  TripRatesByDateInput,
  TollTripsRates[]
>({
  api: wsdotTollRatesApiMeta,
  endpoint: tripRatesByDateMeta,
  getEndpointGroup: () =>
    require("./shared/tollTripRates.endpoints").tollTripRatesGroup,
});

/**
 * Fetch function and React Query hook for retrieving historical toll rates for a specified date range
 */
export const { fetch: fetchTripRatesByDate, hook: useTripRatesByDate } =
  tripRatesByDateFactory;
