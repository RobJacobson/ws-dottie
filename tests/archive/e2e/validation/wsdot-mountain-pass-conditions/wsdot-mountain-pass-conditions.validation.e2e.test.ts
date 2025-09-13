import { describe } from "vitest";

import { mountainPassConditionsTestConfig } from "../../config/wsdot-mountain-pass-conditions.config";
import { createEndpointTestSuite } from "../../utils/test-generators";

describe("WSDOT Mountain Pass Conditions", () => {
  mountainPassConditionsTestConfig.endpoints.forEach((endpointConfig) => {
    createEndpointTestSuite(endpointConfig);
  });
});
