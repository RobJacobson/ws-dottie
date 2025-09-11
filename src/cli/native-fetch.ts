#!/usr/bin/env node

/**
 * native-fetch CLI
 *
 * Raw WSDOT/WSF API client using curl for direct API access without validation.
 * This tool provides unvalidated access to Washington State transportation APIs
 * for debugging, testing, and when you need the raw API response.
 *
 * Usage: native-fetch <function-name> [params] [--pretty=false]
 */

import { createSimpleCli } from "./cli-core";
import { generateDefaultExamples } from "./utils/ui";

// Create and run CLI tool
createSimpleCli(
  "native-fetch",
  "Raw WSDOT/WSF API client using curl (no validation)",
  "1.0.0",
  false, // useValidated = false
  generateDefaultExamples("native-fetch", [
    "native-fetch getVesselBasics --fix-dates  # Convert .NET dates to JS Date objects",
  ]),
  `

Note: This tool makes direct curl requests without validation. Use dottie-fetch for
type-safe, validated API calls with automatic data transformation.

The --fix-dates flag converts .NET datetime strings (like "/Date(1234567890123)/")
to JavaScript Date objects in the response, making the data easier to work with.`
);
