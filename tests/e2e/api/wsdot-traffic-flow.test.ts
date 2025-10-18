/**
 * @fileoverview WSDOT Traffic Flow API Tests
 *
 * Tests for all WSDOT Traffic Flow API endpoints using the new architecture.
 * Maintains API → Endpoint → Test hierarchy with DRY test templates.
 */

import { createApiTestSuite } from "../shared/api-test-factory";

// Create the complete test suite for WSDOT Traffic Flow API
createApiTestSuite("wsdot-traffic-flow", "WSDOT Traffic Flow API");
