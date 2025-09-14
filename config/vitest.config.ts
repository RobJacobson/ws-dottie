import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./tests/setup.ts"],
    testTimeout: 15000, // 15 seconds timeout for individual tests
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
