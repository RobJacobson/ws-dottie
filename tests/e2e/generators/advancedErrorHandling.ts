/**
 * @fileoverview Advanced Error Handling and Edge Cases
 *
 * This module provides comprehensive error handling and edge case testing
 * capabilities for the E2E test suite, including retry logic, circuit breakers,
 * and sophisticated error recovery mechanisms.
 */

import type { Endpoint } from "@/shared/endpoints";
import type { EndpointTestConfig } from "./configGenerator";

/**
 * Error handling configuration
 */
export interface ErrorHandlingConfig {
  /** Maximum number of retries for failed requests */
  maxRetries: number;
  /** Base delay between retries in milliseconds */
  baseDelay: number;
  /** Maximum delay between retries in milliseconds */
  maxDelay: number;
  /** Exponential backoff multiplier */
  backoffMultiplier: number;
  /** Jitter factor for retry delays (0-1) */
  jitterFactor: number;
  /** Circuit breaker configuration */
  circuitBreaker: {
    /** Failure threshold before opening circuit */
    failureThreshold: number;
    /** Time window for failure counting in milliseconds */
    timeWindow: number;
    /** Time to wait before attempting to close circuit in milliseconds */
    recoveryTimeout: number;
  };
  /** Timeout configuration */
  timeouts: {
    /** Request timeout in milliseconds */
    requestTimeout: number;
    /** Connection timeout in milliseconds */
    connectionTimeout: number;
    /** Read timeout in milliseconds */
    readTimeout: number;
  };
  /** Error classification rules */
  errorClassification: {
    /** Errors that should trigger retry */
    retryableErrors: string[];
    /** Errors that should trigger circuit breaker */
    circuitBreakerErrors: string[];
    /** Errors that should be ignored */
    ignorableErrors: string[];
  };
}

/**
 * Error handling result
 */
export interface ErrorHandlingResult {
  success: boolean;
  attempts: number;
  totalTime: number;
  errors: Error[];
  finalError?: Error;
  circuitBreakerState: "closed" | "open" | "half-open";
  retryDelays: number[];
}

/**
 * Edge case test scenario
 */
export interface EdgeCaseScenario {
  name: string;
  description: string;
  type:
    | "boundary"
    | "concurrency"
    | "timeout"
    | "network"
    | "data"
    | "resource";
  priority: "low" | "medium" | "high" | "critical";
  setup: () => Promise<void>;
  teardown: () => Promise<void>;
  test: (config: EndpointTestConfig<any, any>) => Promise<boolean>;
  expectedOutcome: "success" | "error" | "timeout" | "retry";
  validation: {
    maxAttempts?: number;
    maxDuration?: number;
    expectedErrorTypes?: string[];
    minSuccessRate?: number;
  };
}

/**
 * Circuit breaker implementation
 */
export class CircuitBreaker {
  private state: "closed" | "open" | "half-open" = "closed";
  private failureCount: number = 0;
  private lastFailureTime: number = 0;
  private nextAttemptTime: number = 0;

  constructor(private config: ErrorHandlingConfig["circuitBreaker"]) {}

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === "open") {
      if (Date.now() < this.nextAttemptTime) {
        throw new Error("Circuit breaker is open");
      }
      this.state = "half-open";
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failureCount = 0;
    this.state = "closed";
  }

  private onFailure(): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.config.failureThreshold) {
      this.state = "open";
      this.nextAttemptTime = Date.now() + this.config.recoveryTimeout;
    }
  }

  getState(): "closed" | "open" | "half-open" {
    return this.state;
  }
}

/**
 * Retry mechanism with exponential backoff
 */
export class RetryMechanism {
  constructor(private config: ErrorHandlingConfig) {}

