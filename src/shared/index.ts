/**
 * @fileoverview Shared utilities and configurations for WS-Dottie
 *
 * This module serves as the central export point for all shared functionality
 * used across the WS-Dottie API library. It provides:
 *
 * - Configuration management for WSDOT and WSF APIs
 * - TanStack Query caching strategies optimized for transportation APIs
 * - Fetching utilities with platform-specific strategies (JSONP for browsers, native fetch for servers)
 * - React hooks for data fetching with automatic cache invalidation
 * - Validation schemas and template utilities
 * - Zod-based data validation and transformation (always enabled)
 *
 * All exports are organized by functionality and designed to work together
 * to provide a consistent developer experience across different API domains.
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
// UTILITIES
// ============================================================================

// General utilities including configuration and logging
export * from "./utils";
