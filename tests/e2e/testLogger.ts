/**
 * @fileoverview Simple Test Logger for E2E Tests
 *
 * This module provides basic logging for E2E tests with simple output.
 * Includes methods for test steps, API requests, performance metrics, and error handling.
 */

/**
 * Simple test logger with basic logging capabilities
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
};