  async executeWithRetry<T>(
    operation: () => Promise<T>,
    context: string = "operation"
  ): Promise<ErrorHandlingResult> {
    const startTime = Date.now();
    const errors: Error[] = [];
    const retryDelays: number[] = [];
    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        const result = await operation();
        return {
          success: true,
          attempts: attempt + 1,
          totalTime: Date.now() - startTime,
          errors,
          retryDelays,
          circuitBreakerState: "closed",
        };
      } catch (error) {
        lastError = error as Error;
        errors.push(lastError);

        if (attempt < this.config.maxRetries && this.shouldRetry(lastError)) {
          const delay = this.calculateDelay(attempt);
          retryDelays.push(delay);
          await this.sleep(delay);
        } else {
          break;
        }
      }
    }

    return {
      success: false,
      attempts: errors.length,
      totalTime: Date.now() - startTime,
      errors,
      finalError: lastError,
      retryDelays,
      circuitBreakerState: "closed",
    };
  }

  private shouldRetry(error: Error): boolean {
    const errorMessage = error.message.toLowerCase();
    return this.config.errorClassification.retryableErrors.some(
      (retryableError) => errorMessage.includes(retryableError.toLowerCase())
    );
  }

  private calculateDelay(attempt: number): number {
    const baseDelay = this.config.baseDelay;
    const maxDelay = this.config.maxDelay;
    const multiplier = this.config.backoffMultiplier;
    const jitter = this.config.jitterFactor;

    const exponentialDelay = baseDelay * Math.pow(multiplier, attempt);
    const cappedDelay = Math.min(exponentialDelay, maxDelay);
    const jitteredDelay = cappedDelay * (1 + (Math.random() - 0.5) * jitter);

    return Math.max(0, jitteredDelay);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * Advanced error handler
 */
export class AdvancedErrorHandler {
  private circuitBreaker: CircuitBreaker;
  private retryMechanism: RetryMechanism;

  constructor(private config: ErrorHandlingConfig) {
    this.circuitBreaker = new CircuitBreaker(config.circuitBreaker);
    this.retryMechanism = new RetryMechanism(config);
  }

  async executeWithErrorHandling<T>(
    operation: () => Promise<T>,
    context: string = "operation"
  ): Promise<ErrorHandlingResult> {
    return this.circuitBreaker.execute(async () => {
      return this.retryMechanism.executeWithRetry(operation, context);
    });
  }

  getCircuitBreakerState(): "closed" | "open" | "half-open" {
    return this.circuitBreaker.getState();
  }
}

/**
 * Edge case test scenarios
 */
export const createEdgeCaseScenarios = (
  endpoint: Endpoint<unknown, unknown>
): EdgeCaseScenario[] => {
  const scenarios: EdgeCaseScenario[] = [];

  // Boundary value testing
  scenarios.push({
    name: `Boundary Values: ${endpoint.functionName}`,
    description: `Tests boundary values for ${endpoint.functionName}`,
    type: "boundary",
    priority: "medium",
    setup: async () => {
      // Setup boundary test environment
    },
    teardown: async () => {
      // Cleanup boundary test environment
    },
    test: async (config) => {
      try {
        // Test with boundary values
        const boundaryParams = generateBoundaryValues(endpoint);
        await config.apiFunction(boundaryParams as any);
        return true;
      } catch (error) {
        // Boundary values might cause errors, which is expected
        return error instanceof Error && error.message.includes("validation");
      }
    },
    expectedOutcome: "success",
    validation: {
      maxAttempts: 3,
      maxDuration: 30000,
      expectedErrorTypes: ["validation", "boundary"],
    },
  });

  // Concurrency testing
  scenarios.push({
    name: `Concurrency: ${endpoint.functionName}`,
    description: `Tests concurrent access to ${endpoint.functionName}`,
    type: "concurrency",
    priority: "high",
    setup: async () => {
      // Setup concurrency test environment
    },
    teardown: async () => {
      // Cleanup concurrency test environment
    },
    test: async (config) => {
      const concurrency = 5;
      const promises = Array(concurrency)
        .fill(null)
        .map(() => config.apiFunction(config.validParams as any));

      try {
        const results = await Promise.allSettled(promises);
        const successCount = results.filter(
          (r) => r.status === "fulfilled"
        ).length;
        return successCount >= concurrency * 0.8; // 80% success rate
      } catch (error) {
        return false;
      }
    },
    expectedOutcome: "success",
    validation: {
      maxAttempts: 1,
      maxDuration: 60000,
      minSuccessRate: 0.8,
    },
  });

  // Timeout testing
  scenarios.push({
    name: `Timeout: ${endpoint.functionName}`,
    description: `Tests timeout behavior for ${endpoint.functionName}`,
    type: "timeout",
    priority: "medium",
    setup: async () => {
      // Setup timeout test environment
    },
    teardown: async () => {
      // Cleanup timeout test environment
    },
    test: async (config) => {
      try {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 1000)
        );

        await Promise.race([
          config.apiFunction(config.validParams as any),
          timeoutPromise,
        ]);

        return false; // Should have timed out
      } catch (error) {
        return error instanceof Error && error.message.includes("Timeout");
      }
    },
    expectedOutcome: "timeout",
    validation: {
      maxAttempts: 1,
      maxDuration: 5000,
      expectedErrorTypes: ["timeout"],
    },
  });

  // Network error simulation
  scenarios.push({
    name: `Network Error: ${endpoint.functionName}`,
    description: `Tests network error handling for ${endpoint.functionName}`,
    type: "network",
    priority: "medium",
    setup: async () => {
      // Setup network error simulation
    },
    teardown: async () => {
      // Cleanup network error simulation
    },
    test: async (config) => {
      try {
        // Simulate network error by using invalid URL
        const originalUrl = config.endpointDefinition.urlTemplate;
        (config.endpointDefinition as any).urlTemplate =
          "https://invalid-url-that-should-fail.com/api";

        await config.apiFunction(config.validParams as any);

        // Restore original URL
        (config.endpointDefinition as any).urlTemplate = originalUrl;
        return false; // Should have failed
      } catch (error) {
        // Restore original URL
        (config.endpointDefinition as any).urlTemplate = originalUrl;
        return (
          error instanceof Error &&
          (error.message.includes("network") ||
            error.message.includes("fetch") ||
            error.message.includes("ENOTFOUND"))
        );
      }
    },
    expectedOutcome: "error",
    validation: {
      maxAttempts: 1,
      maxDuration: 30000,
      expectedErrorTypes: ["network", "fetch", "ENOTFOUND"],
    },
  });

  // Data corruption testing
  scenarios.push({
    name: `Data Corruption: ${endpoint.functionName}`,
    description: `Tests data corruption handling for ${endpoint.functionName}`,
    type: "data",
    priority: "low",
    setup: async () => {
      // Setup data corruption test environment
    },
    teardown: async () => {
      // Cleanup data corruption test environment
    },
    test: async (config) => {
      try {
        // Test with corrupted parameters
        const corruptedParams = generateCorruptedParams(endpoint);
        await config.apiFunction(corruptedParams as any);
        return false; // Should have failed
      } catch (error) {
        return (
          error instanceof Error &&
          (error.message.includes("validation") ||
            error.message.includes("schema") ||
            error.message.includes("invalid"))
        );
      }
    },
    expectedOutcome: "error",
    validation: {
      maxAttempts: 1,
      maxDuration: 30000,
      expectedErrorTypes: ["validation", "schema", "invalid"],
    },
  });

  // Resource exhaustion testing
  scenarios.push({
    name: `Resource Exhaustion: ${endpoint.functionName}`,
    description: `Tests resource exhaustion handling for ${endpoint.functionName}`,
    type: "resource",
    priority: "low",
    setup: async () => {
      // Setup resource exhaustion test environment
    },
    teardown: async () => {
      // Cleanup resource exhaustion test environment
    },
    test: async (config) => {
      try {
        // Test with resource-intensive parameters
        const resourceIntensiveParams =
          generateResourceIntensiveParams(endpoint);
        await config.apiFunction(resourceIntensiveParams as any);
        return true;
      } catch (error) {
        // Resource exhaustion might cause errors, which is expected
        return (
          error instanceof Error &&
          (error.message.includes("resource") ||
            error.message.includes("memory") ||
            error.message.includes("timeout"))
        );
      }
    },
    expectedOutcome: "success",
    validation: {
      maxAttempts: 1,
      maxDuration: 120000,
      expectedErrorTypes: ["resource", "memory", "timeout"],
    },
  });

  return scenarios;
};

