#!/usr/bin/env node

/**
 * fetch-native CLI
 *
 * Raw WSDOT/WSF API client using native fetch for direct API access without validation.
 * This tool provides unvalidated access to Washington State transportation APIs
 * for debugging, testing, and when you need the raw API response.
 *
 * Usage: fetch-native <function-name> [params] [--pretty=false]
 */

import type { Endpoint } from "@/shared/endpoints";
import { fetchPlain } from "@/shared/fetching/handlers";
import { parseDotNetTimestamp } from "@/shared/utils";
import { createSimpleCli } from "./cli-core";
import type { CliOptions, CliParams } from "./types";
import { generateDefaultExamples } from "./ui";

/**
 * Execute plain API call using direct native fetch
 * @param endpoint - Endpoint definition with URL and input schema
 * @param params - Validated parameters to send with the request
 * @param options - CLI options for request configuration (e.g., fixDates)
 * @returns Promise resolving to raw response data
 */
const executeNative = async <I, O>(
  endpoint: Endpoint<I, O>,
  params: CliParams,
  options: CliOptions
): Promise<unknown> => {
  // Use the independent fetchPlain function
  const result = await fetchPlain(endpoint, params as I);

  // Apply date fixing if requested
  if (options.fixDates) {
    return JSON.parse(JSON.stringify(result), (_, value) => {
      if (typeof value === "string") {
        const date = parseDotNetTimestamp(value);
        return date || value;
      }
      return value;
    });
  }

  return result;
};

// Create and run CLI tool
createSimpleCli(
  "fetch-native",
  "Raw WSDOT/WSF API client using native fetch (no validation)",
  "1.0.0",
  executeNative,
  generateDefaultExamples("fetch-native", [
    "fetch-native getVesselBasics --fix-dates  # Convert .NET dates to JS Date objects",
  ]),
  `

Note: This tool makes direct native fetch requests without validation. Use fetch-dottie for
type-safe, validated API calls with automatic data transformation.

The --fix-dates flag converts .NET datetime strings (like "/Date(1234567890123)/")
to JavaScript Date objects in the response, making the data easier to work with.`
);
