import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/e2e/**/*.e2e.test.{ts,tsx}"],
    exclude: [
      "tests/unit/**/*",
      "tests/integration/**/*",
      "node_modules",
      "dist",
    ],
    environment: "jsdom",
    globals: true,
    testTimeout: 15000, // 30 seconds for API calls
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
    outputFile: "test-results/e2e.json",
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
