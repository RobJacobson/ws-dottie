#!/usr/bin/env node

/**
 * Copy OpenAPI JSON files from docs/generated/openapi-json to dist/openapi
 *
 * This script copies all generated OpenAPI JSON files to the distribution
 * directory so they can be consumed via npm package exports.
 */

const { copyFileSync, existsSync, mkdirSync, readdirSync } = require("fs");
const { join } = require("path");

const sourceDir = join(__dirname, "..", "docs", "generated", "openapi-json");
const targetDir = join(__dirname, "..", "dist", "openapi");

// Create target directory if it doesn't exist
if (!existsSync(targetDir)) {
  mkdirSync(targetDir, { recursive: true });
}

// Check if source directory exists
if (!existsSync(sourceDir)) {
  console.warn(
    "OpenAPI JSON source directory not found. Run npm run docs:openapi:json first."
  );
  process.exit(0);
}

// Copy all JSON files
const files = readdirSync(sourceDir).filter((f) => f.endsWith(".json"));
let count = 0;

files.forEach((file) => {
  copyFileSync(join(sourceDir, file), join(targetDir, file));
  count++;
});

console.log(`Copied ${count} OpenAPI JSON files to dist/openapi/`);
