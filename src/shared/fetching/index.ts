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

// Import the main functions first
import { zodFetch, zodFetchCustom } from "./pipeline/zodFetch";

// Main fetching functions with validation
export { zodFetch, zodFetchCustom };

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

// Consolidated validation system (core functions + schema utilities)
export {
  validateInputs,
  validateResponse,
  zWsdotDate,
  zLatitude,
  zLongitude,
} from "./validation";

// ============================================================================
// ZOD UTILITIES
// ============================================================================

// Zod-specific utilities
export * from "./zod";
