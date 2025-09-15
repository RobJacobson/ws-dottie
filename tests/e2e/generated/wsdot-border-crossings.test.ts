/**
 * Auto-generated test file for wsdot-border-crossings
 * Generated at: 2025-09-15T04:10:17.147Z
 * Test type: core
 */

import { describe } from "vitest";
import { createEndpointTestSuite } from "../utils/test-generator";
import { fetchWithZod } from "@/shared/fetching";
import { categorizeEndpoint, getMaxResponseTime, generateInvalidParams } from "../utils/test-generator";

// Import the specific client module
import * as wsdotbordercrossingsClient from "@/clients/wsdot-border-crossings";

describe("wsdot-border-crossings API", () => {
  // Get all endpoints from the client module
  const clientExports = Object.values(wsdotbordercrossingsClient);
  const apiEndpoints = clientExports.filter((exported: any) => 
    exported && 
    typeof exported === "object" && 
    typeof exported.id === "string" &&
    typeof exported.api === "string" &&
    exported.api === "wsdot-border-crossings"
  );

  console.log(`🔍 Found ${apiEndpoints.length} endpoints for wsdot-border-crossings`);

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
