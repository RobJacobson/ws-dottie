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
} from "@/shared/factories/metaEndpointFactory";
import { tollTripRatesGroup } from "./shared/tollTripRates.endpoints";
import {
  type TripRatesByVersionInput,
  tripRatesByVersionInputSchema,
} from "./shared/tollTripRates.input";
import {
  type TollTripsRates,
  tollTripsRatesSchema,
} from "./shared/tollTripRates.output";

/**
 * Metadata for the fetchTripRatesByVersion endpoint
 */
export const tripRatesByVersionMeta = {
  functionName: "fetchTripRatesByVersion",
  endpoint: "/getTripRatesByVersionAsJson?Version={Version}",
  inputSchema: tripRatesByVersionInputSchema,
  outputSchema: tollTripsRatesSchema,
  sampleParams: { Version: 352417 },
  endpointDescription: "Get toll rates for a specific version number.",
} satisfies EndpointMeta<TripRatesByVersionInput, TollTripsRates>;

/**
 * Fetch function for retrieving toll rates for a specific version number
 */
export const fetchTripRatesByVersion: (
  params?: FetchFunctionParams<TripRatesByVersionInput>
) => Promise<TollTripsRates> = createFetchFunction(
  apis.wsdotTollRates,
  tollTripRatesGroup,
  tripRatesByVersionMeta
);

/**
 * React Query hook for retrieving toll rates for a specific version number
 */
export const useTripRatesByVersion: (
  params?: FetchFunctionParams<TripRatesByVersionInput>,
  options?: QueryHookOptions<TollTripsRates>
) => UseQueryResult<TollTripsRates, Error> = createHook(
  apis.wsdotTollRates,
  tollTripRatesGroup,
  tripRatesByVersionMeta
);
