import { describe } from "vitest";

import { travelTimesTestConfig } from "../../config/wsdot-travel-times.config";
import { createEndpointTestSuite } from "../../utils/test-generators";

describe("WSDOT Travel Times", () => {
  travelTimesTestConfig.endpoints.forEach((endpointConfig) => {
    createEndpointTestSuite(endpointConfig);
  });
});
