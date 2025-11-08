/**
 * @fileoverview Shared Utilities and Configurations for WS-Dottie
 *
 * This module serves as the central export point for essential shared functionality
 * used by consumers of the WS-Dottie API library.
 */

// ============================================================================
// DATE UTILITIES
// ============================================================================

// Date utilities for handling .NET datetime formats
export {
  configManager,
  datesHelper,
  jsDateToYyyyMmDd,
} from "./utils";

// ============================================================================
// ERROR TYPES
// ============================================================================

// Error handling types for consumers
export type {
  ApiError,
  ErrorContext,
} from "./fetching";
