/**
 * @fileoverview WSF Fares API Tests
 *
 * Tests for all WSF Fares API endpoints using the new architecture.
 * Maintains API → Endpoint → Test hierarchy with DRY test templates.
 */

import { createApiTestSuite } from "../shared/api-test-factory";

// Create the complete test suite for WSF Fares API
createApiTestSuite("wsf-fares", "WSF Fares API");
