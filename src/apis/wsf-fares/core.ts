/**
 * @fileoverview WSF Fares API - Core Functions
 *
 * This module provides strongly-typed functions for WSF Fares API
 * that use the factory function with proper TypeScript types.
 */

import { createApiFunction } from "@/shared/utils/apiFunctionFactory";
import type { FaresCacheFlushDateInput } from "./cacheFlushDate/cacheFlushDate.input";
import type { FaresCacheFlushDateResponse } from "./cacheFlushDate/cacheFlushDate.output";
import type {
  FareLineItemsBasicInput,
  FareLineItemsInput,
  FareLineItemsVerboseInput,
} from "./fareLineItems/fareLineItems.input";
import type {
  LineItemResponse,
  LineItemVerboseResponse,
} from "./fareLineItems/fareLineItems.output";
import type { FareTotalsInput } from "./fareTotals/fareTotals.input";
import type { FareTotalResponse } from "./fareTotals/fareTotals.output";
import type { TerminalComboInput } from "./terminalCombo/terminalCombo.input";
import type { TerminalComboResponse } from "./terminalCombo/terminalCombo.output";
import type {
  TerminalMatesInput,
  TerminalsInput,
} from "./terminals/terminals.input";
import type { TerminalResponse } from "./terminals/terminals.output";
import type { ValidDateRangeInput } from "./validDateRange/validDateRange.input";
import type { ValidDateRangeResponse } from "./validDateRange/validDateRange.output";

// Create strongly-typed functions using the factory
export const getFareLineItemsByTripDateAndTerminals = createApiFunction<
  FareLineItemsInput,
  LineItemResponse[]
>("wsf-fares:getFareLineItemsByTripDateAndTerminals");
export const getFareLineItemsBasic = createApiFunction<
  FareLineItemsBasicInput,
  LineItemResponse[]
>("wsf-fares:getFareLineItemsBasic");
export const getFareLineItemsVerbose = createApiFunction<
  FareLineItemsVerboseInput,
  LineItemVerboseResponse
>("wsf-fares:getFareLineItemsVerbose");
export const getFareTotalsByTripDateAndRoute = createApiFunction<
  FareTotalsInput,
  FareTotalResponse[]
>("wsf-fares:getFareTotalsByTripDateAndRoute");
export const getFaresTerminals = createApiFunction<
  TerminalsInput,
  TerminalResponse[]
>("wsf-fares:getFaresTerminals");
export const getTerminalMates = createApiFunction<
  TerminalMatesInput,
  TerminalResponse[]
>("wsf-fares:getTerminalMates");
export const getTerminalCombo = createApiFunction<
  TerminalComboInput,
  TerminalComboResponse
>("wsf-fares:getTerminalCombo");
export const getFaresValidDateRange = createApiFunction<
  ValidDateRangeInput,
  ValidDateRangeResponse
>("wsf-fares:getFaresValidDateRange");
export const getFaresCacheFlushDate = createApiFunction<
  FaresCacheFlushDateInput,
  FaresCacheFlushDateResponse
>("wsf-fares:getFaresCacheFlushDate");
