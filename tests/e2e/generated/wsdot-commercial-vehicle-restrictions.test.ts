/**
 * Auto-generated test file for wsdot-commercial-vehicle-restrictions
 * Generated at: 2025-09-15T04:10:17.162Z
 * Test type: core
 */

import { describe } from "vitest";
import { createEndpointTestSuite } from "../utils/test-generator";
import { fetchWithZod } from "@/shared/fetching";
import { categorizeEndpoint, getMaxResponseTime, generateInvalidParams } from "../utils/test-generator";

// Import the specific client module
import * as wsdotcommercialvehiclerestrictionsClient from "@/clients/wsdot-commercial-vehicle-restrictions";

describe("wsdot-commercial-vehicle-restrictions API", () => {
  // Get all endpoints from the client module
  const clientExports = Object.values(wsdotcommercialvehiclerestrictionsClient);
  const apiEndpoints = clientExports.filter((exported: any) => 
    exported && 
    typeof exported === "object" && 
    typeof exported.id === "string" &&
    typeof exported.api === "string" &&
    exported.api === "wsdot-commercial-vehicle-restrictions"
  );

  console.log(`🔍 Found ${apiEndpoints.length} endpoints for wsdot-commercial-vehicle-restrictions`);

  // Generate test suites for each endpoint
  apiEndpoints.forEach((endpoint: any) => {
    const config = {
      apiFunction: (params: any) => fetchWithZod(endpoint, params),
      endpoint,
      validParams: endpoint.sampleParams || {},
      invalidParams: generateInvalidParams(endpoint),
      endpointName: endpoint.functionName,
      category: categorizeEndpoint(endpoint),
      maxResponseTime: getMaxResponseTime(endpoint.cacheStrategy),
      customTests: [],
    };

    createEndpointTestSuite(config);
  });
});
