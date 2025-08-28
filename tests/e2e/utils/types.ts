import type { z } from "zod";

/**
 * Configuration for testing a single API endpoint
 */
export interface EndpointTestConfig<TParams, TOutput> {
  /** The API function to test */
  apiFunction: (params: TParams) => Promise<TOutput>;

  /** Zod schema for input parameter validation (optional for parameterless endpoints) */
  inputSchema?: z.ZodSchema<TParams>;

  /** Zod schema for output validation */
  outputSchema: z.ZodSchema<TOutput>;

  /** Valid parameters to test with */
  validParams: TParams;

  /** Invalid parameters to test error handling */
  invalidParams: Array<{
    params: unknown;
    expectedError: string;
  }>;

  /** Additional test data specific to this endpoint */
  testData?: Record<string, unknown>;

  /** Name of the endpoint for test descriptions */
  endpointName: string;

  /** Category of endpoint for specialized testing */
  category:
    | "parameterless"
    | "parameterized"
    | "date-based"
    | "id-based"
    | "search"
    | "cache-info";

  /** Maximum acceptable response time in milliseconds */
  maxResponseTime?: number;

  /** Whether this endpoint requires authentication */
  requiresAuth?: boolean;

  /** Custom test cases specific to this endpoint */
  customTests?: Array<{
    name: string;
    test: () => Promise<void>;
  }>;

  /** Whether this endpoint returns a single value instead of an array */
  isSingleValue?: boolean;
}

/**
 * Configuration for an entire API module
 */
export interface ApiModuleConfig {
  /** Name of the API module */
  moduleName: string;

  /** List of endpoints to test */
  endpoints: EndpointTestConfig<any, any>[];

  /** Shared test data for all endpoints in this module */
  sharedTestData?: Record<string, unknown>;

  /** Global settings for this module */
  settings?: {
    /** Default max response time for all endpoints */
    defaultMaxResponseTime?: number;

    /** Whether all endpoints require authentication */
    requiresAuth?: boolean;

    /** Rate limiting considerations */
    rateLimitDelay?: number;
  };
}

/**
 * Test execution options
 */
export interface TestExecutionOptions {
  /** Whether to run tests in parallel */
  parallel?: boolean;

  /** Maximum number of concurrent tests */
  maxConcurrency?: number;

  /** Whether to include performance tests */
  includePerformance?: boolean;

  /** Whether to include error handling tests */
  includeErrorHandling?: boolean;

  /** Custom timeout for all tests */
  timeout?: number;
}

/**
 * Test result information
 */
export interface TestResult {
  endpointName: string;
  success: boolean;
  duration: number;
  error?: string;
  category: string;
}

/**
 * Performance test result
 */
export interface PerformanceTestResult {
  endpointName: string;
  averageResponseTime: number;
  minResponseTime: number;
  maxResponseTime: number;
  samples: number;
  withinLimit: boolean;
}

/**
 * Schema validation result
 */
export interface SchemaValidationResult {
  endpointName: string;
  inputValidation?: {
    success: boolean;
    error?: string;
  };
  outputValidation: {
    success: boolean;
    error?: string;
    dataType?: string;
    dataSize?: number;
  };
}
