import type { UseQueryResult } from "@tanstack/react-query";
import { wsdotTollRatesApi } from "@/apis/wsdot-toll-rates/apiDefinition";
import {
  createHooks,
  type FetchFunctionParams,
  type QueryHookOptions,
} from "@/shared/factories";
import { tollTripRatesResource } from "./tollTripRates.endpoints";
import * as fetchFunctions from "./tollTripRates.fetch";
import type {
  TollTripRatesInput,
  TripRatesByDateInput,
  TripRatesByVersionInput,
} from "./tollTripRates.input";
import type { TollTripsRates } from "./tollTripRates.output";

const hooks = createHooks(
  wsdotTollRatesApi,
  tollTripRatesResource,
  fetchFunctions
);

export const useTollTripRates: (
  params?: FetchFunctionParams<TollTripRatesInput>,
  options?: QueryHookOptions<TollTripsRates>
) => UseQueryResult<TollTripsRates, Error> = hooks.useTollTripRates;

export const useTripRatesByDate: (
  params?: FetchFunctionParams<TripRatesByDateInput>,
  options?: QueryHookOptions<TollTripsRates[]>
) => UseQueryResult<TollTripsRates[], Error> = hooks.useTripRatesByDate;

export const useTripRatesByVersion: (
  params?: FetchFunctionParams<TripRatesByVersionInput>,
  options?: QueryHookOptions<TollTripsRates>
) => UseQueryResult<TollTripsRates, Error> = hooks.useTripRatesByVersion;
