import { describe } from "vitest";

import { commercialVehicleRestrictionsTestConfig } from "../../config/wsdot-commercial-vehicle-restrictions.config";
import { createEndpointTestSuite } from "../../utils/test-generators";

/**
 * WSDOT Commercial Vehicle Restrictions API - End-to-End Validation Tests
 *
 * This test suite validates the WSDOT Commercial Vehicle Restrictions API endpoints
 * to ensure they return properly structured data that matches the expected schemas.
 *
 * Test Coverage:
 * - getCommercialVehicleRestrictions (parameterless)
 * - getCommercialVehicleRestrictionsWithId (parameterless)
 *
 * Each endpoint is tested for:
 * - Schema validation
 * - Performance requirements
 * - Error handling
 * - Data quality
 * - Business logic validation
 */
describe("WSDOT Commercial Vehicle Restrictions", () => {
  commercialVehicleRestrictionsTestConfig.endpoints.forEach(
    (endpointConfig) => {
      createEndpointTestSuite(endpointConfig);
    }
  );
});
