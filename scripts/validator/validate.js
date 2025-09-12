#!/usr/bin/env node

/**
 * Unified Endpoint Comparison Tool
 *
 * A single tool that handles all comparison scenarios:
 * - Individual endpoint comparison
 * - Module-based comparison
 * - Bulk comparison of all endpoints
 *
 * This tool now uses the endpoint definitions from the new framework
 * instead of hardcoded mappings, making it automatically stay in sync
 * with the actual endpoint implementations.
 *
 * Usage:
 *   node validate.js <endpoint> [params]          # Single endpoint
 *   node validate.js --module <module-id>         # All endpoints in module
 *   node validate.js --all                        # All endpoints
 *   node validate.js --list-modules               # List available modules
 *
 * Examples:
 *   node validate.js getVesselLocations
 *   node validate.js getVesselLocationsByVesselId '{"vesselId": 1}'
 *   node validate.js --module wsf-vessels
 *   node validate.js --all
 */

import { execSync } from "child_process";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { convertDotNetTimestampToISO } from "./dotNetTimestamp.js";

// Import endpoint definitions from the main project
import * as allEndpoints from "../../dist/index.js";

/**
 * Type guard to check if a value is an endpoint definition
 */
const isEndpointDefinition = (value) =>
  typeof value === "object" &&
  value !== null &&
  "meta" in value &&
  "handleFetch" in value &&
  "queryOptions" in value;

/**
 * Get all endpoint definitions from the clients module
 */
const getAllEndpointDefinitions = () => {
  const result = {};

  Object.entries(allEndpoints)
    .filter(([key]) => key.endsWith("Def"))
    .forEach(([key, value]) => {
      if (isEndpointDefinition(value)) {
        result[key] = value;
      }
    });

  return result;
};

/**
 * Extract endpoint URLs from endpoint definitions
 */
const getEndpointUrls = () => {
  const endpointDefs = getAllEndpointDefinitions();
  const urls = {};

  Object.entries(endpointDefs).forEach(([key, def]) => {
    const functionName = key.replace("Def", "");
    urls[functionName] = def.meta.endpoint;
  });

  return urls;
};

/**
 * Extract sample parameters from endpoint definitions
 */
const getEndpointParams = () => {
  const endpointDefs = getAllEndpointDefinitions();
  const params = {};

  Object.entries(endpointDefs).forEach(([key, def]) => {
    const functionName = key.replace("Def", "");
    params[functionName] = def.meta.sampleParams || {};
  });

  return params;
};

/**
 * Extract module groups from endpoint definitions
 */
const getModuleGroups = () => {
  const endpointDefs = getAllEndpointDefinitions();
  const groups = {};

  Object.entries(endpointDefs).forEach(([key, def]) => {
    const functionName = key.replace("Def", "");
    const moduleGroup = def.meta.api;

    if (!groups[moduleGroup]) {
      groups[moduleGroup] = {
        name: def.meta.api,
        endpoints: [],
      };
    }

    groups[moduleGroup].endpoints.push(functionName);
  });

  return groups;
};

// Get endpoint data from definitions
const ENDPOINT_URLS = getEndpointUrls();
const ENDPOINT_PARAMS = getEndpointParams();
const MODULE_GROUPS = getModuleGroups();

// Date utilities for generating test dates
const getTestDates = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  return {
    tomorrow: tomorrow.toISOString().split("T")[0],
    dayAfterTomorrow: dayAfterTomorrow.toISOString().split("T")[0],
  };
};

// Fields to ignore in comparison
const IGNORED_FIELDS = [
  "VesselWatchShutID",
  "VesselWatchShutMsg",
  "VesselWatchShutFlag",
  "VesselWatchStatus",
  "VesselWatchMsg",
];

// Results tracking
const results = {
  total: 0,
  successful: 0,
  failed: 0,
  errors: [],
  summary: {},
};

// Ensure output directory exists
const outputDir = join(process.cwd(), "comparison-results");
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

/**
 * Get CLI output for an endpoint
 */
