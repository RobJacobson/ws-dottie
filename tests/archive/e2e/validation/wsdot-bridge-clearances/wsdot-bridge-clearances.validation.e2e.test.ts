import { describe } from "vitest";

import { bridgeClearancesTestConfig } from "../../config/wsdot-bridge-clearances.config";
import { createEndpointTestSuite } from "../../utils/test-generators";

/**
 * WSDOT Bridge Clearances API E2E Tests
 *
 * This test suite validates the bridge clearances endpoints using the established
 * architectural patterns. Tests are generated automatically from the configuration
 * and cover schema validation, error handling, performance, and data integrity.
 */
describe("WSDOT Bridge Clearances API", () => {
  bridgeClearancesTestConfig.endpoints.forEach((endpointConfig) => {
    createEndpointTestSuite(endpointConfig);
  });
});
