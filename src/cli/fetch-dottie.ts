#!/usr/bin/env node

/**
 * @fileoverview Fetch-Dottie CLI Tool
 *
 * This module provides the fetch-dottie command-line tool, which offers validated
 * access to WSDOT/WSF APIs with full Zod validation and data transformation.
 * It provides type-safe access to Washington State transportation APIs with
 * comprehensive error handling and data validation.
 *
 * ## Features
 *
 * - **Type-Safe API Access**: Full TypeScript type safety with Zod validation
 * - **Data Transformation**: Automatic validation and transformation of API responses
 * - **Comprehensive Error Handling**: Detailed error messages with helpful context
 * - **Flexible Output**: Support for pretty-printing, quiet mode, and output truncation
 * - **Parameter Validation**: Automatic validation of input parameters against schemas
 * - **Date Handling**: Automatic conversion of .NET datetime strings to JavaScript Date objects
 *
 * ## Usage
 *
 * ```bash
 * fetch-dottie <function-name> [params] [options]
 * ```
 *
 * @example
 * ```bash
 * # List all available functions
 * fetch-dottie --list
 *
 * # Call a function with default parameters
 * fetch-dottie getBorderCrossings
 *
 * # Call a function with custom parameters
 * fetch-dottie getFareLineItems '{"originTerminalId": 7, "destinationTerminalId": 3}'
 *
 * # Pretty-print output
 * fetch-dottie getVesselBasics --pretty
 * ```
 */

import type { Endpoint } from "@/shared/endpoints";
import { fetchZod } from "@/shared/fetching";
import { createSimpleCli } from "./cli-core";
import type { CliOptions, CliParams } from "./types";
import { generateDefaultExamples } from "./ui";

/**
 * Executes API requests using the validated fetchZod function
 *
 * This function serves as the executor for the fetch-dottie CLI tool,
 * providing type-safe API access with full Zod validation and data
 * transformation. It uses the shared fetchZod function to ensure
 * consistent validation behavior across all API calls.
 *
 * @template I - The input parameters type for the endpoint
 * @template O - The output response type for the endpoint
 * @param endpoint - Endpoint definition with schemas and configuration
 * @param params - Validated parameters to send with the request
 * @param _options - CLI options (unused in this implementation)
 * @returns Promise resolving to validated and transformed API response data
 */
const executeDottie = async <I, O>(
  endpoint: Endpoint<I, O>,
  params: CliParams,
  _options: CliOptions
): Promise<unknown> => {
  return fetchZod({
    endpoint: endpoint.endpoint,
    inputSchema: endpoint.inputSchema,
    outputSchema: endpoint.outputSchema,
    params: params as I,
    logMode: "none",
  });
};

// Create and run CLI tool
createSimpleCli(
  "fetch-dottie",
  "Validated WSDOT/WSF API client with Zod validation",
  executeDottie,
  generateDefaultExamples("fetch-dottie")
);
