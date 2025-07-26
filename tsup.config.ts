import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"], // Only ESM format for better bundler compatibility
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
  ],
  outDir: "dist",
  outExtension({ format }) {
    return {
      js: ".mjs", // Always use .mjs extension
    };
  },
  treeshake: true,
  // Ensure proper type exports
  noExternal: [],
});
