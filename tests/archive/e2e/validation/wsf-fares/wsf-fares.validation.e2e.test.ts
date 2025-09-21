import { describe } from "vitest";

import { wsfFaresTestConfig } from "../../config/wsf-fares.config";
import { createEndpointTestSuite } from "../../utils/test-generators";

describe("WSF Fares API", () => {
  wsfFaresTestConfig.endpoints.forEach((endpointConfig) => {
    createEndpointTestSuite(endpointConfig);
  });
});
