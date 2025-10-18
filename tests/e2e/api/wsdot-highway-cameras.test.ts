/**
 * @fileoverview WSDOT Highway Cameras API Tests
 *
 * Tests for all WSDOT Highway Cameras API endpoints using the new architecture.
 * Maintains API → Endpoint → Test hierarchy with DRY test templates.
 */

import { createApiTestSuite } from "../shared/api-test-factory";

// Create the complete test suite for WSDOT Highway Cameras API
createApiTestSuite("wsdot-highway-cameras", "WSDOT Highway Cameras API");
