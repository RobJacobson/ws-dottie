/**
 * @fileoverview WSDOT Bridge Clearances API Tests
 *
 * Tests for all WSDOT Bridge Clearances API endpoints using the new architecture.
 * Maintains API → Endpoint → Test hierarchy with DRY test templates.
 */

import { createApiTestSuite } from "../shared/api-test-factory";

// Create the complete test suite for WSDOT Bridge Clearances API
createApiTestSuite("wsdot-bridge-clearances", "WSDOT Bridge Clearances API");