function getCliOutput(endpoint, params = {}) {
  try {
    const paramsString = JSON.stringify(params);
    const command = `node --no-warnings dist/cli/index.js ${endpoint} '${paramsString}' --silent`;
    const output = execSync(command, {
      cwd: process.cwd(), // Stay in current directory
      encoding: "utf8",
      timeout: 30000,
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer
    });
    return output.trim();
  } catch (error) {
    throw new Error(`CLI failed: ${error.message}`);
  }
}

/**
 * Get native fetch output using curl
 */
function getCurlOutput(endpoint, params = {}) {
  try {
    const apiKey = process.env.WSDOT_ACCESS_TOKEN;
    if (!apiKey) {
      throw new Error("WSDOT_ACCESS_TOKEN environment variable required");
    }

    // Get endpoint URL from mapping
    const endpointUrl = ENDPOINT_URLS[endpoint];
    if (!endpointUrl) {
      throw new Error(`Unknown endpoint: ${endpoint}`);
    }

    let url = endpointUrl;

    // Build URL with parameters
    for (const [key, value] of Object.entries(params)) {
      let paramValue = value;
      if (value instanceof Date) {
        // WSF APIs expect YYYY-MM-DD format, WSDOT APIs expect ISO format
        paramValue = url.includes("/ferries/")
          ? value.toISOString().split("T")[0] // YYYY-MM-DD for WSF
          : value.toISOString(); // ISO format for WSDOT
      } else {
        paramValue = String(value);
      }
      url = url.replace(`{${key}}`, paramValue);
    }

    // Determine base URL and API key parameter
    const baseUrl = url.includes("/ferries/")
      ? "https://www.wsdot.wa.gov"
      : "https://wsdot.wa.gov";
    const apiKeyParam = url.includes("/ferries/")
      ? "apiaccesscode"
      : "AccessCode";

    const separator = url.includes("?") ? "&" : "?";
    const fullUrl = `${baseUrl}${url}${separator}${apiKeyParam}=${apiKey}`;

    const output = execSync(`curl -s "${fullUrl}"`, {
      encoding: "utf8",
      timeout: 30000,
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer
    });

    return output.trim();
  } catch (error) {
    throw new Error(`Curl failed: ${error.message}`);
  }
}

/**
 * Convert .NET timestamps to JS Date objects using shared utility
 */
function convertDotNetTimestamps(data) {
  // Handle simple string values (like cache flush date)
  if (typeof data === "string") {
    return convertDotNetTimestampToISO(data);
  }

  if (Array.isArray(data)) {
    return data.map(convertDotNetTimestamps);
  } else if (data && typeof data === "object") {
    const converted = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === "string") {
        converted[key] = convertDotNetTimestampToISO(value);
      } else if (typeof value === "object" && value !== null) {
        converted[key] = convertDotNetTimestamps(value);
      } else {
        converted[key] = value;
      }
    }
    return converted;
  }
  return data;
}

/**
 * Check if a field path should be ignored
 */
function shouldIgnoreField(fieldPath) {
  const fieldName = fieldPath.split(".").pop();
  return IGNORED_FIELDS.includes(fieldName);
}

/**
 * Compare two JSON objects and find differences
 */
