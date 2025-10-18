/**
 * @fileoverview Enhanced Test Logger for E2E Tests
 *
 * This module provides comprehensive logging for E2E tests with structured output.
 * Includes methods for test steps, API requests, performance metrics, and error handling.
 */

/**
 * Error categories for structured logging
 */
export enum ErrorCategory {
  VALIDATION = "validation",
  NETWORK = "network",
  HTTP = "http",
  PARSING = "parsing",
  TIMEOUT = "timeout",
  UNKNOWN = "unknown",
}

/**
 * Error severity levels
 */
export enum ErrorSeverity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

/**
 * Error context for structured error reporting
 */
export interface ErrorContext {
  error: Error;
  category: ErrorCategory;
  severity: ErrorSeverity;
  details: {
    endpoint?: string;
    apiName?: string;
    functionName?: string;
    testType?: string;
    duration?: number;
    requestDetails?: {
      params?: Record<string, unknown>;
      url?: string;
    };
    responseDetails?: {
      body?: unknown;
    };
    suggestions?: string[];
  };
}

/**
 * Enhanced test logger with structured logging capabilities
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
   * Check if error is a Zod error
   */
  isZodError: (error: Error): boolean => {
    return (
      error.constructor.name === "ZodError" ||
      error.message.includes("Zod") ||
      (error as any).issues !== undefined
    );
  },

  /**
   * Log Zod validation error
   */
  zodValidationError: (error: Error, details: any): void => {
    console.log(`🔍 Zod validation error:`, error.message);
    if (details) {
      console.log(`   Details:`, details);
    }
  },

  /**
   * Create error context for structured logging
   */
  createErrorContext: (
    error: Error,
    category: ErrorCategory,
    severity: ErrorSeverity,
    details: any
  ): ErrorContext => {
    return {
      error,
      category,
      severity,
      details,
    };
  },

  /**
   * Log structured error
   */
  structuredError: (context: ErrorContext): void => {
    console.log(
      `🚨 ${context.category} error (${context.severity}):`,
      context.error.message
    );
    if (context.details) {
      console.log(`   Details:`, context.details);
    }
  },
};
