/**
 * @fileoverview Endpoint Discovery Engine
 *
 * This module provides functionality to automatically discover all Endpoint objects
 * from the clients directory at test runtime. It leverages the existing endpoint
 * registry to find all defined endpoints without requiring manual configuration.
 */

import type { Endpoint } from "@/shared/endpoints";
// Import all 16 API client modules
import * as borderCrossings from "@/clients/wsdot-border-crossings";
import * as bridgeClearances from "@/clients/wsdot-bridge-clearances";
import * as commercialVehicleRestrictions from "@/clients/wsdot-commercial-vehicle-restrictions";
import * as highwayAlerts from "@/clients/wsdot-highway-alerts";
import * as highwayCameras from "@/clients/wsdot-highway-cameras";
import * as mountainPassConditions from "@/clients/wsdot-mountain-pass-conditions";
import * as tollRates from "@/clients/wsdot-toll-rates";
import * as trafficFlow from "@/clients/wsdot-traffic-flow";
import * as travelTimes from "@/clients/wsdot-travel-times";
import * as weatherInformation from "@/clients/wsdot-weather-information";
import * as weatherInformationExtended from "@/clients/wsdot-weather-information-extended";
import * as weatherStations from "@/clients/wsdot-weather-stations";
import * as fares from "@/clients/wsf-fares";
import * as schedule from "@/clients/wsf-schedule";
import * as terminals from "@/clients/wsf-terminals";
import * as vessels from "@/clients/wsf-vessels";
import {
  discoverEndpointsFromModules,
  validateDiscoveredEndpoints as validateEndpoints,
  filterEndpointsByApi,
  getUniqueApiNames,
  sortEndpoints,
  debugDiscoveredEndpoints as debugEndpoints,
} from "@/shared/endpoints/endpointDiscovery";
import {
  getDiscoveryConfig,
  filterDiscoveredEndpoints,
} from "../config/discoveryConfig";

/**
 * Discovers all Endpoint objects from the clients directory
 *
 * This function dynamically imports all client modules and extracts Endpoint
 * objects that have been created using defineEndpoint. It provides a runtime
 * discovery mechanism that automatically adapts to changes in the endpoint
 * definitions without requiring manual test configuration updates.
 *
 * The function respects the discovery configuration to filter endpoints
 * based on API inclusion/exclusion rules.
 *
 * @returns Array of discovered Endpoint objects (filtered by configuration)
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
    // Import all 16 API client modules
    const allModules = [
      borderCrossings,
      bridgeClearances,
      commercialVehicleRestrictions,
      highwayAlerts,
      highwayCameras,
      mountainPassConditions,
      tollRates,
      trafficFlow,
      travelTimes,
      weatherInformation,
      weatherInformationExtended,
      weatherStations,
      fares,
      schedule,
      terminals,
      vessels,
    ];

    // Use shared discovery utility
    const allEndpoints = discoverEndpointsFromModules(allModules);

    // Get discovery configuration and apply filtering
    const config = getDiscoveryConfig();
    const filteredEndpoints = filterDiscoveredEndpoints(allEndpoints, config);

    // Sort endpoints by API and function name for consistent ordering
    return sortEndpoints(filteredEndpoints);
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
