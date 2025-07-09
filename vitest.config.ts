import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    exclude: ["node_modules", "dist"],
    environment: "jsdom",
    globals: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@/test": resolve(__dirname, "./tests"),
    },
  },
});
