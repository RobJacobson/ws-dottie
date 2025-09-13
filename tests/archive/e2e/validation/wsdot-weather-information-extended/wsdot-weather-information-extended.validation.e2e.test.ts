import { describe } from "vitest";

import { wsdotWeatherInformationExtendedTestConfig } from "../../config/wsdot-weather-information-extended.config";
import { createEndpointTestSuite } from "../../utils/test-generators";

describe("WSDOT Weather Information Extended", () => {
  wsdotWeatherInformationExtendedTestConfig.endpoints.forEach(
    (endpointConfig) => {
      createEndpointTestSuite(endpointConfig);
    }
  );
});
