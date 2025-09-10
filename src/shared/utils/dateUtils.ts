/**
 * @fileoverview Date Utilities for WS-Dottie
 *
 * This module provides date formatting and parsing utilities used throughout
 * the WS-Dottie API library. It includes functions for converting between
 * JavaScript Date objects and API-specific date formats, as well as utilities
 * for creating sample parameters in endpoint definitions.
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

// ============================================================================
// SAMPLE PARAMETER UTILITIES
// ============================================================================

/**
 * Generate dynamic sample dates based on current date
 *
 * These dates are always in the future and valid for APIs, preventing
 * HTTP 400 errors from outdated hardcoded dates. Used for most API
 * endpoints that require future dates.
 *
 * @returns Object containing tomorrow and day after tomorrow dates
 *
 * @example
 * ```typescript
 * const dates = getSampleDates();
 * // Use dates.tomorrow for single date parameters
 * // Use dates.dayAfterTomorrow for range end dates
 * ```
 */
export const getSampleDates = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  return { tomorrow, dayAfterTomorrow };
};

/**
 * Generate a date range for testing historical data
 *
 * Uses current month for historical data testing. This provides a reasonable
 * date range that should contain historical data for APIs that support it.
 *
 * @returns Object containing start and end of current month dates
 *
 * @example
 * ```typescript
 * const range = getHistoricalDateRange();
 * // Use range.startOfMonth and range.endOfMonth for historical date ranges
 * ```
 */
export const getHistoricalDateRange = () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return { startOfMonth, endOfMonth };
};

/**
 * Generate a date range for testing current and recent data
 *
 * Uses yesterday and today for testing APIs that need current or recent data.
 * This provides a reasonable date range that should contain current data.
 *
 * @returns Object containing yesterday and today dates
 *
 * @example
 * ```typescript
 * const range = getCurrentDateRange();
 * // Use range.yesterday and range.today for current data ranges
 * ```
 */
export const getCurrentDateRange = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const today = new Date();

  return { yesterday, today };
};

/**
 * Standard date parameter patterns for different API types
 *
 * These patterns provide commonly used date configurations for sample parameters.
 * They can be used directly in endpoint definitions or as building blocks for
 * more complex parameter objects.
 */
export const datePatterns = {
  /** For APIs that expect a single trip date */
  singleDate: () => getSampleDates().tomorrow,

  /** For APIs that expect a date range */
  dateRange: () => ({
    fromDate: getSampleDates().tomorrow,
    toDate: getSampleDates().dayAfterTomorrow,
  }),

  /** For APIs that expect historical data */
  historicalRange: () => getHistoricalDateRange(),
} as const;
