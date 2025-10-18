/**
 * @fileoverview WSDOT Border Crossings API Tests
 *
 * Tests for all WSDOT Border Crossings API endpoints using the new architecture.
 * Maintains API → Endpoint → Test hierarchy with DRY test templates.
 */

import { createApiTestSuite } from "../shared/api-test-factory";

// Create the complete test suite for WSDOT Border Crossings API
createApiTestSuite("wsdot-border-crossings", "WSDOT Border Crossings API");
