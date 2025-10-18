/**
 * @fileoverview WSF Schedule API Tests
 *
 * Tests for all WSF Schedule API endpoints using the new architecture.
 * Maintains API → Endpoint → Test hierarchy with DRY test templates.
 */

import { createApiTestSuite } from "../shared/api-test-factory";

// Create the complete test suite for WSF Schedule API
createApiTestSuite("wsf-schedule", "WSF Schedule API");
