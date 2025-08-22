import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

// Check for JSONP flag from environment variable
const isJsonpEnabled =
  process.env.FORCE_JSONP === "true" || process.env.JSONP === "true";

export default defineConfig({
  test: {
    include: [
      "tests/e2e/**/*.api.test.{ts,tsx}",
      "tests/e2e/validation/**/*.validation.e2e.test.ts",
    ],
    exclude: [
      "tests/unit/**/*",
      "tests/integration/**/*",
      "tests/e2e/**/*.hook.test.{ts,tsx}",
      "tests/e2e/**/*Basics.e2e.test.ts",
      "tests/e2e/**/*GetData.e2e.test.ts",
      "node_modules",
      "dist",
    ],
    // Use happy-dom environment when JSONP is enabled for browser simulation
    environment: isJsonpEnabled ? "happy-dom" : "node",
    globals: true,
    // Increase timeout for JSONP tests since they take longer
    testTimeout: isJsonpEnabled ? 30000 : 15000,
    hookTimeout: 10000,
    setupFiles: ["tests/e2e/setup.ts"],
    // Explicitly set module format to avoid CJS deprecation warning
    pool: "forks",
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    reporters: ["verbose", "json"],
    // Force more verbose output to encourage larger terminal windows
    // Add progress indicators and detailed output
    logLevel: "info",
    // Use verbose reporter with more detailed output
    reporter: "verbose",
    outputFile: "test-results/e2e-api.json",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "../src"),
      "@/test": resolve(__dirname, "../tests"),
    },
  },
  // Ensure ESM compatibility
  esbuild: {
    target: "es2022",
  },
});
