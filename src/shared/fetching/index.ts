/**
 * Enhanced Data Pipeline for WSDOT and WSF APIs
 *
 * This module provides a structured data pipeline organized by processing stages:
 * - request/: Request preparation (validation, URL building)
 * - execution/: Request execution (strategy selection, fetch operations)
 * - response/: Response processing (validation, transformation)
 *
 * The pipeline provides a clean separation of concerns while maintaining
 * backward compatibility with existing API consumers.
 */

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

/**
 * Data Fetching with Validation
 *
 * This module provides the complete data fetching system with Zod validation,
 * organized by functional responsibility:
 *
 * - pipeline/: Core data pipeline (request → execution → response)
 * - validation/: Zod validation system (core + schemas)
 * - zod/: Zod utilities and date parsing
 */

// ============================================================================
// MAIN ENTRY POINTS
// ============================================================================

// Import the main function first
import { fetchWithValidation } from "./pipeline/fetchWithValidation";

// Main fetching function with validation
export { fetchWithValidation };

// Alias for backward compatibility
export { fetchWithValidation as zodFetch };

// ============================================================================
// PIPELINE COMPONENTS
// ============================================================================

// Core data pipeline components
export * from "./pipeline/errorHandling";
export type { ApiErrorResponse, FetchStrategy } from "./pipeline/execution";
// Execution components (avoiding conflicts with strategies)
// Strategy components
export {
  executeRequest,
  fetchJsonp,
  fetchNative,
  getEnvironmentType,
} from "./pipeline/execution";
export * from "./pipeline/request";
export * from "./pipeline/response";
export type {
  FetchContext,
  FetchSchemas,
  JsonWithDates,
} from "./pipeline/types";

// ============================================================================
// VALIDATION SYSTEM
// ============================================================================

// Validation core functions (for pipeline execution)
export { validateInputs, validateResponse } from "./validation/core";

// Schema construction utilities (for API client use)
export * from "./validation/schemas";

// Validation types
export * from "./validation/types";

// ============================================================================
// ZOD UTILITIES
// ============================================================================

// Zod-specific utilities
export * from "./zod";
