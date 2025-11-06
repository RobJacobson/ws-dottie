/**
 * @fileoverview General utilities for WS-Dottie
 *
 * This module provides general-purpose utilities including configuration
 * management, logging functionality, and date utilities. These utilities
 * are used throughout the WS-Dottie library for common operations.
 */

// Factory functions (re-exported from factories folder)
export type { FetchFunctionParams } from "../factories/fetchFunctionFactory";
export { createFetchFunction } from "../factories/fetchFunctionFactory";
export type { HookOptions, HookParams } from "../factories/hookFactory";
// Configuration management
export { configManager } from "./configManager";
// Date utilities (consolidated)
export {
  datesHelper,
  jsDateToYyyyMmDd,
} from "./dateUtils";
// JSON parsing utilities
export { parseJsonWithFallback } from "./jsonParser";
// Logging utilities
export { logApiCall, logApiResults, logger } from "./logger";
