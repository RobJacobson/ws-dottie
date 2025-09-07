import { resolve } from "node:path";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/cli/index.ts"],
  format: ["esm", "cjs"], // Build both ESM and CJS formats
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: false,
  minify: true,
  external: [
    "react",
    "react-dom",
    "@tanstack/react-query",
    "@tanstack/query-core",
    // CLI dependencies - exclude from main bundle
    "commander",
    "chalk",
  ],
  outDir: "dist",
  outExtension({ format }) {
    return {
      js: format === "esm" ? ".mjs" : ".js", // Use .mjs for ESM, .js for CJS
    };
  },
  treeshake: true,
  // Ensure proper type exports
  noExternal: [],
  // Configure path aliases
  esbuildOptions(options) {
    options.alias = {
      "@": resolve(__dirname, "src"),
    };
  },
});