/**
 * Helper functions for edge case testing
 */
function generateBoundaryValues(endpoint: Endpoint<unknown, unknown>): unknown {
  // This is a simplified implementation
  // In a real implementation, you would analyze the input schema
  // and generate appropriate boundary values
  return endpoint.sampleParams || {};
}

function generateCorruptedParams(
  endpoint: Endpoint<unknown, unknown>
): unknown {
  // Generate parameters with corrupted data
  const baseParams = endpoint.sampleParams || {};
  return {
    ...baseParams,
    corruptedField: "corrupted_data_that_should_fail_validation",
    invalidType: 123, // Wrong type
    nullValue: null,
    undefinedValue: undefined,
  };
}

function generateResourceIntensiveParams(
  endpoint: Endpoint<unknown, unknown>
): unknown {
  // Generate parameters that might be resource-intensive
  const baseParams = endpoint.sampleParams || {};
  return {
    ...baseParams,
    largeData: "x".repeat(10000), // Large string
    deepObject: createDeepObject(10), // Deep nested object
    largeArray: Array(1000).fill("data"), // Large array
  };
}

function createDeepObject(depth: number): any {
  if (depth <= 0) return "leaf";
  return {
    level: depth,
    nested: createDeepObject(depth - 1),
  };
}

/**
 * Default error handling configuration
 */
