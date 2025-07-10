import { resolve } from "node:path";
import { config } from "dotenv";
import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";

// Load environment variables from .env file
config({ path: resolve(process.cwd(), ".env") });

// Global test setup
beforeAll(() => {
  // Set up test environment
  process.env.NODE_ENV = "test";

  // Verify API key is available
  if (!process.env.WSDOT_ACCESS_TOKEN) {
    console.warn("WSDOT_ACCESS_TOKEN not set in .env - E2E tests may fail");
  }

  console.log("🚀 Starting E2E tests with live WSF API calls");
});

afterAll(() => {
  console.log("✅ E2E tests completed");
});

beforeEach(() => {
  // Reset any test state
});

afterEach(() => {
  // Clean up after each test
});
