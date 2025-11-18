/**
 * @fileoverview wsdot-toll-rates API - fetchTripRatesByVersion Tests
 *
 * Tests for the fetchTripRatesByVersion endpoint using the new per-endpoint architecture.
 */

import { createEndpointSuite } from "../shared/api-test-factory";

// Create the complete test suite for wsdot-toll-rates API - fetchTripRatesByVersion endpoint
createEndpointSuite("wsdot-toll-rates.fetchTripRatesByVersion");
