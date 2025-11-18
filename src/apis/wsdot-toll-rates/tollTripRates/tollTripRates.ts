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
export const fetchTollTripRates: (
  params?: FetchFunctionParams<TollTripRatesInput>
) => Promise<TollTripsRates> = createFetchFunction(
  wsdotTollRatesApi.api,
  tollTripRatesGroup,
  tollTripRatesMeta
);

/**
 * React Query hook for retrieving current toll rates for all trips
 */
export const useTollTripRates: (
  params?: FetchFunctionParams<TollTripRatesInput>,
  options?: QueryHookOptions<TollTripsRates>
) => UseQueryResult<TollTripsRates, Error> = createHook(
  wsdotTollRatesApi.api,
  tollTripRatesGroup,
  tollTripRatesMeta
);
