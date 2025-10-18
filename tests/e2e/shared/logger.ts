/**
 * @fileoverview Enhanced Test Logger for E2E Tests
 *
 * This module provides enhanced logging for E2E tests with hierarchical output.
 * Includes methods for test steps, API requests, performance metrics, and error handling.
 */

/**
 * Enhanced test logger with hierarchical logging capabilities
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

  /**
   * Log a test step
   */
  testStep: (message: string, details?: Record<string, unknown>): void => {
    console.log(`📋 ${message}`);
    if (details) {
      console.log(`   Details:`, details);
    }
  },

  /**
   * Log API request
   */
  apiRequest: (endpoint: any, params: any): void => {
    console.log(
      `➡️  API Request: ${endpoint.api}.${endpoint.functionName}`,
      params
    );
  },

  /**
   * Log API response
   */
  apiResponse: (endpoint: any, result: any, duration: number): void => {
    console.log(
      `⬅️  API Response: ${endpoint.api}.${endpoint.functionName} (${duration}ms)`
    );
  },

  /**
   * Log performance metrics
   */
  performance: (message: string, duration: number): void => {
    console.log(`⏱️  ${message}: ${duration}ms`);
  },

  /**
   * Log API start with hierarchical formatting
   */
  apiStart: (apiName: string, endpointCount: number): void => {
    console.log(`\n🔍 Testing API: ${apiName} (${endpointCount} endpoints)`);
  },

  /**
   * Log pending test with detailed information
   */
  pendingTest: (
    apiName: string,
    endpointName: string,
    details?: Record<string, unknown>
  ): void => {
    console.log(`\n⏳ Testing ${apiName}.${endpointName}`);
    if (details) {
      console.log(`   Endpoint: ${details.endpoint || "N/A"}`);
      console.log(`   Function: ${details.functionName || "N/A"}`);
    }
  },

  /**
   * Log roll-up summary
   */
  rollupSummary: (
    passed: number,
    total: number,
    failedList?: Array<{ endpoint: string; error: string }>
  ): void => {
    console.log(`\n📊 Roll-up Summary: ${passed}/${total} tests passed`);

    if (failedList && failedList.length > 0) {
      console.log(`\n❌ ${failedList.length} tests failed:`);
      failedList.forEach((failure) => {
        console.log(`   • ${failure.endpoint}: ${failure.error}`);
      });
    } else if (total > 0) {
      console.log(`✅ All ${total} tests passed!`);
    }
  },
};
