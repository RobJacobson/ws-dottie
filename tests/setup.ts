import { afterAll, afterEach, beforeAll, beforeEach, vi } from "vitest";

// Global test setup
beforeAll(() => {
  // Set up test environment
  process.env.NODE_ENV = "test";

  // Configure API key for testing
  const apiKey =
    process.env.WSDOT_ACCESS_TOKEN ||
    process.env.EXPO_PUBLIC_WSDOT_ACCESS_TOKEN;
  if (!apiKey) {
    console.warn("WSDOT_ACCESS_TOKEN not set - integration tests may fail");
  }

  // Set up global test configuration
  global.testConfig = {
    apiKey: apiKey,
    baseUrl: "https://www.wsdot.wa.gov/ferries/api",
    timeout: 10000,
    retries: 3,
    rateLimitDelay: 500, // 1 second between calls
  };
});

afterAll(() => {
  // Cleanup global test state
  if (global.testConfig) {
    delete global.testConfig;
  }
});

beforeEach(() => {
  // Reset any test state
  vi.clearAllMocks();
  vi.clearAllTimers();
});

afterEach(() => {
  // Clean up after each test
  vi.restoreAllMocks();
});

// Global test utilities
// (declare global block removed; now in setup.d.ts)
