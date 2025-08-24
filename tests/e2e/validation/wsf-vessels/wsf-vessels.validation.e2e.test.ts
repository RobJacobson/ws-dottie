import { describe } from "vitest";

import { wsfVesselsTestConfig } from "../../config/wsf-vessels.config";
import { createEndpointTestSuite } from "../../utils/test-generators";

describe("WSF Vessels API", () => {
  wsfVesselsTestConfig.endpoints.forEach((endpointConfig) => {
    createEndpointTestSuite(endpointConfig);
  });
});
