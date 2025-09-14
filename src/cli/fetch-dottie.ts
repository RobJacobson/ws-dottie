#!/usr/bin/env node

/**
 * fetch-dottie CLI
 *
 * Validated WSDOT/WSF API client with full Zod validation and data transformation.
 * This tool provides type-safe access to Washington State transportation APIs
 * with comprehensive error handling and data validation.
 *
 * Usage: fetch-dottie <function-name> [params] [--pretty=false]
 */

import { createSimpleCli } from "./cli-core";
import { generateDefaultExamples } from "./ui";
import { fetchWithZod } from "@/shared/fetching/handlers";
import type { Endpoint } from "@/shared/endpoint";
import type { CliOptions, CliParams } from "./types";

/**
 * Execute validated API call using Zod validation
 * @param endpoint - Endpoint definition with URL and input schema
 * @param params - Validated parameters to send with the request
 * @param _options - CLI options for request configuration
 * @returns Promise resolving to validated response data
 */
const executeDottie = async <I, O>(
  endpoint: Endpoint<I, O>,
  params: CliParams,
  _options: CliOptions // Unused - validated fetching handles all transformations
): Promise<unknown> => {
  // Use the validated fetchWithZod function
  return await fetchWithZod(endpoint, params as I);
};

// Create and run CLI tool
createSimpleCli(
  "fetch-dottie",
  "Validated WSDOT/WSF API client with Zod validation",
  "1.0.0",
  executeDottie,
  generateDefaultExamples("fetch-dottie")
);
