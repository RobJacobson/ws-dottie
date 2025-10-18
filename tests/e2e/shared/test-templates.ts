import { expect, it } from "vitest";
import { fetchDottie } from "../../../src/shared/fetching";
import type { Endpoint } from "../../../src/shared/types";
import { createDataIntegrityTest } from "./helpers/data-integrity-test";
import { createDefaultParametersTest } from "./helpers/default-parameters-test";
import { createErrorHandlingTest } from "./helpers/error-handling-test";
import { createRealDataWithValidationTest } from "./helpers/real-data-with-validation-test";
import { createRealDataWithoutValidationTest } from "./helpers/real-data-without-validation-test";
/**
 * Creates all standard tests for an endpoint
 */
export function createStandardEndpointTests(
  endpoint: Endpoint<unknown, unknown>
) {
  createDefaultParametersTest(endpoint);
  createRealDataWithoutValidationTest(endpoint);
  createRealDataWithValidationTest(endpoint);
  createDataIntegrityTest(endpoint);
  createErrorHandlingTest(endpoint);
}
