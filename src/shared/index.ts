/**
 * Shared utilities and configurations for WS-Dottie
 *
 * This module serves as the central export point for all shared functionality
 * used across the WS-Dottie API library. It provides:
 *
 * - Configuration management for WSDOT and WSF APIs
 * - TanStack Query caching strategies optimized for transportation APIs
 * - Fetching utilities with platform-specific strategies
 * - React hooks for data fetching with automatic cache invalidation
 * - Validation schemas and template utilities
 * - Zod-based data validation and transformation (always enabled)
 *
 * All exports are organized by functionality and designed to work together
 * to provide a consistent developer experience across different API domains.
 *
 * Note: Zod validation is always enabled for all API requests to ensure
 * fail-fast error handling and consistent behavior across environments.
 */

// ============================================================================
// CONFIGURATION & CACHING
// ============================================================================

// Configuration management for API keys and base URLs
export { configManager, type WsdotConfig } from "./config";
// TanStack Query types
export type { TanStackOptions } from "./tanstack";
// TanStack Query configuration with pre-optimized strategies
// TanStack Query hooks
export { tanstackQueryOptions, useQueryWithAutoUpdate } from "./tanstack";

// ============================================================================
// FETCHING & DATA ACCESS
// ============================================================================

// Complete data fetching system with validation
export * from "./fetching";

// ============================================================================
// REACT INTEGRATION
// ============================================================================

// Core utilities including types and logging
export * from "./utils";

// ============================================================================
// VALIDATION & SCHEMAS
// ============================================================================

// All validation and schema functionality is now under fetching
// Re-export for backward compatibility
export {
  createDateRangeParams,
  createVesselIdDescription,
  zLatitude,
  zLongitude,
  zNullableBoolean,
  zNullableNumber,
  zNullableString,
  zPositiveInteger,
  // Schema construction (for API clients)
  zWsdotDate,
  zWsdotNullableDate,
} from "./fetching/validation/schemas";

// Zod utilities (date parsing)
export {
  isWsdotDateString,
  jsDateToYyyyMmDd,
  wsdotDateTimestampToJsDate,
} from "./fetching/zod";
