/**
 * @fileoverview Shared Utilities and Configurations for WS-Dottie
 *
 * This module serves as the central export point for all shared functionality
 * used across the WS-Dottie API library. It provides a comprehensive suite
 * of utilities designed specifically for Washington State transportation APIs.
 *
 * ## Core Features
 *
 * - **Configuration Management**: Runtime configuration for WSDOT and WSF APIs
 * - **TanStack Query Integration**: Caching strategies optimized for transportation data
 * - **Data Fetching**: Platform-specific strategies (JSONP for browsers, native fetch for servers)
 * - **Type Safety**: Comprehensive TypeScript types and Zod validation schemas
 * - **Error Handling**: Standardized error handling with detailed context information
 * - **Date Utilities**: Specialized date conversion for .NET datetime formats
 * - **Logging**: Environment-aware logging with performance metrics
 *
 * ## Architecture
 *
 * All exports are organized by functionality and designed to work together
 * to provide a consistent developer experience across different API domains.
 * The library follows a modular architecture where each component can be
 * used independently or as part of the complete system.
 *
 * @note Zod validation is always enabled for all API requests to ensure
 * fail-fast error handling and consistent behavior across environments.
 */

// ============================================================================
// TANSTACK QUERY INTEGRATION
// ============================================================================

// TanStack Query utilities and factory functions
export * from "./tanstack";

// ============================================================================
// FETCHING & DATA ACCESS
// ============================================================================

// Complete data fetching system with validation
export * from "./fetching";

// ============================================================================
// ENDPOINT DEFINITIONS
// ============================================================================

// Endpoint definition factory and types
export * from "./endpoints";

// ============================================================================
// UTILITIES
// ============================================================================

// General utilities including configuration and logging
export * from "./utils";

// ============================================================================
// SHARED TYPES
// ============================================================================

// Shared type definitions (excluding CacheStrategy to avoid conflicts)
export type { CacheStrategy } from "./types";
