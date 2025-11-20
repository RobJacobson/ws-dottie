import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsdotTollRatesApiMeta } from "../apiMeta";
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
export const fetchTripRatesByVersion: FetchFactory<
  TripRatesByVersionInput,
  TollTripsRates
> = createFetchFunction({
  api: wsdotTollRatesApiMeta,
  endpoint: tripRatesByVersionMeta,
});

/**
 * React Query hook for retrieving toll rates for a specific version number
 */
export const useTripRatesByVersion: HookFactory<
  TripRatesByVersionInput,
  TollTripsRates
> = createHook({
  apiName: wsdotTollRatesApiMeta.name,
  endpointName: tripRatesByVersionMeta.functionName,
  fetchFn: fetchTripRatesByVersion,
  cacheStrategy: tollTripRatesGroup.cacheStrategy,
});
