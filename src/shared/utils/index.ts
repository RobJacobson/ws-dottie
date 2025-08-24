/**
 * General utilities for WS-Dottie
 * Contains shared utilities that don't belong to specific domains
 */

// NOTE: TanStackOptions has been moved to @/shared/tanstack/types
// to keep TanStack-related types with TanStack functionality

// ============================================================================
// UTILITIES
// ============================================================================

// Re-export logging functionality
export { default as log, type LoggingMode } from "./logger";
