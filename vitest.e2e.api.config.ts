import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/e2e/**/*.api.test.{ts,tsx}"],
    exclude: [
      "tests/unit/**/*",
      "tests/integration/**/*",
      "tests/e2e/**/*.hook.test.{ts,tsx}",
      "node_modules",
      "dist",
    ],
    environment: "node", // Use Node.js environment for API tests
    globals: true,
    testTimeout: 30000, // 30 seconds for API calls
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
      "@": resolve(__dirname, "./src"),
      "@/test": resolve(__dirname, "./tests"),
    },
  },
  // Ensure ESM compatibility
  esbuild: {
    target: "es2020",
  },
});
