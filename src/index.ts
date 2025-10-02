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
// SHARED UTILITIES
// ============================================================================

// Core shared functionality
export * from "./shared";

// ============================================================================
// ALL APIs (WSDOT & WSF)
// ============================================================================

// Export all APIs and their types from the centralized apis directory
export * from "./apis";

// ============================================================================
// ============================================================================
// TYPES
// ============================================================================

// Note: Common types are now exported through shared utilities
// The types.ts file previously contained unused schema generation types
