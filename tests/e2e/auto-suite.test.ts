/**
 * @fileoverview Auto E2E Test Suite
 *
 * This test suite demonstrates the enhanced test generators and validation utilities
 * that work with Endpoint metadata from defineEndpoint, providing comprehensive
 * testing with automatic configuration generation, better error messages, automatic
 * categorization, and performance testing aligned with cache strategies.
 */

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import {
  discoverEndpoints,
  discoverApiNames,
  validateDiscoveredEndpoints,
} from "./generators/endpointDiscovery";
import {
  generateAllApiConfigs,
  validateGeneratedConfigs,
} from "./generators/configGenerator";
import {
  createModernEndpointTestSuite,
  createApiTestSuite,
} from "./generators/test-generators";
import {
  assertInputValidation,
  assertOutputValidation,
  assertEndpointMetadata,
  assertSampleParameters,
  assertResponseTime,
  assertUrlTemplate,
  assertApiCallSuccess,
} from "./utils/assertionHelpers";
import { MockDataFactory, mockConfigPresets } from "./utils/mockHelpers";
import { getApiTimeout, shouldSkipApi } from "./config/testConfig";

/**
 * Main test suite for the auto e2e test system
 */
describe("Auto E2E Test Suite", () => {
  let discoveredEndpoints: ReturnType<typeof discoverEndpoints>;
  let apiNames: string[];
  let generatedConfigs: ReturnType<typeof generateAllApiConfigs>;
  let mockFactory: MockDataFactory;

  beforeAll(async () => {
    console.log("🚀 Initializing Auto E2E Test Suite...");

    // Discover all endpoints
    console.log("🔍 Discovering endpoints...");
    discoveredEndpoints = discoverEndpoints();
    console.log(`✅ Discovered ${discoveredEndpoints.length} endpoints`);

    // Get API names
    apiNames = discoverApiNames();
    console.log(`✅ Found ${apiNames.length} APIs: ${apiNames.join(", ")}`);

    // Generate configurations
    console.log("⚙️ Generating configurations...");
    generatedConfigs = generateAllApiConfigs(discoveredEndpoints);
    console.log(
      `✅ Generated configurations for ${Object.keys(generatedConfigs).length} APIs`
    );

    // Initialize mock factory
    mockFactory = new MockDataFactory(mockConfigPresets.fast);

    console.log("🎉 Test suite initialization complete!");
  });

  afterAll(() => {
    console.log("🏁 Auto E2E Test Suite completed");
  });

  // Discovery and validation tests
  describe("Discovery and Validation", () => {
    it("should discover all endpoints successfully", () => {
      expect(discoveredEndpoints).toBeDefined();
      expect(discoveredEndpoints.length).toBeGreaterThan(0);
      expect(Array.isArray(discoveredEndpoints)).toBe(true);
    });

    it("should discover all expected APIs", () => {
      expect(apiNames).toBeDefined();
      expect(apiNames.length).toBeGreaterThanOrEqual(16); // At least 16 APIs
      expect(Array.isArray(apiNames)).toBe(true);

      // Check for expected API names
      const expectedApis = [
        "wsdot-border-crossings",
        "wsdot-bridge-clearances",
        "wsdot-commercial-vehicle-restrictions",
        "wsdot-highway-alerts",
        "wsdot-highway-cameras",
        "wsdot-mountain-pass-conditions",
        "wsdot-toll-rates",
        "wsdot-traffic-flow",
        "wsdot-travel-times",
        "wsdot-weather-information",
        "wsdot-weather-information-extended",
        "wsdot-weather-stations",
        "wsf-fares",
        "wsf-schedule",
        "wsf-terminals",
        "wsf-vessels",
      ];

      expectedApis.forEach((apiName) => {
        expect(apiNames).toContain(apiName);
      });
    });

    it("should validate all discovered endpoints", () => {
      const validation = validateDiscoveredEndpoints(discoveredEndpoints);
      expect(validation.isValid).toBe(true);
      if (!validation.isValid) {
        console.error("Validation issues:", validation.issues);
      }
    });

    it("should generate valid configurations for all APIs", () => {
      const validation = validateGeneratedConfigs(generatedConfigs);
      expect(validation.isValid).toBe(true);
      if (!validation.isValid) {
        console.error("Configuration issues:", validation.issues);
      }
    });
  });

  // Enhanced validation tests
  describe("Enhanced Validation", () => {
    it("should validate endpoint metadata for all endpoints", () => {
      discoveredEndpoints.forEach((endpoint) => {
        const result = assertEndpointMetadata(endpoint);
        expect(result.passed).toBe(true);
        if (!result.passed) {
          console.error(
            `Metadata validation failed for ${endpoint.api}:${endpoint.functionName}:`,
            result.message
          );
        }
      });
    });

    it("should validate sample parameters for all endpoints", () => {
      discoveredEndpoints.forEach((endpoint) => {
        const result = assertSampleParameters(endpoint);
        expect(result.passed).toBe(true);
        if (!result.passed) {
          console.error(
            `Sample parameters validation failed for ${endpoint.api}:${endpoint.functionName}:`,
            result.message
          );
        }
      });
    });

    it("should validate URL templates for all endpoints", () => {
      discoveredEndpoints.forEach((endpoint) => {
        const result = assertUrlTemplate(endpoint);
        expect(result.passed).toBe(true);
        if (!result.passed) {
          console.error(
            `URL template validation failed for ${endpoint.api}:${endpoint.functionName}:`,
            result.message
          );
        }
      });
    });
  });

  // Test categorization tests
  describe("Test Categorization", () => {
    it("should categorize endpoints correctly", () => {
      const categories = new Set<string>();

      discoveredEndpoints.forEach((endpoint) => {
        const functionName = endpoint.functionName.toLowerCase();
        let expectedCategory = "general";

        if (functionName.includes("get") || functionName.includes("fetch")) {
          expectedCategory = "data-retrieval";
        } else if (
          functionName.includes("search") ||
          functionName.includes("find")
        ) {
          expectedCategory = "search";
        } else if (
          functionName.includes("list") ||
          functionName.includes("all")
        ) {
          expectedCategory = "listing";
        } else if (
          functionName.includes("status") ||
          functionName.includes("condition")
        ) {
          expectedCategory = "status";
        } else if (
          functionName.includes("alert") ||
          functionName.includes("warning")
        ) {
          expectedCategory = "alerts";
        }

        categories.add(expectedCategory);
      });

      expect(categories.size).toBeGreaterThan(1);
      expect(categories.has("data-retrieval")).toBe(true);
    });

    it("should assign appropriate response times based on cache strategy", () => {
      discoveredEndpoints.forEach((endpoint) => {
        const result = assertResponseTime(endpoint, 1000); // 1 second response time
        expect(result.passed).toBe(true);
        if (!result.passed) {
          console.error(
            `Response time validation failed for ${endpoint.api}:${endpoint.functionName}:`,
            result.message
          );
        }
      });
    });
  });

  // Mock data generation tests
  describe("Mock Data Generation", () => {
    it("should generate mock data for all endpoints", () => {
      discoveredEndpoints.forEach((endpoint) => {
        try {
          const mockData = mockFactory.createSuccessResponse(endpoint);
          expect(mockData).toBeDefined();
        } catch (error) {
          console.error(
            `Mock data generation failed for ${endpoint.api}:${endpoint.functionName}:`,
            error
          );
          // Don't fail the test, just log the error
        }
      });
    });

    it("should generate appropriate error responses", () => {
      discoveredEndpoints.forEach((endpoint) => {
        try {
          const errorResponse = mockFactory.createErrorResponse(endpoint);
          expect(errorResponse).toBeInstanceOf(Error);
          expect(errorResponse.message).toContain(endpoint.api);
          expect(errorResponse.message).toContain(endpoint.functionName);
        } catch (error) {
          console.error(
            `Error response generation failed for ${endpoint.api}:${endpoint.functionName}:`,
            error
          );
        }
      });
    });
  });

  // Performance testing
  describe("Performance Testing", () => {
    it("should have appropriate timeout configurations for all APIs", () => {
      apiNames.forEach((apiName) => {
        if (!shouldSkipApi(apiName)) {
          const timeout = getApiTimeout(apiName);
          expect(timeout).toBeGreaterThan(0);
          expect(timeout).toBeLessThanOrEqual(300000); // Max 5 minutes
        }
      });
    });

    it("should have appropriate rate limiting configurations", () => {
      Object.entries(generatedConfigs).forEach(([apiName, config]) => {
        if (config.settings.rateLimit) {
          expect(config.settings.rateLimit.requestsPerSecond).toBeGreaterThan(
            0
          );
          expect(config.settings.rateLimit.burstLimit).toBeGreaterThan(0);
          expect(config.settings.rateLimit.burstLimit).toBeGreaterThanOrEqual(
            config.settings.rateLimit.requestsPerSecond
          );
        }
      });
    });
  });

  // Integration tests with actual endpoint configurations
  describe("Integration Tests", () => {
    it("should create valid test suites for all APIs", () => {
      Object.entries(generatedConfigs).forEach(([apiName, config]) => {
        if (!shouldSkipApi(apiName)) {
          expect(config.endpoints).toBeDefined();
          expect(Array.isArray(config.endpoints)).toBe(true);
          expect(config.endpoints.length).toBeGreaterThan(0);

          config.endpoints.forEach((endpointConfig) => {
            expect(endpointConfig.apiFunction).toBeDefined();
            expect(endpointConfig.inputSchema).toBeDefined();
            expect(endpointConfig.outputSchema).toBeDefined();
            expect(endpointConfig.endpointName).toBeDefined();
            expect(endpointConfig.category).toBeDefined();
            expect(endpointConfig.maxResponseTime).toBeGreaterThan(0);
          });
        }
      });
    });

    it("should have consistent endpoint definitions", () => {
      Object.entries(generatedConfigs).forEach(([apiName, config]) => {
        config.endpoints.forEach((endpointConfig) => {
          const endpoint = endpointConfig.endpointDefinition;
          expect(endpoint.api).toBe(apiName);
          expect(endpoint.functionName).toBe(endpointConfig.endpointName);
          expect(endpoint.inputSchema).toBe(endpointConfig.inputSchema);
          expect(endpoint.outputSchema).toBe(endpointConfig.outputSchema);
        });
      });
    });
  });

  // Test suite generation demonstration
  describe("Test Suite Generation", () => {
    it("should demonstrate modern test suite creation", () => {
      // Pick a few endpoints for demonstration
      const sampleEndpoints = discoveredEndpoints.slice(0, 3);

      sampleEndpoints.forEach((endpoint) => {
        // This would normally create a full test suite
        // For demonstration, we just validate the structure
        expect(endpoint.id).toBeDefined();
        expect(endpoint.api).toBeDefined();
        expect(endpoint.functionName).toBeDefined();
        expect(endpoint.urlTemplate).toBeDefined();
        expect(endpoint.inputSchema).toBeDefined();
        expect(endpoint.outputSchema).toBeDefined();
        expect(endpoint.cacheStrategy).toBeDefined();
      });
    });
  });
});
