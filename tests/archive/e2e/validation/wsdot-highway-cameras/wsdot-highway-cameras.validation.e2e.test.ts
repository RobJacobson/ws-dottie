import { describe } from "vitest";

import { highwayCamerasTestConfig } from "../../config/wsdot-highway-cameras.config";
import { createEndpointTestSuite } from "../../utils/test-generators";

/**
 * WSDOT Highway Cameras API - End-to-End Validation Tests
 *
 * This test suite validates all highway camera endpoints using the new
 * test generator architecture. The tests are automatically generated
 * from the configuration file, ensuring comprehensive coverage with
 * minimal boilerplate code.
 */

describe("WSDOT Highway Cameras API", () => {
  // Generate test suites for each endpoint using the configuration
  highwayCamerasTestConfig.endpoints.forEach((endpointConfig) => {
    createEndpointTestSuite(endpointConfig);
  });
});
