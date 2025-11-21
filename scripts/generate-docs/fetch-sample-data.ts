#!/usr/bin/env node

/**
 * Fetch sample API responses for all endpoints
 *
 * This script iterates through all API endpoints and fetches sample responses
 * using the fetchDottie function, then saves them as JSON files in the docs/sample-data directory
 * organized by API name and function name.
 *
 * Usage:
 *   npm run fetch:samples                    # Fetch all samples
 *   npm run fetch:samples -- --api wsf-vessels # Fetch samples for one API
 *   npm run fetch:samples -- --endpoint getVesselBasics # Fetch one endpoint
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { endpointsFlat } from "../../src/apis/endpoints.ts";
import type {
  Endpoint,
  EndpointParams,
  EndpointResponse,
} from "../../src/apis/types.ts";
import { fetchDottie } from "../../src/shared/fetching/index.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "../..");
const docsRoot = join(projectRoot, "docs", "generated", "sample-data");

/**
 * Endpoints that should be skipped due to known server-side issues
 * Format: "apiName.functionName"
 */
const SKIP_ENDPOINTS = new Set([
  "wsdot-toll-rates.getTollTripInfo", // Server returns HTTP 400 due to DBNull in ModifiedDate column
]);

/**
 * Parse command-line arguments for filtering
 */
const parseArgs = (): {
  apiFilter?: string;
  endpointFilter?: string;
} => {
  const args = process.argv.slice(2);
  const result: { apiFilter?: string; endpointFilter?: string } = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--api" && i + 1 < args.length) {
      result.apiFilter = args[i + 1];
      i++;
    } else if (args[i] === "--endpoint" && i + 1 < args.length) {
      result.endpointFilter = args[i + 1];
      i++;
    }
  }

  return result;
};

/**
 * Fetch sample response for a single endpoint
 *
 * @param endpoint - The endpoint definition
 * @returns The fetched JSON data, or null on error
 */
const fetchSample = async (
  endpoint: Endpoint<EndpointParams, EndpointResponse>
): Promise<unknown | null> => {
  try {
    // Use fetchDottie to get the data with sampleParams directly
    const result = await fetchDottie({
      endpoint,
      params: endpoint.sampleParams || {},
      fetchMode: "native",
      logMode: "none",
      validate: false,
    });

    return result;
  } catch (error) {
    console.error(
      `  ✗ Failed to fetch ${endpoint.functionName}: ${error instanceof Error ? error.message : String(error)}`
    );
    return null;
  }
};

/**
 * Save sample response to docs directory
 *
 * @param endpoint - The endpoint definition
 * @param data - The JSON data to save
 */
const saveSample = (
  endpoint: Endpoint<EndpointParams, EndpointResponse>,
  data: unknown
): void => {
  const apiDir = join(docsRoot, endpoint.api);
  mkdirSync(apiDir, { recursive: true });

  const filePath = join(apiDir, `${endpoint.functionName}.json`);
  writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

/**
 * Create placeholder file for skipped endpoints
 *
 * @param endpoint - The endpoint definition
 */
const createPlaceholderFile = (
  endpoint: Endpoint<EndpointParams, EndpointResponse>
): void => {
  const apiDir = join(docsRoot, endpoint.api);
  mkdirSync(apiDir, { recursive: true });

  const filePath = join(apiDir, `${endpoint.functionName}.json`);
  const placeholderData = {
    message: `This endpoint is skipped due to known server-side issues. See fetch-sample-data.ts SKIP_ENDPOINTS list for details.`,
    endpoint: `${endpoint.api}.${endpoint.functionName}`,
    reason: "Server-side issues prevent reliable data fetching",
  };
  writeFileSync(filePath, JSON.stringify(placeholderData, null, 2), "utf-8");
};

/**
 * Process a single endpoint and return the result
 */
const processEndpoint = async (
  endpoint: Endpoint<EndpointParams, EndpointResponse>,
  index: number,
  total: number
): Promise<{
  success: boolean;
  endpoint: Endpoint<EndpointParams, EndpointResponse>;
}> => {
  process.stdout.write(
    `  [${index + 1}/${total}] Fetching ${endpoint.api}.${endpoint.functionName}...\r`
  );

  const endpointKey = `${endpoint.api}.${endpoint.functionName}`;

  // Check if this is a skipped endpoint
  if (SKIP_ENDPOINTS.has(endpointKey)) {
    process.stdout.write(
      `  [${index + 1}/${total}] Creating placeholder for ${endpoint.api}.${endpoint.functionName}...\r`
    );
    createPlaceholderFile(endpoint);
    process.stdout.write(
      `  [${index + 1}/${total}] ✓ Created placeholder for ${endpoint.api}.${endpoint.functionName}      \n`
    );
    return { success: true, endpoint };
  }

  const data = await fetchSample(endpoint);
  if (data !== null) {
    saveSample(endpoint, data);
    process.stdout.write(
      `  [${index + 1}/${total}] ✓ Fetched ${endpoint.api}.${endpoint.functionName}      \n`
    );
    return { success: true, endpoint };
  } else {
    process.stdout.write(
      `  [${index + 1}/${total}] ✗ Failed ${endpoint.api}.${endpoint.functionName}      \n`
    );
    return { success: false, endpoint };
  }
};

/**
 * Main execution function
 */
const main = async (): Promise<void> => {
  const { apiFilter, endpointFilter } = parseArgs();

  console.log("Fetching sample data for all endpoints...");
  if (apiFilter) {
    console.log(`Filter: API = ${apiFilter}`);
  }
  if (endpointFilter) {
    console.log(`Filter: Endpoint = ${endpointFilter}`);
  }

  // Filter endpoints based on arguments (skip list is handled in processEndpoint)
  const filteredEndpoints = endpointsFlat.filter((endpoint) => {
    // Apply filters
    if (apiFilter && endpoint.api.name !== apiFilter) {
      return false;
    }
    if (endpointFilter && endpoint.functionName !== endpointFilter) {
      return false;
    }
    return true;
  });

  if (filteredEndpoints.length === 0) {
    console.error(
      `\n✗ No endpoints found matching filters: API=${apiFilter || "any"}, Endpoint=${endpointFilter || "any"}`
    );
    process.exit(1);
  }

  console.log(`\nFound ${filteredEndpoints.length} endpoint(s) to fetch\n`);

  // Process endpoints sequentially to avoid overwhelming the API
  const results: {
    success: boolean;
    endpoint: Endpoint<EndpointParams, EndpointResponse>;
  }[] = [];
  for (const [index, endpoint] of filteredEndpoints.entries()) {
    const result = await processEndpoint(
      endpoint,
      index,
      filteredEndpoints.length
    );
    results.push(result);
  }

  const successCount = results.filter((r) => r.success).length;
  const failCount = results.filter((r) => !r.success).length;

  console.log(`\n✓ Completed: ${successCount} succeeded, ${failCount} failed`);

  if (failCount > 0) {
    process.exit(1);
  }
};

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
