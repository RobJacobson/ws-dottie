/**
 * @fileoverview TanStack Query utilities for WS-Dottie
 *
 * This module provides TanStack Query configuration and factory functions
 * for creating standardized query options with appropriate caching strategies.
 * It includes time constants, query options factory, validation utilities,
 * and cache flush date management for WSF APIs.
 */

// Time constants for TanStack Query options
export {
  THIRTY_SECONDS,
  FIVE_SECONDS,
  ONE_MINUTE,
  FIVE_MINUTES,
  TEN_MINUTES,
  THIRTY_MINUTES,
  ONE_HOUR,
  SIX_HOURS,
  TWELVE_HOURS,
  ONE_DAY,
  TWO_DAYS,
  ONE_WEEK,
} from "./constants";

// Query options factory and configurations
export {
  createQueryOptions,
  tanstackRefetchOptions,
  type QueryOptionsConfig,
} from "./factory";

// Validation utilities for TanStack Query
export { zWsdotDate } from "./validation";

// Cache flush date utilities for WSF APIs
export * from "./cacheFlushDate";
