/**
 * @fileoverview Advanced Test Scenarios Generator
 *
 * This module creates sophisticated test scenarios using endpoint meta data
 * to provide comprehensive testing coverage beyond basic validation.
 */

import type { Endpoint } from "@/shared/endpoints";
import type { EndpointTestConfig } from "./configGenerator";

/**
 * Advanced test scenario configuration
 */
export interface AdvancedTestScenario<TParams, TOutput> {
  name: string;
  description: string;
  category:
    | "cache-strategy"
    | "performance"
    | "error-handling"
    | "data-integrity"
    | "edge-cases"
    | "integration";
  priority: "low" | "medium" | "high" | "critical";
  params: TParams | (() => Promise<TParams>);
  expectation: "success" | "error" | "timeout" | "validation-error";
  timeout?: number;
  retries?: number;
  skipConditions?: string[];
  validationRules?: {
    responseTime?: number;
    dataShape?: boolean;
    dataContent?: boolean;
    cacheBehavior?: boolean;
  };
  metaData?: Record<string, unknown>;
}

/**
 * Cache strategy test scenarios based on endpoint meta data
 */
export const createCacheStrategyScenarios = <TParams, TOutput>(
  endpoint: Endpoint<TParams, TOutput>
): AdvancedTestScenario<TParams, TOutput>[] => {
  const scenarios: AdvancedTestScenario<TParams, TOutput>[] = [];

  // Cache strategy validation
  scenarios.push({
    name: `Cache Strategy: ${endpoint.cacheStrategy}`,
    description: `Validates that ${endpoint.cacheStrategy} caching strategy works correctly`,
    category: "cache-strategy",
    priority: "high",
    params: (endpoint.sampleParams || ({} as Partial<TParams>)) as TParams,
    expectation: "success",
    timeout: getCacheStrategyTimeout(endpoint.cacheStrategy),
    validationRules: {
      cacheBehavior: true,
      responseTime: getCacheStrategyResponseTime(endpoint.cacheStrategy),
    },
    metaData: {
      cacheStrategy: endpoint.cacheStrategy,
      expectedRefreshInterval: getCacheRefreshInterval(endpoint.cacheStrategy),
    },
  });

  // Cache invalidation test
  if (endpoint.cacheStrategy !== "NONE") {
    scenarios.push({
      name: "Cache Invalidation Test",
      description: "Tests cache invalidation behavior after data refresh",
      category: "cache-strategy",
      priority: "medium",
      params: (endpoint.sampleParams || ({} as Partial<TParams>)) as TParams,
      expectation: "success",
      timeout: getCacheStrategyTimeout(endpoint.cacheStrategy) * 2,
      validationRules: {
        cacheBehavior: true,
      },
      metaData: {
        testType: "cache-invalidation",
        cacheStrategy: endpoint.cacheStrategy,
      },
    });
  }

  return scenarios;
};

/**
 * Performance test scenarios based on endpoint characteristics
 */
export const createPerformanceScenarios = <TParams, TOutput>(
  endpoint: Endpoint<TParams, TOutput>
): AdvancedTestScenario<TParams, TOutput>[] => {
  const scenarios: AdvancedTestScenario<TParams, TOutput>[] = [];

  // Load testing
  scenarios.push({
    name: "Load Testing",
    description: "Tests endpoint performance under load",
    category: "performance",
    priority: "high",
    params: (endpoint.sampleParams || ({} as Partial<TParams>)) as TParams,
    expectation: "success",
    timeout: 60000, // 1 minute
    retries: 3,
    validationRules: {
      responseTime: getPerformanceThreshold(endpoint.cacheStrategy),
    },
    metaData: {
      testType: "load-testing",
      expectedConcurrency: getExpectedConcurrency(endpoint.cacheStrategy),
    },
  });

  // Stress testing
  scenarios.push({
    name: "Stress Testing",
    description: "Tests endpoint behavior under stress conditions",
    category: "performance",
    priority: "medium",
    params: (endpoint.sampleParams || ({} as Partial<TParams>)) as TParams,
    expectation: "success",
    timeout: 120000, // 2 minutes
    retries: 2,
    validationRules: {
      responseTime: getPerformanceThreshold(endpoint.cacheStrategy) * 2,
    },
    metaData: {
      testType: "stress-testing",
      stressLevel: "high",
    },
  });

  // Memory usage testing
  scenarios.push({
    name: "Memory Usage Test",
    description: "Tests memory usage patterns during endpoint execution",
    category: "performance",
    priority: "low",
    params: (endpoint.sampleParams || ({} as Partial<TParams>)) as TParams,
    expectation: "success",
    timeout: 30000,
    validationRules: {
      responseTime: getPerformanceThreshold(endpoint.cacheStrategy),
    },
    metaData: {
      testType: "memory-usage",
      monitorMemory: true,
    },
  });

  return scenarios;
};

