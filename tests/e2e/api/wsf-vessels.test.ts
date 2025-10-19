/**
 * @fileoverview WSF Vessels API Tests
 *
 * Tests for all WSF Vessels API endpoints using the new architecture.
 * Maintains API → Endpoint → Test hierarchy with DRY test templates.
 */

import { createApiTestSuite } from "../shared/api-test-factory";

// Create the complete test suite for WSF Vessels API
createApiTestSuite("wsf-vessels", "WSF Vessels API");
