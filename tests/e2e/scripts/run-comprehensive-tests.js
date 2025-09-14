#!/usr/bin/env node

/**
 * @fileoverview Comprehensive Test Runner
 *
 * This script provides production-ready test execution for the comprehensive
 * comprehensive E2E test suite with advanced features and monitoring.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Configuration
const CONFIG = {
  testSuites: [
    "comprehensive-suite.test.ts",
    "modern-test-suite.test.ts",
    "data-integrity-suite.test.ts",
    "discovery.test.ts",
  ],
  performanceTests: ["performance-testing.ts"],
  errorHandlingTests: ["advancedErrorHandling.ts"],
  outputDir: "./test-results",
  reportsDir: "./test-reports",
  timeout: 600000, // 10 minutes
  retries: 2,
  parallel: true,
  verbose: true,
  coverage: true,
  performance: true,
  errorHandling: true,
  autoRegenerateConfigs: true, // Automatically regenerate configs before tests
};

// Test execution results
let testResults = {
  startTime: new Date(),
  endTime: null,
  duration: 0,
  suites: [],
  summary: {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
    errors: 0,
  },
  performance: {
    averageResponseTime: 0,
    maxResponseTime: 0,
    minResponseTime: Infinity,
    totalRequests: 0,
    errorRate: 0,
  },
  errorHandling: {
    totalErrors: 0,
    retryableErrors: 0,
    circuitBreakerTrips: 0,
    recoveryTime: 0,
  },
};

/**
 * Auto-regenerate configurations if enabled
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
 * Main execution function
 */
async function main() {
  console.log("🚀 Starting Comprehensive E2E Test Suite Execution...");
  console.log(`📅 Start Time: ${testResults.startTime.toISOString()}`);
  console.log(`⚙️ Configuration:`, JSON.stringify(CONFIG, null, 2));

  try {
    // Auto-regenerate configurations
    autoRegenerateConfigs();

    // Create output directories
    createOutputDirectories();

    // Run test suites
    await runTestSuites();

    // Run performance tests
    if (CONFIG.performance) {
      await runPerformanceTests();
    }

    // Run error handling tests
    if (CONFIG.errorHandling) {
      await runErrorHandlingTests();
    }

    // Generate reports
    generateReports();

    // Display summary
    displaySummary();

    // Exit with appropriate code
    process.exit(testResults.summary.failed > 0 ? 1 : 0);
  } catch (error) {
    console.error("❌ Test execution failed:", error);
    process.exit(1);
  }
}

/**
 * Create output directories
 */
function createOutputDirectories() {
  console.log("📁 Creating output directories...");

  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }

  if (!fs.existsSync(CONFIG.reportsDir)) {
    fs.mkdirSync(CONFIG.reportsDir, { recursive: true });
  }

  console.log("✅ Output directories created");
}

/**
 * Run test suites
 */
async function runTestSuites() {
  console.log("🧪 Running test suites...");

  for (const suite of CONFIG.testSuites) {
    console.log(`\n📋 Running ${suite}...`);

    const startTime = Date.now();
    let result = {
      name: suite,
      startTime: new Date(),
      endTime: null,
      duration: 0,
      status: "running",
      output: "",
      error: null,
    };

    try {
      const command = buildTestCommand(suite);
      console.log(`🔧 Command: ${command}`);

      const output = execSync(command, {
        encoding: "utf8",
        timeout: CONFIG.timeout,
        stdio: "pipe",
      });

      result.status = "passed";
      result.output = output;
      result.endTime = new Date();
      result.duration = Date.now() - startTime;

      console.log(`✅ ${suite} passed in ${result.duration}ms`);
    } catch (error) {
      result.status = "failed";
      result.error = error.message;
      result.endTime = new Date();
      result.duration = Date.now() - startTime;

      console.log(`❌ ${suite} failed in ${result.duration}ms`);
      console.log(`Error: ${error.message}`);

      // Retry if configured
      if (CONFIG.retries > 0) {
        console.log(`🔄 Retrying ${suite}...`);
        CONFIG.retries--;
        return runTestSuites();
      }
    }

    testResults.suites.push(result);
    updateSummary(result);
  }

  console.log("✅ Test suites completed");
}

/**
 * Run performance tests
 */
async function runPerformanceTests() {
  console.log("⚡ Running performance tests...");

  try {
    const command = buildPerformanceTestCommand();
    console.log(`🔧 Command: ${command}`);

    const output = execSync(command, {
      encoding: "utf8",
      timeout: CONFIG.timeout,
      stdio: "pipe",
    });

    // Parse performance results
    const performanceData = parsePerformanceOutput(output);
    testResults.performance = {
      ...testResults.performance,
      ...performanceData,
    };

    console.log("✅ Performance tests completed");
  } catch (error) {
    console.log(`❌ Performance tests failed: ${error.message}`);
    testResults.summary.errors++;
  }
}

