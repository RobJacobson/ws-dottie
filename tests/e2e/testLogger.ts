/**
 * @fileoverview Minimal Test Logger for E2E Tests
 *
 * This module provides concise logging for E2E tests with minimal output.
 * Only essential information is logged to avoid obscuring error messages.
 */

/**
 * Minimal test logger for concise output
 */
export const testLogger = {
  /**
   * Log a simple test result with status
   */
  testResult: (name: string, success: boolean, duration?: number): void => {
    const status = success ? "✅" : "❌";
    const time = duration ? ` (${duration}ms)` : "";
    console.log(`${status} ${name}${time}`);
  },

  /**
   * Log a test result with error details
   */
  testResultWithError: (
    name: string,
    success: boolean,
    error: string,
    duration?: number
  ): void => {
    const status = success ? "✅" : "❌";
    const time = duration ? ` (${duration}ms)` : "";
    console.log(`${status} ${name}${time}`);
    if (!success) {
      console.error(`   Error: ${error}`);
    }
  },

  /**
   * Log test suite start
   */
  suiteStart: (name: string): void => {
    console.log(`🚀 ${name}`);
  },

  /**
   * Log an error message
   */
  error: (message: string): void => {
    console.log(`❌ ${message}`);
  },

  /**
   * Log a warning message
   */
  warn: (message: string): void => {
    console.log(`⚠️ ${message}`);
  },

  /**
   * Log an info message
   */
  info: (message: string): void => {
    console.log(`ℹ️ ${message}`);
  },
};
