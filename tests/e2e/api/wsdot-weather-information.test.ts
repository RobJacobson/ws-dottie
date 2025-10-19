/**
 * @fileoverview WSDOT Weather Information API Tests
 *
 * Tests for all WSDOT Weather Information API endpoints using the new architecture.
 * Maintains API → Endpoint → Test hierarchy with DRY test templates.
 */

import { createApiTestSuite } from "../shared/api-test-factory";

// Create the complete test suite for WSDOT Weather Information API
createApiTestSuite(
  "wsdot-weather-information",
  "WSDOT Weather Information API"
);
