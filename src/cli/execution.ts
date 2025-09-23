/**
 * @fileoverview API Request Execution for WS-Dottie CLI
 *
 * This module handles the execution of API requests with different fetch strategies
 * based on CLI options. It provides a single function that selects the appropriate
 * fetch method based on the --jsonp and --no-validation flags.
 */

import type { Endpoint } from "@/shared/endpoints";
import {
  fetchJsonpTool,
  fetchJsonpZod,
  fetchNative,
  fetchNativeZod,
} from "@/shared/fetching";
import type { CliOptions } from "./types";

/**
 * Executes API requests using the appropriate fetch strategy based on CLI flags
 *
 * This function selects the appropriate fetch function based on the --jsonp and
 * --no-validation flags, providing a single interface that can handle all four
 * fetch strategies.
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
  const useJsonp = options.jsonp ?? false;
  // Commander.js converts --no-validation to validation: false
  const useValidation = options.validation !== false;

  // Select the appropriate fetch function based on flags
  if (useJsonp && useValidation) {
    return fetchJsonpZod(endpoint, params, { logMode: "none" });
  } else if (useJsonp && !useValidation) {
    return fetchJsonpTool(endpoint, params, { logMode: "none" });
  } else if (!useJsonp && useValidation) {
    return fetchNativeZod(endpoint, params, { logMode: "none" });
  } else {
    // !useJsonp && !useValidation
    return fetchNative(endpoint, params, { logMode: "none" });
  }
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
