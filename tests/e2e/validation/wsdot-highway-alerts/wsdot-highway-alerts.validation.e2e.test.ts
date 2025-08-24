import { describe } from "vitest";

import { highwayAlertsTestConfig } from "../../config/wsdot-highway-alerts.config";
import { createEndpointTestSuite } from "../../utils/test-generators";

describe("WSDOT Highway Alerts", () => {
  highwayAlertsTestConfig.endpoints.forEach((endpointConfig) => {
    createEndpointTestSuite(endpointConfig);
  });
});
