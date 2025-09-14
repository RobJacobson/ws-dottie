#!/usr/bin/env node

/**
 * Simple test runner script to validate the discovery engine implementation
 * without running the full test suite.
 */

const { execSync } = require("child_process");
const path = require("path");

console.log("🧪 Running Endpoint Discovery Proof of Concept...\n");

try {
  // Run the discovery test
  const testCommand = `npx vitest run tests/e2e/discovery.test.ts --reporter=verbose`;

  console.log("Running command:", testCommand);
  console.log("=".repeat(60));

  execSync(testCommand, {
    stdio: "inherit",
    cwd: path.resolve(__dirname, "../.."),
  });

  console.log("\n" + "=".repeat(60));
  console.log("✅ Discovery engine proof of concept completed successfully!");
} catch (error) {
  console.error("\n❌ Discovery test failed:", error.message);
  process.exit(1);
}
