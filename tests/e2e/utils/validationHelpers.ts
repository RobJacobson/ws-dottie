/**
 * @fileoverview Enhanced Validation Utilities for Modern E2E Test Suite
 *
 * This module provides enhanced validation utilities that leverage Endpoint metadata
 * from defineEndpoint to provide better error messages, context-aware validation,
 * and comprehensive schema validation with endpoint context.
 */

import type { Endpoint } from "@/shared/endpoints";
import { z } from "zod";

/**
 * Enhanced validation result with endpoint context
 */
export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors: ValidationError[];
  endpointContext: EndpointContext;
}

/**
 * Detailed validation error with context
 */
export interface ValidationError {
  field: string;
  message: string;
  received: unknown;
  expected: string;
  path: string[];
  endpointContext: {
    api: string;
    functionName: string;
    fieldType: "input" | "output";
  };
}

/**
 * Endpoint context for better error messages
 */
export interface EndpointContext {
  api: string;
  functionName: string;
  urlTemplate: string;
  cacheStrategy: string;
  fieldType: "input" | "output";
}

/**
 * Validation configuration for enhanced error reporting
 */
export interface ValidationConfig {
  /** Whether to include detailed field information in errors */
  includeFieldDetails: boolean;

  /** Whether to include endpoint context in errors */
  includeEndpointContext: boolean;

  /** Maximum depth for nested object validation */
  maxDepth: number;

  /** Whether to validate array elements individually */
  validateArrayElements: boolean;
}

/**
 * Default validation configuration
 */
export const defaultValidationConfig: ValidationConfig = {
  includeFieldDetails: true,
  includeEndpointContext: true,
  maxDepth: 10,
  validateArrayElements: true,
};

/**
 * Validates input data against an endpoint's input schema with enhanced error reporting
 */
export const validateInputWithContext = <TParams>(
  endpoint: Endpoint<TParams, unknown>,
  data: unknown,
  config: Partial<ValidationConfig> = {}
): ValidationResult<TParams> => {
  const validationConfig = { ...defaultValidationConfig, ...config };
  const endpointContext: EndpointContext = {
    api: endpoint.api,
    functionName: endpoint.functionName,
    urlTemplate: endpoint.urlTemplate,
    cacheStrategy: endpoint.cacheStrategy,
    fieldType: "input",
  };

  try {
    const result = endpoint.inputSchema.parse(data);
    return {
      success: true,
      data: result,
      errors: [],
      endpointContext,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((zodError) => ({
        field: zodError.path.join("."),
        message: zodError.message,
        received: zodError.received,
        expected: getExpectedType(zodError),
        path: zodError.path,
        endpointContext,
      }));

      return {
        success: false,
        errors,
        endpointContext,
      };
    }

    return {
      success: false,
      errors: [
        {
          field: "unknown",
          message:
            error instanceof Error ? error.message : "Unknown validation error",
          received: data,
          expected: "valid input",
          path: [],
          endpointContext,
        },
      ],
      endpointContext,
    };
  }
};

/**
 * Validates output data against an endpoint's output schema with enhanced error reporting
 */
export const validateOutputWithContext = <TOutput>(
  endpoint: Endpoint<unknown, TOutput>,
  data: unknown,
  config: Partial<ValidationConfig> = {}
): ValidationResult<TOutput> => {
  const validationConfig = { ...defaultValidationConfig, ...config };
  const endpointContext: EndpointContext = {
    api: endpoint.api,
    functionName: endpoint.functionName,
    urlTemplate: endpoint.urlTemplate,
    cacheStrategy: endpoint.cacheStrategy,
    fieldType: "output",
  };

  try {
    const result = endpoint.outputSchema.parse(data);
    return {
      success: true,
      data: result,
      errors: [],
      endpointContext,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((zodError) => ({
        field: zodError.path.join("."),
        message: zodError.message,
        received: zodError.received,
        expected: getExpectedType(zodError),
        path: zodError.path,
        endpointContext,
      }));

      return {
        success: false,
        errors,
        endpointContext,
      };
    }

    return {
      success: false,
      errors: [
        {
          field: "unknown",
          message:
            error instanceof Error ? error.message : "Unknown validation error",
          received: data,
          expected: "valid output",
          path: [],
          endpointContext,
        },
      ],
      endpointContext,
    };
  }
};

