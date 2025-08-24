import { describe } from "vitest";

import { wsdotWeatherStationsTestConfig } from "../../config/wsdot-weather-stations.config";
import { createEndpointTestSuite } from "../../utils/test-generators";

describe("WSDOT Weather Stations", () => {
  wsdotWeatherStationsTestConfig.endpoints.forEach((endpointConfig) => {
    createEndpointTestSuite(endpointConfig);
  });
});
