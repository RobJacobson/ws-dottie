/**
 * @fileoverview Test Configuration
 *
 * Central configuration for the e2e test suite, including timeouts,
 * retry settings, and other test-specific configurations.
 */

export interface TestConfig {
  /** Default timeout for API requests */
  defaultTimeout: number;

  /** Maximum retry attempts for failed requests */
  maxRetries: number;

  /** Delay between retry attempts in milliseconds */
  retryDelay: number;

  /** Whether to run performance tests */
  enablePerformanceTests: boolean;

  /** Whether to run data integrity tests */
  enableDataIntegrityTests: boolean;

  /** Whether to run validation tests */
  enableValidationTests: boolean;

  /** API-specific configurations */
  apiConfigs: Record<string, ApiTestConfig>;
}

export interface ApiTestConfig {
  /** Custom timeout for this API */
  timeout?: number;

  /** Custom retry count for this API */
  maxRetries?: number;

  /** Whether to skip this API in tests */
  skip?: boolean;

  /** Custom test categories to run */
  testCategories?: string[];

  /** Rate limiting configuration */
  rateLimit?: {
    requestsPerSecond: number;
    burstLimit: number;
  };
}

/**
 * Default test configuration
 */
export const defaultTestConfig: TestConfig = {
  defaultTimeout: 30000, // 30 seconds
  maxRetries: 3,
  retryDelay: 1000, // 1 second
  enablePerformanceTests: true,
  enableDataIntegrityTests: true,
  enableValidationTests: true,
  apiConfigs: {
    // WSDOT APIs - generally faster
    "wsdot-highway-cameras": {
      timeout: 15000,
      rateLimit: {
        requestsPerSecond: 10,
        burstLimit: 50,
      },
    },
    "wsdot-traffic-flow": {
      timeout: 20000,
      rateLimit: {
        requestsPerSecond: 8,
        burstLimit: 40,
      },
    },
    "wsdot-highway-alerts": {
      timeout: 15000,
      rateLimit: {
        requestsPerSecond: 10,
        burstLimit: 50,
      },
    },

    // WSF APIs - may be slower
    "wsf-fares": {
      timeout: 25000,
      rateLimit: {
        requestsPerSecond: 5,
        burstLimit: 20,
      },
    },
    "wsf-schedule": {
      timeout: 30000,
      rateLimit: {
        requestsPerSecond: 3,
        burstLimit: 15,
      },
    },
    "wsf-terminals": {
      timeout: 20000,
      rateLimit: {
        requestsPerSecond: 5,
        burstLimit: 20,
      },
    },
    "wsf-vessels": {
      timeout: 20000,
      rateLimit: {
        requestsPerSecond: 5,
        burstLimit: 20,
      },
    },
  },
};

/**
 * Gets the effective configuration for an API
 */
export const getApiTestConfig = (apiName: string): ApiTestConfig => {
  return defaultTestConfig.apiConfigs[apiName] || {};
};

/**
 * Gets the effective timeout for an API
 */
export const getApiTimeout = (apiName: string): number => {
  const apiConfig = getApiTestConfig(apiName);
  return apiConfig.timeout || defaultTestConfig.defaultTimeout;
};

/**
 * Gets the effective retry count for an API
 */
export const getApiMaxRetries = (apiName: string): number => {
  const apiConfig = getApiTestConfig(apiName);
  return apiConfig.maxRetries || defaultTestConfig.maxRetries;
};

/**
 * Checks if an API should be skipped in tests
 */
export const shouldSkipApi = (apiName: string): boolean => {
  const apiConfig = getApiTestConfig(apiName);
  return apiConfig.skip === true;
};

/**
 * Gets the rate limit configuration for an API
 */
export const getApiRateLimit = (apiName: string) => {
  const apiConfig = getApiTestConfig(apiName);
  return apiConfig.rateLimit;
};
