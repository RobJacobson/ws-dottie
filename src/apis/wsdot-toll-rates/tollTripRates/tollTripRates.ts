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
  type TollTripRatesInput,
  tollTripRatesInputSchema,
} from "./shared/tollTripRates.input";
import {
  type TollTripsRates,
  tollTripsRatesSchema,
} from "./shared/tollTripRates.output";

/**
 * Metadata for the fetchTollTripRates endpoint
 */
export const tollTripRatesMeta = {
  functionName: "fetchTollTripRates",
  endpoint: "/getTollTripRatesAsJson",
  inputSchema: tollTripRatesInputSchema,
  outputSchema: tollTripsRatesSchema,
  sampleParams: {},
  endpointDescription: "Get current toll rates for all trips.",
} satisfies EndpointMeta<TollTripRatesInput, TollTripsRates>;

/**
 * Fetch function for retrieving current toll rates for all trips
 */
export const fetchTollTripRates: FetchFactory<
  TollTripRatesInput,
  TollTripsRates
> = createFetchFunction({
  api: wsdotTollRatesApiMeta,
  endpoint: tollTripRatesMeta,
});

/**
 * React Query hook for retrieving current toll rates for all trips
 */
export const useTollTripRates: HookFactory<TollTripRatesInput, TollTripsRates> =
  createHook({
    apiName: wsdotTollRatesApiMeta.name,
    endpointName: tollTripRatesMeta.functionName,
    fetchFn: fetchTollTripRates,
    cacheStrategy: tollTripRatesGroup.cacheStrategy,
  });
