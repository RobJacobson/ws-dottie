/**
 * @fileoverview Shared Endpoint Discovery Utilities
 *
 * This module provides core utilities for discovering and validating Endpoint objects
 * from client modules. It's used by both the CLI endpoint registry and the e2e test
 * discovery system to avoid code duplication while serving different purposes.
 */

import type { Endpoint } from "./endpoint";

/**
 * Type guard to check if an object is a valid Endpoint
 */
export const isEndpoint = (obj: unknown): obj is Endpoint<unknown, unknown> => {
  if (!obj || typeof obj !== "object") {
    return false;
  }

  const candidate = obj as Record<string, unknown>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.api === "string" &&
    typeof candidate.functionName === "string" &&
    typeof candidate.urlTemplate === "string" &&
    typeof candidate.endpoint === "string" &&
    candidate.inputSchema &&
    candidate.outputSchema &&
    typeof candidate.cacheStrategy === "string"
  );
};

/**
 * Discovers all Endpoint objects from a given module or modules
 *
 * @param modules - Array of modules to scan for endpoints
 * @returns Array of discovered Endpoint objects
 */
export const discoverEndpointsFromModules = (
  modules: Record<string, unknown>[]
): Endpoint<unknown, unknown>[] => {
  const endpoints: Endpoint<unknown, unknown>[] = [];

  modules.forEach((module) => {
    if (module && typeof module === "object") {
      Object.values(module).forEach((value) => {
        if (isEndpoint(value)) {
          endpoints.push(value);
        }
      });
    }
  });

  return endpoints;
};

/**
 * Validates discovered endpoints for common issues
 *
 * @param endpoints - Array of endpoints to validate
 * @returns Validation result with any issues found
 */
export const validateDiscoveredEndpoints = (
  endpoints: Endpoint<unknown, unknown>[]
) => {
  const issues: string[] = [];

  endpoints.forEach((endpoint, index) => {
    // Check for duplicate IDs
    const duplicates = endpoints.filter(
      (ep, idx) => ep.id === endpoint.id && idx !== index
    );
    if (duplicates.length > 0) {
      issues.push(`Duplicate endpoint ID found: ${endpoint.id}`);
    }

    // Check for valid URL template
    if (!endpoint.urlTemplate.startsWith("http")) {
      issues.push(
        `Invalid URL template for ${endpoint.id}: ${endpoint.urlTemplate}`
      );
    }

    // Check for sample parameters if they exist
    if (endpoint.sampleParams && typeof endpoint.sampleParams === "function") {
      // Async sample params are valid, but we should note them for testing
    }
  });

  return {
    isValid: issues.length === 0,
    issues,
    endpointCount: endpoints.length,
    apiCount: new Set(endpoints.map((ep) => ep.api)).size,
  };
};

/**
 * Filters endpoints by API name
 *
 * @param endpoints - Array of endpoints to filter
 * @param apiName - API name to filter by
 * @returns Filtered array of endpoints
 */
export const filterEndpointsByApi = (
  endpoints: Endpoint<unknown, unknown>[],
  apiName: string
): Endpoint<unknown, unknown>[] => {
  return endpoints.filter((endpoint) => endpoint.api === apiName);
};

/**
 * Gets unique API names from a list of endpoints
 *
 * @param endpoints - Array of endpoints
 * @returns Array of unique API names, sorted alphabetically
 */
export const getUniqueApiNames = (
  endpoints: Endpoint<unknown, unknown>[]
): string[] => {
  const apiNames = [...new Set(endpoints.map((endpoint) => endpoint.api))];
  return apiNames.sort();
};

/**
 * Sorts endpoints by API and function name for consistent ordering
 *
 * @param endpoints - Array of endpoints to sort
 * @returns Sorted array of endpoints
 */
export const sortEndpoints = (
  endpoints: Endpoint<unknown, unknown>[]
): Endpoint<unknown, unknown>[] => {
  return [...endpoints].sort((a, b) => {
    if (a.api !== b.api) {
      return a.api.localeCompare(b.api);
    }
    return a.functionName.localeCompare(b.functionName);
  });
};

/**
 * Groups endpoints by API name
 *
 * @param endpoints - Array of endpoints to group
 * @returns Object mapping API names to arrays of endpoints
 */
export const groupEndpointsByApi = (
  endpoints: Endpoint<unknown, unknown>[]
): Record<string, Endpoint<unknown, unknown>[]> => {
  return endpoints.reduce(
    (groups, endpoint) => {
      if (!groups[endpoint.api]) {
        groups[endpoint.api] = [];
      }
      groups[endpoint.api].push(endpoint);
      return groups;
    },
    {} as Record<string, Endpoint<unknown, unknown>[]>
  );
};

/**
 * Debug utility to log discovered endpoint information
 *
 * @param endpoints - Array of endpoints to debug
 * @param label - Optional label for the debug output
 */
export const debugDiscoveredEndpoints = (
  endpoints: Endpoint<unknown, unknown>[],
  label = "Endpoint Discovery"
) => {
  console.log(`\n=== ${label} Debug ===`);
  console.log(`Total endpoints discovered: ${endpoints.length}`);

  const apiNames = getUniqueApiNames(endpoints);
  console.log(`APIs discovered: ${apiNames.length}`);
  apiNames.forEach((apiName) => {
    const apiEndpoints = filterEndpointsByApi(endpoints, apiName);
    console.log(`  - ${apiName}: ${apiEndpoints.length} endpoints`);
    apiEndpoints.forEach((ep) => {
      console.log(`    * ${ep.functionName} (${ep.cacheStrategy})`);
    });
  });

  const validation = validateDiscoveredEndpoints(endpoints);
  if (!validation.isValid) {
    console.log(`\nValidation issues found:`);
    validation.issues.forEach((issue) => {
      console.log(`  - ${issue}`);
    });
  } else {
    console.log(`\nAll endpoints passed validation ✓`);
  }

  console.log(`=== End Debug ===\n`);
};
