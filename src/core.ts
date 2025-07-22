// Core shared utilities for WSDOT API client
// This file exports only the shared utilities without any API-specific code

// ============================================================================
// Shared Utilities
// ============================================================================

// Shared utilities (caching, fetching, etc.)
export * from "./shared";

// ============================================================================
// Legacy Exports (for backward compatibility)
// ============================================================================

// Individual shared module exports for backward compatibility
export * from "./shared/fetching/config";
export * from "./shared/fetching/dateUtils";
export * from "./shared/fetching/errors";
export * from "./shared/fetching/fetchInternal";
export * from "./shared/fetching/parseJson";
