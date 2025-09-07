/**
 * @fileoverview Date utilities for WS-Dottie
 *
 * This module provides date formatting and parsing utilities used throughout
 * the WS-Dottie API library. It includes functions for converting between
 * JavaScript Date objects and API-specific date formats.
 */

// ============================================================================
// DATE FORMATTING UTILITIES
// ============================================================================

/**
 * Converts a JavaScript Date to ISO date stamp (YYYY-MM-DD)
 *
 * This function formats dates in the standard ISO format expected by
 * WSDOT and WSF APIs. All APIs use the YYYY-MM-DD format for date parameters.
 *
 * @param date - The JavaScript Date object to convert
 * @returns ISO date string in YYYY-MM-DD format
 *
 * @example
 * ```typescript
 * const date = new Date('2024-12-25');
 * const formatted = jsDateToYyyyMmDd(date); // "2024-12-25"
 * ```
 */
export const jsDateToYyyyMmDd = (date: Date): string => {
  return date.toISOString().split("T")[0];
};