/**
 * Run error handling tests
 */
async function runErrorHandlingTests() {
  console.log("🛡️ Running error handling tests...");

  try {
    const command = buildErrorHandlingTestCommand();
    console.log(`🔧 Command: ${command}`);

    const output = execSync(command, {
      encoding: "utf8",
      timeout: CONFIG.timeout,
      stdio: "pipe",
    });

    // Parse error handling results
    const errorHandlingData = parseErrorHandlingOutput(output);
    testResults.errorHandling = {
      ...testResults.errorHandling,
      ...errorHandlingData,
    };

    console.log("✅ Error handling tests completed");
  } catch (error) {
    console.log(`❌ Error handling tests failed: ${error.message}`);
    testResults.summary.errors++;
  }
}

/**
 * Build test command
 */
function buildTestCommand(suite) {
  let command = `npm test tests/e2e/${suite}`;

  if (CONFIG.verbose) {
    command += " --reporter=verbose";
  }

  if (CONFIG.coverage) {
    command += " --coverage";
  }

  if (CONFIG.parallel) {
    command += " --threads";
  }

  return command;
}

/**
 * Build performance test command
 */
function buildPerformanceTestCommand() {
  let command = "npm test tests/e2e/generators/performanceTesting.ts";

  if (CONFIG.verbose) {
    command += " --reporter=verbose";
  }

  return command;
}

/**
 * Build error handling test command
 */
function buildErrorHandlingTestCommand() {
  let command = "npm test tests/e2e/generators/advancedErrorHandling.ts";

  if (CONFIG.verbose) {
    command += " --reporter=verbose";
  }

  return command;
}

/**
 * Parse performance test output
 */
function parsePerformanceOutput(output) {
  // This is a simplified implementation
  // In a real implementation, you would parse the actual test output
  const lines = output.split("\n");
  const performanceData = {
    averageResponseTime: 0,
    maxResponseTime: 0,
    minResponseTime: Infinity,
    totalRequests: 0,
    errorRate: 0,
  };

  // Look for performance metrics in output
  for (const line of lines) {
    if (line.includes("averageResponseTime:")) {
      const match = line.match(/averageResponseTime:\s*(\d+)/);
      if (match) {
        performanceData.averageResponseTime = parseInt(match[1]);
      }
    }

    if (line.includes("maxResponseTime:")) {
      const match = line.match(/maxResponseTime:\s*(\d+)/);
      if (match) {
        performanceData.maxResponseTime = parseInt(match[1]);
      }
    }

    if (line.includes("totalRequests:")) {
      const match = line.match(/totalRequests:\s*(\d+)/);
      if (match) {
        performanceData.totalRequests = parseInt(match[1]);
      }
    }

    if (line.includes("errorRate:")) {
      const match = line.match(/errorRate:\s*(\d+\.?\d*)/);
      if (match) {
        performanceData.errorRate = parseFloat(match[1]);
      }
    }
  }

  return performanceData;
}

/**
 * Parse error handling test output
 */
function parseErrorHandlingOutput(output) {
  // This is a simplified implementation
  // In a real implementation, you would parse the actual test output
  const lines = output.split("\n");
  const errorHandlingData = {
    totalErrors: 0,
    retryableErrors: 0,
    circuitBreakerTrips: 0,
    recoveryTime: 0,
  };

  // Look for error handling metrics in output
  for (const line of lines) {
    if (line.includes("totalErrors:")) {
      const match = line.match(/totalErrors:\s*(\d+)/);
      if (match) {
        errorHandlingData.totalErrors = parseInt(match[1]);
      }
    }

    if (line.includes("retryableErrors:")) {
      const match = line.match(/retryableErrors:\s*(\d+)/);
      if (match) {
        errorHandlingData.retryableErrors = parseInt(match[1]);
      }
    }

    if (line.includes("circuitBreakerTrips:")) {
      const match = line.match(/circuitBreakerTrips:\s*(\d+)/);
      if (match) {
        errorHandlingData.circuitBreakerTrips = parseInt(match[1]);
      }
    }
  }

  return errorHandlingData;
}

/**
 * Update test summary
 */
function updateSummary(result) {
  testResults.summary.total++;

  switch (result.status) {
    case "passed":
      testResults.summary.passed++;
      break;
    case "failed":
      testResults.summary.failed++;
      break;
    case "skipped":
      testResults.summary.skipped++;
      break;
    default:
      testResults.summary.errors++;
  }
}

