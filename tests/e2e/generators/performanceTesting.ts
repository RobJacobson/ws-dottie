/**
 * @fileoverview Performance Testing Enhancements
 *
 * This module provides advanced performance testing capabilities including
 * load testing, stress testing, memory profiling, and performance monitoring.
 */

import type { Endpoint } from "@/shared/endpoints";
import type { EndpointTestConfig } from "./configGenerator";

/**
 * Performance test configuration
 */
export interface PerformanceTestConfig {
  /** Test duration in milliseconds */
  duration: number;
  /** Number of concurrent requests */
  concurrency: number;
  /** Request rate per second */
  rate: number;
  /** Maximum response time threshold in milliseconds */
  maxResponseTime: number;
  /** Memory usage threshold in MB */
  maxMemoryUsage: number;
  /** CPU usage threshold percentage */
  maxCpuUsage: number;
  /** Enable detailed profiling */
  enableProfiling: boolean;
  /** Test scenarios to run */
  scenarios: PerformanceTestScenario[];
}

/**
 * Performance test scenario
 */
export interface PerformanceTestScenario {
  name: string;
  description: string;
  type: "load" | "stress" | "spike" | "volume" | "endurance";
  duration: number;
  concurrency: number;
  rate: number;
  rampUpTime: number;
  rampDownTime: number;
  expectedResponseTime: number;
  expectedThroughput: number;
  successCriteria: {
    maxResponseTime: number;
    minThroughput: number;
    maxErrorRate: number;
    maxMemoryUsage: number;
  };
}

/**
 * Performance test result
 */
export interface PerformanceTestResult {
  scenario: string;
  duration: number;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  minResponseTime: number;
  maxResponseTime: number;
  p50ResponseTime: number;
  p90ResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  throughput: number;
  errorRate: number;
  memoryUsage: {
    initial: number;
    peak: number;
    final: number;
    average: number;
  };
  cpuUsage: {
    average: number;
    peak: number;
  };
  status: "passed" | "failed" | "warning";
  issues: string[];
  recommendations: string[];
}

/**
 * Performance monitoring utilities
 */
export class PerformanceMonitor {
  private startTime: number = 0;
  private endTime: number = 0;
  private memoryUsage: number[] = [];
  private responseTimes: number[] = [];
  private errors: Error[] = [];

  start(): void {
    this.startTime = Date.now();
    this.memoryUsage = [this.getCurrentMemoryUsage()];
  }

  end(): void {
    this.endTime = Date.now();
  }

  recordResponse(responseTime: number): void {
    this.responseTimes.push(responseTime);
  }

  recordError(error: Error): void {
    this.errors.push(error);
  }

  recordMemoryUsage(): void {
    this.memoryUsage.push(this.getCurrentMemoryUsage());
  }

  getResults(): PerformanceTestResult {
    const duration = this.endTime - this.startTime;
    const totalRequests = this.responseTimes.length + this.errors.length;
    const successfulRequests = this.responseTimes.length;
    const failedRequests = this.errors.length;
    const errorRate =
      totalRequests > 0 ? (failedRequests / totalRequests) * 100 : 0;
    const throughput = totalRequests / (duration / 1000);

    const sortedResponseTimes = [...this.responseTimes].sort((a, b) => a - b);
    const averageResponseTime =
      sortedResponseTimes.reduce((a, b) => a + b, 0) /
      sortedResponseTimes.length;
    const minResponseTime = Math.min(...sortedResponseTimes);
    const maxResponseTime = Math.max(...sortedResponseTimes);

    return {
      scenario: "Performance Test",
      duration,
      totalRequests,
      successfulRequests,
      failedRequests,
      averageResponseTime,
      minResponseTime,
      maxResponseTime,
      p50ResponseTime: this.getPercentile(sortedResponseTimes, 50),
      p90ResponseTime: this.getPercentile(sortedResponseTimes, 90),
      p95ResponseTime: this.getPercentile(sortedResponseTimes, 95),
      p99ResponseTime: this.getPercentile(sortedResponseTimes, 99),
      throughput,
      errorRate,
      memoryUsage: {
        initial: this.memoryUsage[0] || 0,
        peak: Math.max(...this.memoryUsage),
        final: this.memoryUsage[this.memoryUsage.length - 1] || 0,
        average:
          this.memoryUsage.reduce((a, b) => a + b, 0) / this.memoryUsage.length,
      },
      cpuUsage: {
        average: 0, // Would need additional monitoring for CPU usage
        peak: 0,
      },
      status: this.determineStatus(errorRate, averageResponseTime),
      issues: this.identifyIssues(errorRate, averageResponseTime),
      recommendations: this.generateRecommendations(
        errorRate,
        averageResponseTime
      ),
    };
  }

