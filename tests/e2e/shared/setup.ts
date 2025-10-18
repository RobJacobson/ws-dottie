/**
 * @fileoverview Centralized Test Setup for E2E Tests
 *
 * Provides a unified setup function to eliminate duplicated configuration
 * across all test files, making the test suite more maintainable.
 */

import type { Endpoint } from "@/shared/types";
import { setupTestEndpoints } from "../setupUtils";
import { runParallelTest } from "../testRunner";
import { getTargetModule } from "./config";

export interface TestSetupOptions {
  description: string;
  testFunction: (
    endpoint: Endpoint<unknown, unknown>
  ) => Promise<{ success: boolean; message: string }>;
}

export function createTestSuite({
  description,
  testFunction,
}: TestSetupOptions): void {
  const config = {
    apiName: getTargetModule() || undefined,
  };

  runParallelTest(testFunction, description, config);
}

export { setupTestEndpoints };
