#!/usr/bin/env node

/**
 * @fileoverview Test Runner with Auto-Regeneration
 *
 * This script runs individual test suites with automatic configuration
 * regeneration, ensuring configs are always up-to-date without manual intervention.
 */

const { execSync } = require("child_process");
const path = require("path");

// Configuration
const CONFIG = {
  autoRegenerateConfigs: true,
  verbose: false,
  coverage: false,
  timeout: 300000, // 5 minutes
};

/**
 * Auto-regenerate configurations
 */
function autoRegenerateConfigs() {
  if (!CONFIG.autoRegenerateConfigs) {
    return;
  }

  console.log("🔄 Auto-regenerating configurations...");

  try {
    const startTime = Date.now();
    execSync("node tests/e2e/scripts/run-auto-config-generation-quiet.js", {
      stdio: "pipe", // Less verbose output
      cwd: process.cwd(),
    });
    const duration = Date.now() - startTime;
    console.log(`✅ Configurations regenerated in ${duration}ms`);
  } catch (error) {
    console.warn(
      "⚠️ Auto-regeneration failed, continuing with existing configs:"
    );
    console.warn(error.message);
  }
}

/**
 * Run a test suite
 */
function runTestSuite(testPath) {
  console.log(`🧪 Running test: ${testPath}`);

  let command = `npm test ${testPath}`;

  if (CONFIG.verbose) {
    command += " --reporter=verbose";
  }

  if (CONFIG.coverage) {
    command += " --coverage";
  }

  try {
    const startTime = Date.now();
    execSync(command, {
      stdio: "inherit",
      timeout: CONFIG.timeout,
    });
    const duration = Date.now() - startTime;
    console.log(`✅ Test completed in ${duration}ms`);
  } catch (error) {
    console.error(`❌ Test failed: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Main execution function
 */
function main() {
  const testPath = process.argv[2];

  if (!testPath) {
    console.error("❌ Please provide a test path");
    console.error(
      "Usage: ./tests/e2e/run-tests-with-auto-regen.js <test-path>"
    );
    console.error(
      "Example: ./tests/e2e/run-tests-with-auto-regen.js tests/e2e/phase4-comprehensive-suite.test.ts"
    );
    process.exit(1);
  }

  console.log("🚀 Starting test execution with auto-regeneration...");
  console.log(`📅 Start Time: ${new Date().toISOString()}`);

  try {
    // Auto-regenerate configurations
    autoRegenerateConfigs();

    // Run the test suite
    runTestSuite(testPath);

    console.log("🎉 Test execution completed successfully!");
  } catch (error) {
    console.error("❌ Test execution failed:", error.message);
    process.exit(1);
  }
}

// Run the main function
if (require.main === module) {
  main();
}

module.exports = {
  autoRegenerateConfigs,
  runTestSuite,
  CONFIG,
};
