/**
 * @fileoverview WSDOT Travel Times API Tests
 *
 * Tests for all WSDOT Travel Times API endpoints using the new architecture.
 * Maintains API → Endpoint → Test hierarchy with DRY test templates.
 */

import { createApiTestSuite } from "../shared/api-test-factory";

// Create the complete test suite for WSDOT Travel Times API
createApiTestSuite("wsdot-travel-times", "WSDOT Travel Times API");
