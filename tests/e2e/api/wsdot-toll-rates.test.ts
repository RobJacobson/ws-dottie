/**
 * @fileoverview WSDOT Toll Rates API Tests
 *
 * Tests for all WSDOT Toll Rates API endpoints using the new architecture.
 * Maintains API → Endpoint → Test hierarchy with DRY test templates.
 */

import { createApiTestSuite } from "../shared/api-test-factory";

// Create the complete test suite for WSDOT Toll Rates API
createApiTestSuite("wsdot-toll-rates", "WSDOT Toll Rates API");
