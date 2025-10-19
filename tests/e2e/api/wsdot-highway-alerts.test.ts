/**
 * @fileoverview WSDOT Highway Alerts API Tests
 *
 * Tests for all WSDOT Highway Alerts API endpoints using the new architecture.
 * Maintains API → Endpoint → Test hierarchy with DRY test templates.
 */

import { createApiTestSuite } from "../shared/api-test-factory";

// Create the complete test suite for WSDOT Highway Alerts API
createApiTestSuite("wsdot-highway-alerts", "WSDOT Highway Alerts API");
