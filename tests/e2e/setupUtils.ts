/**
 * @fileoverview Common Test Setup Utilities
 *
 * Utilities for setting up E2E tests, including endpoint discovery
 * and filtering logic that is common across all test files.
 */

import { apis, endpoints } from "@/shared/endpoints";
import type { Api, Endpoint } from "@/shared/types";
import { getTargetModule, shouldTestSpecificModule } from "./shared/config";
import { testLogger } from "./shared/logger";

/**
 * Result of test endpoint setup
 */
export interface TestSetupResult {
  discoveredEndpoints: Record<string, Endpoint<unknown, unknown>[]>;
  allEndpoints: Endpoint<unknown, unknown>[];
  filteredEndpoints: Endpoint<unknown, unknown>[];
  targetModule: string | null;
  apiNames: string[];
}

/**
 * Sets up test endpoints with common discovery and filtering logic
 * This replaces the duplicated setup code in all test files
 */
export async function setupTestEndpoints(): Promise<TestSetupResult> {
  // Create discoveredEndpoints object from apis
  const discoveredEndpoints = apis.reduce(
    (acc, api) => {
      acc[api.name] = api.endpoints;
      return acc;
    },
    {} as Record<string, Endpoint<unknown, unknown>[]>
  );

  const allEndpoints = endpoints;

  // Check for module filtering via command line parameters
  const targetModule = getTargetModule();

  // Determine which APIs to test
  const apiNames =
    shouldTestSpecificModule() && targetModule
      ? [targetModule]
      : Object.keys(discoveredEndpoints);
  // Filter endpoints based on configuration
  const filteredEndpoints = shouldTestSpecificModule()
    ? discoveredEndpoints[targetModule!] || []
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

  if (shouldTestSpecificModule() && targetModule) {
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
  testLogger.info(`${testSuiteName} completed`);
}