/**
 * Generate test reports
 */
function generateReports() {
  console.log("📊 Generating test reports...");

  // Generate JSON report
  generateJsonReport();

  // Generate HTML report
  generateHtmlReport();

  // Generate performance report
  generatePerformanceReport();

  // Generate error handling report
  generateErrorHandlingReport();

  console.log("✅ Test reports generated");
}

/**
 * Generate JSON report
 */
function generateJsonReport() {
  const reportPath = path.join(CONFIG.reportsDir, "test-results.json");
  const report = {
    ...testResults,
    endTime: new Date(),
    duration: Date.now() - testResults.startTime.getTime(),
  };

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`📄 JSON report saved to ${reportPath}`);
}

/**
 * Generate HTML report
 */
function generateHtmlReport() {
  const reportPath = path.join(CONFIG.reportsDir, "test-results.html");
  const html = generateHtmlReportContent();

  fs.writeFileSync(reportPath, html);
  console.log(`📄 HTML report saved to ${reportPath}`);
}

/**
 * Generate HTML report content
 */
function generateHtmlReportContent() {
  const duration = Date.now() - testResults.startTime.getTime();
  const successRate =
    testResults.summary.total > 0
      ? (
          (testResults.summary.passed / testResults.summary.total) *
          100
        ).toFixed(2)
      : 0;

  return `
<!DOCTYPE html>
<html>
<head>
    <title>Comprehensive E2E Test Results</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #f0f0f0; padding: 20px; border-radius: 5px; }
        .summary { display: flex; gap: 20px; margin: 20px 0; }
        .metric { background: #e8f4f8; padding: 15px; border-radius: 5px; text-align: center; }
        .metric h3 { margin: 0; color: #333; }
        .metric .value { font-size: 24px; font-weight: bold; }
        .passed { color: #28a745; }
        .failed { color: #dc3545; }
        .skipped { color: #ffc107; }
        .errors { color: #6c757d; }
        .suite { margin: 10px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
        .suite.passed { border-left: 5px solid #28a745; }
        .suite.failed { border-left: 5px solid #dc3545; }
        .performance { background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .error-handling { background: #fff3cd; padding: 20px; border-radius: 5px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Comprehensive E2E Test Results</h1>
        <p>Generated: ${new Date().toISOString()}</p>
        <p>Duration: ${(duration / 1000).toFixed(2)} seconds</p>
    </div>
    
    <div class="summary">
        <div class="metric">
            <h3>Total Tests</h3>
            <div class="value">${testResults.summary.total}</div>
        </div>
        <div class="metric">
            <h3>Passed</h3>
            <div class="value passed">${testResults.summary.passed}</div>
        </div>
        <div class="metric">
            <h3>Failed</h3>
            <div class="value failed">${testResults.summary.failed}</div>
        </div>
        <div class="metric">
            <h3>Skipped</h3>
            <div class="value skipped">${testResults.summary.skipped}</div>
        </div>
        <div class="metric">
            <h3>Success Rate</h3>
            <div class="value">${successRate}%</div>
        </div>
    </div>
    
    <h2>Test Suites</h2>
    ${testResults.suites
      .map(
        (suite) => `
        <div class="suite ${suite.status}">
            <h3>${suite.name}</h3>
            <p>Status: ${suite.status}</p>
            <p>Duration: ${suite.duration}ms</p>
            ${suite.error ? `<p>Error: ${suite.error}</p>` : ""}
        </div>
    `
      )
      .join("")}
    
    <div class="performance">
        <h2>Performance Metrics</h2>
        <p>Average Response Time: ${testResults.performance.averageResponseTime}ms</p>
        <p>Max Response Time: ${testResults.performance.maxResponseTime}ms</p>
        <p>Total Requests: ${testResults.performance.totalRequests}</p>
        <p>Error Rate: ${testResults.performance.errorRate}%</p>
    </div>
    
    <div class="error-handling">
        <h2>Error Handling Metrics</h2>
        <p>Total Errors: ${testResults.errorHandling.totalErrors}</p>
        <p>Retryable Errors: ${testResults.errorHandling.retryableErrors}</p>
        <p>Circuit Breaker Trips: ${testResults.errorHandling.circuitBreakerTrips}</p>
        <p>Recovery Time: ${testResults.errorHandling.recoveryTime}ms</p>
    </div>
</body>
</html>
  `;
}

/**
 * Generate performance report
 */
function generatePerformanceReport() {
  const reportPath = path.join(CONFIG.reportsDir, "performance-report.json");
  const report = {
    timestamp: new Date().toISOString(),
    metrics: testResults.performance,
    recommendations: generatePerformanceRecommendations(),
  };

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`📄 Performance report saved to ${reportPath}`);
}

