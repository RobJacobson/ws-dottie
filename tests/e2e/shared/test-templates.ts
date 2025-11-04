import type { Endpoint } from "@/shared/types";
import { createDataIntegrityTest } from "./helpers/data-integrity-test";
import { createDefaultParametersTest } from "./helpers/default-parameters-test";
import { createDefaultParametersValidationTest } from "./helpers/default-parameters-validation-test";
import { createErrorHandlingTest } from "./helpers/error-handling-test";
import {
  createRealDataWithoutValidationTest,
  createRealDataWithValidationTest,
} from "./helpers/fetch-real-data-test";

/**
 * Endpoints that should skip data integrity tests due to known server-side issues
 * Format: "apiName.functionName"
 */
const SKIP_DATA_INTEGRITY_TESTS = new Set([
  "wsdot-toll-rates.getTollTripInfo", // Server returns HTTP 400 due to DBNull in ModifiedDate column
  "wsdot-weather-readings.getSurfaceMeasurements", // Optional fields cause differences between validated/unvalidated results
  "wsdot-weather-readings.getSubSurfaceMeasurements", // Optional fields cause differences between validated/unvalidated results
]);

/**
 * Endpoints that should skip all tests due to known server-side issues
 *
 * Whitelisted endpoints and reasons:
 * - wsdot-toll-rates.getTollTripInfo:
 *   Server returns HTTP 400 Bad Request with error: "The value for column 'ModifiedDate'
 *   in table 'sp_GetTollTripDetails' is DBNull." This is a server-side bug where some
  * records have null values for the ModifiedDate column, causing the API to fail completely.
  * This affects all tests for this endpoint, not just data integrity tests.
  *
  Format: "apiName.functionName"
  */
export const SKIP_ALL_TESTS = new Set([
  "wsdot-toll-rates.getTollTripInfo", // Server returns HTTP 400 due to DBNull in ModifiedDate column
]);

/**
 * Creates all standard tests for an endpoint
 */
export const createStandardEndpointTests = (
  endpoint: Endpoint<unknown, unknown>
) => {
  const endpointIdentifier = `${endpoint.api}.${endpoint.functionName}`;

  // Skip all tests for known problematic endpoints
  if (SKIP_ALL_TESTS.has(endpointIdentifier)) {
    return;
  }

  createDefaultParametersTest(endpoint);
  createDefaultParametersValidationTest(endpoint);
  createRealDataWithoutValidationTest(endpoint);
  createRealDataWithValidationTest(endpoint);

  // Skip data integrity test for known problematic endpoints
  if (!SKIP_DATA_INTEGRITY_TESTS.has(endpointIdentifier)) {
    createDataIntegrityTest(endpoint);
  }

  createErrorHandlingTest(endpoint);
};
