#!/usr/bin/env node

/**
 * @fileoverview Data Integrity Test Runner
 *
 * This script runs the comprehensive data integrity test suite to validate
 * that zodFetch returns the same data as native fetch for all endpoints.
 */

const { execSync } = require("child_process");
const path = require("path");

console.log("🧪 Running Data Integrity Test Suite...\n");

try {
  // Run the data integrity test suite
  const testCommand = "npm test tests/e2e/data-integrity-suite.test.ts";

  console.log(`Executing: ${testCommand}\n`);

  execSync(testCommand, {
    stdio: "inherit",
    cwd: path.resolve(__dirname, "../.."),
  });

  console.log("\n✅ Data integrity tests completed successfully!");
  console.log("\n📊 Summary:");
  console.log("- All endpoints validated for data consistency");
  console.log("- zodFetch vs native fetch comparison completed");
  console.log("- Field shape validation passed");
  console.log("- Data content validation passed");
  console.log("- Date conversion validation passed");
} catch (error) {
  console.error("\n❌ Data integrity tests failed:");
  console.error(error.message);
  process.exit(1);
}
