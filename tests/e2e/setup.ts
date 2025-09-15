/**
 * @fileoverview E2E Test Setup
 *
 * Global setup for E2E tests
 */

import { beforeAll, afterAll } from "vitest";

beforeAll(() => {
  console.log("🚀 Starting E2E Test Suite");
});

afterAll(() => {
  console.log("🏁 E2E Test Suite Complete");
});
