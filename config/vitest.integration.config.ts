import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/integration/**/*.test.ts"],
    exclude: ["tests/unit/**/*"],
    testTimeout: 30000, // 30 seconds for API calls
    hookTimeout: 10000,
    setupFiles: ["tests/setup.ts"],
    environment: "jsdom",
    globals: true,
    // Load environment variables from .env file
    env: {
      WSDOT_ACCESS_TOKEN: process.env.WSDOT_ACCESS_TOKEN || "",
      EXPO_PUBLIC_WSDOT_ACCESS_TOKEN:
        process.env.EXPO_PUBLIC_WSDOT_ACCESS_TOKEN || "",
    },
    reporters: ["verbose", "json"],
    outputFile: "test-results/integration.json",
    // Explicitly set module format to avoid CJS deprecation warning
    pool: "forks",
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "tests/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/coverage/**",
      ],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "../src"),
    },
  },
  // Ensure ESM compatibility
  esbuild: {
    target: "es2022",
  },
});
