#!/usr/bin/env node

/**
 * Universal API Test Runner
 *
 * This script allows running e2e tests for any API using a simple command:
 * npm run tests [api-name]
 *
 * Examples:
 * npm run tests wsf-fares
 * npm run tests wsf-schedule
 * npm run tests wsdot-weather-stations
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Get the API name from command line arguments
const apiName = process.argv[2];

if (!apiName) {
  console.error("❌ Error: API name is required");
  console.log("");
  console.log("Usage: npm run tests [api-name]");
  console.log("");
  console.log("Available APIs:");
  listAvailableApis();
  process.exit(1);
}

// Normalize the API name (handle variations)
const normalizedApiName = normalizeApiName(apiName);

// Check if the test file exists
const testFilePath = path.join(
  __dirname,
  "..",
  "tests",
  "e2e",
  "validation",
  normalizedApiName,
  `${normalizedApiName}.validation.e2e.test.ts`
);

if (!fs.existsSync(testFilePath)) {
  console.error(`❌ Error: Test file not found for API "${apiName}"`);
  console.log("");
  console.log("Expected path:", testFilePath);
  console.log("");
  console.log("Available APIs:");
  listAvailableApis();
  process.exit(1);
}

// Run the test
console.log(`🚀 Running tests for ${apiName}...`);
console.log(`📁 Test file: ${testFilePath}`);
console.log("");

try {
  const command = `npm test "${testFilePath}"`;
  execSync(command, { stdio: "inherit" });
} catch (error) {
  console.error(`❌ Test execution failed for ${apiName}`);
  process.exit(1);
}

/**
 * Lists all available APIs by scanning the validation directory
 */
function listAvailableApis() {
  const validationDir = path.join(
    __dirname,
    "..",
    "tests",
    "e2e",
    "validation"
  );

  if (!fs.existsSync(validationDir)) {
    console.error("❌ Validation directory not found");
    return;
  }

  const apiDirs = fs
    .readdirSync(validationDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .sort();

  if (apiDirs.length === 0) {
    console.log("No API test directories found");
    return;
  }

  // Group APIs by type
  const wsfApis = apiDirs.filter((api) => api.startsWith("wsf-"));
  const wsdotApis = apiDirs.filter((api) => api.startsWith("wsdot-"));

  if (wsfApis.length > 0) {
    console.log("🚢 WSF APIs:");
    wsfApis.forEach((api) => {
      console.log(`  • ${api}`);
    });
    console.log("");
  }

  if (wsdotApis.length > 0) {
    console.log("🛣️  WSDOT APIs:");
    wsdotApis.forEach((api) => {
      console.log(`  • ${api}`);
    });
    console.log("");
  }
}

/**
 * Normalizes API names to handle common variations
 */
function normalizeApiName(apiName) {
  // Convert to lowercase and replace spaces with hyphens
  return apiName.toLowerCase().replace(/\s+/g, "-");
}
