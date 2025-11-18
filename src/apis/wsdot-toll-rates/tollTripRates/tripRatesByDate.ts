import type { UseQueryResult } from "@tanstack/react-query";
import { wsdotTollRatesApi } from "../api";
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
export const fetchTripRatesByDate: (
  params?: FetchFunctionParams<TripRatesByDateInput>
) => Promise<TollTripsRates[]> = createFetchFunction(
  wsdotTollRatesApi.api,
  tollTripRatesGroup,
  tripRatesByDateMeta
);

/**
 * React Query hook for retrieving historical toll rates for a specified date range
 */
export const useTripRatesByDate: (
  params?: FetchFunctionParams<TripRatesByDateInput>,
  options?: QueryHookOptions<TollTripsRates[]>
) => UseQueryResult<TollTripsRates[], Error> = createHook(
  wsdotTollRatesApi.api,
  tollTripRatesGroup,
  tripRatesByDateMeta
);
