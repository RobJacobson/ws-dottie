/**
 * @fileoverview Proof of Concept: Auto-Discovered E2E Tests
 *
 * This test file demonstrates the endpoint discovery and configuration generation
 * system working with a subset of APIs. It serves as a proof of concept for
 * the full implementation described in the PRD.
 */

import { describe, it, expect, beforeAll } from "vitest";
import {
  discoverEndpoints,
  discoverApiNames,
  validateDiscoveredEndpoints,
  debugDiscoveredEndpoints,
} from "./generators/endpointDiscovery";
import {
  generateApiConfig,
  generateAllApiConfigs,
  validateGeneratedConfigs,
} from "./generators/configGenerator";

describe("Endpoint Discovery System", () => {
  let discoveredEndpoints: ReturnType<typeof discoverEndpoints>;
  let apiNames: string[];
  let generatedConfigs: ReturnType<typeof generateAllApiConfigs>;

  beforeAll(async () => {
    // Discover all endpoints
    discoveredEndpoints = discoverEndpoints();
    apiNames = discoverApiNames();

    // Generate configurations
    generatedConfigs = generateAllApiConfigs(discoveredEndpoints);

    // Debug output for verification
    debugDiscoveredEndpoints(discoveredEndpoints);
  });

  describe("Discovery Engine", () => {
    it("should discover endpoints from clients", () => {
      expect(discoveredEndpoints).toBeDefined();
      expect(Array.isArray(discoveredEndpoints)).toBe(true);
      expect(discoveredEndpoints.length).toBeGreaterThan(0);
    });

    it("should discover multiple APIs", () => {
      expect(apiNames).toBeDefined();
      expect(Array.isArray(apiNames)).toBe(true);
      expect(apiNames.length).toBeGreaterThan(0);

      // Should have both WSDOT and WSF APIs
      const hasWsdot = apiNames.some((name) => name.includes("wsdot"));
      const hasWsf = apiNames.some((name) => name.includes("wsf"));
      expect(hasWsdot).toBe(true);
      expect(hasWsf).toBe(true);
    });

    it("should validate discovered endpoints", () => {
      const validation = validateDiscoveredEndpoints(discoveredEndpoints);

      expect(validation.isValid).toBe(true);
      expect(validation.issues).toHaveLength(0);
      expect(validation.endpointCount).toBeGreaterThan(0);
      expect(validation.apiCount).toBeGreaterThan(0);
    });

    it("should have properly structured endpoints", () => {
      discoveredEndpoints.forEach((endpoint) => {
        // Check required fields
        expect(endpoint.id).toBeDefined();
        expect(endpoint.api).toBeDefined();
        expect(endpoint.functionName).toBeDefined();
        expect(endpoint.urlTemplate).toBeDefined();
        expect(endpoint.inputSchema).toBeDefined();
        expect(endpoint.outputSchema).toBeDefined();
        expect(endpoint.cacheStrategy).toBeDefined();

        // Check ID format
        expect(endpoint.id).toMatch(/^[a-z-]+\/[a-zA-Z]+$/);

        // Check that api and functionName match the ID
        expect(endpoint.id).toBe(`${endpoint.api}/${endpoint.functionName}`);

        // Check URL template format
        expect(endpoint.urlTemplate).toMatch(/^https?:\/\//);
      });
    });
  });

  describe("Configuration Generation", () => {
    it("should generate configurations for all APIs", () => {
      expect(generatedConfigs).toBeDefined();
      expect(Object.keys(generatedConfigs).length).toBeGreaterThan(0);

      // Should have configurations for all discovered APIs
      apiNames.forEach((apiName) => {
        expect(generatedConfigs[apiName]).toBeDefined();
      });
    });

    it("should validate generated configurations", () => {
      const validation = validateGeneratedConfigs(generatedConfigs);

      expect(validation.isValid).toBe(true);
      expect(validation.issues).toHaveLength(0);
    });

    it("should generate valid endpoint configurations", () => {
      Object.entries(generatedConfigs).forEach(([, config]) => {
        expect(config.moduleName).toBeDefined();
        expect(config.endpoints).toBeDefined();
        expect(Array.isArray(config.endpoints)).toBe(true);
        expect(config.endpoints.length).toBeGreaterThan(0);
        expect(config.settings).toBeDefined();

        config.endpoints.forEach((endpoint) => {
          expect(endpoint.apiFunction).toBeDefined();
          expect(endpoint.inputSchema).toBeDefined();
          expect(endpoint.outputSchema).toBeDefined();
          expect(endpoint.endpointName).toBeDefined();
          expect(endpoint.category).toBeDefined();
          expect(endpoint.maxResponseTime).toBeGreaterThan(0);
          expect(endpoint.endpointDefinition).toBeDefined();
        });
      });
    });
  });

  describe("Proof of Concept: Specific APIs", () => {
    // Test with 2-3 specific APIs as proof of concept
    const testApis = [
      "wsdot-highway-cameras",
      "wsf-fares",
      "wsdot-traffic-flow",
    ];

    testApis.forEach((apiName) => {
      describe(`${apiName} API`, () => {
        let apiConfig: ReturnType<typeof generateApiConfig>;

        beforeAll(() => {
          apiConfig = generateApiConfig(discoveredEndpoints, apiName);
        });

        it("should generate valid API configuration", () => {
          expect(apiConfig).toBeDefined();
          expect(apiConfig.moduleName.toLowerCase()).toContain(
            apiName.split("-")[0].toLowerCase()
          );
          expect(apiConfig.endpoints.length).toBeGreaterThan(0);
        });

        it("should have proper endpoint configurations", () => {
          apiConfig.endpoints.forEach((endpoint) => {
            expect(endpoint.endpointDefinition.api).toBe(apiName);
            expect(endpoint.apiFunction).toBeDefined();
            expect(typeof endpoint.apiFunction).toBe("function");

            // Check that the handler can be called (basic validation)
            expect(() => {
              // Don't actually call it, just verify it's a function
              endpoint.apiFunction.toString();
            }).not.toThrow();
          });
        });

        it("should have appropriate cache strategies", () => {
          apiConfig.endpoints.forEach((endpoint) => {
            expect(endpoint.endpointDefinition.cacheStrategy).toBeDefined();
            expect([
              "REALTIME_UPDATES",
              "MINUTE_UPDATES",
              "FIVE_MINUTE_UPDATES",
              "HOURLY_UPDATES",
              "DAILY_UPDATES",
              "DAILY_STATIC",
              "WEEKLY_STATIC",
              "NONE",
            ]).toContain(endpoint.endpointDefinition.cacheStrategy);
          });
        });

        it("should have reasonable response time limits", () => {
          apiConfig.endpoints.forEach((endpoint) => {
            expect(endpoint.maxResponseTime).toBeGreaterThan(1000); // At least 1 second
            expect(endpoint.maxResponseTime).toBeLessThan(300000); // Less than 5 minutes
          });
        });
      });
    });
  });

  describe("Integration Validation", () => {
    it("should have consistent endpoint counts", () => {
      const totalDiscovered = discoveredEndpoints.length;
      const totalConfigured = Object.values(generatedConfigs).reduce(
        (sum, config) => sum + config.endpoints.length,
        0
      );

      expect(totalConfigured).toBe(totalDiscovered);
    });

    it("should have matching API names", () => {
      const configuredApiNames = Object.keys(generatedConfigs).sort();
      const discoveredApiNames = apiNames.sort();

      expect(configuredApiNames).toEqual(discoveredApiNames);
    });

    it("should maintain endpoint metadata integrity", () => {
      Object.entries(generatedConfigs).forEach(([apiName, config]) => {
        config.endpoints.forEach((endpoint) => {
          const original = endpoint.endpointDefinition;

          // Verify that the original endpoint metadata is preserved
          expect(original.api).toBe(apiName);
          expect(original.id).toBe(`${apiName}/${original.functionName}`);
          expect(original.urlTemplate).toMatch(/^https?:\/\//);
        });
      });
    });
  });
});