  private getCurrentMemoryUsage(): number {
    if (typeof process !== "undefined" && process.memoryUsage) {
      return process.memoryUsage().heapUsed / 1024 / 1024; // Convert to MB
    }
    return 0;
  }

  private getPercentile(sortedArray: number[], percentile: number): number {
    const index = Math.ceil((percentile / 100) * sortedArray.length) - 1;
    return sortedArray[index] || 0;
  }

  private determineStatus(
    errorRate: number,
    averageResponseTime: number
  ): "passed" | "failed" | "warning" {
    if (errorRate > 5) return "failed";
    if (averageResponseTime > 10000) return "failed";
    if (errorRate > 1 || averageResponseTime > 5000) return "warning";
    return "passed";
  }

  private identifyIssues(
    errorRate: number,
    averageResponseTime: number
  ): string[] {
    const issues: string[] = [];

    if (errorRate > 5) {
      issues.push(`High error rate: ${errorRate.toFixed(2)}%`);
    }

    if (averageResponseTime > 10000) {
      issues.push(`High response time: ${averageResponseTime.toFixed(2)}ms`);
    }

    if (this.memoryUsage.length > 0) {
      const memoryGrowth =
        this.memoryUsage[this.memoryUsage.length - 1] - this.memoryUsage[0];
      if (memoryGrowth > 100) {
        issues.push(
          `Memory leak detected: ${memoryGrowth.toFixed(2)}MB growth`
        );
      }
    }

    return issues;
  }

  private generateRecommendations(
    errorRate: number,
    averageResponseTime: number
  ): string[] {
    const recommendations: string[] = [];

    if (errorRate > 1) {
      recommendations.push(
        "Consider implementing retry logic with exponential backoff"
      );
      recommendations.push("Review error handling and validation logic");
    }

    if (averageResponseTime > 5000) {
      recommendations.push("Consider implementing caching strategies");
      recommendations.push("Optimize database queries and API calls");
      recommendations.push("Review network configuration and timeouts");
    }

    if (this.memoryUsage.length > 0) {
      const memoryGrowth =
        this.memoryUsage[this.memoryUsage.length - 1] - this.memoryUsage[0];
      if (memoryGrowth > 50) {
        recommendations.push(
          "Review memory usage patterns and implement cleanup"
        );
        recommendations.push("Consider implementing object pooling");
      }
    }

    return recommendations;
  }
}

/**
 * Load testing implementation
 */
export class LoadTester {
  private monitor: PerformanceMonitor = new PerformanceMonitor();

  async runLoadTest<TParams, TOutput>(
    config: EndpointTestConfig<TParams, TOutput>,
    testConfig: PerformanceTestConfig
  ): Promise<PerformanceTestResult> {
    this.monitor.start();

    const promises: Promise<void>[] = [];
    const startTime = Date.now();

    // Create concurrent requests
    for (let i = 0; i < testConfig.concurrency; i++) {
      promises.push(this.runConcurrentRequests(config, testConfig, startTime));
    }

    // Wait for all requests to complete
    await Promise.all(promises);

    this.monitor.end();
    return this.monitor.getResults();
  }

