/**
 * Universal date utilities for API test configurations
 *
 * This module provides standardized date generation functions that ensure
 * all API tests use consistent, future-oriented dates that are always valid
 * for the APIs being tested.
 */

/**
 * Generate dynamic test dates based on current date
 * - Tomorrow's date for single date parameters
 * - Day after tomorrow for range end dates
 *
 * This ensures all tests use dates that are always in the future and valid
 * for the APIs, preventing HTTP 400 errors from outdated hardcoded dates.
 */
export const getTestDates = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  return { tomorrow, dayAfterTomorrow };
};

/**
 * Generate a date range for testing historical data
 * Uses current month for historical data testing
 */
export const getHistoricalDateRange = () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return { startOfMonth, endOfMonth };
};

/**
 * Generate invalid dates for error testing
 * These are intentionally invalid to test error handling
 */
export const getInvalidDates = () => {
  return {
    pastDate: new Date("2020-01-01"),
    futureDate: new Date("2030-01-01"),
    invalidDate: new Date("invalid"),
  };
};

/**
 * Standard date parameter patterns for different API types
 */
export const datePatterns = {
  // For APIs that expect a single trip date
  singleDate: () => getTestDates().tomorrow,

  // For APIs that expect a date range
  dateRange: () => ({
    fromDate: getTestDates().tomorrow,
    toDate: getTestDates().dayAfterTomorrow,
  }),

  // For APIs that expect historical data
  historicalRange: () => getHistoricalDateRange(),

  // For error testing
  invalidDates: () => getInvalidDates(),
};
