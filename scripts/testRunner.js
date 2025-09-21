#!/usr/bin/env node

/**
 * @fileoverview Simplified E2E Test Runner
 *
 * This script provides a simple command-line interface for running e2e tests
 * with module filtering via environment variables.
 *
 * Usage:
 *   npm test [module-name]
 *   npm test all
 *   npm test wsdot-highway-alerts
 *
 * Examples:
 *   npm test wsdot-highway-cameras
 *   npm test wsf-fares
 *   npm test all
 */

const { execSync } = require("child_process");

// Available API modules (discovered dynamically from endpoints.ts)
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

  // Validate module name
  if (moduleName !== "all" && !API_MODULES.includes(moduleName)) {
    console.error(`❌ Error: Invalid module name "${moduleName}"`);
    console.log("");
    showAvailableModules();
    process.exit(1);
  }

  // Set environment variable for module filtering
  if (moduleName !== "all") {
    process.env.TEST_MODULE = moduleName;
    console.log(`🧪 Testing module: ${moduleName}`);
  } else {
    console.log(`🧪 Testing all modules`);
  }

  // Run the main test suite
  try {
    execSync("npm run test:e2e", {
      stdio: "inherit",
      cwd: process.cwd(),
    });
  } catch (error) {
    console.error(`❌ Tests failed: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Shows usage information
 */
function showUsage() {
  console.log("Usage: npm test [module-name]");
  console.log("");
  console.log("Examples:");
  console.log("  npm test wsdot-highway-cameras");
  console.log("  npm test wsf-fares");
  console.log("  npm test all");
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
