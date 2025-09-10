#!/usr/bin/env node

/**
 * Comprehensive endpoint testing script for ws-dottie
 *
 * This script systematically tests all available endpoints to ensure:
 * 1. Zod validation passes without errors
 * 2. Data is returned and is meaningful
 * 3. No null field violations occur
 *
 * Usage: node scripts/test-all-endpoints.js [--verbose] [--filter=pattern]
 */

import { FUNCTION_REGISTRY } from "../src/cli/registry/index.js";
import { z } from "zod";

// ANSI color codes for output formatting
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
};

// Test configuration
const config = {
  verbose: process.argv.includes("--verbose"),
  filter: process.argv
    .find((arg) => arg.startsWith("--filter="))
    ?.split("=")[1],
  timeout: 30000, // 30 second timeout per endpoint
  maxRetries: 2,
};

// Test results tracking
const results = {
  total: 0,
  passed: 0,
  failed: 0,
  skipped: 0,
  errors: [],
  warnings: [],
};

/**
 * Log with color and timestamp
 */
function log(message, color = colors.reset) {
  const timestamp = new Date().toISOString().substring(11, 23);
  console.log(
    `${colors.gray}[${timestamp}]${colors.reset} ${color}${message}${colors.reset}`
  );
}

/**
 * Log test result
 */
function logResult(endpoint, status, message = "", details = null) {
  const statusColor =
    status === "PASS"
      ? colors.green
      : status === "FAIL"
        ? colors.red
        : status === "SKIP"
          ? colors.yellow
          : colors.blue;

  log(
    `${statusColor}${status.padEnd(5)}${colors.reset} ${endpoint} ${message}`
  );

  if (details && config.verbose) {
    console.log(
      `${colors.gray}    Details: ${JSON.stringify(details, null, 2)}${colors.reset}`
    );
  }
}

/**
 * Test a single endpoint
 */
async function testEndpoint(endpointName, endpointConfig) {
  const {
    module,
    function: endpointFunction,
    paramsSchema,
    description,
  } = endpointConfig;

  try {
    // Skip if filter is specified and endpoint doesn't match
    if (
      config.filter &&
      !endpointName.toLowerCase().includes(config.filter.toLowerCase())
    ) {
      results.skipped++;
      logResult(endpointName, "SKIP", `(filtered out by: ${config.filter})`);
      return;
    }

    results.total++;
    log(`Testing ${endpointName}...`, colors.cyan);

    // Validate input parameters if schema exists
    let params = {};
    if (paramsSchema) {
      try {
        // For endpoints that require parameters, we'll need to provide defaults
        // This is a simplified approach - in practice, you might want to provide
        // specific test parameters for each endpoint type
        params = paramsSchema.parse({});
      } catch (error) {
        if (error instanceof z.ZodError) {
          // If parsing fails, try with minimal required parameters
          // This is a heuristic approach - some endpoints might need specific values
          const requiredFields = error.errors
            .filter(
              (e) => e.code === "invalid_type" && e.received === "undefined"
            )
            .map((e) => e.path.join("."));

          if (requiredFields.length > 0) {
            // Skip endpoints that require specific parameters we can't provide
            results.skipped++;
            logResult(
              endpointName,
              "SKIP",
              `(requires parameters: ${requiredFields.join(", ")})`
            );
            return;
          }
        }
        throw error;
      }
    }

    // Execute the endpoint with timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Timeout")), config.timeout);
    });

    const result = await Promise.race([
      endpointFunction(params),
      timeoutPromise,
    ]);

    // Validate the result structure
    if (!result) {
      throw new Error("No data returned");
    }

    // Check for meaningful data
    let dataQuality = "good";
    const warnings = [];

    if (Array.isArray(result)) {
      if (result.length === 0) {
        dataQuality = "empty";
        warnings.push("Returned empty array");
      } else {
        // Check first few items for null fields
        const sampleSize = Math.min(3, result.length);
        for (let i = 0; i < sampleSize; i++) {
          const item = result[i];
          if (typeof item === "object" && item !== null) {
            const nullFields = Object.entries(item)
              .filter(([_, value]) => value === null)
              .map(([key, _]) => key);

            if (nullFields.length > 0) {
              warnings.push(
                `Sample item ${i} has null fields: ${nullFields.join(", ")}`
              );
            }
          }
        }
      }
    } else if (typeof result === "object" && result !== null) {
      // Check for null fields in single object
      const nullFields = Object.entries(result)
        .filter(([_, value]) => value === null)
        .map(([key, _]) => key);

      if (nullFields.length > 0) {
        warnings.push(`Result has null fields: ${nullFields.join(", ")}`);
      }
    }

    // Record warnings
    if (warnings.length > 0) {
      results.warnings.push({
        endpoint: endpointName,
        warnings: warnings,
      });
    }

    // Success!
    results.passed++;
    const qualityIndicator =
      dataQuality === "good" ? "✓" : dataQuality === "empty" ? "⚠" : "?";
    logResult(
      endpointName,
      "PASS",
      `${qualityIndicator} (${Array.isArray(result) ? result.length : 1} items)`,
      config.verbose ? { result: result } : null
    );
  } catch (error) {
    results.failed++;
    results.errors.push({
      endpoint: endpointName,
      error: error.message,
      stack: error.stack,
    });

    logResult(endpointName, "FAIL", `❌ ${error.message}`);

    if (config.verbose) {
      console.log(`${colors.red}    Stack: ${error.stack}${colors.reset}`);
    }
  }
}

