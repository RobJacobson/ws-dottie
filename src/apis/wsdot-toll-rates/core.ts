/**
 * @fileoverview WSDOT Toll Rates API - Core Functions
 *
 * This module provides strongly-typed functions for WSDOT Toll Rates API
 * that use the factory function with proper TypeScript types.
 */

import { createApiFunction } from "@/shared/utils/apiFunctionFactory";
import type { GetTollRatesInput } from "./tollRates/tollRates.input";
import type { TollRate } from "./tollRates/tollRates.output";
import type { GetTollTripInfoInput } from "./tollTripInfo/tollTripInfo.input";
import type { TollTripInfo } from "./tollTripInfo/tollTripInfo.output";
import type {
  GetTollTripRatesInput,
  GetTripRatesByDateInput,
  GetTripRatesByVersionInput,
} from "./tollTripRates/tollTripRates.input";
import type { TollTripsRates } from "./tollTripRates/tollTripRates.output";
import type { GetTollTripVersionInput } from "./tollTripVersion/tollTripVersion.input";
import type { TollTripVersion } from "./tollTripVersion/tollTripVersion.output";

// Create strongly-typed functions using the factory
export const getTollRates = createApiFunction<GetTollRatesInput, TollRate[]>(
  "wsdot-toll-rates:getTollRates"
);
export const getTollTripInfo = createApiFunction<
  GetTollTripInfoInput,
  TollTripInfo[]
>("wsdot-toll-rates:getTollTripInfo");
export const getTollTripRates = createApiFunction<
  GetTollTripRatesInput,
  TollTripsRates
>("wsdot-toll-rates:getTollTripRates");
export const getTripRatesByDate = createApiFunction<
  GetTripRatesByDateInput,
  TollTripsRates[]
>("wsdot-toll-rates:getTripRatesByDate");
export const getTripRatesByVersion = createApiFunction<
  GetTripRatesByVersionInput,
  TollTripsRates
>("wsdot-toll-rates:getTripRatesByVersion");
export const getTollTripVersion = createApiFunction<
  GetTollTripVersionInput,
  TollTripVersion
>("wsdot-toll-rates:getTollTripVersion");
