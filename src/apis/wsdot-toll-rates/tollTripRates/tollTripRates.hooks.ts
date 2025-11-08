import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsdotTollRatesApi } from "../apiDefinition";
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
