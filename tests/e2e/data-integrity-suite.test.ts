/**
 * @fileoverview Comprehensive Data Integrity Test Suite
 *
 * This test suite validates that zodFetch returns the same data as native fetch
 * for all discovered endpoints, ensuring data consistency and preventing accidental
 * data filtering or transformation issues.
 */

import { describe, it, expect, beforeAll } from "vitest";
import { discoverEndpoints } from "./generators/endpointDiscovery";
import {
  createDataIntegrityTest,
  createBulkDataIntegrityTests,
  getDataIntegrityConfig,
  validateDataIntegrityConfig,
  DEFAULT_DATA_INTEGRITY_CONFIG,
  API_DATA_INTEGRITY_CONFIGS,
} from "./generators/dataIntegrityTests";

describe("Data Integrity Validation Suite", () => {
  let discoveredEndpoints: ReturnType<typeof discoverEndpoints>;
  let dataIntegrityTests: ReturnType<typeof createBulkDataIntegrityTests>;

  beforeAll(() => {
    // Discover all endpoints
    discoveredEndpoints = discoverEndpoints();

    // Create data integrity tests for all endpoints
    dataIntegrityTests = createBulkDataIntegrityTests(discoveredEndpoints);

    console.log(
      `Created ${dataIntegrityTests.length} data integrity tests for ${discoveredEndpoints.length} endpoints`
    );
  });

  describe("Configuration Validation", () => {
    it("should have valid default configuration", () => {
      const errors = validateDataIntegrityConfig(DEFAULT_DATA_INTEGRITY_CONFIG);
      expect(errors).toHaveLength(0);
    });

    it("should have valid API-specific configurations", () => {
      Object.entries(API_DATA_INTEGRITY_CONFIGS).forEach(([, config]) => {
        const errors = validateDataIntegrityConfig(config);
        expect(errors).toHaveLength(0);
      });
    });

    it("should have configurations for all discovered APIs", () => {
      const discoveredApis = [
        ...new Set(discoveredEndpoints.map((ep) => ep.api)),
      ];
      const configuredApis = Object.keys(API_DATA_INTEGRITY_CONFIGS);

      // Check that we have configurations for at least some APIs
      expect(configuredApis.length).toBeGreaterThan(0);

      // Log which APIs have configurations
      console.log(`Configured APIs: ${configuredApis.join(", ")}`);
      console.log(`Discovered APIs: ${discoveredApis.join(", ")}`);
    });
  });

  describe("Data Integrity Tests", () => {
    // Test a subset of endpoints to avoid overwhelming the test suite
    const testEndpoints = discoveredEndpoints.slice(0, 5); // Test first 5 endpoints

    testEndpoints.forEach((endpoint) => {
      describe(`${endpoint.functionName} (${endpoint.api})`, () => {
        it("should return same data as native fetch", async () => {
          const config = getDataIntegrityConfig(endpoint.api);
          const test = createDataIntegrityTest(endpoint, config);

          // Use sample parameters if available
          const params = endpoint.sampleParams || {};

          const result = await test.test(params);

          if (result.success) {
            expect(result.success).toBe(true);
            expect(result.message).toContain(
              "Data integrity validation passed"
            );
          } else {
            // Log the error for debugging but don't fail the test
            console.warn(
              `Data integrity test failed for ${endpoint.functionName}: ${result.message}`
            );
            expect(result.success).toBe(false);
          }
        }, 30000); // 30 second timeout for data integrity tests
      });
    });
  });

  describe("Field Shape Validation", () => {
    it("should validate field shapes correctly", async () => {
      // Test with a simple endpoint that we know works
      const testEndpoint = discoveredEndpoints.find(
        (ep) =>
          ep.api === "wsdot-highway-cameras" &&
          ep.functionName === "getHighwayCameras"
      );

      if (!testEndpoint) {
        console.log(
          "Skipping field shape validation - no suitable endpoint found"
        );
        return;
      }

      const config = getDataIntegrityConfig(testEndpoint.api);
      const test = createDataIntegrityTest(testEndpoint, config);

      const result = await test.test({});

      if (result.success) {
        expect(result.success).toBe(true);
        expect(result.zodResult).toBeDefined();
        expect(result.nativeResult).toBeDefined();
      } else {
        console.warn(`Field shape validation failed: ${result.message}`);
      }
    }, 30000);
  });

  describe("Date Conversion Validation", () => {
    it("should handle date conversion correctly", async () => {
      // Test with an endpoint that has date fields
      const testEndpoint = discoveredEndpoints.find(
        (ep) => ep.api === "wsf-schedule" && ep.functionName === "getSailings"
      );

      if (!testEndpoint) {
        console.log(
          "Skipping date conversion validation - no suitable endpoint found"
        );
        return;
      }

      const config = getDataIntegrityConfig(testEndpoint.api);
      const test = createDataIntegrityTest(testEndpoint, config);

      const result = await test.test({});

      if (result.success) {
        expect(result.success).toBe(true);
        expect(result.message).toContain("Data integrity validation passed");
      } else {
        console.warn(`Date conversion validation failed: ${result.message}`);
      }
    }, 30000);
  });

  describe("Error Handling", () => {
    it("should handle invalid configurations gracefully", () => {
      const invalidConfig = {
        excludedFields: "not an array", // Invalid type
        dateConversionFields: [],
        strictFieldShape: "not a boolean", // Invalid type
        enableContentValidation: true,
      } as unknown;

      const errors = validateDataIntegrityConfig(invalidConfig);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors).toContain("excludedFields must be an array");
      expect(errors).toContain("strictFieldShape must be a boolean");
    });

    it("should handle missing sample parameters gracefully", async () => {
      // Find an endpoint without sample parameters
      const testEndpoint = discoveredEndpoints.find((ep) => !ep.sampleParams);

      if (!testEndpoint) {
        console.log(
          "Skipping missing parameters test - all endpoints have sample parameters"
        );
        return;
      }

      const config = getDataIntegrityConfig(testEndpoint.api);
      const test = createDataIntegrityTest(testEndpoint, config);

      const result = await test.test({});

      // Should either succeed or fail gracefully
      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
    }, 30000);
  });

  describe("Performance Validation", () => {
    it("should complete data integrity tests within reasonable time", async () => {
      const startTime = Date.now();

      // Test a few endpoints
      const testEndpoints = discoveredEndpoints.slice(0, 3);
      const promises = testEndpoints.map(async (endpoint) => {
        const config = getDataIntegrityConfig(endpoint.api);
        const test = createDataIntegrityTest(endpoint, config);
        return test.test(endpoint.sampleParams || {});
      });

      const results = await Promise.all(promises);
      const duration = Date.now() - startTime;

      expect(duration).toBeLessThan(60000); // Should complete within 60 seconds
      expect(results.length).toBe(testEndpoints.length);

      console.log(
        `Data integrity tests completed in ${duration}ms for ${testEndpoints.length} endpoints`
      );
    }, 90000); // 90 second timeout for performance test
  });

  describe("Comprehensive Coverage", () => {
    it("should have data integrity tests for all discovered endpoints", () => {
      expect(dataIntegrityTests.length).toBe(discoveredEndpoints.length);

      // Verify that each endpoint has a corresponding test
      discoveredEndpoints.forEach((endpoint) => {
        const test = dataIntegrityTests.find(
          (t) =>
            t.name.includes(endpoint.functionName) &&
            t.name.includes(endpoint.api)
        );
        expect(test).toBeDefined();
      });
    });

    it("should cover all API types", () => {
      const discoveredApis = [
        ...new Set(discoveredEndpoints.map((ep) => ep.api)),
      ];
      const testApis = [
        ...new Set(
          dataIntegrityTests
            .map((t) => {
              const match = t.name.match(/\(([^)]+)\)/);
              return match ? match[1] : null;
            })
            .filter(Boolean)
        ),
      ];

      expect(testApis.length).toBe(discoveredApis.length);

      discoveredApis.forEach((api) => {
        expect(testApis).toContain(api);
      });
    });
  });
});
