/**
 * @fileoverview Hierarchical Test Setup for E2E Tests
 *
 * Provides a unified setup function using the new hierarchical orchestration
 * to eliminate duplicated configuration across all test files.
 */

import type { Endpoint } from "@/shared/types";
import {
  createHierarchicalTestSuite,
  type HierarchicalTestFn,
} from "../orchestrator";
import { getTargetModule } from "./config";

export interface HierarchicalTestSetupOptions {
  description: string;
  testFunction: HierarchicalTestFn;
}

export function createHierarchicalTestSuiteWrapper({
  description,
  testFunction,
}: HierarchicalTestSetupOptions): void {
  const config = {
    apiName: getTargetModule() || undefined,
  };

  createHierarchicalTestSuite(testFunction, description, config);
}