export const DEFAULT_ERROR_HANDLING_CONFIG: ErrorHandlingConfig = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
  jitterFactor: 0.1,
  circuitBreaker: {
    failureThreshold: 5,
    timeWindow: 60000, // 1 minute
    recoveryTimeout: 30000, // 30 seconds
  },
  timeouts: {
    requestTimeout: 30000,
    connectionTimeout: 10000,
    readTimeout: 20000,
  },
  errorClassification: {
    retryableErrors: [
      "network",
      "timeout",
      "ECONNRESET",
      "ENOTFOUND",
      "ETIMEDOUT",
      "ECONNREFUSED",
    ],
    circuitBreakerErrors: [
      "server error",
      "internal error",
      "service unavailable",
      "gateway timeout",
    ],
    ignorableErrors: [
      "validation error",
      "not found",
      "unauthorized",
      "forbidden",
    ],
  },
};

/**
 * Creates error handling configuration for a specific endpoint
 */
export const createErrorHandlingConfig = (
  endpoint: Endpoint<unknown, unknown>
): ErrorHandlingConfig => {
  const baseConfig = { ...DEFAULT_ERROR_HANDLING_CONFIG };

  // Adjust configuration based on endpoint characteristics
  if (endpoint.cacheStrategy === "REALTIME_UPDATES") {
    baseConfig.maxRetries = 1; // Fewer retries for real-time data
    baseConfig.baseDelay = 500; // Shorter delays
  } else if (endpoint.cacheStrategy === "WEEKLY_STATIC") {
    baseConfig.maxRetries = 5; // More retries for static data
    baseConfig.baseDelay = 2000; // Longer delays
  }

  return baseConfig;
};

/**
 * Creates advanced error handler for an endpoint
 */
export const createAdvancedErrorHandler = (
  endpoint: Endpoint<unknown, unknown>
): AdvancedErrorHandler => {
  const config = createErrorHandlingConfig(endpoint);
  return new AdvancedErrorHandler(config);
};
