import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    testTimeout: 600000, // 10 minutes timeout for unified test suite
    // reporters are provided via CLI (see package.json)
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
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "../src"),
    },
  },
  esbuild: {
    target: "es2022",
  },
  define: {
    "import.meta.vitest": "undefined",
  },
});
