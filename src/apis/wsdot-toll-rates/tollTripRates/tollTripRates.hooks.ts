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

export const useTollTripRates: (
  params?: TollTripRatesInput,
  options?: QueryHookOptions<TollTripsRates>
) => UseQueryResult<TollTripsRates, Error> = hooks.useTollTripRates;

export const useTripRatesByDate: (
  params?: TripRatesByDateInput,
  options?: QueryHookOptions<TollTripsRates[]>
) => UseQueryResult<TollTripsRates[], Error> = hooks.useTripRatesByDate;

export const useTripRatesByVersion: (
  params?: TripRatesByVersionInput,
  options?: QueryHookOptions<TollTripsRates>
) => UseQueryResult<TollTripsRates, Error> = hooks.useTripRatesByVersion;