function compareJson(cliData, curlData) {
  const cli = JSON.parse(cliData);
  const curl = JSON.parse(curlData);
  const differences = [];

  function compareObjects(obj1, obj2, path = "") {
    if (
      obj1 === null ||
      obj2 === null ||
      typeof obj1 !== "object" ||
      typeof obj2 !== "object"
    ) {
      if (obj1 !== obj2) {
        differences.push({
          type: "value_difference",
          path: path || "root",
          cliValue: obj1,
          curlValue: obj2,
        });
      }
      return;
    }

    const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

    for (const key of allKeys) {
      const currentPath = path ? `${path}.${key}` : key;
      const val1 = obj1[key];
      const val2 = obj2[key];

      if (shouldIgnoreField(currentPath)) {
        continue;
      }

      if (!(key in obj1)) {
        differences.push({
          type: "missing_in_cli",
          path: currentPath,
          value: val2,
        });
      } else if (!(key in obj2)) {
        differences.push({
          type: "missing_in_curl",
          path: currentPath,
          value: val1,
        });
      } else if (typeof val1 !== typeof val2) {
        differences.push({
          type: "type_mismatch",
          path: currentPath,
          cliType: typeof val1,
          curlType: typeof val2,
          cliValue: val1,
          curlValue: val2,
        });
      } else if (Array.isArray(val1) && Array.isArray(val2)) {
        compareArrays(val1, val2, currentPath);
      } else if (typeof val1 === "object" && val1 !== null && val2 !== null) {
        compareObjects(val1, val2, currentPath);
      } else if (val1 !== val2) {
        differences.push({
          type: "value_difference",
          path: currentPath,
          cliValue: val1,
          curlValue: val2,
        });
      }
    }
  }

  function compareArrays(arr1, arr2, path) {
    const maxLength = Math.max(arr1.length, arr2.length);

    for (let i = 0; i < maxLength; i++) {
      const currentPath = `${path}[${i}]`;

      if (i >= arr1.length) {
        differences.push({
          type: "missing_in_cli",
          path: currentPath,
          value: arr2[i],
        });
      } else if (i >= arr2.length) {
        differences.push({
          type: "missing_in_curl",
          path: currentPath,
          value: arr1[i],
        });
      } else if (
        typeof arr1[i] === "object" &&
        arr1[i] !== null &&
        typeof arr2[i] === "object" &&
        arr2[i] !== null
      ) {
        compareObjects(arr1[i], arr2[i], currentPath);
      } else if (arr1[i] !== arr2[i]) {
        differences.push({
          type: "value_difference",
          path: currentPath,
          cliValue: arr1[i],
          curlValue: arr2[i],
        });
      }
    }
  }

  compareObjects(cli, curl);
  return differences;
}

/**
 * Compare a single endpoint
 */
