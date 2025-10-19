/**
 * @fileoverview WSDOT Mountain Pass Conditions API Tests
 *
 * Tests for all WSDOT Mountain Pass Conditions API endpoints using the new architecture.
 * Maintains API → Endpoint → Test hierarchy with DRY test templates.
 */

import { createApiTestSuite } from "../shared/api-test-factory";

// Create the complete test suite for WSDOT Mountain Pass Conditions API
createApiTestSuite(
  "wsdot-mountain-pass-conditions",
  "WSDOT Mountain Pass Conditions API"
);
