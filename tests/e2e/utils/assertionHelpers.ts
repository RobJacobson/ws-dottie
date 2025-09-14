/**
 * @fileoverview Assertion Helpers for Modern E2E Test Suite
 *
 * This module provides enhanced assertion helpers that work with Endpoint metadata
 * to provide better error messages and context-aware assertions.
 */

import type { Endpoint } from "@/shared/endpoints";
import type { ValidationError } from "./validationHelpers";

/**
 * Enhanced assertion result with endpoint context
 */
export interface AssertionResult {
  passed: boolean;
  message: string;
  endpointContext: {
    api: string;
    functionName: string;
    fieldType: "input" | "output";
  };
  details?: Record<string, unknown>;
}

/**
 * Asserts that input validation passes with detailed error reporting
 */
export const assertInputValidation = <TParams>(
  endpoint: Endpoint<TParams, unknown>,
  data: unknown,
  customMessage?: string
): AssertionResult => {
  const validationResult = validateInputWithContext(endpoint, data);

  const message =
    customMessage ||
    `Input validation for ${endpoint.api}:${endpoint.functionName} should pass`;

  if (!validationResult.success) {
    const errorDetails = createDetailedErrorMessage(validationResult.errors);
    return {
      passed: false,
      message: `${message}\nValidation errors:\n${errorDetails}`,
      endpointContext: validationResult.endpointContext,
      details: {
        errors: validationResult.errors,
        receivedData: data,
      },
    };
  }

  return {
    passed: true,
    message: `${message} ✓`,
    endpointContext: validationResult.endpointContext,
    details: {
      validatedData: validationResult.data,
    },
  };
};

/**
 * Asserts that output validation passes with detailed error reporting
 */
export const assertOutputValidation = <TOutput>(
  endpoint: Endpoint<unknown, TOutput>,
  data: unknown,
  customMessage?: string
): AssertionResult => {
  const validationResult = validateOutputWithContext(endpoint, data);

  const message =
    customMessage ||
    `Output validation for ${endpoint.api}:${endpoint.functionName} should pass`;

  if (!validationResult.success) {
    const errorDetails = createDetailedErrorMessage(validationResult.errors);
    return {
      passed: false,
      message: `${message}\nValidation errors:\n${errorDetails}`,
      endpointContext: validationResult.endpointContext,
      details: {
        errors: validationResult.errors,
        receivedData: data,
      },
    };
  }

  return {
    passed: true,
    message: `${message} ✓`,
    endpointContext: validationResult.endpointContext,
    details: {
      validatedData: validationResult.data,
    },
  };
};

/**
 * Asserts that an endpoint's metadata is valid
 */
export const assertEndpointMetadata = (
  endpoint: Endpoint<unknown, unknown>,
  customMessage?: string
): AssertionResult => {
  const validationResult = validateEndpointMetadata(endpoint);

  const message =
    customMessage ||
    `Endpoint metadata for ${endpoint.api}:${endpoint.functionName} should be valid`;

  if (!validationResult.success) {
    const errorDetails = createDetailedErrorMessage(validationResult.errors);
    return {
      passed: false,
      message: `${message}\nMetadata errors:\n${errorDetails}`,
      endpointContext: validationResult.endpointContext,
      details: {
        errors: validationResult.errors,
        endpoint: endpoint,
      },
    };
  }

  return {
    passed: true,
    message: `${message} ✓`,
    endpointContext: validationResult.endpointContext,
    details: {
      endpoint: endpoint,
    },
  };
};

/**
 * Asserts that sample parameters are valid
 */
export const assertSampleParameters = <TParams>(
  endpoint: Endpoint<TParams, unknown>,
  customMessage?: string
): AssertionResult => {
  const validationResult = validateSampleParameters(endpoint);

  const message =
    customMessage ||
    `Sample parameters for ${endpoint.api}:${endpoint.functionName} should be valid`;

  if (!validationResult.success) {
    const errorDetails = createDetailedErrorMessage(validationResult.errors);
    return {
      passed: false,
      message: `${message}\nSample parameter errors:\n${errorDetails}`,
      endpointContext: validationResult.endpointContext,
      details: {
        errors: validationResult.errors,
        sampleParams: endpoint.sampleParams,
      },
    };
  }

  return {
    passed: true,
    message: `${message} ✓`,
    endpointContext: validationResult.endpointContext,
    details: {
      sampleParams: endpoint.sampleParams,
    },
  };
};

/**
 * Asserts that response time is appropriate for the cache strategy
 */
export const assertResponseTime = (
  endpoint: Endpoint<unknown, unknown>,
  responseTime: number,
  customMessage?: string
): AssertionResult => {
  const validationResult = validateResponseTime(endpoint, responseTime);

  const message =
    customMessage ||
    `Response time for ${endpoint.api}:${endpoint.functionName} should be appropriate for ${endpoint.cacheStrategy} cache strategy`;

  if (!validationResult.success) {
    const errorDetails = createDetailedErrorMessage(validationResult.errors);
    return {
      passed: false,
      message: `${message}\nResponse time errors:\n${errorDetails}`,
      endpointContext: validationResult.endpointContext,
      details: {
        errors: validationResult.errors,
        responseTime,
        cacheStrategy: endpoint.cacheStrategy,
      },
    };
  }

  return {
    passed: true,
    message: `${message} ✓`,
    endpointContext: validationResult.endpointContext,
    details: {
      responseTime,
      cacheStrategy: endpoint.cacheStrategy,
    },
  };
};

