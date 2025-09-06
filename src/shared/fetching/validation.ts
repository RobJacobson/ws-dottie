import { z } from "zod";

import type { FetchContext } from "./pipeline/types";

// Import proven parsing logic
import { isWsdotDateString, wsdotDateTimestampToJsDate } from "./zod";

/**
 * Validation utilities for WS-Dottie
 *
 * This module provides comprehensive validation functionality for the data pipeline:
 * - Core validation functions for input and output validation
 * - Schema construction utilities for building validation schemas
 *
 * The validation system is designed to provide fail-fast error handling
 * and consistent behavior across all API requests.
 */

// ============================================================================
// CORE VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validates input parameters if schema is provided
 *
 * Always performs validation when a schema is provided, as the performance
 * overhead is negligible compared to network latency and the benefits of
 * fail-fast error handling are significant.
 *
 * @param inputSchema - Zod schema for input validation
 * @param params - Parameters to validate
 * @param _context - Fetch context (unused but kept for interface compatibility)
 * @returns Validated parameters or undefined if no schema provided
 * @throws {Error} When validation fails with detailed field error messages
 */
export const validateInputs = <TInput>(
  inputSchema: z.ZodSchema<TInput> | undefined,
  params: TInput | undefined,
  _context: FetchContext
): TInput | undefined => {
  // Always validate if schema and params are provided
  if (!inputSchema || !params) {
    return params;
  }

  try {
    return inputSchema.parse(params);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");
      throw new Error(`Parameter validation failed: ${fieldErrors}`);
    }
    throw error;
  }
};

/**
 * Validates response data against output schema
 *
 * @param responseData - Raw response data from the API
 * @param outputSchema - Zod schema for output validation
 * @param _context - Fetch context (unused but kept for interface compatibility)
 * @returns Validated response data
 * @throws {Error} When validation fails with detailed field error messages
 */
export const validateResponse = <TOutput>(
  responseData: unknown,
  outputSchema: z.ZodSchema<TOutput> | undefined,
  _context: FetchContext
): TOutput => {
  if (!outputSchema) {
    return responseData as TOutput;
  }

  try {
    const validatedData = outputSchema.parse(responseData);
    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");
      throw new Error(`Response validation failed: ${fieldErrors}`);
    }
    throw error;
  }
};

// ============================================================================
// SCHEMA CONSTRUCTION UTILITIES
// ============================================================================

/**
 * Date validation utilities for WSDOT and WSF APIs
 *
 * This module provides comprehensive Zod schemas for validating and transforming
 * date formats used by WSDOT and WSF APIs, with rich descriptions optimized for
 * AI discoverability and Model Context Protocol (MCP) integration.
 */

// WSDOT date format with rich MCP description
export const zWsdotDate = () =>
  z
    .string()
    .refine(isWsdotDateString, {
      message:
        "Invalid WSDOT date format. Expected format: /Date(timestamp)/ where timestamp is milliseconds since Unix epoch",
    })
    .transform((val) => {
      const date = wsdotDateTimestampToJsDate(val);
      if (!date) throw new Error(`Failed to parse WSDOT date: ${val}`);
      return date;
    });

/**
 * Basic field validation utilities for WSDOT and WSF APIs
 *
 * This module provides common Zod schemas for validating basic field types
 * used across all API responses, with rich descriptions optimized for
 * AI discoverability and Model Context Protocol (MCP) integration.
 */

// Geographic coordinate validation with MCP descriptions
export const zLatitude = () => z.number().min(-90).max(90);

export const zLongitude = () => z.number().min(-180).max(180);
