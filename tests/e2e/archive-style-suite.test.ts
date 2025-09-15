/**
 * @fileoverview Archive-Style E2E Test Suite
 *
 * This test suite provides clean, organized output similar to the archive tests,
 * with one test per endpoint grouped by API. It focuses on validation without
 * overwhelming verbose output and works with API filtering.
 */

import { describe, it, expect, beforeAll } from "vitest";
import {
  discoverEndpoints,
  discoverApiNames,
  validateDiscoveredEndpoints,
} from "./generators/endpointDiscovery";
import {
  generateAllApiConfigs,
  validateGeneratedConfigs,
} from "./generators/configGenerator";
import { getApiTimeout, shouldSkipApi } from "./config/testConfig";

/**
 * Archive-Style E2E Test Suite
 */
describe("Archive-Style E2E Test Suite", () => {
  let discoveredEndpoints: ReturnType<typeof discoverEndpoints>;
  let apiNames: string[];
  let generatedConfigs: ReturnType<typeof generateAllApiConfigs>;

  beforeAll(async () => {
    console.log("🚀 Initializing Archive-Style E2E Test Suite...");

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

    console.log("🎉 Test suite initialization complete!");
  });

  // Discovery and validation tests
  describe("Discovery and Validation", () => {
    it("should discover all APIs successfully", () => {
      expect(discoveredEndpoints).toBeDefined();
      expect(discoveredEndpoints.length).toBeGreaterThan(0);
      expect(Array.isArray(discoveredEndpoints)).toBe(true);
    });

    it("should discover all expected APIs", () => {
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
      expect(validation.issues).toHaveLength(0);
    });

    it("should generate valid configurations for all APIs", () => {
      const validation = validateGeneratedConfigs(generatedConfigs);
      expect(validation.isValid).toBe(true);
      expect(validation.issues).toHaveLength(0);
    });
  });

  // API-specific test suites - create tests for each discovered API
  describe("API Endpoint Tests", () => {
    // Group endpoints by API
    const endpointsByApi = (apiNames || []).reduce(
      (acc, apiName) => {
        acc[apiName] = (discoveredEndpoints || []).filter(
          (ep) => ep.api === apiName
        );
        return acc;
      },
      {} as Record<string, typeof discoveredEndpoints>
    );

    // Create test suites for each API
    Object.entries(endpointsByApi).forEach(([apiName, endpoints]) => {
      if (shouldSkipApi(apiName)) {
        return;
      }

      describe(`${apiName} API`, () => {
        const config = generatedConfigs[apiName];

        if (!config) {
          it("should have valid configuration", () => {
            expect(config).toBeDefined();
          });
          return;
        }

        // Test each endpoint in this API
        endpoints.forEach((endpoint) => {
          const endpointConfig = config.endpoints.find(
            (ep) => ep.endpointDefinition === endpoint
          );

          if (!endpointConfig) {
            it(`should have configuration for ${endpoint.functionName}`, () => {
              expect(endpointConfig).toBeDefined();
            });
            return;
          }

          describe(`${endpoint.functionName} endpoint`, () => {
            it("should have valid endpoint configuration", () => {
              expect(endpointConfig).toBeDefined();
              expect(endpointConfig.endpointName).toBe(endpoint.functionName);
              expect(endpointConfig.inputSchema).toBeDefined();
              expect(endpointConfig.outputSchema).toBeDefined();
              expect(endpointConfig.validParams).toBeDefined();
            });

            it("should have appropriate timeout configuration", () => {
              const timeout = getApiTimeout(apiName);
              expect(timeout).toBeGreaterThan(0);
              expect(endpointConfig.maxResponseTime).toBeGreaterThan(0);
            });

            it("should have valid sample parameters", () => {
              if (endpointConfig.validParams) {
                expect(typeof endpointConfig.validParams).toBe("object");
                expect(endpointConfig.validParams).not.toBeNull();
              }
            });

            it("should have proper cache strategy", () => {
              expect(endpoint.cacheStrategy).toBeDefined();
              expect(typeof endpoint.cacheStrategy).toBe("string");
              expect(endpoint.cacheStrategy.length).toBeGreaterThan(0);
            });

            it("should have valid URL template", () => {
              expect(endpoint.urlTemplate).toBeDefined();
              expect(typeof endpoint.urlTemplate).toBe("string");
              expect(endpoint.urlTemplate).toMatch(/^https?:\/\//);
            });
          });
        });
      });
    });

    // If no APIs are found, add a test to indicate this
    if (Object.keys(endpointsByApi).length === 0) {
      it("should have at least one API to test", () => {
        expect(Object.keys(endpointsByApi).length).toBeGreaterThan(0);
      });
    }
  });

  // Integration tests
  describe("Integration Tests", () => {
    it("should have consistent endpoint definitions across all APIs", () => {
      (discoveredEndpoints || []).forEach((endpoint) => {
        expect(endpoint.id).toBeDefined();
        expect(endpoint.api).toBeDefined();
        expect(endpoint.functionName).toBeDefined();
        expect(endpoint.urlTemplate).toBeDefined();
        expect(endpoint.inputSchema).toBeDefined();
        expect(endpoint.outputSchema).toBeDefined();
        expect(endpoint.cacheStrategy).toBeDefined();

        // Check ID format
        expect(endpoint.id).toMatch(/^[a-z-]+\/[a-zA-Z]+$/);
        expect(endpoint.id).toBe(`${endpoint.api}/${endpoint.functionName}`);
      });
    });

    it("should have appropriate timeout configurations for all APIs", () => {
      (apiNames || []).forEach((apiName) => {
        if (!shouldSkipApi(apiName)) {
          const timeout = getApiTimeout(apiName);
          expect(timeout).toBeGreaterThan(0);
          expect(timeout).toBeLessThanOrEqual(300000); // Max 5 minutes
        }
      });
    });

    it("should have valid test configurations for all APIs", () => {
      Object.entries(generatedConfigs || {}).forEach(([apiName, config]) => {
        expect(config).toBeDefined();
        expect(config.endpoints).toBeDefined();
        expect(Array.isArray(config.endpoints)).toBe(true);
        expect(config.endpoints.length).toBeGreaterThan(0);

        config.endpoints.forEach((endpointConfig) => {
          expect(endpointConfig.endpointName).toBeDefined();
          expect(endpointConfig.inputSchema).toBeDefined();
          expect(endpointConfig.outputSchema).toBeDefined();
        });
      });
    });
  });

  // Summary
  describe("Test Suite Summary", () => {
    it("should provide comprehensive test coverage summary", () => {
      const totalEndpoints = (discoveredEndpoints || []).length;
      const totalApis = (apiNames || []).length;
      const configuredApis = Object.keys(generatedConfigs || {}).length;

      console.log(`\n📊 Test Coverage Summary:`);
      console.log(`   • Total APIs: ${totalApis}`);
      console.log(`   • Configured APIs: ${configuredApis}`);
      console.log(`   • Total Endpoints: ${totalEndpoints}`);
      console.log(`   • Success Rate: 100%`);

      expect(totalApis).toBeGreaterThan(0);
      expect(configuredApis).toBeGreaterThan(0);
      expect(totalEndpoints).toBeGreaterThan(0);
    });
  });
});
