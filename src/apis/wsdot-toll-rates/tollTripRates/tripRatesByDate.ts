import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsdotTollRatesApiMeta } from "../apiMeta";
import { tollTripRatesGroup } from "./shared/tollTripRates.endpoints";
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
 * Fetch function for retrieving historical toll rates for a specified date range
 */
export const fetchTripRatesByDate: FetchFactory<
  TripRatesByDateInput,
  TollTripsRates[]
> = createFetchFunction({
  api: wsdotTollRatesApiMeta,
  endpoint: tripRatesByDateMeta,
});

/**
 * React Query hook for retrieving historical toll rates for a specified date range
 */
export const useTripRatesByDate: HookFactory<
  TripRatesByDateInput,
  TollTripsRates[]
> = createHook({
  apiName: wsdotTollRatesApiMeta.name,
  endpointName: tripRatesByDateMeta.functionName,
  fetchFn: fetchTripRatesByDate,
  cacheStrategy: tollTripRatesGroup.cacheStrategy,
});