async function compareEndpoint(endpoint, params = {}) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const baseFilename = `${endpoint}-${timestamp}`;
  const cliFile = join(outputDir, `${baseFilename}-cli.json`);
  const curlFile = join(outputDir, `${baseFilename}-curl.json`);

  console.log(`🔍 Comparing: ${endpoint}`);
  if (Object.keys(params).length > 0) {
    console.log(`   Parameters: ${JSON.stringify(params)}`);
  }

  let cliOutput = null;
  let cliError = null;
  let curlOutput = null;
  let curlError = null;

  // Try to get CLI output
  try {
    cliOutput = getCliOutput(endpoint, params);
  } catch (error) {
    cliError = error.message;
    console.log(`   ⚠️  CLI failed: ${cliError}`);
  }

  // Try to get curl output
  try {
    curlOutput = getCurlOutput(endpoint, params);
  } catch (error) {
    curlError = error.message;
    console.log(`   ⚠️  Curl failed: ${curlError}`);
  }

  // If both failed, this is a complete failure
  if (cliError && curlError) {
    results.failed++;
    results.errors.push({
      endpoint,
      error: `Both CLI and curl failed. CLI: ${cliError}. Curl: ${curlError}`,
      params: JSON.stringify(params),
    });
    console.log(`❌ ${endpoint}: Both CLI and curl failed`);
    return { success: false, error: `Both CLI and curl failed` };
  }

  // If only curl failed, we can't compare
  if (curlError) {
    results.failed++;
    results.errors.push({
      endpoint,
      error: `Curl failed: ${curlError}`,
      params: JSON.stringify(params),
    });
    console.log(`❌ ${endpoint}: Curl failed - cannot compare`);
    return { success: false, error: `Curl failed: ${curlError}` };
  }

  // Parse and convert .NET timestamps in curl output
  const curlParsed = JSON.parse(curlOutput);
  const curlConverted = convertDotNetTimestamps(curlParsed);
  const curlFormatted = JSON.stringify(curlConverted, null, 2);
  writeFileSync(curlFile, curlFormatted);

  // If CLI failed but curl succeeded, save the error and show the raw API response
  if (cliError) {
    const errorFile = join(outputDir, `${baseFilename}-cli-error.txt`);
    writeFileSync(errorFile, cliError);

    results.failed++;
    results.errors.push({
      endpoint,
      error: `CLI failed: ${cliError}`,
      params: JSON.stringify(params),
    });

    console.log(`❌ ${endpoint}: CLI failed - schema validation error`);
    console.log(`   📄 Raw API response saved to: ${curlFile}`);
    console.log(`   📄 CLI error saved to: ${errorFile}`);
    console.log(
      `   🔍 This indicates a schema mismatch between the API response and our Zod validation`
    );

    return {
      success: false,
      error: cliError,
      rawApiResponse: curlFile,
      cliError: errorFile,
    };
  }

  // Both succeeded - perform comparison
  try {
    const cliFormatted = JSON.stringify(JSON.parse(cliOutput), null, 2);
    writeFileSync(cliFile, cliFormatted);

    // Compare and get results
    const differences = compareJson(cliOutput, JSON.stringify(curlConverted));

    const categories = {
      missing_fields: differences.filter((d) => d.type.includes("missing")),
      type_mismatches: differences.filter((d) => d.type === "type_mismatch"),
      value_differences: differences.filter(
        (d) => d.type === "value_difference"
      ),
    };

    results.successful++;
    results.summary[endpoint] = {
      status: "success",
      differences: differences.length,
      missingFields: categories.missing_fields.length,
      typeMismatches: categories.type_mismatches.length,
      valueDifferences: categories.value_differences.length,
      files: { cli: cliFile, curl: curlFile },
    };

    console.log(`✅ ${endpoint}: ${differences.length} differences found`);
    return { success: true, differences, categories };
  } catch (error) {
    results.failed++;
    results.errors.push({
      endpoint,
      error: `Comparison failed: ${error.message}`,
      params: JSON.stringify(params),
    });

    console.log(`❌ ${endpoint}: Comparison failed - ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Show available modules
 */
function showAvailableModules() {
  console.log("📋 Available API Modules:");
  console.log("=".repeat(50));

  Object.entries(MODULE_GROUPS).forEach(([moduleId, module]) => {
    const endpointCount = module.endpoints.length;
    console.log(
      `  ${moduleId.padEnd(35)} | ${module.name} (${endpointCount} endpoints)`
    );
  });

  console.log("\nUsage: node validate.js --module <module-id>");
  console.log("Example: node validate.js --module wsdot-traffic-flow");
}

/**
 * Show usage information
 */
function showUsage() {
  console.log(`
🚀 Unified Endpoint Comparison Tool

Usage:
  node validate.js <endpoint> [params]          # Single endpoint
  node validate.js --module <module-id>         # All endpoints in module
  node validate.js --all                        # All endpoints
  node validate.js --list-modules               # List available modules

Examples:
  node validate.js getVesselLocations
  node validate.js getVesselLocationsByVesselId '{"vesselId": 1}'
  node validate.js --module wsf-vessels
  node validate.js --all

Environment:
  WSDOT_ACCESS_TOKEN must be set
`);
}

/**
 * Generate summary report
 */
function generateSummaryReport(moduleName = null) {
  const duration = Date.now() - results.startTime;

  console.log("\n" + "=".repeat(60));
  console.log(`📊 COMPARISON SUMMARY${moduleName ? ` - ${moduleName}` : ""}`);
  console.log("=".repeat(60));
  console.log(`Total endpoints: ${results.total}`);
  console.log(`Successful: ${results.successful}`);
  console.log(`Failed: ${results.failed}`);
  console.log(`Duration: ${(duration / 1000).toFixed(1)}s`);
  console.log(
    `Average per endpoint: ${(duration / results.total / 1000).toFixed(1)}s`
  );

  // Show failed endpoints
  if (results.failed > 0) {
    console.log("\n❌ FAILED ENDPOINTS:");
    results.errors.forEach(({ endpoint, error }) => {
      console.log(`   ${endpoint}: ${error}`);
    });
  }

  // Show endpoints with differences
  const endpointsWithDifferences = Object.entries(results.summary)
    .filter(([_, summary]) => summary.differences > 0)
    .sort((a, b) => b[1].differences - a[1].differences);

  if (endpointsWithDifferences.length > 0) {
    console.log("\n🔍 ENDPOINTS WITH DIFFERENCES:");
    endpointsWithDifferences.forEach(([endpoint, summary]) => {
      console.log(
        `   ${endpoint}: ${summary.differences} differences (${summary.missingFields} missing, ${summary.typeMismatches} type, ${summary.valueDifferences} value)`
      );
    });
  }

  // Show endpoints with no differences
  const endpointsWithNoDifferences = Object.entries(results.summary).filter(
    ([_, summary]) => summary.differences === 0
  );

  if (endpointsWithNoDifferences.length > 0) {
    console.log("\n✅ ENDPOINTS WITH NO DIFFERENCES:");
    endpointsWithNoDifferences.forEach(([endpoint]) => {
      console.log(`   ${endpoint}`);
    });
  }
}

/**
 * Save detailed results to file
 */
function saveResults(moduleId = null) {
  const resultsDir = join(process.cwd(), "comparison-results");
  mkdirSync(resultsDir, { recursive: true });

  const filename = moduleId
    ? `${moduleId}-comparison-${new Date().toISOString().replace(/[:.]/g, "-")}.json`
    : `bulk-comparison-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;

  const reportFile = join(resultsDir, filename);
  writeFileSync(
    reportFile,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        moduleId,
        duration: Date.now() - results.startTime,
        results,
        endpointConfigs: ENDPOINT_PARAMS,
      },
      null,
      2
    )
  );

  console.log(`\n📄 Detailed results saved to: ${reportFile}`);
}

