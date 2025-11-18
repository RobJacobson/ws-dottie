#!/usr/bin/env tsx
/**
 * @fileoverview Generate endpoint-level e2e test files
 *
 * This script generates one test file per endpoint in tests/e2e/api/
 * Each file imports createEndpointSuite and calls it with the endpoint ID.
 */

import { readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Import endpoints directly from source (requires tsx to handle TypeScript imports)
import { endpoints } from "../src/shared/endpoints";
import type { Endpoint } from "../src/shared/types";

const TEST_DIR = join(__dirname, "../tests/e2e/api");

// Endpoints that should skip all tests due to known server-side issues
// Format: "apiName.functionName"
const SKIP_ALL_TESTS = new Set([
  "wsdot-toll-rates.fetchTollTripInfo", // Server returns HTTP 400 due to DBNull in ModifiedDate column
]);

interface EndpointInfo {
  apiName: string;
  functionName: string;
  endpointId: string;
}

// Extract endpoint information from the endpoints array
const endpointInfos: EndpointInfo[] = endpoints
  .map((ep: Endpoint<unknown, unknown>) => ({
    apiName: ep.api.name,
    functionName: ep.functionName,
    endpointId: `${ep.api.name}.${ep.functionName}`,
  }))
  // Filter out skipped endpoints
  .filter((info) => !SKIP_ALL_TESTS.has(info.endpointId))
  // Sort by endpointId
  .sort((a, b) => a.endpointId.localeCompare(b.endpointId));

console.log(
  `Found ${endpointInfos.length} endpoints to generate test files for`
);

// Generate test file content
function generateTestFile(endpoint: EndpointInfo): string {
  return `/**
 * @fileoverview ${endpoint.apiName} API - ${endpoint.functionName} Tests
 *
 * Tests for the ${endpoint.functionName} endpoint using the new per-endpoint architecture.
 */

import { createEndpointSuite } from "../shared/api-test-factory";

// Create the complete test suite for ${endpoint.apiName} API - ${endpoint.functionName} endpoint
createEndpointSuite("${endpoint.endpointId}");
`;
}

// Generate filename from endpoint ID
function getTestFileName(endpoint: EndpointInfo): string {
  // Convert "wsf-vessels.fetchVesselBasics" to "wsf-vessels--fetch-vessel-basics.test.ts"
  // Convert functionName from camelCase to kebab-case
  const functionNameKebab = endpoint.functionName
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");

  // Join API name and function name with double hyphen
  const fileName = `${endpoint.apiName}--${functionNameKebab}`;
  return `${fileName}.test.ts`;
}

// Remove all existing test files
console.log("Removing existing endpoint-group test files...");
const existingFiles = readdirSync(TEST_DIR).filter((f) =>
  f.endsWith(".test.ts")
);
existingFiles.forEach((file) => {
  const filePath = join(TEST_DIR, file);
  unlinkSync(filePath);
  console.log(`Removed: ${file}`);
});

// Generate new test files
console.log("\nGenerating per-endpoint test files...");
endpointInfos.forEach((endpoint) => {
  const fileName = getTestFileName(endpoint);
  const filePath = join(TEST_DIR, fileName);
  const content = generateTestFile(endpoint);

  writeFileSync(filePath, content, "utf-8");
  console.log(`Generated: ${fileName}`);
});

console.log(`\n✅ Generated ${endpointInfos.length} test files`);
