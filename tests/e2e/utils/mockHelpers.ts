/**
 * @fileoverview Mock Helpers for Modern E2E Test Suite
 *
 * This module provides mock helpers for testing endpoints without making actual API calls,
 * including mock data generation based on endpoint schemas and mock API responses.
 */

import type { Endpoint } from "@/shared/endpoints";
import { z } from "zod";

/**
 * Mock configuration for endpoint testing
 */
export interface MockConfig {
  /** Whether to use mock data instead of real API calls */
  useMocks: boolean;

  /** Mock response delay in milliseconds */
  mockDelay: number;

  /** Whether to simulate network errors */
  simulateNetworkErrors: boolean;

  /** Error simulation probability (0-1) */
  errorProbability: number;

  /** Custom mock data overrides */
  customMockData?: Record<string, unknown>;
}

/**
 * Default mock configuration
 */
export const defaultMockConfig: MockConfig = {
  useMocks: false,
  mockDelay: 100,
  simulateNetworkErrors: false,
  errorProbability: 0.1,
  customMockData: {},
};

/**
 * Mock data generator based on Zod schema
 */
export class MockDataGenerator {
  private config: MockConfig;

  constructor(config: Partial<MockConfig> = {}) {
    this.config = { ...defaultMockConfig, ...config };
  }

  /**
   * Generates mock data based on an endpoint's output schema
   */
  generateMockOutput<T>(endpoint: Endpoint<unknown, T>): T {
    const mockData = this.generateFromSchema(endpoint.outputSchema);

    // Apply custom overrides if provided
    if (this.config.customMockData?.[endpoint.functionName]) {
      return {
        ...mockData,
        ...this.config.customMockData[endpoint.functionName],
      } as T;
    }

    return mockData as T;
  }

  /**
   * Generates mock input data based on an endpoint's input schema
   */
  generateMockInput<T>(endpoint: Endpoint<T, unknown>): T {
    const mockData = this.generateFromSchema(endpoint.inputSchema);

    // Apply custom overrides if provided
    if (this.config.customMockData?.[`${endpoint.functionName}_input`]) {
      return {
        ...mockData,
        ...this.config.customMockData[`${endpoint.functionName}_input`],
      } as T;
    }

    return mockData as T;
  }

  /**
   * Generates mock data from a Zod schema
   */
  private generateFromSchema(schema: z.ZodSchema): unknown {
    if (schema instanceof z.ZodString) {
      return this.generateString(schema);
    }

    if (schema instanceof z.ZodNumber) {
      return this.generateNumber(schema);
    }

    if (schema instanceof z.ZodBoolean) {
      return this.generateBoolean(schema);
    }

    if (schema instanceof z.ZodDate) {
      return this.generateDate(schema);
    }

    if (schema instanceof z.ZodArray) {
      return this.generateArray(schema);
    }

    if (schema instanceof z.ZodObject) {
      return this.generateObject(schema);
    }

    if (schema instanceof z.ZodUnion) {
      return this.generateUnion(schema);
    }

    if (schema instanceof z.ZodOptional) {
      return this.generateOptional(schema);
    }

    if (schema instanceof z.ZodNullable) {
      return this.generateNullable(schema);
    }

    // Default fallback
    return this.generateDefaultValue(schema);
  }

  /**
   * Generates a mock string value
   */
  private generateString(_schema: z.ZodString): string {
    const examples = [
      "sample-string",
      "test-value",
      "mock-data",
      "example-text",
      "placeholder",
    ];

    return examples[Math.floor(Math.random() * examples.length)];
  }

  /**
   * Generates a mock number value
   */
  private generateNumber(schema: z.ZodNumber): number {
    const min = schema.minValue ?? 0;
    const max = schema.maxValue ?? 100;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generates a mock boolean value
   */
  private generateBoolean(_schema: z.ZodBoolean): boolean {
    return Math.random() > 0.5;
  }

  /**
   * Generates a mock date value
   */
  private generateDate(_schema: z.ZodDate): Date {
    const now = new Date();
    const randomOffset = Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000); // Random offset within a year
    return new Date(now.getTime() + randomOffset);
  }

  /**
   * Generates a mock array value
   */
  private generateArray(schema: z.ZodArray<z.ZodSchema>): unknown[] {
    const length = Math.floor(Math.random() * 5) + 1; // 1-5 items
    const items: unknown[] = [];

    for (let i = 0; i < length; i++) {
      items.push(this.generateFromSchema(schema.element));
    }

    return items;
  }

  /**
   * Generates a mock object value
   */
  private generateObject(
    schema: z.ZodObject<Record<string, z.ZodSchema>>
  ): Record<string, unknown> {
    const shape = schema.shape;
    const obj: Record<string, unknown> = {};

    Object.entries(shape).forEach(([key, fieldSchema]) => {
      obj[key] = this.generateFromSchema(fieldSchema);
    });

    return obj;
  }

  /**
   * Generates a mock union value
   */
  private generateUnion(schema: z.ZodUnion<z.ZodSchema[]>): unknown {
    const options = schema.options;
    const randomOption = options[Math.floor(Math.random() * options.length)];
    return this.generateFromSchema(randomOption);
  }

  /**
   * Generates a mock optional value
   */
  private generateOptional(schema: z.ZodOptional<z.ZodSchema>): unknown {
    // 70% chance of generating a value, 30% chance of undefined
    if (Math.random() < 0.7) {
      return this.generateFromSchema(schema.unwrap());
    }
    return undefined;
  }