/**
 * Main execution function
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    showUsage();
    return;
  }

  if (args.includes("--list-modules")) {
    showAvailableModules();
    return;
  }

  // Check for required environment variable
  if (!process.env.WSDOT_ACCESS_TOKEN) {
    console.error(
      "❌ Error: WSDOT_ACCESS_TOKEN environment variable is required"
    );
    process.exit(1);
  }

  results.startTime = Date.now();

  if (args.includes("--all")) {
    // Bulk comparison of all endpoints
    console.log("🚀 Starting bulk endpoint comparison...\n");
    results.total = Object.keys(ENDPOINT_PARAMS).length;

    for (const [endpoint, params] of Object.entries(ENDPOINT_PARAMS)) {
      await compareEndpoint(endpoint, params);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Rate limiting
    }

    generateSummaryReport();
    saveResults();
  } else if (args.includes("--module")) {
    // Module-based comparison
    const moduleIndex = args.indexOf("--module");
    const moduleId = args[moduleIndex + 1];

    if (!moduleId) {
      console.error("❌ Error: Module ID required after --module");
      showAvailableModules();
      process.exit(1);
    }

    const module = MODULE_GROUPS[moduleId];
    if (!module) {
      console.error(`❌ Error: Unknown module '${moduleId}'`);
      showAvailableModules();
      process.exit(1);
    }

    console.log(`🚀 Starting comparison for: ${module.name}`);
    console.log(`📊 Module: ${moduleId}`);
    console.log(`🔢 Endpoints: ${module.endpoints.length}\n`);

    results.total = module.endpoints.length;

    for (const endpoint of module.endpoints) {
      const params = ENDPOINT_PARAMS[endpoint] || {};
      await compareEndpoint(endpoint, params);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Rate limiting
    }

    generateSummaryReport(module.name);
    saveResults(moduleId);
  } else {
    // Single endpoint comparison
    const endpoint = args[0];
    const paramsString = args[1];

    if (!endpoint) {
      console.error("❌ Error: Endpoint name required");
      showUsage();
      process.exit(1);
    }

    if (!(endpoint in ENDPOINT_URLS)) {
      console.error(`❌ Error: Unknown endpoint '${endpoint}'`);
      console.error(
        "Available endpoints:",
        Object.keys(ENDPOINT_URLS).slice(0, 10).join(", "),
        "..."
      );
      process.exit(1);
    }

    let params;
    if (paramsString) {
      // Use provided parameters
      try {
        params = JSON.parse(paramsString);
      } catch (error) {
        console.error(`❌ Error: Invalid JSON parameters: ${error.message}`);
        process.exit(1);
      }
    } else {
      // Use sample parameters from endpoint definition
      params = ENDPOINT_PARAMS[endpoint] || {};
    }

    results.total = 1;
    await compareEndpoint(endpoint, params);

    if (results.successful > 0) {
      const summary = results.summary[endpoint];
      console.log(`\n📋 Files saved for manual inspection:`);
      console.log(`   CLI: ${summary.files.cli}`);
      console.log(`   Curl: ${summary.files.curl}`);
    }
  }

  console.log("\n🎉 Comparison complete!");
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  // Suppress Node.js warnings
  process.removeAllListeners("warning");
  main().catch(console.error);
}
