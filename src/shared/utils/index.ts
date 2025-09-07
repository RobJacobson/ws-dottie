/**
 * @fileoverview General utilities for WS-Dottie
 *
 * This module provides general-purpose utilities including configuration
 * management, logging functionality, and date utilities. These utilities
 * are used throughout the WS-Dottie library for common operations.
 */

// Configuration management
export { configManager, type WsdotConfig } from "./configManager";

// Logging utilities
export { default as log, type LoggingMode } from "./logger";

// Date utilities
export { jsDateToYyyyMmDd } from "./dateUtils";
