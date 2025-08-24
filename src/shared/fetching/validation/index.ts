/**
 * Validation utilities for WS-Dottie
 *
 * This module provides comprehensive validation functionality organized by responsibility:
 * - core/: Core validation execution functions used by the data pipeline
 * - schemas/: Schema construction utilities for building validation schemas
 * - types.ts: Shared validation type definitions
 *
 * The validation system is designed to separate concerns:
 * - Schema construction (used by API clients to build schemas)
 * - Schema execution (used by the data pipeline to validate data)
 * - Type definitions (shared across the validation system)
 */

// Export core validation functions (for pipeline execution)
export * from "./core";

// Export schema construction utilities (for API client schema building)
export * from "./schemas";

// Export shared validation types
export * from "./types";
