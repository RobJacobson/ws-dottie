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
// ALL APIs (WSDOT & WSF)
// ============================================================================

// Export all APIs and their types from the centralized apis directory
export * from "./apis";

// ============================================================================
// ESSENTIAL SHARED UTILITIES
// ============================================================================

// Export error types for error handling
export type {
  ApiError,
  ErrorContext,
} from "./shared";
// Export only essential shared utilities needed by consumers
export {
  datesHelper,
  jsDateToYyyyMmDd,
} from "./shared";
