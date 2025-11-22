import { resolve } from "node:path";
import { defineConfig } from "vitest/config";
import AlphabeticalSequencer from "./shared/alphabetical-sequencer";

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
      sequencer: AlphabeticalSequencer, // Run tests in alphabetical order by filename
    },
    include: [
      process.env.API_FILTER || process.env.FUNCTION_FILTER
        ? `tests/e2e/api/${
            process.env.API_FILTER // If API_FILTER is set
              ? `${process.env.API_FILTER}` // Start with the API name
              : "*" // Otherwise, wildcard for API name
          }${
            process.env.FUNCTION_FILTER // If FUNCTION_FILTER is set
              ? `--${process.env.FUNCTION_FILTER}` // Append --functionName
              : process.env.API_FILTER // If only API_FILTER is set, append wildcard for function part
                ? "*"
                : ""
          }.test.{ts,js}`
        : "tests/e2e/**/*.test.{ts,js}", // Default to all tests
    ],
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
