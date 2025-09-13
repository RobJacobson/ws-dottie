/**
 * @fileoverview TanStack Query utilities for WS-Dottie
 *
 * This module provides TanStack Query configuration and factory functions
 * for creating standardized query options with appropriate caching strategies.
 * It includes time constants, query options factory, validation utilities,
 * and cache flush date management for WSF APIs.
 */

// Cache flush date utilities for WSF APIs
export * from "./cacheFlushDate";
// Time constants for TanStack Query options
export {
  FIVE_MINUTES,
  FIVE_SECONDS,
  ONE_DAY,
  ONE_HOUR,
  ONE_MINUTE,
  ONE_WEEK,
  SIX_HOURS,
  TEN_MINUTES,
  THIRTY_MINUTES,
  THIRTY_SECONDS,
  TWELVE_HOURS,
  TWO_DAYS,
} from "./constants";
// Query options factory and configurations
export {
  createQueryOptions,
  type QueryOptionsConfig,
  tanstackRefetchOptions,
} from "./factory";
// Validation utilities for TanStack Query
export { zWsdotDate } from "./validation";
