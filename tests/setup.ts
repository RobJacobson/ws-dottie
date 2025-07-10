import { afterAll, afterEach, beforeAll, beforeEach, vi } from "vitest";

// Global test setup
beforeAll(() => {
  // Set up test environment
  process.env.NODE_ENV = "test";

  // Configure API key for testing
  if (!process.env.WSF_API_KEY) {
    console.warn("WSF_API_KEY not set - integration tests may fail");
  }

  // Set up global test configuration
  global.testConfig = {
    apiKey: process.env.WSF_API_KEY,
    baseUrl: "https://www.wsdot.wa.gov/ferries/api",
    timeout: 10000,
    retries: 3,
    rateLimitDelay: 1000, // 1 second between calls
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
declare global {
  var testConfig?: {
    apiKey?: string;
    baseUrl: string;
    timeout: number;
    retries: number;
    rateLimitDelay: number;
  };
}