/**
 * Error handling test scenarios
 */
export const createErrorHandlingScenarios = <TParams, TOutput>(
  endpoint: Endpoint<TParams, TOutput>
): AdvancedTestScenario<TParams, TOutput>[] => {
  const scenarios: AdvancedTestScenario<TParams, TOutput>[] = [];

  // Invalid parameters
  scenarios.push({
    name: "Invalid Parameters Test",
    description: "Tests endpoint behavior with invalid parameters",
    category: "error-handling",
    priority: "high",
    params: {} as TParams, // Empty params should trigger validation error
    expectation: "validation-error",
    timeout: 10000,
    validationRules: {
      dataShape: false, // Don't validate data shape for error cases
    },
    metaData: {
      testType: "invalid-parameters",
      expectedError: "validation-error",
    },
  });

  // Network timeout simulation
  scenarios.push({
    name: "Network Timeout Test",
    description: "Tests endpoint behavior under network timeout conditions",
    category: "error-handling",
    priority: "medium",
    params: (endpoint.sampleParams || ({} as Partial<TParams>)) as TParams,
    expectation: "timeout",
    timeout: 5000, // Short timeout to trigger timeout error
    retries: 1,
    metaData: {
      testType: "network-timeout",
      simulatedTimeout: true,
    },
  });

  // Rate limiting test
  scenarios.push({
    name: "Rate Limiting Test",
    description: "Tests endpoint behavior under rate limiting conditions",
    category: "error-handling",
    priority: "medium",
    params: (endpoint.sampleParams || ({} as Partial<TParams>)) as TParams,
    expectation: "error",
    timeout: 30000,
    metaData: {
      testType: "rate-limiting",
      simulateRateLimit: true,
    },
  });

  return scenarios;
};

/**
 * Data integrity test scenarios
 */
export const createDataIntegrityScenarios = <TParams, TOutput>(
  endpoint: Endpoint<TParams, TOutput>
): AdvancedTestScenario<TParams, TOutput>[] => {
  const scenarios: AdvancedTestScenario<TParams, TOutput>[] = [];

  // Schema validation consistency
  scenarios.push({
    name: "Schema Validation Consistency",
    description:
      "Tests that schema validation is consistent across multiple calls",
    category: "data-integrity",
    priority: "high",
    params: (endpoint.sampleParams || ({} as Partial<TParams>)) as TParams,
    expectation: "success",
    timeout: 30000,
    validationRules: {
      dataShape: true,
      dataContent: true,
    },
    metaData: {
      testType: "schema-consistency",
      multipleCalls: true,
    },
  });

  // Data freshness validation
  scenarios.push({
    name: "Data Freshness Validation",
    description: "Tests that returned data is fresh and not stale",
    category: "data-integrity",
    priority: "medium",
    params: (endpoint.sampleParams || ({} as Partial<TParams>)) as TParams,
    expectation: "success",
    timeout: 30000,
    validationRules: {
      dataContent: true,
    },
    metaData: {
      testType: "data-freshness",
      checkTimestamps: true,
    },
  });

  return scenarios;
};

