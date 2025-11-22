/**
 * @fileoverview Parameter Processing for WS-Dottie CLI
 *
 * This module provides parameter processing utilities for the CLI tool,
 * including JSON parsing with date coercion and default value application.
 * Validation is handled by the fetching layer, not here.
 */

import type { Endpoint } from "@/apis/types";
import type { CliParams } from "./types";

/**
 * Processes parameters from command line input
 *
 * This function handles the parameter processing workflow:
 * 1. Parses JSON parameters (no special date coercion needed)
 * 2. Applies default values from endpoint sample parameters
 *
 * Note: Parameter validation is handled by the fetching layer,
 * not in the CLI. This keeps concerns properly separated.
 *
 * @template I - The input parameters type for the endpoint
 * @template O - The output response type for the endpoint
 * @param params - JSON string of parameters from command line
 * @param endpoint - Endpoint definition containing defaults
 * @returns Processed parameters object ready for API calls
 * @throws Error if parameters are invalid JSON
 */
export const processParameters = <I, O>(
  params: string,
  endpoint: Endpoint<I, O>
): CliParams => {
  // Parse JSON parameters (no special coercion needed for string dates)
  const userParams = (() => {
    // Handle empty string or undefined parameters
    if (!params || params.trim() === "") {
      return {};
    }
    try {
      return JSON.parse(params);
    } catch (error) {
      throw new Error(`Invalid JSON parameters: ${error}`);
    }
  })();

  // Apply defaults only if no parameters are provided
  const sampleParams = endpoint.sampleParams || {};
  const paramsWithDefaults =
    Object.keys(userParams).length > 0
      ? userParams
      : { ...sampleParams, ...userParams };

  return paramsWithDefaults as CliParams;
};