/**
 * Validates that an endpoint's metadata is complete and valid
 */
export const validateEndpointMetadata = (
  endpoint: Endpoint<unknown, unknown>
): ValidationResult<Endpoint<unknown, unknown>> => {
  const errors: ValidationError[] = [];
  const endpointContext: EndpointContext = {
    api: endpoint.api,
    functionName: endpoint.functionName,
    urlTemplate: endpoint.urlTemplate,
    cacheStrategy: endpoint.cacheStrategy,
    fieldType: "input",
  };

  // Validate required fields
  if (!endpoint.id || typeof endpoint.id !== "string") {
    errors.push({
      field: "id",
      message: "Endpoint ID is required and must be a string",
      received: endpoint.id,
      expected: "string",
      path: ["id"],
      endpointContext,
    });
  }

  if (!endpoint.api || typeof endpoint.api !== "string") {
    errors.push({
      field: "api",
      message: "API name is required and must be a string",
      received: endpoint.api,
      expected: "string",
      path: ["api"],
      endpointContext,
    });
  }

  if (!endpoint.functionName || typeof endpoint.functionName !== "string") {
    errors.push({
      field: "functionName",
      message: "Function name is required and must be a string",
      received: endpoint.functionName,
      expected: "string",
      path: ["functionName"],
      endpointContext,
    });
  }

  if (!endpoint.urlTemplate || typeof endpoint.urlTemplate !== "string") {
    errors.push({
      field: "urlTemplate",
      message: "URL template is required and must be a string",
      received: endpoint.urlTemplate,
      expected: "string",
      path: ["urlTemplate"],
      endpointContext,
    });
  }

  if (!endpoint.inputSchema) {
    errors.push({
      field: "inputSchema",
      message: "Input schema is required",
      received: endpoint.inputSchema,
      expected: "ZodSchema",
      path: ["inputSchema"],
      endpointContext,
    });
  }

  if (!endpoint.outputSchema) {
    errors.push({
      field: "outputSchema",
      message: "Output schema is required",
      received: endpoint.outputSchema,
      expected: "ZodSchema",
      path: ["outputSchema"],
      endpointContext,
    });
  }

  if (!endpoint.cacheStrategy || typeof endpoint.cacheStrategy !== "string") {
    errors.push({
      field: "cacheStrategy",
      message: "Cache strategy is required and must be a string",
      received: endpoint.cacheStrategy,
      expected: "string",
      path: ["cacheStrategy"],
      endpointContext,
    });
  }

  return {
    success: errors.length === 0,
    data: errors.length === 0 ? endpoint : undefined,
    errors,
    endpointContext,
  };
};

/**
 * Validates that sample parameters are valid according to the input schema
 */
export const validateSampleParameters = <TParams>(
  endpoint: Endpoint<TParams, unknown>
): ValidationResult<TParams> => {
  const endpointContext: EndpointContext = {
    api: endpoint.api,
    functionName: endpoint.functionName,
    urlTemplate: endpoint.urlTemplate,
    cacheStrategy: endpoint.cacheStrategy,
    fieldType: "input",
  };

  if (!endpoint.sampleParams) {
    return {
      success: true, // No sample params is valid
      data: undefined,
      errors: [],
      endpointContext,
    };
  }

  return validateInputWithContext(endpoint, endpoint.sampleParams);
};

/**
 * Creates a detailed error message from validation errors
 */
