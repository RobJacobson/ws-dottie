import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./tests/e2e/shared/setup.ts"],
    testTimeout: 60000, // 60 seconds timeout for API tests
    reporters: ["verbose"], // Use standard verbose reporter
    // Note: fileParallelism disabled to avoid race conditions with external API calls
    fileParallelism: false,
    // Note: single fork used to ensure consistent state across API tests
    pool: "forks",
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    // Note: concurrent execution disabled to prevent API rate limiting issues
    sequence: {
      concurrent: false,
      shuffle: false,
      hooks: "list",
    },
    include: ["tests/e2e/**/*.test.{ts,js}"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "../../src"),
    },
  },
  esbuild: {
    target: "es2022",
  },
});
