/**
 * @fileoverview Common Test Setup Utilities
 *
 * Shared utilities for setting up E2E tests, including endpoint discovery
 * and filtering logic that is common across all test files.
 */

import {
  discoverEndpoints,
  getAllEndpoints,
  type EndpointsByApi,
  type Endpoints,
} from "@/shared/endpoints";
import { testLogger } from "../testLogger";
import { getTargetModule, shouldTestSpecificModule } from "../testConfig";

/**
 * Result of test endpoint setup
 */
export interface TestSetupResult {
  discoveredEndpoints: EndpointsByApi;
  allEndpoints: Endpoints;
  filteredEndpoints: Endpoints;
  targetModule: string | null;
  apiNames: string[];
}

/**
 * Sets up test endpoints with common discovery and filtering logic
 * This replaces the duplicated setup code in all test files
 */
export async function setupTestEndpoints(): Promise<TestSetupResult> {
  // Discover all endpoints (filtered by configuration)
  const discoveredEndpoints = await discoverEndpoints();
  const allEndpoints = await getAllEndpoints();

  // Check for module filtering via environment variable
  const targetModule = getTargetModule();

  // Determine which APIs to test
  const apiNames =
    shouldTestSpecificModule() && targetModule !== "all" && targetModule
      ? [targetModule]
      : Object.keys(discoveredEndpoints);

  // Filter endpoints based on configuration
  const filteredEndpoints =
    shouldTestSpecificModule() && targetModule !== "all" && targetModule
      ? discoveredEndpoints[targetModule] || []
      : allEndpoints;

  return {
    discoveredEndpoints,
    allEndpoints,
    filteredEndpoints,
    targetModule,
    apiNames,
  };
}

/**
 * Logs test setup information for a specific test type
 */
export function logTestSetup(
  testType: string,
  setupResult: TestSetupResult
): void {
  const { targetModule, filteredEndpoints, allEndpoints, discoveredEndpoints } =
    setupResult;

  if (shouldTestSpecificModule() && targetModule !== "all" && targetModule) {
    testLogger.info(
      `Testing ${testType} for specific module: ${targetModule} (${filteredEndpoints.length} endpoints)`
    );
  } else {
    testLogger.info(
      `Testing ${testType} for all modules: ${Object.keys(discoveredEndpoints).length} APIs, ${allEndpoints.length} endpoints`
    );
  }
}

/**
 * Logs test suite completion
 */
export function logTestSuiteEnd(testSuiteName: string): void {
  testLogger.suiteEnd(`${testSuiteName} completed`);
}