  /**
   * Generates a mock nullable value
   */
  private generateNullable(schema: z.ZodNullable<z.ZodSchema>): unknown {
    // 80% chance of generating a value, 20% chance of null
    if (Math.random() < 0.8) {
      return this.generateFromSchema(schema.unwrap());
    }
    return null;
  }

  /**
   * Generates a default value for unknown schema types
   */
  private generateDefaultValue(schema: z.ZodSchema): unknown {
    // Try to infer type from schema name or use a generic default
    if (schema.constructor.name.includes("String")) {
      return "mock-value";
    }
    if (schema.constructor.name.includes("Number")) {
      return 42;
    }
    if (schema.constructor.name.includes("Boolean")) {
      return true;
    }
    if (schema.constructor.name.includes("Array")) {
      return [];
    }
    if (schema.constructor.name.includes("Object")) {
      return {};
    }

    return "mock-data";
  }
}

/**
 * Mock API function that simulates endpoint behavior
 */
export const createMockApiFunction = <TParams, TOutput>(
  endpoint: Endpoint<TParams, TOutput>,
  config: Partial<MockConfig> = {}
): ((params: TParams) => Promise<TOutput>) => {
  const mockConfig = { ...defaultMockConfig, ...config };
  const generator = new MockDataGenerator(mockConfig);

  return async (params: TParams): Promise<TOutput> => {
    // Simulate network delay
    if (mockConfig.mockDelay > 0) {
      await new Promise((resolve) => setTimeout(resolve, mockConfig.mockDelay));
    }

    // Simulate network errors
    if (
      mockConfig.simulateNetworkErrors &&
      Math.random() < mockConfig.errorProbability
    ) {
      throw new Error(
        `Mock network error for ${endpoint.api}:${endpoint.functionName}`
      );
    }

    // Generate mock response
    return generator.generateMockOutput(endpoint);
  };
};

/**
 * Mock error generator for testing error scenarios
 */
export class MockErrorGenerator {
  private config: MockConfig;

  constructor(config: Partial<MockConfig> = {}) {
    this.config = { ...defaultMockConfig, ...config };
  }

  /**
   * Generates a mock error for testing error scenarios
   */
  generateMockError(endpoint: Endpoint<unknown, unknown>): Error {
    const errorTypes = [
      "NetworkError",
      "ValidationError",
      "TimeoutError",
      "RateLimitError",
      "ServerError",
    ];

    const errorType = errorTypes[Math.floor(Math.random() * errorTypes.length)];
    const message = `Mock ${errorType} for ${endpoint.api}:${endpoint.functionName}`;

    return new Error(message);
  }

  /**
   * Creates a mock API function that always throws errors
   */
  createErrorMockFunction<TParams, TOutput>(
    endpoint: Endpoint<TParams, TOutput>
  ): (params: TParams) => Promise<TOutput> {
    return async (params: TParams): Promise<TOutput> => {
      // Simulate network delay
      if (this.config.mockDelay > 0) {
        await new Promise((resolve) =>
          setTimeout(resolve, this.config.mockDelay)
        );
      }

      throw this.generateMockError(endpoint);
    };
  }
}

/**
 * Mock data factory for common test scenarios
 */
export class MockDataFactory {
  private generator: MockDataGenerator;

  constructor(config: Partial<MockConfig> = {}) {
    this.generator = new MockDataGenerator(config);
  }

  /**
   * Creates mock data for a successful API response
   */
  createSuccessResponse<T>(endpoint: Endpoint<unknown, T>): T {
    return this.generator.generateMockOutput(endpoint);
  }

  /**
   * Creates mock data for an error response
   */
  createErrorResponse(endpoint: Endpoint<unknown, unknown>): Error {
    const errorGenerator = new MockErrorGenerator();
    return errorGenerator.generateMockError(endpoint);
  }

  /**
   * Creates mock data for a timeout response
   */
  createTimeoutResponse(_endpoint: Endpoint<unknown, unknown>): Error {
    return new Error(`Timeout for ${_endpoint.api}:${_endpoint.functionName}`);
  }

  /**
   * Creates mock data for a rate limit response
   */
  createRateLimitResponse(_endpoint: Endpoint<unknown, unknown>): Error {
    return new Error(
      `Rate limit exceeded for ${_endpoint.api}:${_endpoint.functionName}`
    );
  }

  /**
   * Creates mock data for a validation error response
   */
  createValidationErrorResponse(_endpoint: Endpoint<unknown, unknown>): Error {
    return new Error(
      `Validation error for ${_endpoint.api}:${_endpoint.functionName}`
    );
  }
}

/**
 * Mock configuration presets for different testing scenarios
 */
export const mockConfigPresets = {
  /** Fast responses for unit testing */
  fast: {
    useMocks: true,
    mockDelay: 10,
    simulateNetworkErrors: false,
    errorProbability: 0,
  } as MockConfig,

  /** Realistic responses for integration testing */
  realistic: {
    useMocks: true,
    mockDelay: 100,
    simulateNetworkErrors: false,
    errorProbability: 0,
  } as MockConfig,

  /** Error simulation for error handling testing */
  errorSimulation: {
    useMocks: true,
    mockDelay: 50,
    simulateNetworkErrors: true,
    errorProbability: 0.3,
  } as MockConfig,

  /** Network issues simulation */
  networkIssues: {
    useMocks: true,
    mockDelay: 1000,
    simulateNetworkErrors: true,
    errorProbability: 0.5,
  } as MockConfig,
};
