import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./tests/setup.ts"],
    testTimeout: 120000, // 2 minutes timeout for unified test suite
    // reporters are provided via CLI (see package.json)
    fileParallelism: false,
    pool: "forks",
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
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
