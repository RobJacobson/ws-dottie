// Core shared utilities for WSDOT API client
// This file exports only the shared utilities without any API-specific code

// ============================================================================
// Shared Utilities
// ============================================================================

// Shared utilities (caching, fetching, etc.)
export * from "./shared";

// Note: fetchWsf and fetchWsdot are internal implementation details
// and are not exported from the public API

// ============================================================================
// Legacy Exports (for backward compatibility)
// ============================================================================

// Individual shared module exports for backward compatibility
export * from "./shared/fetching/config";
export * from "./shared/fetching/dateUtils";
export * from "./shared/fetching/errors";
export * from "./shared/fetching/fetchInternal";
export * from "./shared/fetching/fetchWsdot";
export * from "./shared/fetching/fetchWsf";
export * from "./shared/fetching/parseJson";
