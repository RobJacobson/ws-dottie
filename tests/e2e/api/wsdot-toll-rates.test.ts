/**
 * @fileoverview WSDOT Toll Rates API - Hierarchical Test Structure
 *
 * Implements the hierarchical test structure: API → Endpoint → Test
 * This file tests all endpoints for the WSDOT Toll Rates API.
 */

import { describe, expect, it } from "vitest";
import { endpoints } from "@/shared/endpoints";
import { fetchDottie } from "@/shared/fetching";

// Get all endpoints for WSDOT Toll Rates API
const tollRatesEndpoints = endpoints.filter(
  (ep) => ep.api === "wsdot-toll-rates"
);

describe("WSDOT Toll Rates API", () => {
  // Test each endpoint individually to create the hierarchical structure
  tollRatesEndpoints.forEach((endpoint) => {
    describe(`${endpoint.functionName}`, () => {
      // Test parameter validation for this endpoint
      it("should validate parameters correctly", async () => {
        const params = endpoint.sampleParams || {};
        try {
          const result = await fetchDottie({
            endpoint,
            params,
            fetchMode: "native",
            logMode: "none",
            validate: true,
          });

          expect(result).toBeDefined();
          expect(result).not.toBeNull();
        } catch (error) {
          throw new Error(
            `Parameter validation failed for ${endpoint.api}.${endpoint.functionName}: ${error instanceof Error ? error.message : String(error)}`
          );
        }
      });

      // Test schema validation for this endpoint
      it("should validate schema correctly", async () => {
        const params = endpoint.sampleParams || {};
        try {
          const result = await fetchDottie({
            endpoint,
            params,
            fetchMode: "native",
            logMode: "none",
            validate: true,
          });

          expect(result).toBeDefined();
          expect(result).not.toBeNull();
        } catch (error) {
          throw new Error(
            `Schema validation failed for ${endpoint.api}.${endpoint.functionName}: ${error instanceof Error ? error.message : String(error)}`
          );
        }
      });

      // Test basic data fetch for this endpoint
      it("should fetch data correctly", async () => {
        const params = endpoint.sampleParams || {};
        try {
          const result = await fetchDottie({
            endpoint,
            params,
            fetchMode: "native",
            logMode: "none",
            validate: false,
          });

          expect(result).toBeDefined();
        } catch (error) {
          throw new Error(
            `Data fetch failed for ${endpoint.api}.${endpoint.functionName}: ${error instanceof Error ? error.message : String(error)}`
          );
        }
      });
    });
  });
});
