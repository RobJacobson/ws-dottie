/**
 * @fileoverview Test Setup Configuration
 *
 * Global setup for all tests, including environment configuration,
 * mocks, and shared test utilities.
 */

// Global test timeout configuration
global.testTimeout = 30000; // 30 seconds for e2e tests

// Mock console methods to reduce noise during tests
const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

// Only show console output in verbose mode, but allow it for vitest runs (e2e tests)
const isVitestRun = process.env.VITEST_WORKER_ID !== undefined;
if (!process.env.VERBOSE_TESTS && !isVitestRun) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}

// Restore console methods for error handling
process.on("uncaughtException", (error) => {
  originalConsoleError("Uncaught Exception:", error);
});

process.on("unhandledRejection", (reason) => {
  originalConsoleError("Unhandled Rejection:", reason);
});

// Global test utilities
global.testUtils = {
  // Restore console for debugging
  enableConsole: () => {
    console.log = originalConsoleLog;
    console.warn = originalConsoleWarn;
    console.error = originalConsoleError;
  },

  // Disable console for clean output
  disableConsole: () => {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
  },

  // Sleep utility for rate limiting tests
  sleep: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),
};

// Extend global types
declare global {
  var testUtils: {
    enableConsole: () => void;
    disableConsole: () => void;
    sleep: (ms: number) => Promise<void>;
  };
}

export {};
