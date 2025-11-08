/**
 * WS-Dottie - Washington State Transportation APIs
 *
 * A comprehensive TypeScript library for accessing Washington State Department of
 * Transportation (WSDOT) and Washington State Ferries (WSF) APIs with built-in
 * validation, caching, and type safety.
 *
 * This library provides:
 * - Type-safe API clients for all WSDOT and WSF endpoints
 * - Automatic data validation using Zod schemas
 * - Smart caching strategies optimized for transportation data
 * - React hooks for seamless integration
 * - CLI interface for command-line usage
 */

// ============================================================================
// ESSENTIAL SHARED UTILITIES
// ============================================================================

export type { ApiError, ErrorContext } from "./shared";
export {
  configManager,
  datesHelper,
  jsDateToYyyyMmDd,
} from "./shared";
export { fetchDottie } from "./shared/fetching";
