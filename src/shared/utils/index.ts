/**
 * @fileoverview General utilities for WS-Dottie
 *
 * This module provides general-purpose utilities including configuration
 * management, logging functionality, and date utilities. These utilities
 * are used throughout the WS-Dottie library for common operations.
 *
 * Note: parseJsonWithFallback, logApiCall, logApiResults, and logger are
 * internal-only and not exported. Import them directly from their modules
 * if needed.
 */

// Configuration management
export { configManager } from "./configManager";
// Date utilities (consolidated)
export {
  datesHelper,
  jsDateToYyyyMmDd,
} from "./dateUtils";
