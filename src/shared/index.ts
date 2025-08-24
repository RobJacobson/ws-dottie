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

// TanStack Query configuration with pre-optimized strategies
export { tanstackQueryOptions } from "./config";
// Configuration management for API keys and base URLs
export { configManager, type WsdotConfig } from "./configManager";

// ============================================================================
// FETCHING & DATA ACCESS
// ============================================================================

// Platform-specific fetching strategies and error handling
export * from "./fetching";

// ============================================================================
// REACT INTEGRATION
// ============================================================================

// Core utilities including types, logging, and React Query hooks
export * from "./utils";

// ============================================================================
// VALIDATION & SCHEMAS
// ============================================================================

// Validation utilities and template functions for consistent schemas
export * from "./validation";
// Zod-based validation schemas and data transformation utilities
export * from "./zod";
