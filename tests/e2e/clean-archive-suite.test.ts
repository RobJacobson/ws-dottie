/**
 * @fileoverview Clean Archive-Style E2E Test Suite
 *
 * This test suite provides clean, organized output matching the archive test format,
 * with one test per endpoint grouped by API. It eliminates verbose output and
 * respects API filtering from the discovery configuration.
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
 * Clean Archive-Style E2E Test Suite
 */
describe("Clean Archive-Style E2E Test Suite", () => {
  let discoveredEndpoints: ReturnType<typeof discoverEndpoints>;
  let apiNames: string[];
  let generatedConfigs: ReturnType<typeof generateAllApiConfigs>;

  beforeAll(async () => {
    // Discover all endpoints (filtered by configuration)
    discoveredEndpoints = discoverEndpoints();
    apiNames = discoverApiNames();
    generatedConfigs = generateAllApiConfigs(discoveredEndpoints);
  });

  // Discovery and validation tests
  describe("Discovery and Validation", () => {
    it("should discover APIs successfully", () => {
      expect(discoveredEndpoints).toBeDefined();
      expect(discoveredEndpoints.length).toBeGreaterThan(0);
      expect(Array.isArray(discoveredEndpoints)).toBe(true);
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

  // API-specific test suites - create tests for each discovered API
  describe("API Endpoint Tests", () => {
    it("should test all discovered APIs", () => {
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

      // Verify we have APIs to test
      expect(Object.keys(endpointsByApi).length).toBeGreaterThan(0);

      // Test each API
      Object.entries(endpointsByApi).forEach(([apiName, endpoints]) => {
        if (shouldSkipApi(apiName)) {
          return;
        }

        const config = generatedConfigs[apiName];
        expect(config).toBeDefined();
        expect(endpoints.length).toBeGreaterThan(0);

        // Test each endpoint in this API
        endpoints.forEach((endpoint) => {
          const endpointConfig = config.endpoints.find(
            (ep) => ep.endpointDefinition === endpoint
          );

          expect(endpointConfig).toBeDefined();
          expect(endpointConfig.endpointName).toBe(endpoint.functionName);
          expect(endpointConfig.inputSchema).toBeDefined();
          expect(endpointConfig.outputSchema).toBeDefined();
          expect(endpointConfig.validParams).toBeDefined();

          // Test timeout configuration
          const timeout = getApiTimeout(apiName);
          expect(timeout).toBeGreaterThan(0);
          expect(endpointConfig.maxResponseTime).toBeGreaterThan(0);

          // Test sample parameters
          if (endpointConfig.validParams) {
            expect(typeof endpointConfig.validParams).toBe("object");
            expect(endpointConfig.validParams).not.toBeNull();
          }

          // Test cache strategy
          expect(endpoint.cacheStrategy).toBeDefined();
          expect(typeof endpoint.cacheStrategy).toBe("string");
          expect(endpoint.cacheStrategy.length).toBeGreaterThan(0);

          // Test URL template
          expect(endpoint.urlTemplate).toBeDefined();
          expect(typeof endpoint.urlTemplate).toBe("string");
          expect(endpoint.urlTemplate).toMatch(/^https?:\/\//);
        });
      });
    });
  });

  // Integration tests
  describe("Integration Tests", () => {
    it("should have consistent endpoint definitions across all APIs", () => {
      discoveredEndpoints.forEach((endpoint) => {
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
      Object.entries(generatedConfigs).forEach(([_apiName, config]) => {
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

      expect(totalApis).toBeGreaterThan(0);
      expect(configuredApis).toBeGreaterThan(0);
      expect(totalEndpoints).toBeGreaterThan(0);
    });
  });
});
