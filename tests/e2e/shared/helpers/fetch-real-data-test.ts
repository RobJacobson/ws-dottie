import { expect, it } from "vitest";
import { fetchDottie } from "../../../../src/shared/fetching";
import type { Endpoint } from "../../../../src/shared/types";

// TODO: Define the whitelist of endpoints that are allowed to return any kind of data
// For now, we'll implement the data validation logic, and the whitelist can be defined later
const ENDPOINT_WHITELIST: string[] = [
  "wsf-schedule.getTimeAdjustmentsByRoute",
  "wsf-schedule.getTimeAdjustmentsBySchedRoute",
  "wsf-schedule.getRoutesHavingServiceDisruptionsByTripDate",
];

/**
 * Checks if an endpoint is in the predefined whitelist
 */
const isEndpointWhitelisted = (
  endpoint: Endpoint<unknown, unknown>
): boolean => {
  const endpointKey = `${endpoint.api}.${endpoint.functionName}`;
  return ENDPOINT_WHITELIST.includes(endpointKey);
};

/**
 * Checks if the returned data is meaningful (not null, not empty array, not empty object)
 */
const hasMeaningfulData = (data: unknown): boolean => {
  if (data === null) return false;
  if (data === undefined) return false;

  // Check for Date objects specifically
  if (data instanceof Date) {
    return !isNaN(data.getTime()); // Valid date objects with actual dates are meaningful
  }

  if (Array.isArray(data)) {
    return data.length > 0;
  }

  if (typeof data === "object") {
    // Check if it's a non-empty object
    return Object.keys(data).length > 0;
  }

  // For primitives, consider them meaningful if they exist and are not empty strings
  if (typeof data === "string") {
    return data.length > 0;
  }

  return true;
};

/**
 * Creates a test that fetches real data with validation from an endpoint
 * Validates that either (a) the endpoint is whitelisted or (b) the data is meaningful
 */
export const createRealDataWithValidationTest = (
  endpoint: Endpoint<unknown, unknown>
) => {
  it(`It should fetch real data with validation from ${endpoint.api}.${endpoint.functionName}`, async () => {
    const result = await fetchDottie({
      endpoint,
      params: endpoint.sampleParams || {},
      fetchMode: "native",
      logMode: "none",
      validate: true,
    });

    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    // Validate that we returned real JSON data
    expect(typeof result).toBe("object");

    // Validate that either the endpoint is whitelisted or the data is meaningful
    if (!isEndpointWhitelisted(endpoint)) {
      expect(hasMeaningfulData(result)).toBe(true);
    }
  });
};

/**
 * Creates a test that fetches real data without validation from an endpoint
 * Validates that either (a) the endpoint is whitelisted or (b) the data is meaningful
 */
export const createRealDataWithoutValidationTest = (
  endpoint: Endpoint<unknown, unknown>
) => {
  it(`It should fetch real data without validation from ${endpoint.api}.${endpoint.functionName}`, async () => {
    const result = await fetchDottie({
      endpoint,
      params: endpoint.sampleParams || {},
      fetchMode: "native",
      logMode: "none",
      validate: false,
    });

    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    // Validate that we returned real JSON data
    expect(typeof result).toBe("object");

    // Validate that either the endpoint is whitelisted or the data is meaningful
    if (!isEndpointWhitelisted(endpoint)) {
      expect(hasMeaningfulData(result)).toBe(true);
    }
  });
};
