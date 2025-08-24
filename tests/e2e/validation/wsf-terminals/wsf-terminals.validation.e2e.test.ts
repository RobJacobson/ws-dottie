import { describe } from "vitest";

import { wsfTerminalsTestConfig } from "../../config/wsf-terminals.config";
import { createEndpointTestSuite } from "../../utils/test-generators";

describe("WSF Terminals API", () => {
  wsfTerminalsTestConfig.endpoints.forEach((endpointConfig) => {
    createEndpointTestSuite(endpointConfig);
  });
});
