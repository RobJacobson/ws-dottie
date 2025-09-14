#!/usr/bin/env node

/**
 * @fileoverview Quiet Auto-Configuration Generation Script
 *
 * This script generates auto-configuration files with minimal output,
 * designed for integration into test runners and CI/CD pipelines.
 */

const { execSync } = require("child_process");

console.log("🔄 Regenerating configurations...");

try {
  const startTime = Date.now();

  // Run the auto-config generator with minimal output
  execSync("npx tsx tests/e2e/generators/autoConfigGenerator.ts", {
    stdio: "pipe", // Suppress most output
    cwd: process.cwd(),
  });

  const duration = Date.now() - startTime;
  console.log(`✅ Configurations regenerated in ${duration}ms`);
} catch (error) {
  console.error("❌ Auto-configuration generation failed:");
  console.error(error.message);
  process.exit(1);
}
