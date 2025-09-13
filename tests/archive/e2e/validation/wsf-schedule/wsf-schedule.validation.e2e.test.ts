import { describe } from "vitest";

import { wsfScheduleTestConfig } from "../../config/wsf-schedule.config";
import { createEndpointTestSuite } from "../../utils/test-generators";

describe("WSF Schedule API", () => {
  wsfScheduleTestConfig.endpoints.forEach((endpointConfig) => {
    createEndpointTestSuite(endpointConfig);
  });
});
