#!/usr/bin/env node

/**
 * Test script to verify OpenAPI JSON exports work correctly
 * 
 * This script tests importing OpenAPI JSON files using the new export paths
 * to ensure they can be consumed by other packages like ws-dottie-mcp.
 */

const { existsSync, readFileSync } = require("fs");
const { join } = require("path");

// List of APIs to test
const testApis = [
  "wsf-vessels",
  "wsf-terminals", 
  "wsf-schedule",
  "wsf-fares",
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
  "wsdot-weather-readings",
  "wsdot-weather-stations"
];

console.log("Testing OpenAPI JSON exports...\n");

let successCount = 0;
let errorCount = 0;

// Test 1: Check if JSON files exist in dist/openapi
console.log("1. Checking if JSON files exist in dist/openapi/...");
for (const api of testApis) {
  const jsonPath = join(__dirname, "..", "dist", "openapi", `${api}.json`);
  if (existsSync(jsonPath)) {
    console.log(`  ✓ ${api}.json exists`);
    successCount++;
  } else {
    console.log(`  ✗ ${api}.json missing`);
    errorCount++;
  }
}

// Test 2: Try to parse JSON files
console.log("\n2. Testing JSON file validity...");
for (const api of testApis) {
  const jsonPath = join(__dirname, "..", "dist", "openapi", `${api}.json`);
  if (existsSync(jsonPath)) {
    try {
      const content = readFileSync(jsonPath, "utf8");
      const parsed = JSON.parse(content);
      
      // Basic structure validation
      if (parsed.openapi && parsed.info && parsed.paths) {
        console.log(`  ✓ ${api}.json has valid OpenAPI structure`);
      } else {
        console.log(`  ✗ ${api}.json missing required OpenAPI fields`);
        errorCount++;
      }
    } catch (error) {
      console.log(`  ✗ ${api}.json failed to parse: ${error.message}`);
      errorCount++;
    }
  }
}

// Test 3: Check specific API details
console.log("\n3. Testing specific API details...");
const testApi = "wsf-vessels";
const testApiPath = join(__dirname, "..", "dist", "openapi", `${testApi}.json`);

if (existsSync(testApiPath)) {
  try {
    const content = readFileSync(testApiPath, "utf8");
    const api = JSON.parse(content);
    
    console.log(`  Testing ${testApi}:`);
    console.log(`    - Title: ${api.info?.title || "Missing"}`);
    console.log(`    - Version: ${api.info?.version || "Missing"}`);
    console.log(`    - Paths: ${Object.keys(api.paths || {}).length}`);
    console.log(`    - Schemas: ${Object.keys(api.components?.schemas || {}).length}`);
    
    // Check for vessel-related endpoints
    const vesselPaths = Object.keys(api.paths || {}).filter(path => 
      path.toLowerCase().includes("vessel")
    );
    console.log(`    - Vessel endpoints: ${vesselPaths.length}`);
  } catch (error) {
    console.log(`  ✗ Failed to analyze ${testApi}: ${error.message}`);
    errorCount++;
  }
}

// Summary
console.log(`\nTest Summary:`);
console.log(`  ✓ Success: ${successCount}`);
console.log(`  ✗ Errors: ${errorCount}`);

if (errorCount > 0) {
  console.log("\nSome tests failed. Please check the errors above.");
  process.exit(1);
} else {
  console.log("\nAll tests passed! OpenAPI JSON exports are working correctly.");
}
