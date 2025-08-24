/**
 * Zod utilities for WS-Dottie
 *
 * This module provides Zod-specific utilities that are not part of the main
 * data pipeline. The main data pipeline components have been moved to the
 * fetching module for better organization.
 *
 * Remaining utilities:
 * - Date parsing functions for WSDOT date formats
 */

// Date parsing utilities (core Zod-specific functionality)
export {
  isWsdotDateString,
  jsDateToYyyyMmDd,
  wsdotDateTimestampToJsDate,
} from "./dateParsers";

// NOTE: Other utilities have been moved to the fetching pipeline:
// - URL building and validation utilities → src/shared/fetching/
// - Error handling → src/shared/fetching/
// - Main fetch function → src/shared/fetching/fetchWithValidation
