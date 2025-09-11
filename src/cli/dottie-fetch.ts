#!/usr/bin/env node

/**
 * dottie-fetch CLI
 *
 * Validated WSDOT/WSF API client with full Zod validation and data transformation.
 * This tool provides type-safe access to Washington State transportation APIs
 * with comprehensive error handling and data validation.
 *
 * Usage: dottie-fetch <function-name> [params] [--pretty=false]
 */

import { createSimpleCli } from "./cli-core";
import { generateDefaultExamples } from "./utils/ui";

// Create and run CLI tool
createSimpleCli(
  "dottie-fetch",
  "Validated WSDOT/WSF API client with Zod validation",
  "1.0.0",
  true, // useValidated = true
  generateDefaultExamples("dottie-fetch")
);
