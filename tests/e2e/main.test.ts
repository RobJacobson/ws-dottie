/**
 * @fileoverview Main E2E Test Orchestrator
 *
 * This file serves as the main entry point for all E2E tests, testing
 * each API sequentially, one at a time, for better debugging and clearer
 * pass/fail reporting per API.
 */

import { describe, it, expect } from "vitest";
import { PARALLEL_TEST_TIMEOUT } from "./testConfig";
import { setupTestEndpoints } from "./shared/setup";
import { testLogger } from "./testLogger";
import type { Endpoint } from "@/shared/endpoints";
import { runSchemaValidation } from "./tests/schema-validation";
import { runParameterHandling } from "./tests/parameter-handling";
import { runDataStructureConsistency } from "./tests/data-structure-consistency";
import { runInvalidParameters } from "./tests/invalid-parameters";
import { runMissingParameters } from "./tests/missing-parameters";
import { runResponseTime } from "./tests/response-time";
import { runResponseConsistency } from "./tests/response-consistency";
import { runMemoryUsage } from "./tests/memory-usage";
import { runDataIntegrity } from "./tests/data-integrity";

// Top-level discovery so tests can be defined per endpoint
const setupResult = await setupTestEndpoints();
const targetModule = process.env.TEST_MODULE;
const targetEndpoint = process.env.TEST_ENDPOINT;

const apiNames =
  targetModule && targetModule !== "all"
    ? [targetModule]
    : [...Object.keys(setupResult.discoveredEndpoints)].sort(); // alphabetically [[memory:8705120]]

// ============================================================================
// MAIN TEST ORCHESTRATOR
// ============================================================================

describe("E2E Test Orchestrator", () => {
  for (const apiName of apiNames) {
    const endpoints = (setupResult.discoveredEndpoints[apiName] || [])
      .slice()
      .sort((a, b) => a.functionName.localeCompare(b.functionName)); // endpoints alphabetically [[memory:8705120]]

    const filtered =
      targetEndpoint && targetEndpoint !== "all"
        ? endpoints.filter((e) => e.functionName === targetEndpoint)
        : endpoints;

    describe(apiName, () => {
      if (filtered.length === 0) {
        it("has endpoints", () => {
          testLogger.warn(`No endpoints available for ${apiName}`);
          expect(filtered.length).toBeGreaterThan(0);
        });
        return;
      }

      for (const endpoint of filtered) {
        describe(endpoint.functionName, () => {
          it(
            "schema validation",
            async () => {
              const r = await runSchemaValidation(
                endpoint as Endpoint<unknown, unknown>
              );
              testLogger.info(
                `${apiName}.${endpoint.functionName} schema: ${r.message}`
              );
              expect(r.success).toBe(true);
            },
            PARALLEL_TEST_TIMEOUT
          );

          it(
            "parameter handling",
            async () => {
              const r = await runParameterHandling(
                endpoint as Endpoint<unknown, unknown>
              );
              testLogger.info(
                `${apiName}.${endpoint.functionName} params: ${r.message}`
              );
              expect(r.success).toBe(true);
            },
            PARALLEL_TEST_TIMEOUT
          );

          it(
            "data structure consistency",
            async () => {
              const r = await runDataStructureConsistency(
                endpoint as Endpoint<unknown, unknown>
              );
              testLogger.info(
                `${apiName}.${endpoint.functionName} structure: ${r.message}`
              );
              expect(r.success).toBe(true);
            },
            PARALLEL_TEST_TIMEOUT
          );

          it(
            "invalid parameters",
            async () => {
              const r = await runInvalidParameters(
                endpoint as Endpoint<unknown, unknown>
              );
              testLogger.info(
                `${apiName}.${endpoint.functionName} invalid: ${r.message}`
              );
              expect(r.success).toBe(true);
            },
            PARALLEL_TEST_TIMEOUT
          );

          it(
            "missing parameters",
            async () => {
              const r = await runMissingParameters(
                endpoint as Endpoint<unknown, unknown>
              );
              testLogger.info(
                `${apiName}.${endpoint.functionName} missing: ${r.message}`
              );
              expect(r.success).toBe(true);
            },
            PARALLEL_TEST_TIMEOUT
          );

          it(
            "response time",
            async () => {
              const r = await runResponseTime(
                endpoint as Endpoint<unknown, unknown>
              );
              testLogger.info(
                `${apiName}.${endpoint.functionName} time: ${r.message}`
              );
              expect(r.success).toBe(true);
            },
            PARALLEL_TEST_TIMEOUT
          );

          it(
            "response consistency",
            async () => {
              const r = await runResponseConsistency(
                endpoint as Endpoint<unknown, unknown>
              );
              testLogger.info(
                `${apiName}.${endpoint.functionName} consistency: ${r.message}`
              );
              expect(r.success).toBe(true);
            },
            PARALLEL_TEST_TIMEOUT * 2
          );

          it(
            "memory usage",
            async () => {
              const r = await runMemoryUsage(
                endpoint as Endpoint<unknown, unknown>
              );
              testLogger.info(
                `${apiName}.${endpoint.functionName} memory: ${r.message}`
              );
              expect(r.success).toBe(true);
            },
            PARALLEL_TEST_TIMEOUT
          );

          it(
            "data integrity",
            async () => {
              const r = await runDataIntegrity(
                endpoint as Endpoint<unknown, unknown>
              );
              testLogger.info(
                `${apiName}.${endpoint.functionName} integrity: ${r.message}`
              );
              expect(r.success).toBe(true);
            },
            PARALLEL_TEST_TIMEOUT
          );
        });
      }
    });
  }
});
