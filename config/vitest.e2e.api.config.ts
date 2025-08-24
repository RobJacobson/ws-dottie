import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

// Check for JSONP flag from environment variable
const isJsonpEnabled =
  process.env.FORCE_JSONP === "true" || process.env.JSONP === "true";

// Check if we should force source-only mode for testing
const isSourceOnly = process.env.VITEST_SOURCE_ONLY === "true";

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
    outputFile: "test-results/e2e-api.json",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "../src"),
      "@/test": resolve(__dirname, "../tests"),
      // Force vitest to use source files instead of compiled dist files
      ...(isSourceOnly && {
        "ws-dottie": resolve(__dirname, "../src"),
        // Override any imports that might resolve to dist
        "./index": resolve(__dirname, "../src/index.ts"),
        "./index.js": resolve(__dirname, "../src/index.ts"),
        "./index.mjs": resolve(__dirname, "../src/index.ts"),
      }),
    },
    // Force vitest to use source files instead of compiled dist files
    conditions: isSourceOnly
      ? ["development", "test", "source", "import", "default"]
      : ["development", "test"],
  },
  // Ensure ESM compatibility
  esbuild: {
    target: "es2022",
  },
  // Override module resolution to prefer source over dist
  define: {
    __DEV__: true,
    __TEST__: true,
    __SOURCE__: true,
  },
  // Override Node.js module resolution for testing
  optimizeDeps: {
    include: ["src/**/*"],
    exclude: ["dist/**/*"],
  },
});