/**
 * Asserts that URL template is properly formatted
 */
export const assertUrlTemplate = (
  endpoint: Endpoint<unknown, unknown>,
  customMessage?: string
): AssertionResult => {
  const validationResult = validateUrlTemplate(endpoint);

  const message =
    customMessage ||
    `URL template for ${endpoint.api}:${endpoint.functionName} should be properly formatted`;

  if (!validationResult.success) {
    const errorDetails = createDetailedErrorMessage(validationResult.errors);
    return {
      passed: false,
      message: `${message}\nURL template errors:\n${errorDetails}`,
      endpointContext: validationResult.endpointContext,
      details: {
        errors: validationResult.errors,
        urlTemplate: endpoint.urlTemplate,
      },
    };
  }

  return {
    passed: true,
    message: `${message} ✓`,
    endpointContext: validationResult.endpointContext,
    details: {
      urlTemplate: endpoint.urlTemplate,
    },
  };
};

/**
 * Asserts that an API call succeeds and returns valid data
 */
export const assertApiCallSuccess = async <TParams, TOutput>(
  endpoint: Endpoint<TParams, TOutput>,
  params: TParams,
  apiFunction: (params: TParams) => Promise<TOutput>,
  customMessage?: string
): Promise<AssertionResult> => {
  const message =
    customMessage ||
    `API call to ${endpoint.api}:${endpoint.functionName} should succeed`;

  try {
    const startTime = Date.now();
    const result = await apiFunction(params);
    const responseTime = Date.now() - startTime;

    // Validate output
    const outputValidation = validateOutputWithContext(endpoint, result);
    if (!outputValidation.success) {
      const errorDetails = createDetailedErrorMessage(outputValidation.errors);
      return {
        passed: false,
        message: `${message}\nOutput validation failed:\n${errorDetails}`,
        endpointContext: outputValidation.endpointContext,
        details: {
          errors: outputValidation.errors,
          result,
          responseTime,
        },
      };
    }

    // Validate response time
    const responseTimeValidation = validateResponseTime(endpoint, responseTime);
    if (!responseTimeValidation.success) {
      const errorDetails = createDetailedErrorMessage(
        responseTimeValidation.errors
      );
      return {
        passed: false,
        message: `${message}\nResponse time validation failed:\n${errorDetails}`,
        endpointContext: responseTimeValidation.endpointContext,
        details: {
          errors: responseTimeValidation.errors,
          result,
          responseTime,
        },
      };
    }

    return {
      passed: true,
      message: `${message} ✓`,
      endpointContext: outputValidation.endpointContext,
      details: {
        result,
        responseTime,
        validatedData: outputValidation.data,
      },
    };
  } catch (error) {
    return {
      passed: false,
      message: `${message}\nAPI call failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      endpointContext: {
        api: endpoint.api,
        functionName: endpoint.functionName,
        fieldType: "output",
      },
      details: {
        error: error instanceof Error ? error.message : "Unknown error",
        params,
      },
    };
  }
};

/**
 * Asserts that an API call fails with expected error
 */
export const assertApiCallFailure = async <TParams>(
  endpoint: Endpoint<TParams, unknown>,
  params: TParams,
  apiFunction: (params: TParams) => Promise<unknown>,
  expectedErrorPattern?: string | RegExp,
  customMessage?: string
): Promise<AssertionResult> => {
  const message =
    customMessage ||
    `API call to ${endpoint.api}:${endpoint.functionName} should fail with expected error`;

  try {
    const result = await apiFunction(params);

    return {
      passed: false,
      message: `${message}\nExpected API call to fail, but it succeeded with result: ${JSON.stringify(result)}`,
      endpointContext: {
        api: endpoint.api,
        functionName: endpoint.functionName,
        fieldType: "output",
      },
      details: {
        result,
        expectedError: expectedErrorPattern,
      },
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    if (expectedErrorPattern) {
      const pattern =
        typeof expectedErrorPattern === "string"
          ? new RegExp(expectedErrorPattern)
          : expectedErrorPattern;

      if (!pattern.test(errorMessage)) {
        return {
          passed: false,
          message: `${message}\nExpected error pattern '${expectedErrorPattern}' not found in error: ${errorMessage}`,
          endpointContext: {
            api: endpoint.api,
            functionName: endpoint.functionName,
            fieldType: "output",
          },
          details: {
            error: errorMessage,
            expectedPattern: expectedErrorPattern,
            params,
          },
        };
      }
    }

    return {
      passed: true,
      message: `${message} ✓`,
      endpointContext: {
        api: endpoint.api,
        functionName: endpoint.functionName,
        fieldType: "output",
      },
      details: {
        error: errorMessage,
        expectedPattern: expectedErrorPattern,
        params,
      },
    };
  }
};

/**
 * Creates a detailed error message from validation errors
 */
const createDetailedErrorMessage = (errors: ValidationError[]): string => {
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
 * Imports for validation functions (these would be imported from validationHelpers)
 */
import {
  validateInputWithContext,
  validateOutputWithContext,
  validateEndpointMetadata,
  validateSampleParameters,
  validateResponseTime,
  validateUrlTemplate,
} from "./validationHelpers";
