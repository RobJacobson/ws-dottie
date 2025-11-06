import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsdotTollRatesApi } from "../apiDefinition";
import { tollTripRatesResource } from "./tollTripRates.endpoints";
import type {
  TollTripRatesInput,
  TripRatesByDateInput,
  TripRatesByVersionInput,
} from "./tollTripRates.input";
import type { TollTripsRates } from "./tollTripRates.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotTollRatesApi,
  tollTripRatesResource
);

export const fetchTollTripRates = fetchFunctions.fetchTollTripRates as (
  params?: FetchFunctionParams<TollTripRatesInput>
) => Promise<TollTripsRates>;

export const fetchTripRatesByDate = fetchFunctions.fetchTripRatesByDate as (
  params?: FetchFunctionParams<TripRatesByDateInput>
) => Promise<TollTripsRates[]>;

export const fetchTripRatesByVersion =
  fetchFunctions.fetchTripRatesByVersion as (
    params?: FetchFunctionParams<TripRatesByVersionInput>
  ) => Promise<TollTripsRates>;
