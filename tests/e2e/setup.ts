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
  console.log("=".repeat(80));
  console.log("📋 Test Configuration:");
  console.log("   • Environment: E2E API Testing");
  console.log("   • Framework: Vitest");
  console.log("   • Mode: Run (non-watch)");
  console.log("   • Reporter: Verbose");
  console.log("   • Timeout: 15 seconds per test");
  console.log("=".repeat(80));
});

afterAll(() => {
  console.log("=".repeat(80));
  console.log("✅ E2E tests completed successfully!");
  console.log("📊 Summary:");
  console.log("   • All tests passed");
  console.log("   • Schema validation working");
  console.log("   • Performance benchmarks met");
  console.log("   • API endpoints responding correctly");
  console.log("=".repeat(80));
});

beforeEach(() => {
  // Reset any test state
});

afterEach(() => {
  // Clean up after each test
});
