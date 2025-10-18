/**
 * @fileoverview Hierarchical Test Reporter
 *
 * Implements a hierarchical reporter that shows the API → Endpoint → Test structure
 * with proper roll-up summaries as tests complete.
 */

export interface HierarchicalResult {
  apiName: string;
  endpointName: string;
  testName: string;
  success: boolean;
  message: string;
  duration: number;
}

export interface ApiSummary {
  name: string;
  endpoints: Map<string, EndpointSummary>;
  totalTests: number;
  passedTests: number;
  failedTests: number;
}

export interface EndpointSummary {
  name: string;
  tests: Map<string, TestResult>;
  totalTests: number;
  passedTests: number;
  failedTests: number;
}

export interface TestResult {
  name: string;
  success: boolean;
  message: string;
  duration: number;
}

export class HierarchicalReporter {
  private apis: Map<string, ApiSummary> = new Map();

  public addResult(result: HierarchicalResult): void {
    // Get or create API summary
    let apiSummary = this.apis.get(result.apiName);
    if (!apiSummary) {
      apiSummary = {
        name: result.apiName,
        endpoints: new Map(),
        totalTests: 0,
        passedTests: 0,
        failedTests: 0,
      };
      this.apis.set(result.apiName, apiSummary);
    }

    // Get or create endpoint summary
    let endpointSummary = apiSummary.endpoints.get(result.endpointName);
    if (!endpointSummary) {
      endpointSummary = {
        name: result.endpointName,
        tests: new Map(),
        totalTests: 0,
        passedTests: 0,
        failedTests: 0,
      };
      apiSummary.endpoints.set(result.endpointName, endpointSummary);
    }

    // Add test result
    endpointSummary.tests.set(result.testName, {
      name: result.testName,
      success: result.success,
      message: result.message,
      duration: result.duration,
    });

    // Update counters
    endpointSummary.totalTests++;
    apiSummary.totalTests++;

    if (result.success) {
      endpointSummary.passedTests++;
      apiSummary.passedTests++;
    } else {
      endpointSummary.failedTests++;
      apiSummary.failedTests++;
    }

    // Log the individual test result
    this.logTestResult(result);

    // Log endpoint summary when all tests for this endpoint are complete
    if (endpointSummary.totalTests === endpointSummary.tests.size) {
      this.logEndpointSummary(
        result.apiName,
        result.endpointName,
        endpointSummary
      );
    }
  }

  private logTestResult(result: HierarchicalResult): void {
    const status = result.success ? "✅" : "❌";
    const duration = `(${result.duration}ms)`;
    const message = result.success ? "" : ` - ${result.message}`;

    console.log(
      `    ${status} ${result.testName}: ${result.apiName}.${result.endpointName} ${duration}${message}`
    );
  }

  private logEndpointSummary(
    apiName: string,
    endpointName: string,
    endpointSummary: EndpointSummary
  ): void {
    const total = endpointSummary.totalTests;
    const passed = endpointSummary.passedTests;
    const failed = endpointSummary.failedTests;

    if (failed > 0) {
      console.log(
        `  📊 ${apiName}.${endpointName}: ${passed}/${total} tests passed (${failed} failed)`
      );
    } else {
      console.log(
        `  📊 ${apiName}.${endpointName}: ${passed}/${total} tests passed`
      );
    }
  }

  public logApiProgress(apiName: string): void {
    const apiSummary = this.apis.get(apiName);
    if (apiSummary) {
      const total = apiSummary.totalTests;
      const completed = apiSummary.passedTests + apiSummary.failedTests;
      console.log(
        `\n🔍 Testing API: ${apiName} (${completed}/${total} tests completed)`
      );
    } else {
      console.log(`\n🔍 Testing API: ${apiName}`);
    }
  }

  public logEndpointProgress(apiName: string, endpointName: string): void {
    const apiSummary = this.apis.get(apiName);
    if (apiSummary) {
      const endpointSummary = apiSummary.endpoints.get(endpointName);
      if (endpointSummary) {
        const total = endpointSummary.totalTests;
        const completed =
          endpointSummary.passedTests + endpointSummary.failedTests;
        console.log(
          ` 📋 Testing endpoint: ${endpointName} (${completed}/${total} test types completed)`
        );
      } else {
        console.log(`  📋 Testing endpoint: ${endpointName}`);
      }
    }
  }

  public getFinalSummary(): {
    totalTests: number;
    passedTests: number;
    failedTests: number;
    failedResults: HierarchicalResult[];
  } {
    let totalTests = 0;
    let passedTests = 0;
    let failedTests = 0;
    const failedResults: HierarchicalResult[] = [];

    for (const apiSummary of this.apis.values()) {
      totalTests += apiSummary.totalTests;
      passedTests += apiSummary.passedTests;
      failedTests += apiSummary.failedTests;

      // Collect failed results for detailed reporting
      for (const endpointSummary of apiSummary.endpoints.values()) {
        for (const testResult of endpointSummary.tests.values()) {
          if (!testResult.success) {
            const result: HierarchicalResult = {
              apiName: apiSummary.name,
              endpointName: endpointSummary.name,
              testName: testResult.name,
              success: false,
              message: testResult.message,
              duration: testResult.duration,
            };
            failedResults.push(result);
          }
        }
      }
    }

    return { totalTests, passedTests, failedTests, failedResults };
  }

  public printFinalSummary(): void {
    const summary = this.getFinalSummary();

    console.log("\n📊 Final Roll-up Summary:");
    console.log(`   Total Tests: ${summary.totalTests}`);
    console.log(`   Passed: ${summary.passedTests}`);
    console.log(`   Failed: ${summary.failedTests}`);

    if (summary.failedTests > 0) {
      console.log(`\n❌ ${summary.failedTests} tests failed:`);
      for (const failed of summary.failedResults) {
        console.log(
          `   • ${failed.testName} for ${failed.apiName}.${failed.endpointName}: ${failed.message}`
        );
      }
    } else {
      console.log(`✅ All ${summary.totalTests} tests passed!`);
    }
  }
}
