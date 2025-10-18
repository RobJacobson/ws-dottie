/**
 * @fileoverview WSDOT Commercial Vehicle Restrictions API Tests
 *
 * Tests for all WSDOT Commercial Vehicle Restrictions API endpoints using the new architecture.
 * Maintains API → Endpoint → Test hierarchy with DRY test templates.
 */

import { createApiTestSuite } from "../shared/api-test-factory";

// Create the complete test suite for WSDOT Commercial Vehicle Restrictions API
createApiTestSuite(
  "wsdot-commercial-vehicle-restrictions",
  "WSDOT Commercial Vehicle Restrictions API"
);