/**
 * Test all endpoints in the registry
 */
async function testAllEndpoints() {
  log(`Starting comprehensive endpoint testing...`, colors.bright);
  log(
    `Total endpoints to test: ${Object.keys(FUNCTION_REGISTRY).length}`,
    colors.blue
  );

  if (config.filter) {
    log(`Filter applied: ${config.filter}`, colors.yellow);
  }

  if (config.verbose) {
    log(`Verbose mode enabled`, colors.magenta);
  }

  log("", colors.reset);

  // Test each endpoint
  const endpointNames = Object.keys(FUNCTION_REGISTRY).sort();

  for (const endpointName of endpointNames) {
    await testEndpoint(endpointName, FUNCTION_REGISTRY[endpointName]);

    // Small delay to avoid overwhelming the APIs
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Print summary
  log("", colors.reset);
  log("=".repeat(80), colors.bright);
  log("TEST SUMMARY", colors.bright);
  log("=".repeat(80), colors.bright);

  log(`Total endpoints: ${results.total}`, colors.blue);
  log(`${colors.green}Passed: ${results.passed}${colors.reset}`, colors.green);
  log(`${colors.red}Failed: ${results.failed}${colors.reset}`, colors.red);
  log(
    `${colors.yellow}Skipped: ${results.skipped}${colors.reset}`,
    colors.yellow
  );

  if (results.warnings.length > 0) {
    log("", colors.reset);
    log("WARNINGS:", colors.yellow);
    results.warnings.forEach(({ endpoint, warnings }) => {
      log(`  ${endpoint}:`, colors.yellow);
      warnings.forEach((warning) => {
        log(`    - ${warning}`, colors.gray);
      });
    });
  }

  if (results.errors.length > 0) {
    log("", colors.reset);
    log("FAILURES:", colors.red);
    results.errors.forEach(({ endpoint, error }) => {
      log(`  ${endpoint}: ${error}`, colors.red);
    });
  }

  log("", colors.reset);
  log("=".repeat(80), colors.bright);

  // Exit with appropriate code
  process.exit(results.failed > 0 ? 1 : 0);
}

// Handle uncaught errors
process.on("uncaughtException", (error) => {
  log(`Uncaught exception: ${error.message}`, colors.red);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  log(`Unhandled rejection: ${reason}`, colors.red);
  process.exit(1);
});

// Run the tests
testAllEndpoints().catch((error) => {
  log(`Test runner failed: ${error.message}`, colors.red);
  process.exit(1);
});
