import { defineConfig } from "tsup";

export default defineConfig([
  // Main bundles - full library access
  {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: false,
    minify: true, // Enable minification to remove comments
    external: [
      "react",
      "react-dom",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
    outDir: "dist",
    outExtension({ format }) {
      return {
        js: format === "cjs" ? ".js" : ".mjs",
      };
    },
  },
  // Individual API modules for tree-shaking
  {
    entry: [
      "src/api/wsdot-border-crossings/index.ts",
      "src/api/wsdot-bridge-clearances/index.ts",
      "src/api/wsdot-commercial-vehicle-restrictions/index.ts",
      "src/api/wsdot-highway-alerts/index.ts",
      "src/api/wsdot-highway-cameras/index.ts",
      "src/api/wsdot-mountain-pass-conditions/index.ts",
      "src/api/wsdot-toll-rates/index.ts",
      "src/api/wsdot-traffic-flow/index.ts",
      "src/api/wsdot-travel-times/index.ts",
      "src/api/wsdot-weather-information/index.ts",
      "src/api/wsdot-weather-information-extended/index.ts",
      "src/api/wsdot-weather-stations/index.ts",
      "src/api/wsf-fares/index.ts",
      "src/api/wsf-schedule/index.ts",
      "src/api/wsf-terminals/index.ts",
      "src/api/wsf-vessels/index.ts",
    ],
    format: ["cjs", "esm"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: false,
    minify: true, // Enable minification to remove comments
    external: [
      "react",
      "react-dom",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
    outDir: "dist",
    outExtension({ format }) {
      return {
        js: format === "cjs" ? ".js" : ".mjs",
      };
    },
    // This will help tree-shake shared code that's already in core
    treeshake: true,
  },
]);
