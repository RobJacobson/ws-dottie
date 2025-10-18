import type { Endpoint } from "../../../src/shared/types";
import { createDataIntegrityTest } from "./helpers/data-integrity-test";
import { createDefaultParametersTest } from "./helpers/default-parameters-test";
import { createDefaultParametersValidationTest } from "./helpers/default-parameters-validation-test";
import { createErrorHandlingTest } from "./helpers/error-handling-test";
import {
  createRealDataWithoutValidationTest,
  createRealDataWithValidationTest,
} from "./helpers/fetch-real-data-test";
import { createMissingParametersTest } from "./helpers/missing-parameters-test";
/**
 * Creates all standard tests for an endpoint
 */
export const createStandardEndpointTests = (
  endpoint: Endpoint<unknown, unknown>
) => {
  createDefaultParametersTest(endpoint);
  createDefaultParametersValidationTest(endpoint);
  createRealDataWithoutValidationTest(endpoint);
  createRealDataWithValidationTest(endpoint);
  createDataIntegrityTest(endpoint);
  createErrorHandlingTest(endpoint);
  createMissingParametersTest(endpoint);
};
