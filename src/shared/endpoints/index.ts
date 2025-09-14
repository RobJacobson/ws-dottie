/**
 * @fileoverview Endpoint Collection and Registry
 *
 * This module provides a singleton registry for all endpoint definitions,
 * automatically detecting and organizing endpoints from the clients module.
 * It uses the module pattern to ensure endpoint detection only runs once
 * at load time for optimal performance.
 */

import type { CacheStrategy, Endpoint, EndpointMeta } from "./endpoint";
import { defineEndpoint } from "./endpoint";
import { discoverEndpointsFromModules } from "./endpointDiscovery";

/**
 * Type for a collection of endpoints organized by function name
 */
export type EndpointRegistry = Record<string, Endpoint<unknown, unknown>>;

/**
 * Type for endpoint function names
 */
export type EndpointFunctionName = string;

/**
 * Singleton endpoint registry that automatically detects and organizes all endpoints
 *
 * This registry scans the clients module at load time to find all endpoint definitions
 * and organizes them by function name for easy lookup. It uses the module pattern to
 * ensure the detection logic only runs once, providing optimal performance.
 */
class EndpointRegistryClass {
  private _endpoints: EndpointRegistry | null = null;

  /**
   * Gets all available endpoints organized by function name
   *
   * @returns Object mapping function names to endpoint definitions
   */
  get all(): EndpointRegistry {
    if (!this._endpoints) {
      this._endpoints = this.detectEndpoints();
    }
    return this._endpoints;
  }

  /**
   * Gets a list of all available function names
   *
   * @returns Array of function names for all available endpoints
   */
  get functionNames(): EndpointFunctionName[] {
    return Object.keys(this.all);
  }

  /**
   * Finds an endpoint by function name
   *
   * @param functionName - The function name to search for
   * @returns The endpoint definition if found, null otherwise
   */
  findByFunctionName(functionName: string): Endpoint<unknown, unknown> | null {
    return this.all[functionName] || null;
  }

  /**
   * Detects and organizes endpoints from the clients module
   *
   * This method scans all exports from the clients module to find objects
   * that match the Endpoint interface structure. It organizes them by
   * function name for efficient lookup.
   *
   * @returns Object mapping function names to endpoint definitions
   * @private
   */
  private detectEndpoints(): EndpointRegistry {
    // Import all endpoints from the clients module
    // This is done dynamically to avoid circular dependencies
    const allClients = require("@/clients");

    // Use shared discovery utility to find all endpoints
    const endpoints = discoverEndpointsFromModules([allClients]);

    // Organize by function name for CLI lookup
    return endpoints.reduce((acc, endpoint) => {
      const functionName = endpoint.functionName || "unknown";
      return { ...acc, [functionName]: endpoint };
    }, {} as EndpointRegistry);
  }
}

/**
 * Singleton instance of the endpoint registry
 *
 * This provides a single point of access to all endpoint definitions
 * throughout the application. The registry is automatically populated
 * at module load time for optimal performance.
 */
export const endpointRegistry = new EndpointRegistryClass();

/**
 * Convenience function to get all endpoints
 *
 * @returns Object mapping function names to endpoint definitions
 */
export const getAllEndpoints = (): EndpointRegistry => endpointRegistry.all;

/**
 * Convenience function to get all function names
 *
 * @returns Array of function names for all available endpoints
 */
export const getAvailableFunctionNames = (): EndpointFunctionName[] =>
  endpointRegistry.functionNames;

/**
 * Convenience function to find an endpoint by function name
 *
 * @param functionName - The function name to search for
 * @returns The endpoint definition if found, null otherwise
 */
export const findEndpointByFunctionName = (
  functionName: string
): Endpoint<unknown, unknown> | null =>
  endpointRegistry.findByFunctionName(functionName);

// Re-export the defineEndpoint factory and types for client modules
export { defineEndpoint };
export type { Endpoint, EndpointMeta, CacheStrategy };