/**
 * Edge case test scenarios
 */
export const createEdgeCaseScenarios = <TParams, TOutput>(
  endpoint: Endpoint<TParams, TOutput>
): AdvancedTestScenario<TParams, TOutput>[] => {
  const scenarios: AdvancedTestScenario<TParams, TOutput>[] = [];

  // Boundary value testing
  scenarios.push({
    name: "Boundary Value Testing",
    description: "Tests endpoint behavior with boundary values",
    category: "edge-cases",
    priority: "medium",
    params: generateBoundaryValues(endpoint),
    expectation: "success",
    timeout: 20000,
    validationRules: {
      dataShape: true,
    },
    metaData: {
      testType: "boundary-values",
      boundaryTest: true,
    },
  });

  // Concurrent access testing
  scenarios.push({
    name: "Concurrent Access Test",
    description: "Tests endpoint behavior under concurrent access",
    category: "edge-cases",
    priority: "medium",
    params: (endpoint.sampleParams || ({} as Partial<TParams>)) as TParams,
    expectation: "success",
    timeout: 60000,
    metaData: {
      testType: "concurrent-access",
      concurrencyLevel: 5,
    },
  });

  return scenarios;
};

/**
 * Integration test scenarios
 */
export const createIntegrationScenarios = <TParams, TOutput>(
  endpoint: Endpoint<TParams, TOutput>
): AdvancedTestScenario<TParams, TOutput>[] => {
  const scenarios: AdvancedTestScenario<TParams, TOutput>[] = [];

  // API integration test
  scenarios.push({
    name: "API Integration Test",
    description: "Tests full API integration with real endpoints",
    category: "integration",
    priority: "critical",
    params: (endpoint.sampleParams || ({} as Partial<TParams>)) as TParams,
    expectation: "success",
    timeout: 60000,
    retries: 2,
    validationRules: {
      responseTime: getPerformanceThreshold(endpoint.cacheStrategy),
      dataShape: true,
      dataContent: true,
    },
    metaData: {
      testType: "api-integration",
      realEndpoint: true,
    },
  });

  // End-to-end workflow test
  scenarios.push({
    name: "End-to-End Workflow Test",
    description: "Tests complete workflow from request to response",
    category: "integration",
    priority: "high",
    params: (endpoint.sampleParams || ({} as Partial<TParams>)) as TParams,
    expectation: "success",
    timeout: 120000,
    validationRules: {
      responseTime: getPerformanceThreshold(endpoint.cacheStrategy) * 1.5,
      dataShape: true,
      dataContent: true,
    },
    metaData: {
      testType: "end-to-end",
      workflowTest: true,
    },
  });

  return scenarios;
};

/**
 * Creates comprehensive advanced test scenarios for an endpoint
 */
export const createAdvancedTestScenarios = <TParams, TOutput>(
  endpoint: Endpoint<TParams, TOutput>
): AdvancedTestScenario<TParams, TOutput>[] => {
  const scenarios: AdvancedTestScenario<TParams, TOutput>[] = [];

  // Add all scenario types
  scenarios.push(...createCacheStrategyScenarios(endpoint));
  scenarios.push(...createPerformanceScenarios(endpoint));
  scenarios.push(...createErrorHandlingScenarios(endpoint));
  scenarios.push(...createDataIntegrityScenarios(endpoint));
  scenarios.push(...createEdgeCaseScenarios(endpoint));
  scenarios.push(...createIntegrationScenarios(endpoint));

  // Sort by priority and category
  return scenarios.sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    const categoryOrder = {
      integration: 0,
      "cache-strategy": 1,
      performance: 2,
      "error-handling": 3,
      "data-integrity": 4,
      "edge-cases": 5,
    };

    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }

    return categoryOrder[a.category] - categoryOrder[b.category];
  });
};

/**
 * Helper functions for cache strategy configuration
 */
