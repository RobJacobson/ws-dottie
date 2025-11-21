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
