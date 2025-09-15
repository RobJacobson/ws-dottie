#!/usr/bin/env node

/**
 * @fileoverview Simplified E2E Test Runner
 *
 * This script provides a simple command-line interface for running e2e tests:
 * npm test [module-name] [--full]
 *
 * Examples:
 * npm test wsdot-highway-cameras
 * npm test wsf-fares --full
 * npm test all
 * npm test all --full
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Available API modules
const API_MODULES = [
  "wsdot-border-crossings",
  "wsdot-bridge-clearances",
  "wsdot-commercial-vehicle-restrictions",
  "wsdot-highway-alerts",
  "wsdot-highway-cameras",
  "wsdot-mountain-pass-conditions",
  "wsdot-toll-rates",
  "wsdot-traffic-flow",
  "wsdot-travel-times",
  "wsdot-weather-information",
  "wsdot-weather-information-extended",
  "wsdot-weather-stations",
  "wsf-fares",
  "wsf-schedule",
  "wsf-terminals",
  "wsf-vessels",
];

/**
 * Main execution function
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    showUsage();
    process.exit(1);
  }

  const moduleName = args[0];
  const isFullMode = args.includes("--full");

  // Validate module name
  if (moduleName !== "all" && !API_MODULES.includes(moduleName)) {
    console.error(`❌ Error: Invalid module name "${moduleName}"`);
    console.log("");
    showAvailableModules();
    process.exit(1);
  }

  // Run the tests
  runTests(moduleName, isFullMode);
}

/**
 * Runs the specified tests
 */
function runTests(moduleName, isFullMode) {
  console.log(
    `🚀 Running ${isFullMode ? "full" : "core"} tests${moduleName !== "all" ? ` for ${moduleName}` : " for all modules"}...`
  );

  if (moduleName === "all") {
    runAllTests(isFullMode);
  } else {
    runSingleModuleTests(moduleName, isFullMode);
  }
}

/**
 * Runs tests for all modules
 */
function runAllTests(isFullMode) {
  const testTypes = isFullMode ? ["core", "full"] : ["core"];

  for (const testType of testTypes) {
    console.log(`\n📋 Running ${testType} tests for all modules...`);
    runTestType(testType, API_MODULES);
  }
}

/**
 * Runs tests for a single module
 */
function runSingleModuleTests(moduleName, isFullMode) {
  const testTypes = isFullMode ? ["core", "full"] : ["core"];

  for (const testType of testTypes) {
    console.log(`\n📋 Running ${testType} tests for ${moduleName}...`);
    runTestType(testType, [moduleName]);
  }
}

/**
 * Runs a specific test type for specified modules
 */
function runTestType(testType, moduleNames) {
  // Generate test files
  console.log("🔄 Generating test files...");
  generateTestFiles(moduleNames, testType);

  // Run the tests
  const generatedDir = path.join(__dirname, "..", "generated");
  const command = `npx vitest --config config/vitest.config.ts --run ${generatedDir}`;

  try {
    console.log(`🧪 Executing: ${command}`);
    execSync(command, {
      stdio: "inherit",
      cwd: process.cwd(),
    });
    console.log(`✅ ${testType} tests completed successfully`);
  } catch (error) {
    console.error(`❌ ${testType} tests failed`);
    process.exit(1);
  }
}

/**
 * Generate test files for the specified modules
 */
function generateTestFiles(moduleNames, testType) {
  const generatedDir = path.join(__dirname, "..", "generated");

  // Ensure generated directory exists
  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir, { recursive: true });
  }

  // Clear existing generated files
  const existingFiles = fs.readdirSync(generatedDir);
  existingFiles.forEach((file) => {
    if (file.endsWith(".test.ts")) {
      fs.unlinkSync(path.join(generatedDir, file));
    }
  });

  // Generate test files for each module
  moduleNames.forEach((moduleName) => {
    generateModuleTestFile(moduleName, testType, generatedDir);
  });

  console.log(`✅ Generated test files for ${moduleNames.length} modules`);
}

/**
 * Generate a test file for a specific module
 */
function generateModuleTestFile(moduleName, testType, generatedDir) {
  const testFileName = `${moduleName}.test.ts`;
  const testFilePath = path.join(generatedDir, testFileName);

  const testContent = `/**
 * Auto-generated test file for ${moduleName}
 * Generated at: ${new Date().toISOString()}
 * Test type: ${testType}
 */

import { describe } from "vitest";
import { createEndpointTestSuite } from "../utils/test-generator";
import { fetchWithZod } from "@/shared/fetching";
import { categorizeEndpoint, getMaxResponseTime, generateInvalidParams } from "../utils/test-generator";

// Import the specific client module
import * as ${moduleName.replace(/-/g, "")}Client from "@/clients/${moduleName}";

describe("${moduleName} API", () => {
  // Get all endpoints from the client module
  const clientExports = Object.values(${moduleName.replace(/-/g, "")}Client);
  const apiEndpoints = clientExports.filter((exported: any) => 
    exported && 
    typeof exported === "object" && 
    typeof exported.id === "string" &&
    typeof exported.api === "string" &&
    exported.api === "${moduleName}"
  );

  console.log(\`🔍 Found \${apiEndpoints.length} endpoints for ${moduleName}\`);

  // Generate test suites for each endpoint
  apiEndpoints.forEach((endpoint: any) => {
    const config = {
      apiFunction: (params: any) => fetchWithZod(endpoint, params),
      endpoint,
      validParams: endpoint.sampleParams || {},
      invalidParams: generateInvalidParams(endpoint),
      endpointName: endpoint.functionName,
      category: categorizeEndpoint(endpoint),
      maxResponseTime: getMaxResponseTime(endpoint.cacheStrategy),
      customTests: [],
    };

    createEndpointTestSuite(config);
  });
});
`;

  fs.writeFileSync(testFilePath, testContent);
  console.log(`📝 Generated ${testFileName}`);
}

/**
 * Shows usage information
 */
function showUsage() {
  console.log("Usage: npm test [module-name] [--full]");
  console.log("");
  console.log("Options:");
  console.log(
    "  --full    Run comprehensive tests (includes edge cases and error handling)"
  );
  console.log("");
  console.log("Examples:");
  console.log("  npm test wsdot-highway-cameras");
  console.log("  npm test wsf-fares --full");
  console.log("  npm test all");
  console.log("  npm test all --full");
  console.log("");
  showAvailableModules();
}

/**
 * Shows available API modules
 */
function showAvailableModules() {
  console.log("Available Modules:");

  const wsfApis = API_MODULES.filter((api) => api.startsWith("wsf-"));
  const wsdotApis = API_MODULES.filter((api) => api.startsWith("wsdot-"));

  if (wsfApis.length > 0) {
    console.log("  🚢 WSF APIs:");
    wsfApis.forEach((api) => {
      console.log(`    • ${api}`);
    });
  }

  if (wsdotApis.length > 0) {
    console.log("  🛣️  WSDOT APIs:");
    wsdotApis.forEach((api) => {
      console.log(`    • ${api}`);
    });
  }

  console.log("  • all (run for all modules)");
}

// Run the main function
if (require.main === module) {
  main();
}

module.exports = {
  main,
  API_MODULES,
};
