/**
 * @fileoverview WSDOT Weather Readings API Tests
 *
 * Tests for all WSDOT Weather Readings API endpoints using the new architecture.
 * Maintains API → Endpoint → Test hierarchy with DRY test templates.
 */

import { createApiTestSuite } from "../shared/api-test-factory";

// Create the complete test suite for WSDOT Weather Readings API
createApiTestSuite("wsdot-weather-readings", "WSDOT Weather Readings API");
