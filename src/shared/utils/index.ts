/**
 * @fileoverview General utilities for WS-Dottie
 *
 * This module provides general-purpose utilities including configuration
 * management, logging functionality, and date utilities. These utilities
 * are used throughout the WS-Dottie library for common operations.
 */

// Configuration management
export { configManager, type WsdotConfig } from "./configManager";
// Date utilities
export {
  datePatterns,
  datesHelper,
  getCurrentDateRange,
  getSampleDates,
  jsDateToYyyyMmDd,
} from "./dateUtils";
// .NET timestamp utilities
export { parseDotNetTimestamp } from "./dotNetTimestamp";
// Logging utilities
export { default as log, type LoggingMode } from "./logger";