export const createDetailedErrorMessage = (
  errors: ValidationError[]
): string => {
  if (errors.length === 0) {
    return "No validation errors";
  }

  const errorMessages = errors.map((error) => {
    const context = error.endpointContext;
    const baseMessage = `[${context.api}:${context.functionName}] ${error.field}: ${error.message}`;

    if (error.received !== undefined) {
      return `${baseMessage} (received: ${JSON.stringify(error.received)}, expected: ${error.expected})`;
    }

    return baseMessage;
  });

  return errorMessages.join("\n");
};

/**
 * Validates that a response time is appropriate for the endpoint's cache strategy
 */
export const validateResponseTime = (
  endpoint: Endpoint<unknown, unknown>,
  responseTime: number
): ValidationResult<number> => {
  const endpointContext: EndpointContext = {
    api: endpoint.api,
    functionName: endpoint.functionName,
    urlTemplate: endpoint.urlTemplate,
    cacheStrategy: endpoint.cacheStrategy,
    fieldType: "output",
  };

  const maxResponseTime = getMaxResponseTimeForCacheStrategy(
    endpoint.cacheStrategy
  );
  const errors: ValidationError[] = [];

  if (responseTime > maxResponseTime) {
    errors.push({
      field: "responseTime",
      message: `Response time ${responseTime}ms exceeds maximum ${maxResponseTime}ms for ${endpoint.cacheStrategy} cache strategy`,
      received: responseTime,
      expected: `<= ${maxResponseTime}ms`,
      path: ["responseTime"],
      endpointContext,
    });
  }

  return {
    success: errors.length === 0,
    data: responseTime,
    errors,
    endpointContext,
  };
};

/**
 * Gets the expected type from a Zod error
 */
const getExpectedType = (zodError: z.ZodIssue): string => {
  if (zodError.code === z.ZodIssueCode.invalid_type) {
    return zodError.expected;
  }

  if (zodError.code === z.ZodIssueCode.too_small) {
    return `>= ${zodError.minimum}`;
  }

  if (zodError.code === z.ZodIssueCode.too_big) {
    return `<= ${zodError.maximum}`;
  }

  return "valid value";
};

/**
 * Gets maximum response time based on cache strategy
 */
const getMaxResponseTimeForCacheStrategy = (cacheStrategy: string): number => {
  switch (cacheStrategy) {
    case "REALTIME_UPDATES":
      return 5000;
    case "MINUTE_UPDATES":
      return 10000;
    case "FIVE_MINUTE_UPDATES":
      return 15000;
    case "HOURLY_UPDATES":
      return 30000;
    case "DAILY_UPDATES":
      return 60000;
    case "DAILY_STATIC":
    case "WEEKLY_STATIC":
      return 120000;
    case "NONE":
      return 30000;
    default:
      return 30000;
  }
};

/**
 * Validates that an endpoint's URL template is properly formatted
 */
export const validateUrlTemplate = (
  endpoint: Endpoint<unknown, unknown>
): ValidationResult<string> => {
  const endpointContext: EndpointContext = {
    api: endpoint.api,
    functionName: endpoint.functionName,
    urlTemplate: endpoint.urlTemplate,
    cacheStrategy: endpoint.cacheStrategy,
    fieldType: "input",
  };

  const errors: ValidationError[] = [];
  const urlTemplate = endpoint.urlTemplate;

  // Check if URL template is a valid URL format
  try {
    new URL(urlTemplate);
  } catch {
    errors.push({
      field: "urlTemplate",
      message: "URL template is not a valid URL format",
      received: urlTemplate,
      expected: "valid URL",
      path: ["urlTemplate"],
      endpointContext,
    });
  }

  // Check for common URL template patterns
  if (!urlTemplate.includes("http")) {
    errors.push({
      field: "urlTemplate",
      message: "URL template should start with http:// or https://",
      received: urlTemplate,
      expected: "URL starting with http:// or https://",
      path: ["urlTemplate"],
      endpointContext,
    });
  }

  return {
    success: errors.length === 0,
    data: urlTemplate,
    errors,
    endpointContext,
  };
};
