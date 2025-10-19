/**
 * @fileoverview WSDOT Weather Stations API Tests
 *
 * Tests for all WSDOT Weather Stations API endpoints using the new architecture.
 * Maintains API → Endpoint → Test hierarchy with DRY test templates.
 */

import { createApiTestSuite } from "../shared/api-test-factory";

// Create the complete test suite for WSDOT Weather Stations API
createApiTestSuite("wsdot-weather-stations", "WSDOT Weather Stations API");
