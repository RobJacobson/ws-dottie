import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

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
    // Use happy-dom environment when FORCE_JSONP is enabled for JSONP testing
    environment: process.env.FORCE_JSONP === "true" ? "happy-dom" : "node",
    globals: true,
    // Increase timeout for JSONP tests since they take longer
    testTimeout: process.env.FORCE_JSONP === "true" ? 30000 : 15000,
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
