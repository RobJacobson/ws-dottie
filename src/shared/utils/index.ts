/**
 * @fileoverview General utilities for WS-Dottie
 *
 * This module provides general-purpose utilities including configuration
 * management, logging functionality, and date utilities. These utilities
 * are used throughout the WS-Dottie library for common operations.
 */

// Configuration management
export { configManager } from "./configManager";
// Date utilities (consolidated)
export {
  datesHelper,
  jsDateToYyyyMmDd,
  wsdotDateTimeToJSDate as wsdotTimeToJSDate,
} from "./dateUtils";
// Logging utilities
export { logApiCall, logApiResults, logger } from "./logger";
