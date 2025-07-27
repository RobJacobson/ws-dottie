#!/usr/bin/env node

/**
 * JSONP Test Wrapper Script
 *
 * This script allows using --jsonp flag with vitest by converting it to an environment variable.
 * Usage: node scripts/test-jsonp.js [vitest-args...]
 */

const { spawn } = require("node:child_process");

// Parse command line arguments
const args = process.argv.slice(2);
const jsonpIndex = args.indexOf("--jsonp");

// Check if --jsonp flag is present
const isJsonpEnabled = jsonpIndex !== -1;

// Remove --jsonp from args if present
if (isJsonpEnabled) {
  args.splice(jsonpIndex, 1);
}

// Set environment variable for JSONP
const env = { ...process.env };
if (isJsonpEnabled) {
  env.JSONP = "true";
  console.log("🚀 JSONP mode enabled - using browser environment simulation");
}

// Spawn vitest process
const vitest = spawn("npx", ["vitest", ...args], {
  stdio: "inherit",
  env,
  shell: true,
});

// Handle process exit
vitest.on("close", (code) => {
  process.exit(code);
});

// Handle process errors
vitest.on("error", (error) => {
  console.error("Error running vitest:", error);
  process.exit(1);
});
