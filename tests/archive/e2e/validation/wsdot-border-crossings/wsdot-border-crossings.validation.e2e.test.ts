import { describe } from "vitest";

import { wsdotBorderCrossingsTestConfig } from "../../config/wsdot-border-crossings.config";
import { createEndpointTestSuite } from "../../utils/test-generators";

describe("WSDOT Border Crossings", () => {
  wsdotBorderCrossingsTestConfig.endpoints.forEach((endpointConfig) => {
    createEndpointTestSuite(endpointConfig);
  });
});
