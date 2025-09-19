#!/usr/bin/env node

/**
 * @fileoverview Fetch-Native CLI Tool
 *
 * This module provides the fetch-native command-line tool, which offers raw
 * access to WSDOT/WSF APIs using native fetch without validation. This tool
 * is designed for debugging, testing, and scenarios where you need direct
 * access to the raw API response without data transformation.
 *
 * ## Features
 *
 * - **Raw API Access**: Direct access to APIs without validation overhead
 * - **Automatic Date Conversion**: Converts .NET datetime strings to JavaScript Date objects
 * - **Fast Execution**: Minimal processing for maximum performance
 * - **Debugging Support**: Ideal for exploring API responses and debugging
 * - **Flexible Output**: Support for pretty-printing, quiet mode, and output truncation
 * - **No Validation**: Bypasses Zod validation for raw data access
 *
 * ## Usage
 *
 * ```bash
 * fetch-native <function-name> [params] [options]
 * ```
 *
 * @example
 * ```bash
 * # List all available functions
 * fetch-native --list
 *
 * # Call a function with default parameters
 * fetch-native getBorderCrossings
 *
 * # Call a function with custom parameters
 * fetch-native getFareLineItems '{"originTerminalId": 7, "destinationTerminalId": 3}'
 *
 * # Pretty-print output
 * fetch-native getVesselBasics --pretty
 * ```
 *
 * @note This tool makes direct native fetch requests without validation but with
 * automatic conversion of .NET datetime strings to JavaScript Date objects.
 * Use fetch-dottie for type-safe, validated API calls with comprehensive
 * data transformation.
 */

import { createSimpleCli } from "./cli-core";
import type { CliOptions, CliParams } from "./types";
import { generateDefaultExamples } from "./ui";
import type { Endpoint } from "@/shared/endpoints";
import { fetchNative } from "@/shared/fetching";

/**
 * Executes API requests using the native fetchNative function
 *
 * This function serves as the executor for the fetch-native CLI tool,
 * providing raw API access without validation but with automatic
 * .NET date conversion. It uses the shared fetchNative function to
 * ensure consistent behavior across all API calls.
 *
 * @template I - The input parameters type for the endpoint
 * @template O - The output response type for the endpoint
 * @param endpoint - Endpoint definition with configuration
 * @param params - Parameters to send with the request (not validated)
 * @param _options - CLI options (unused in this implementation)
 * @returns Promise resolving to raw API response data with .NET dates converted
 */
const executeNative = async <I, O>(
  endpoint: Endpoint<I, O>,
  params: CliParams,
  _options: CliOptions
): Promise<unknown> => fetchNative(endpoint, params as I, "none");

// Create and run CLI tool
createSimpleCli(
  "fetch-native",
  "Raw WSDOT/WSF API client using native fetch with automatic date conversion",
  executeNative,
  generateDefaultExamples("fetch-native", [
    "fetch-native getVesselBasics  # Automatically converts .NET dates to JS Date objects",
  ]),
  `

Note: This tool makes direct native fetch requests without validation but with automatic
conversion of .NET datetime strings to JavaScript Date objects. Use fetch-dottie for
type-safe, validated API calls with comprehensive data transformation.`
);