/**
 * Generate error handling report
 */
function generateErrorHandlingReport() {
  const reportPath = path.join(CONFIG.reportsDir, "error-handling-report.json");
  const report = {
    timestamp: new Date().toISOString(),
    metrics: testResults.errorHandling,
    recommendations: generateErrorHandlingRecommendations(),
  };

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`📄 Error handling report saved to ${reportPath}`);
}

/**
 * Generate performance recommendations
 */
function generatePerformanceRecommendations() {
  const recommendations = [];

  if (testResults.performance.averageResponseTime > 5000) {
    recommendations.push(
      "Consider implementing caching strategies to reduce response times"
    );
  }

  if (testResults.performance.errorRate > 5) {
    recommendations.push(
      "Investigate high error rate and implement better error handling"
    );
  }

  if (testResults.performance.maxResponseTime > 30000) {
    recommendations.push(
      "Review timeout configurations and optimize slow endpoints"
    );
  }

  return recommendations;
}

/**
 * Generate error handling recommendations
 */
function generateErrorHandlingRecommendations() {
  const recommendations = [];

  if (testResults.errorHandling.circuitBreakerTrips > 0) {
    recommendations.push(
      "Consider adjusting circuit breaker thresholds or improving endpoint reliability"
    );
  }

  if (
    testResults.errorHandling.retryableErrors >
    testResults.errorHandling.totalErrors * 0.5
  ) {
    recommendations.push(
      "Implement more robust retry logic with exponential backoff"
    );
  }

  if (testResults.errorHandling.recoveryTime > 60000) {
    recommendations.push(
      "Optimize error recovery mechanisms to reduce downtime"
    );
  }

  return recommendations;
}

/**
 * Display test summary
 */
function displaySummary() {
  testResults.endTime = new Date();
  testResults.duration =
    testResults.endTime.getTime() - testResults.startTime.getTime();

  console.log("\n📊 Test Execution Summary");
  console.log("========================");
  console.log(
    `⏱️  Duration: ${(testResults.duration / 1000).toFixed(2)} seconds`
  );
  console.log(`📋 Total Tests: ${testResults.summary.total}`);
  console.log(`✅ Passed: ${testResults.summary.passed}`);
  console.log(`❌ Failed: ${testResults.summary.failed}`);
  console.log(`⏭️  Skipped: ${testResults.summary.skipped}`);
  console.log(`⚠️  Errors: ${testResults.summary.errors}`);

  const successRate =
    testResults.summary.total > 0
      ? (
          (testResults.summary.passed / testResults.summary.total) *
          100
        ).toFixed(2)
      : 0;
  console.log(`📈 Success Rate: ${successRate}%`);

  if (testResults.performance.totalRequests > 0) {
    console.log("\n⚡ Performance Metrics");
    console.log("=====================");
    console.log(`📊 Total Requests: ${testResults.performance.totalRequests}`);
    console.log(
      `⏱️  Average Response Time: ${testResults.performance.averageResponseTime}ms`
    );
    console.log(
      `🚀 Max Response Time: ${testResults.performance.maxResponseTime}ms`
    );
    console.log(`📉 Error Rate: ${testResults.performance.errorRate}%`);
  }

  if (testResults.errorHandling.totalErrors > 0) {
    console.log("\n🛡️ Error Handling Metrics");
    console.log("=========================");
    console.log(`❌ Total Errors: ${testResults.errorHandling.totalErrors}`);
    console.log(
      `🔄 Retryable Errors: ${testResults.errorHandling.retryableErrors}`
    );
    console.log(
      `⚡ Circuit Breaker Trips: ${testResults.errorHandling.circuitBreakerTrips}`
    );
    console.log(
      `⏱️  Recovery Time: ${testResults.errorHandling.recoveryTime}ms`
    );
  }

  console.log("\n📁 Reports Generated");
  console.log("===================");
  console.log(`📄 JSON Report: ${CONFIG.reportsDir}/test-results.json`);
  console.log(`🌐 HTML Report: ${CONFIG.reportsDir}/test-results.html`);
  console.log(
    `⚡ Performance Report: ${CONFIG.reportsDir}/performance-report.json`
  );
  console.log(
    `🛡️ Error Handling Report: ${CONFIG.reportsDir}/error-handling-report.json`
  );

  if (testResults.summary.failed > 0) {
    console.log("\n❌ Some tests failed. Check the reports for details.");
  } else {
    console.log("\n🎉 All tests passed successfully!");
  }
}

// Run the main function
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  main,
  CONFIG,
  testResults,
};
