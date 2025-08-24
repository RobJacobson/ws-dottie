import { describe } from "vitest";

import { wsdotWeatherInformationTestConfig } from "../../config/wsdot-weather-information.config";
import { createEndpointTestSuite } from "../../utils/test-generators";

describe("WSDOT Weather Information", () => {
  wsdotWeatherInformationTestConfig.endpoints.forEach((endpointConfig) => {
    createEndpointTestSuite(endpointConfig);
  });
});
