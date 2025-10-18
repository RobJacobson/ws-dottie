/**
 * @fileoverview Multi-Test Hierarchical Orchestrator
 *
 * Implements a hierarchical test execution system where:
 * - All tests for each API are run together
 * - Within each API, all tests for each endpoint are run together
 * - Multiple test types are executed per endpoint before moving to the next endpoint
 */

import { describe, it } from "vitest";
import type { Endpoint } from "@/shared/types";
import {
  HierarchicalReporter,
  type HierarchicalResult,
} from "./hierarchical-reporter";
import { setupTestEndpoints } from "./setupUtils";

export interface TestConfig {
  apiName?: string | null;
  testName?: string;
}

export interface TestResult {
  endpoint: string;
  testName: string;
  success: boolean;
  message: string;
  duration: number;
}

export interface TestDefinition {
  name: string;
  testFunction: (
    endpoint: Endpoint<unknown, unknown>
  ) => Promise<{ success: boolean; message: string }>;
}

/**
 * Runs multiple test types in a hierarchical API → Endpoint → TestType structure
 */
export async function runMultiTestHierarchical(
  testDefinitions: TestDefinition[],
  testDescription: string,
  config: TestConfig = {}
): Promise<void> {
  const targetApi = config.apiName || null;

  // Set up test endpoints
  const setupResult = await setupTestEndpoints();

  // Filter APIs based on configuration
  let apiNames: string[];
  if (targetApi) {
    apiNames = [targetApi];
  } else {
    apiNames = [...Object.keys(setupResult.discoveredEndpoints)].sort();
  }

  // Initialize hierarchical reporter
  const reporter = new HierarchicalReporter();

  // Log test suite start
  console.log(
    `🚀 ${testDescription} - Testing ${apiNames.length} APIs with ${testDefinitions.length} test types`
  );

  // Track overall results
  const allResults: TestResult[] = [];
  let totalTests = 0;
  let passedTests = 0;

  // Run tests for each API in alphabetical order
  for (const apiName of apiNames) {
    const endpoints = (setupResult.discoveredEndpoints[apiName] || [])
      .slice()
      .sort((a, b) => a.functionName.localeCompare(b.functionName));

    if (endpoints.length === 0) {
      console.log(`⚠️  No endpoints available for ${apiName}`);
      continue;
    }

    // Log API start using reporter
    reporter.logApiProgress(apiName);

    // Run all test types for each endpoint within the API
    for (const endpoint of endpoints) {
      reporter.logEndpointProgress(apiName, endpoint.functionName);

      // Run all test types for this specific endpoint
      for (const testDef of testDefinitions) {
        totalTests++;

        const startTime = Date.now();

        try {
          const result = await testDef.testFunction(endpoint);
          const duration = Date.now() - startTime;

          // Add result to hierarchical reporter
          const hierarchicalResult: HierarchicalResult = {
            apiName,
            endpointName: endpoint.functionName,
            testName: testDef.name,
            success: result.success,
            message: result.message,
            duration,
          };

          reporter.addResult(hierarchicalResult);

          if (result.success) {
            passedTests++;
          }

          allResults.push({
            endpoint: `${apiName}.${endpoint.functionName}`,
            testName: testDef.name,
            success: result.success,
            message: result.message,
            duration,
          });
        } catch (error) {
          const duration = Date.now() - startTime;
          const errorMessage =
            error instanceof Error ? error.message : String(error);

          // Add failed result to hierarchical reporter
          const hierarchicalResult: HierarchicalResult = {
            apiName,
            endpointName: endpoint.functionName,
            testName: testDef.name,
            success: false,
            message: errorMessage,
            duration,
          };

          reporter.addResult(hierarchicalResult);

          allResults.push({
            endpoint: `${apiName}.${endpoint.functionName}`,
            testName: testDef.name,
            success: false,
            message: errorMessage,
            duration,
          });
        }
      }
    }
  }

  // Provide roll-up summary using hierarchical reporter
  reporter.printFinalSummary();

  const summary = reporter.getFinalSummary();
  if (summary.failedTests > 0) {
    // Throw error to fail the test suite if any tests failed
    throw new Error(`${summary.failedTests} test(s) failed`);
  }
}

/**
 * Creates a multi-test hierarchical test suite that follows API → Endpoint → TestType structure
 */
export function createMultiTestHierarchicalSuite(
  testDefinitions: TestDefinition[],
  testDescription: string,
  config: TestConfig = {}
): void {
  describe(`${testDescription} Tests`, () => {
    it(`should run ${testDescription} in hierarchical order`, async () => {
      await runMultiTestHierarchical(testDefinitions, testDescription, config);
    });
  });
}