function getCacheStrategyTimeout(cacheStrategy: string): number {
  const timeouts: Record<string, number> = {
    REALTIME_UPDATES: 10000,
    MINUTE_UPDATES: 15000,
    FIVE_MINUTE_UPDATES: 20000,
    HOURLY_UPDATES: 30000,
    DAILY_UPDATES: 60000,
    DAILY_STATIC: 120000,
    WEEKLY_STATIC: 180000,
    NONE: 30000,
  };
  return timeouts[cacheStrategy] || 30000;
}

function getCacheStrategyResponseTime(cacheStrategy: string): number {
  const responseTimes: Record<string, number> = {
    REALTIME_UPDATES: 2000,
    MINUTE_UPDATES: 5000,
    FIVE_MINUTE_UPDATES: 8000,
    HOURLY_UPDATES: 10000,
    DAILY_UPDATES: 15000,
    DAILY_STATIC: 30000,
    WEEKLY_STATIC: 45000,
    NONE: 10000,
  };
  return responseTimes[cacheStrategy] || 10000;
}

function getCacheRefreshInterval(cacheStrategy: string): number {
  const intervals: Record<string, number> = {
    REALTIME_UPDATES: 5000,
    MINUTE_UPDATES: 60000,
    FIVE_MINUTE_UPDATES: 300000,
    HOURLY_UPDATES: 3600000,
    DAILY_UPDATES: 86400000,
    DAILY_STATIC: 86400000,
    WEEKLY_STATIC: 604800000,
    NONE: 0,
  };
  return intervals[cacheStrategy] || 0;
}

function getPerformanceThreshold(cacheStrategy: string): number {
  const thresholds: Record<string, number> = {
    REALTIME_UPDATES: 1000,
    MINUTE_UPDATES: 2000,
    FIVE_MINUTE_UPDATES: 3000,
    HOURLY_UPDATES: 5000,
    DAILY_UPDATES: 10000,
    DAILY_STATIC: 15000,
    WEEKLY_STATIC: 20000,
    NONE: 5000,
  };
  return thresholds[cacheStrategy] || 5000;
}

function getExpectedConcurrency(cacheStrategy: string): number {
  const concurrency: Record<string, number> = {
    REALTIME_UPDATES: 10,
    MINUTE_UPDATES: 5,
    FIVE_MINUTE_UPDATES: 3,
    HOURLY_UPDATES: 2,
    DAILY_UPDATES: 1,
    DAILY_STATIC: 1,
    WEEKLY_STATIC: 1,
    NONE: 5,
  };
  return concurrency[cacheStrategy] || 5;
}

function generateBoundaryValues<TParams>(
  endpoint: Endpoint<TParams, unknown>
): TParams {
  // This is a simplified implementation
  // In a real implementation, you would analyze the input schema
  // and generate appropriate boundary values
  return (endpoint.sampleParams || {}) as TParams;
}

/**
 * Creates advanced test scenarios for all endpoints in a configuration
 */
export const createAdvancedScenariosForConfig = <TParams, TOutput>(
  config: EndpointTestConfig<TParams, TOutput>
): AdvancedTestScenario<TParams, TOutput>[] => {
  return createAdvancedTestScenarios(config.endpointDefinition);
};

/**
 * Filters scenarios by category and priority
 */
export const filterScenarios = <TParams, TOutput>(
  scenarios: AdvancedTestScenario<TParams, TOutput>[],
  options: {
    categories?: string[];
    priorities?: string[];
    maxScenarios?: number;
  } = {}
): AdvancedTestScenario<TParams, TOutput>[] => {
  let filtered = scenarios;

  if (options.categories) {
    filtered = filtered.filter((scenario) =>
      options.categories!.includes(scenario.category)
    );
  }

  if (options.priorities) {
    filtered = filtered.filter((scenario) =>
      options.priorities!.includes(scenario.priority)
    );
  }

  if (options.maxScenarios) {
    filtered = filtered.slice(0, options.maxScenarios);
  }

  return filtered;
};
