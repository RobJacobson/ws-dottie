#!/usr/bin/env node

/**
 * @fileoverview Comprehensive Test Runner
 *
 * This script runs all e2e tests including the new data integrity validation
 * tests to ensure complete coverage and data consistency.
 */

const { execSync } = require("child_process");
const path = require("path");

console.log("🚀 Running Comprehensive E2E Test Suite...\n");

const tests = [
  {
    name: "Discovery Tests",
    command: "npm test tests/e2e/discovery.test.ts",
    description: "Endpoint discovery and configuration generation",
  },
  {
    name: "Modern Test Suite",
    command: "npm test tests/e2e/modern-test-suite.test.ts",
    description: "Enhanced test generators with context-aware error messages",
  },
  {
    name: "Data Integrity Tests",
    command: "npm test tests/e2e/data-integrity-suite.test.ts",
    description: "zodFetch vs native fetch data consistency validation",
  },
];

let passedTests = 0;
let failedTests = 0;

tests.forEach((test, index) => {
  console.log(`\n📋 Running ${index + 1}/${tests.length}: ${test.name}`);
  console.log(`📝 ${test.description}\n`);

  try {
    execSync(test.command, {
      stdio: "inherit",
      cwd: path.resolve(__dirname, "../.."),
    });

    console.log(`\n✅ ${test.name} passed`);
    passedTests++;
  } catch (error) {
    console.error(`\n❌ ${test.name} failed:`);
    console.error(error.message);
    failedTests++;
  }
});

console.log("\n" + "=".repeat(60));
console.log("📊 COMPREHENSIVE TEST SUITE SUMMARY");
console.log("=".repeat(60));
console.log(`✅ Passed: ${passedTests}/${tests.length}`);
console.log(`❌ Failed: ${failedTests}/${tests.length}`);

if (failedTests === 0) {
  console.log(
    "\n🎉 All tests passed! The e2e test suite is working correctly."
  );
  console.log("\n📋 Test Coverage:");
  console.log("- ✅ Endpoint discovery and configuration generation");
  console.log(
    "- ✅ Enhanced test generators with context-aware error messages"
  );
  console.log("- ✅ Data integrity validation (zodFetch vs native fetch)");
  console.log("- ✅ Performance testing aligned with cache strategies");
  console.log("- ✅ Mock data generation and validation");
  console.log("- ✅ Auto-generated configurations for all 16 APIs");

  console.log("\n🚀 Ready for production use!");
} else {
  console.log("\n⚠️  Some tests failed. Please review the output above.");
  process.exit(1);
}
