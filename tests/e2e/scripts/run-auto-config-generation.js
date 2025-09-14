#!/usr/bin/env node

/**
 * @fileoverview Auto-Configuration Generation Script
 *
 * This script generates auto-configuration files for all discovered APIs
 * from the Endpoint objects, creating comprehensive test configurations
 * that work with the enhanced test generators.
 */

const { execSync } = require("child_process");
const path = require("path");

console.log("🚀 Starting auto-configuration generation...\n");

try {
  // Run the auto-config generator
  console.log("📝 Generating auto-configuration files...");
  execSync("npx tsx tests/e2e/generators/autoConfigGenerator.ts", {
    stdio: "inherit",
    cwd: process.cwd(),
  });

  console.log("\n✅ Auto-configuration generation completed successfully!");
  console.log("📁 Generated files are available in tests/e2e/auto-generated/");
  console.log(
    "🧪 Run tests with: npm test tests/e2e/modern-test-suite.test.ts"
  );
} catch (error) {
  console.error("\n❌ Auto-configuration generation failed:");
  console.error(error.message);
  process.exit(1);
}
