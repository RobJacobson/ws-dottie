import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    exclude: ["node_modules", "dist"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["tests/setup.ts"],
    // Load environment variables from .env file
    env: {
      WSDOT_ACCESS_TOKEN: process.env.WSDOT_ACCESS_TOKEN || "",
      EXPO_PUBLIC_WSDOT_ACCESS_TOKEN:
        process.env.EXPO_PUBLIC_WSDOT_ACCESS_TOKEN || "",
    },
    // Explicitly set module format to avoid CJS deprecation warning
    pool: "forks",
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@/test": resolve(__dirname, "./tests"),
    },
  },
  // Ensure ESM compatibility
  esbuild: {
    target: "es2022",
  },
});
