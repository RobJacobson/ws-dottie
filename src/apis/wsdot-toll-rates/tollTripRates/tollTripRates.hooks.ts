import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsdotTollRatesApi } from "../apiDefinition";
import { tollTripRatesResource } from "./tollTripRates.endpoints";
import * as fetchFunctions from "./tollTripRates.fetch";
import type {
  TollTripRatesInput,
  TripRatesByDateInput,
  TripRatesByVersionInput,
} from "./tollTripRates.input";
import type { TollTripsRates } from "./tollTripRates.output";

const hooks = createEndpointGroupHooks(
  wsdotTollRatesApi,
  tollTripRatesResource,
  fetchFunctions
);

export const useTollTripRates = hooks.useTollTripRates as (
  params?: TollTripRatesInput,
  options?: QueryHookOptions<TollTripsRates>
) => UseQueryResult<TollTripsRates, Error>;

export const useTripRatesByDate = hooks.useTripRatesByDate as (
  params?: TripRatesByDateInput,
  options?: QueryHookOptions<TollTripsRates[]>
) => UseQueryResult<TollTripsRates[], Error>;

export const useTripRatesByVersion = hooks.useTripRatesByVersion as (
  params?: TripRatesByVersionInput,
  options?: QueryHookOptions<TollTripsRates>
) => UseQueryResult<TollTripsRates, Error>;
