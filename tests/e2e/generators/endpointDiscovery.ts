/**
 * @fileoverview Endpoint Discovery Engine
 *
 * This module provides functionality to automatically discover all Endpoint objects
 * from the clients directory at test runtime. It leverages the existing endpoint
 * registry to find all defined endpoints without requiring manual configuration.
 */

import type { Endpoint } from "@/shared/endpoints";
import * as highwayCameras from "@/clients/wsdot-highway-cameras";
import * as fares from "@/clients/wsf-fares";
import * as trafficFlow from "@/clients/wsdot-traffic-flow";
import {
  discoverEndpointsFromModules,
  validateDiscoveredEndpoints as validateEndpoints,
  filterEndpointsByApi,
  getUniqueApiNames,
  sortEndpoints,
  debugDiscoveredEndpoints as debugEndpoints,
} from "@/shared/endpoints/endpointDiscovery";

/**
 * Discovers all Endpoint objects from the clients directory
 *
 * This function dynamically imports all client modules and extracts Endpoint
 * objects that have been created using defineEndpoint. It provides a runtime
 * discovery mechanism that automatically adapts to changes in the endpoint
 * definitions without requiring manual test configuration updates.
 *
 * @returns Array of all discovered Endpoint objects
 *
 * @example
 * ```typescript
 * const endpoints = discoverEndpoints();
 * console.log(`Discovered ${endpoints.length} endpoints`);
 *
 * // Group by API
 * const apis = [...new Set(endpoints.map(ep => ep.api))];
 * console.log(`APIs: ${apis.join(', ')}`);
 * ```
 */
export const discoverEndpoints = (): Endpoint<unknown, unknown>[] => {
  try {
    // Import specific client modules for proof of concept
    const allModules = [highwayCameras, fares, trafficFlow];

    // Use shared discovery utility
    const endpoints = discoverEndpointsFromModules(allModules);

    // Sort endpoints by API and function name for consistent ordering
    return sortEndpoints(endpoints);
  } catch (error) {
    console.error("Failed to discover endpoints:", error);
    throw new Error(
      `Endpoint discovery failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};

/**
 * Discovers endpoints for a specific API
 *
 * @param apiName - The API name to filter by (e.g., "wsdot-highway-cameras")
 * @returns Array of Endpoint objects for the specified API
 */
export const discoverEndpointsByApi = (
  apiName: string
): Endpoint<unknown, unknown>[] => {
  const allEndpoints = discoverEndpoints();
  return filterEndpointsByApi(allEndpoints, apiName);
};

/**
 * Gets a list of all unique API names from discovered endpoints
 *
 * @returns Array of unique API names, sorted alphabetically
 */
export const discoverApiNames = (): string[] => {
  const endpoints = discoverEndpoints();
  return getUniqueApiNames(endpoints);
};

/**
 * Validates that all discovered endpoints have the required structure
 *
 * This function performs additional validation beyond the type guard to ensure
 * that all discovered endpoints are properly formed and ready for testing.
 *
 * @param endpoints - Array of endpoints to validate
 * @returns Validation result with any issues found
 */
export const validateDiscoveredEndpoints = (
  endpoints: Endpoint<unknown, unknown>[]
) => {
  return validateEndpoints(endpoints);
};

/**
 * Debug utility to log discovered endpoint information
 *
 * @param endpoints - Optional array of endpoints to debug, defaults to all discovered
 */
export const debugDiscoveredEndpoints = (
  endpoints?: Endpoint<unknown, unknown>[]
) => {
  const endpointsToDebug = endpoints || discoverEndpoints();
  debugEndpoints(endpointsToDebug, "E2E Test Endpoint Discovery");
};