  private async runConcurrentRequests<TParams, TOutput>(
    config: EndpointTestConfig<TParams, TOutput>,
    testConfig: PerformanceTestConfig,
    startTime: number
  ): Promise<void> {
    const endTime = startTime + testConfig.duration;
    const requestInterval = 1000 / testConfig.rate;

    while (Date.now() < endTime) {
      const requestStart = Date.now();

      try {
        await config.apiFunction(config.validParams as TParams);
        const responseTime = Date.now() - requestStart;
        this.monitor.recordResponse(responseTime);
      } catch (error) {
        this.monitor.recordError(error as Error);
      }

      this.monitor.recordMemoryUsage();

      // Wait for next request based on rate
      const elapsed = Date.now() - requestStart;
      const waitTime = Math.max(0, requestInterval - elapsed);
      if (waitTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
  }
}

/**
 * Stress testing implementation
 */
export class StressTester {
  private monitor: PerformanceMonitor = new PerformanceMonitor();

  async runStressTest<TParams, TOutput>(
    config: EndpointTestConfig<TParams, TOutput>,
    testConfig: PerformanceTestConfig
  ): Promise<PerformanceTestResult> {
    this.monitor.start();

    const promises: Promise<void>[] = [];
    const startTime = Date.now();

    // Gradually increase load
    const rampUpSteps = 10;
    const stepDuration = testConfig.duration / rampUpSteps;
    const concurrencyStep = testConfig.concurrency / rampUpSteps;

    for (let step = 0; step < rampUpSteps; step++) {
      const currentConcurrency = Math.ceil(concurrencyStep * (step + 1));
      const stepStart = startTime + step * stepDuration;
      const stepEnd = stepStart + stepDuration;

      for (let i = 0; i < currentConcurrency; i++) {
        promises.push(
          this.runStressRequests(config, testConfig, stepStart, stepEnd)
        );
      }
    }

    await Promise.all(promises);
    this.monitor.end();
    return this.monitor.getResults();
  }

  private async runStressRequests<TParams, TOutput>(
    config: EndpointTestConfig<TParams, TOutput>,
    _testConfig: PerformanceTestConfig,
    _startTime: number,
    endTime: number
  ): Promise<void> {
    while (Date.now() < endTime) {
      const requestStart = Date.now();

      try {
        await config.apiFunction(config.validParams as TParams);
        const responseTime = Date.now() - requestStart;
        this.monitor.recordResponse(responseTime);
      } catch (error) {
        this.monitor.recordError(error as Error);
      }

      this.monitor.recordMemoryUsage();

      // Small delay to prevent overwhelming the system
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  }
}

/**
 * Spike testing implementation
 */
export class SpikeTester {
  private monitor: PerformanceMonitor = new PerformanceMonitor();

  async runSpikeTest<TParams, TOutput>(
    config: EndpointTestConfig<TParams, TOutput>,
    testConfig: PerformanceTestConfig
  ): Promise<PerformanceTestResult> {
    this.monitor.start();

    const promises: Promise<void>[] = [];
    const startTime = Date.now();

    // Create spike pattern: normal -> spike -> normal
    const spikeDuration = testConfig.duration / 3;
    const normalConcurrency = Math.ceil(testConfig.concurrency / 3);
    const spikeConcurrency = testConfig.concurrency;

    // Normal load phase
    for (let i = 0; i < normalConcurrency; i++) {
      promises.push(
        this.runSpikeRequests(
          config,
          testConfig,
          startTime,
          startTime + spikeDuration,
          normalConcurrency
        )
      );
    }

    // Spike phase
    for (let i = 0; i < spikeConcurrency; i++) {
      promises.push(
        this.runSpikeRequests(
          config,
          testConfig,
          startTime + spikeDuration,
          startTime + spikeDuration * 2,
          spikeConcurrency
        )
      );
    }

    // Normal load phase
    for (let i = 0; i < normalConcurrency; i++) {
      promises.push(
        this.runSpikeRequests(
          config,
          testConfig,
          startTime + spikeDuration * 2,
          startTime + testConfig.duration,
          normalConcurrency
        )
      );
    }

    await Promise.all(promises);
    this.monitor.end();
    return this.monitor.getResults();
  }

  private async runSpikeRequests<TParams, TOutput>(
    config: EndpointTestConfig<TParams, TOutput>,
    testConfig: PerformanceTestConfig,
    startTime: number,
    endTime: number,
    concurrency: number
  ): Promise<void> {
    while (Date.now() < endTime) {
      const requestStart = Date.now();

      try {
        await config.apiFunction(config.validParams as TParams);
        const responseTime = Date.now() - requestStart;
        this.monitor.recordResponse(responseTime);
      } catch (error) {
        this.monitor.recordError(error as Error);
      }

      this.monitor.recordMemoryUsage();

      // Adjust delay based on concurrency
      const delay = Math.max(
        0,
        1000 / concurrency - (Date.now() - requestStart)
      );
      if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
}

/**
 * Performance test scenario generators
 */
export const createPerformanceTestScenarios = (
  endpoint: Endpoint<unknown, unknown>
): PerformanceTestScenario[] => {
  const scenarios: PerformanceTestScenario[] = [];

  // Load test scenario
  scenarios.push({
    name: `Load Test: ${endpoint.functionName}`,
    description: `Load testing for ${endpoint.functionName} endpoint`,
    type: "load",
    duration: 60000, // 1 minute
    concurrency: getConcurrencyForCacheStrategy(endpoint.cacheStrategy),
    rate: getRateForCacheStrategy(endpoint.cacheStrategy),
    rampUpTime: 10000, // 10 seconds
    rampDownTime: 10000, // 10 seconds
    expectedResponseTime: getExpectedResponseTime(endpoint.cacheStrategy),
    expectedThroughput: getExpectedThroughput(endpoint.cacheStrategy),
    successCriteria: {
      maxResponseTime: getMaxResponseTime(endpoint.cacheStrategy),
      minThroughput: getMinThroughput(endpoint.cacheStrategy),
      maxErrorRate: 1.0, // 1%
      maxMemoryUsage: 100, // 100MB
    },
  });

  // Stress test scenario
  scenarios.push({
    name: `Stress Test: ${endpoint.functionName}`,
    description: `Stress testing for ${endpoint.functionName} endpoint`,
    type: "stress",
    duration: 120000, // 2 minutes
    concurrency: getConcurrencyForCacheStrategy(endpoint.cacheStrategy) * 2,
    rate: getRateForCacheStrategy(endpoint.cacheStrategy) * 1.5,
    rampUpTime: 20000, // 20 seconds
    rampDownTime: 20000, // 20 seconds
    expectedResponseTime: getExpectedResponseTime(endpoint.cacheStrategy) * 2,
    expectedThroughput: getExpectedThroughput(endpoint.cacheStrategy) * 0.8,
    successCriteria: {
      maxResponseTime: getMaxResponseTime(endpoint.cacheStrategy) * 2,
      minThroughput: getMinThroughput(endpoint.cacheStrategy) * 0.5,
      maxErrorRate: 5.0, // 5%
      maxMemoryUsage: 200, // 200MB
    },
  });

  // Spike test scenario
  scenarios.push({
    name: `Spike Test: ${endpoint.functionName}`,
    description: `Spike testing for ${endpoint.functionName} endpoint`,
    type: "spike",
    duration: 90000, // 1.5 minutes
    concurrency: getConcurrencyForCacheStrategy(endpoint.cacheStrategy) * 3,
    rate: getRateForCacheStrategy(endpoint.cacheStrategy) * 2,
    rampUpTime: 5000, // 5 seconds
    rampDownTime: 5000, // 5 seconds
    expectedResponseTime: getExpectedResponseTime(endpoint.cacheStrategy) * 1.5,
    expectedThroughput: getExpectedThroughput(endpoint.cacheStrategy) * 0.9,
    successCriteria: {
      maxResponseTime: getMaxResponseTime(endpoint.cacheStrategy) * 1.5,
      minThroughput: getMinThroughput(endpoint.cacheStrategy) * 0.7,
      maxErrorRate: 3.0, // 3%
      maxMemoryUsage: 150, // 150MB
    },
  });

  return scenarios;
};

/**
 * Helper functions for cache strategy-based configuration
 */
function getConcurrencyForCacheStrategy(cacheStrategy: string): number {
  const concurrency: Record<string, number> = {
    REALTIME_UPDATES: 20,
    MINUTE_UPDATES: 10,
    FIVE_MINUTE_UPDATES: 5,
    HOURLY_UPDATES: 3,
    DAILY_UPDATES: 2,
    DAILY_STATIC: 1,
    WEEKLY_STATIC: 1,
    NONE: 10,
  };
  return concurrency[cacheStrategy] || 5;
}

function getRateForCacheStrategy(cacheStrategy: string): number {
  const rate: Record<string, number> = {
    REALTIME_UPDATES: 10,
    MINUTE_UPDATES: 5,
    FIVE_MINUTE_UPDATES: 2,
    HOURLY_UPDATES: 1,
    DAILY_UPDATES: 0.5,
    DAILY_STATIC: 0.1,
    WEEKLY_STATIC: 0.05,
    NONE: 5,
  };
  return rate[cacheStrategy] || 2;
}

function getExpectedResponseTime(cacheStrategy: string): number {
  const responseTime: Record<string, number> = {
    REALTIME_UPDATES: 1000,
    MINUTE_UPDATES: 2000,
    FIVE_MINUTE_UPDATES: 3000,
    HOURLY_UPDATES: 5000,
    DAILY_UPDATES: 10000,
    DAILY_STATIC: 15000,
    WEEKLY_STATIC: 20000,
    NONE: 3000,
  };
  return responseTime[cacheStrategy] || 3000;
}

function getExpectedThroughput(cacheStrategy: string): number {
  const throughput: Record<string, number> = {
    REALTIME_UPDATES: 20,
    MINUTE_UPDATES: 10,
    FIVE_MINUTE_UPDATES: 5,
    HOURLY_UPDATES: 3,
    DAILY_UPDATES: 1,
    DAILY_STATIC: 0.5,
    WEEKLY_STATIC: 0.2,
    NONE: 10,
  };
  return throughput[cacheStrategy] || 5;
}

function getMaxResponseTime(cacheStrategy: string): number {
  return getExpectedResponseTime(cacheStrategy) * 2;
}

function getMinThroughput(cacheStrategy: string): number {
  return getExpectedThroughput(cacheStrategy) * 0.8;
}

/**
 * Performance test runner
 */
export class PerformanceTestRunner {
  private loadTester: LoadTester = new LoadTester();
  private stressTester: StressTester = new StressTester();
  private spikeTester: SpikeTester = new SpikeTester();

  async runAllTests<TParams, TOutput>(
    config: EndpointTestConfig<TParams, TOutput>,
    testConfig: PerformanceTestConfig
  ): Promise<PerformanceTestResult[]> {
    const results: PerformanceTestResult[] = [];

    // Run load test
    if (testConfig.scenarios.some((s) => s.type === "load")) {
      const loadTestConfig = {
        ...testConfig,
        concurrency: testConfig.concurrency,
      };
      results.push(await this.loadTester.runLoadTest(config, loadTestConfig));
    }

    // Run stress test
    if (testConfig.scenarios.some((s) => s.type === "stress")) {
      const stressTestConfig = {
        ...testConfig,
        concurrency: testConfig.concurrency * 2,
      };
      results.push(
        await this.stressTester.runStressTest(config, stressTestConfig)
      );
    }

    // Run spike test
    if (testConfig.scenarios.some((s) => s.type === "spike")) {
      const spikeTestConfig = {
        ...testConfig,
        concurrency: testConfig.concurrency * 3,
      };
      results.push(
        await this.spikeTester.runSpikeTest(config, spikeTestConfig)
      );
    }

    return results;
  }
}
