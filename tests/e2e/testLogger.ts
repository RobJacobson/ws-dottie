/**
 * @fileoverview Unified Test Logger for E2E Tests
 *
 * This module provides a simple, consistent logging interface for all E2E tests.
 * It consolidates all test logging needs into a single, easy-to-use utility
 * that eliminates the need for direct console calls throughout test files.
 */

/**
 * Unified test logger for consistent E2E test output
 *
 * This logger provides simple, focused logging functions specifically designed
 * for test output. It eliminates the need for direct console calls and ensures
 * consistent formatting across all test files.
 */
export const testLogger = {
  /**
   * Log a test result with status and optional timing
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
   * Log test suite completion
   */
  suiteEnd: (name: string): void => {
    console.log(`🏁 ${name}`);
  },

  /**
   * Log an error message
   */
  error: (message: string): void => {
    console.error(`❌ ${message}`);
  },

  /**
   * Log a warning message
   */
  warn: (message: string): void => {
    console.warn(`⚠️ ${message}`);
  },

  /**
   * Log an info message
   */
  info: (message: string): void => {
    console.log(`ℹ️ ${message}`);
  },

  /**
   * Log test summary with pass/fail counts
   */
  summary: (passed: number, total: number): void => {
    const percentage = total > 0 ? ((passed / total) * 100).toFixed(1) : "0.0";
    console.log(`\n📊 Tests: ${passed}/${total} passed (${percentage}%)`);
  },

  /**
   * Log failed tests list
   */
  failedTests: (failedResults: Array<{ message: string }>): void => {
    if (failedResults.length > 0) {
      console.log(`❌ Failed tests:`);
      failedResults.forEach((result) => {
        console.log(`   - ${result.message}`);
      });
    }
  },

  /**
   * Log batch progress for parallel execution
   */
  batchStart: (
    batchNumber: number,
    totalBatches: number,
    batchSize: number
  ): void => {
    console.log(
      `📦 Batch ${batchNumber}/${totalBatches} (${batchSize} tests)...`
    );
  },

  /**
   * Log parallel execution start
   */
  parallelStart: (totalTests: number, batchSize: number): void => {
    console.log(
      `🚀 Running ${totalTests} tests in batches of ${batchSize}...\n`
    );
  },

  /**
   * Log sequential execution start
   */
  sequentialStart: (totalTests: number): void => {
    console.log(`🚀 Running ${totalTests} tests sequentially...\n`);
  },

  /**
   * Log discovery results
   */
  discoveryResults: (label: string, endpoints: unknown[]): void => {
    console.log(`\n=== ${label} ===`);
    console.log(`Total endpoints: ${endpoints.length}`);
  },

  /**
   * Log validation results
   */
  validationResults: (isValid: boolean, issues?: unknown): void => {
    if (isValid) {
      console.log("All endpoints valid ✓");
    } else {
      console.log("Validation issues:", issues);
    }
  },

  /**
   * Log test suite summary with detailed metrics
   */
  suiteSummary: (summary: Record<string, unknown>): void => {
    console.log("📊 Test Suite Summary:", JSON.stringify(summary, null, 2));
  },
};
