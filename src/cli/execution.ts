/**
 * @fileoverview API Request Execution for WS-Dottie CLI
 *
 * This module handles the execution of API requests with different fetch strategies
 * based on CLI options. It provides a single function that uses the new fetchDottie
 * function with appropriate options based on the --jsonp and --no-validation flags.
 */

import type { Endpoint } from "@/apis/types";
import { fetchDottie } from "@/shared/fetching";
import type { CliOptions } from "./types";

/**
 * Executes API requests using the new fetchDottie function with CLI options
 *
 * This function uses the unified fetchDottie function with options derived from
 * the --jsonp and --no-validation flags, providing a single interface that can
 * handle all fetch strategies.
 *
 * @template I - The input parameters type for the endpoint
 * @template O - The output response type for the endpoint
 * @param endpoint - Endpoint definition with schemas and configuration
 * @param params - Parameters to send with the request
 * @param options - CLI options including transport and validation flags
 * @returns Promise resolving to API response data
 */
export const executeApiRequest = async <I, O>(
  endpoint: Endpoint<I, O>,
  params: I,
  options: CliOptions
): Promise<unknown> => {
  // Commander.js converts --no-validation to validation: false
  const validate = options.validation !== false;
  const fetchMode = (options.jsonp ?? false) ? "jsonp" : "native";

  // Use "none" logging mode during tests to avoid interfering with JSON parsing
  // In normal usage, this will be overridden by the CLI options
  const logMode = process.env.NODE_ENV === "test" ? "none" : "info";

  return fetchDottie({
    endpoint,
    params,
    fetchMode,
    logMode,
    validate,
  });
};

/**
 * Gets a human-readable description of the fetch strategy based on options
 *
 * @param options - CLI options containing transport and validation flags
 * @returns String description of the strategy being used
 */
export const getStrategyDescription = (options: CliOptions): string => {
  const useJsonp = options.jsonp ?? false;
  // Commander.js converts --no-validation to validation: false
  const useValidation = options.validation !== false;

  if (useJsonp && useValidation) return "JSONP + validation";
  if (useJsonp && !useValidation) return "JSONP (no validation)";
  if (!useJsonp && useValidation) return "native + validation";
  return "native (no validation)";
};
