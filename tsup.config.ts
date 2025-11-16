import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/cli/fetch-dottie.ts",
    // Add API-specific entry points
    "src/apis/wsf-vessels/index.ts",
    "src/apis/wsf-vessels/core.ts",
    "src/apis/wsf-vessels/schemas.ts",
    "src/apis/wsdot-border-crossings/index.ts",
    "src/apis/wsdot-border-crossings/core.ts",
    "src/apis/wsdot-border-crossings/schemas.ts",
    "src/apis/wsdot-bridge-clearances/index.ts",
    "src/apis/wsdot-bridge-clearances/core.ts",
    "src/apis/wsdot-bridge-clearances/schemas.ts",
    "src/apis/wsdot-commercial-vehicle-restrictions/index.ts",
    "src/apis/wsdot-commercial-vehicle-restrictions/core.ts",
    "src/apis/wsdot-commercial-vehicle-restrictions/schemas.ts",
    "src/apis/wsdot-highway-alerts/index.ts",
    "src/apis/wsdot-highway-alerts/core.ts",
    "src/apis/wsdot-highway-alerts/schemas.ts",
    "src/apis/wsdot-highway-cameras/index.ts",
    "src/apis/wsdot-highway-cameras/core.ts",
    "src/apis/wsdot-highway-cameras/schemas.ts",
    "src/apis/wsdot-mountain-pass-conditions/index.ts",
    "src/apis/wsdot-mountain-pass-conditions/core.ts",
    "src/apis/wsdot-mountain-pass-conditions/schemas.ts",
    "src/apis/wsdot-toll-rates/index.ts",
    "src/apis/wsdot-toll-rates/core.ts",
    "src/apis/wsdot-toll-rates/schemas.ts",
    "src/apis/wsdot-traffic-flow/index.ts",
    "src/apis/wsdot-traffic-flow/core.ts",
    "src/apis/wsdot-traffic-flow/schemas.ts",
    "src/apis/wsdot-travel-times/index.ts",
    "src/apis/wsdot-travel-times/core.ts",
    "src/apis/wsdot-travel-times/schemas.ts",
    "src/apis/wsdot-weather-information/index.ts",
    "src/apis/wsdot-weather-information/core.ts",
    "src/apis/wsdot-weather-information/schemas.ts",
    "src/apis/wsdot-weather-readings/index.ts",
    "src/apis/wsdot-weather-readings/core.ts",
    "src/apis/wsdot-weather-readings/schemas.ts",
    "src/apis/wsdot-weather-stations/index.ts",
    "src/apis/wsdot-weather-stations/core.ts",
    "src/apis/wsdot-weather-stations/schemas.ts",
    "src/apis/wsf-fares/index.ts",
    "src/apis/wsf-fares/core.ts",
    "src/apis/wsf-fares/schemas.ts",
    "src/apis/wsf-schedule/index.ts",
    "src/apis/wsf-schedule/core.ts",
    "src/apis/wsf-schedule/schemas.ts",
    "src/apis/wsf-terminals/index.ts",
    "src/apis/wsf-terminals/core.ts",
    "src/apis/wsf-terminals/schemas.ts",
  ],
  format: ["esm", "cjs"], // Build both ESM and CJS formats
  dts: {
    entry: [
      "src/index.ts",
      // Add API-specific type definition entries
      "src/apis/wsf-vessels/index.ts",
      "src/apis/wsf-vessels/core.ts",
      "src/apis/wsf-vessels/schemas.ts",
      "src/apis/wsdot-border-crossings/index.ts",
      "src/apis/wsdot-border-crossings/core.ts",
      "src/apis/wsdot-border-crossings/schemas.ts",
      "src/apis/wsdot-bridge-clearances/index.ts",
      "src/apis/wsdot-bridge-clearances/core.ts",
      "src/apis/wsdot-bridge-clearances/schemas.ts",
      "src/apis/wsdot-commercial-vehicle-restrictions/index.ts",
      "src/apis/wsdot-commercial-vehicle-restrictions/core.ts",
      "src/apis/wsdot-commercial-vehicle-restrictions/schemas.ts",
      "src/apis/wsdot-highway-alerts/index.ts",
      "src/apis/wsdot-highway-alerts/core.ts",
      "src/apis/wsdot-highway-alerts/schemas.ts",
      "src/apis/wsdot-highway-cameras/index.ts",
      "src/apis/wsdot-highway-cameras/core.ts",
      "src/apis/wsdot-highway-cameras/schemas.ts",
      "src/apis/wsdot-mountain-pass-conditions/index.ts",
      "src/apis/wsdot-mountain-pass-conditions/core.ts",
      "src/apis/wsdot-mountain-pass-conditions/schemas.ts",
      "src/apis/wsdot-toll-rates/index.ts",
      "src/apis/wsdot-toll-rates/core.ts",
      "src/apis/wsdot-toll-rates/schemas.ts",
      "src/apis/wsdot-traffic-flow/index.ts",
      "src/apis/wsdot-traffic-flow/core.ts",
      "src/apis/wsdot-traffic-flow/schemas.ts",
      "src/apis/wsdot-travel-times/index.ts",
      "src/apis/wsdot-travel-times/core.ts",
      "src/apis/wsdot-travel-times/schemas.ts",
      "src/apis/wsdot-weather-information/index.ts",
      "src/apis/wsdot-weather-information/core.ts",
      "src/apis/wsdot-weather-information/schemas.ts",
      "src/apis/wsdot-weather-readings/index.ts",
      "src/apis/wsdot-weather-readings/core.ts",
      "src/apis/wsdot-weather-readings/schemas.ts",
      "src/apis/wsdot-weather-stations/index.ts",
      "src/apis/wsdot-weather-stations/core.ts",
      "src/apis/wsdot-weather-stations/schemas.ts",
      "src/apis/wsf-fares/index.ts",
      "src/apis/wsf-fares/core.ts",
      "src/apis/wsf-fares/schemas.ts",
      "src/apis/wsf-schedule/index.ts",
      "src/apis/wsf-schedule/core.ts",
      "src/apis/wsf-schedule/schemas.ts",
      "src/apis/wsf-terminals/index.ts",
      "src/apis/wsf-terminals/core.ts",
      "src/apis/wsf-terminals/schemas.ts",
    ], // Generate .d.ts files for main library and API entries
  },
  splitting: true,
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
    return options;
  },
  // Custom post-build hook to copy OpenAPI JSON files
  async onSuccess() {
    console.log("Copying OpenAPI JSON files to dist/openapi...");

    const sourceDir = join(__dirname, "docs", "generated", "openapi-json");
    const targetDir = join(__dirname, "dist", "openapi");

    // Create target directory if it doesn't exist
    if (!existsSync(targetDir)) {
      mkdirSync(targetDir, { recursive: true });
    }

    // Check if source directory exists
    if (!existsSync(sourceDir)) {
      console.warn(
        `Warning: OpenAPI JSON source directory not found at ${sourceDir}`
      );
      console.warn(
        "Please run 'npm run docs:openapi:json' first to generate OpenAPI specifications."
      );
      return;
    }

    // Copy all JSON files
    const jsonFiles = readdirSync(sourceDir).filter((file) =>
      file.endsWith(".json")
    );
    let copiedCount = 0;

    for (const file of jsonFiles) {
      const sourcePath = join(sourceDir, file);
      const targetPath = join(targetDir, file);

      try {
        copyFileSync(sourcePath, targetPath);
        copiedCount++;
        console.log(`  Copied ${file}`);
      } catch (error) {
        console.error(`  Failed to copy ${file}:`, error);
      }
    }

    console.log(`✓ Copied ${copiedCount} OpenAPI JSON files to dist/openapi/`);
  },
});
