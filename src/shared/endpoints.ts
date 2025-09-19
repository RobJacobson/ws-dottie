/**
 * @fileoverview Simple Endpoint System
 *
 * A simple, unified endpoint system that eliminates complexity and duplication.
 * KISS principle: Keep it simple, stupid.
 */

import type { z } from "zod";

import type { CacheStrategy } from "./types";
import { configManager } from "./utils/configManager";

/**
 * Simple endpoint definition (for client files)
 */
export interface EndpointDefinition<I, O> {
  /** Unique identifier in format "api/function" */
  id: string;
  /** HTTP endpoint URL template */
  endpoint: string;
  /** Zod schema for input validation */
  inputSchema: z.ZodSchema<I>;
  /** Zod schema for output validation */
  outputSchema: z.ZodSchema<O>;
  /** Optional sample parameters for testing */
  sampleParams?: Partial<I> | (() => Promise<Partial<I>>);
  /** Cache strategy */
  cacheStrategy: CacheStrategy;
}

/**
 * Runtime endpoint (with computed properties)
 */
export interface Endpoint<I, O> extends EndpointDefinition<I, O> {
  /** API group name (computed from id) */
  api: string;
  /** Function name (computed from id) */
  functionName: string;
  /** Complete URL template with domain */
  urlTemplate: string;
}

/**
 * Creates a complete endpoint configuration object with computed properties
 *
 * This factory function takes a basic endpoint configuration and enriches it
 * with computed properties like API group name, function name, and complete
 * URL template. It automatically extracts the API and function names from
 * the endpoint ID and combines the domain with the endpoint path.
 *
 * @template I - The input parameters type for the endpoint
 * @template O - The output response type for the endpoint
 * @param config - Basic endpoint configuration object
 * @param config.id - Unique identifier in format "api/function"
 * @param config.endpoint - HTTP endpoint URL template relative to base domain
 * @param config.inputSchema - Zod schema for input parameter validation
 * @param config.outputSchema - Zod schema for output response validation
 * @param config.sampleParams - Optional sample parameters for testing
 * @param config.cacheStrategy - Cache strategy for TanStack Query integration
 * @returns Complete endpoint object with all computed properties
 */
export function defineEndpoint<I, O>(config: {
  id: string;
  endpoint: string;
  inputSchema: z.ZodSchema<I>;
  outputSchema: z.ZodSchema<O>;
  sampleParams?: Partial<I> | (() => Promise<Partial<I>>);
  cacheStrategy: CacheStrategy;
}): Endpoint<I, O> {
  const [api, functionName] = config.id.split("/");
  const urlTemplate = `${configManager.getDomain()}${config.endpoint}`;

  return {
    ...config,
    api,
    functionName,
    urlTemplate,
  };
}

/**
 * Discovers all endpoints from client modules
 *
 * This function uses static imports to access all client modules and extracts endpoint
 * objects from them. All client modules export enriched endpoint objects.
 *
 * @returns Array of all discovered endpoints, sorted alphabetically
 */
// Import all client modules statically
import * as wsdotBorderCrossings from "@/clients/wsdot-border-crossings";
import * as wsdotBridgeClearances from "@/clients/wsdot-bridge-clearances";
import * as wsdotCommercialVehicleRestrictions from "@/clients/wsdot-commercial-vehicle-restrictions";
import * as wsdotHighwayAlerts from "@/clients/wsdot-highway-alerts";
import * as wsdotHighwayCameras from "@/clients/wsdot-highway-cameras";
import * as wsdotMountainPassConditions from "@/clients/wsdot-mountain-pass-conditions";
import * as wsdotTollRates from "@/clients/wsdot-toll-rates";
import * as wsdotTrafficFlow from "@/clients/wsdot-traffic-flow";
import * as wsdotTravelTimes from "@/clients/wsdot-travel-times";
import * as wsdotWeatherInformation from "@/clients/wsdot-weather-information";
import * as wsdotWeatherInformationExtended from "@/clients/wsdot-weather-information-extended";
import * as wsdotWeatherStations from "@/clients/wsdot-weather-stations";
import * as wsfFares from "@/clients/wsf-fares";
import * as wsfSchedule from "@/clients/wsf-schedule";
import * as wsfTerminals from "@/clients/wsf-terminals";
import * as wsfVessels from "@/clients/wsf-vessels";

export const discoverEndpoints = (): Endpoint<unknown, unknown>[] => {
  // Use static imports to avoid async complexity
  // Modules are ordered alphabetically by API name
  const modules = [
    wsdotBorderCrossings,
    wsdotBridgeClearances,
    wsdotCommercialVehicleRestrictions,
    wsdotHighwayAlerts,
    wsdotHighwayCameras,
    wsdotMountainPassConditions,
    wsdotTollRates,
    wsdotTrafficFlow,
    wsdotTravelTimes,
    wsdotWeatherInformation,
    wsdotWeatherInformationExtended,
    wsdotWeatherStations,
    wsfFares,
    wsfSchedule,
    wsfTerminals,
    wsfVessels,
  ];

  return modules
    .flatMap((module) => Object.values(module))
    .filter(isEndpoint)
    .sort(sortByApiAndFunction);
};

/**
 * Discovers all API names from discovered endpoints
 *
 * @returns Array of unique API names, sorted alphabetically
 */
export const discoverApiNames = (): string[] => {
  const endpoints = discoverEndpoints();
  const apiNames = [...new Set(endpoints.map((ep) => ep.api))];
  return apiNames.sort();
};

/**
 * Alias for discoverApiNames for backward compatibility
 */
export const getApiNames = discoverApiNames;

/**
 * Validates discovered endpoints
 *
 * @param endpoints - Array of endpoints to validate
 * @returns Validation result with issues if any
 */
export const validateDiscoveredEndpoints = (
  endpoints: Endpoint<unknown, unknown>[]
): { isValid: boolean; issues: string[] } => {
  const issues: string[] = [];

  endpoints.forEach((endpoint, index) => {
    if (!endpoint.id || !endpoint.api || !endpoint.functionName) {
      issues.push(`Endpoint ${index}: missing required fields`);
    }

    if (!endpoint.inputSchema || !endpoint.outputSchema) {
      issues.push(`Endpoint ${index}: missing schemas`);
    }

    if (!endpoint.urlTemplate || !endpoint.urlTemplate.startsWith("http")) {
      issues.push(`Endpoint ${index}: invalid URL template`);
    }

    if (!endpoint.cacheStrategy) {
      issues.push(`Endpoint ${index}: missing cache strategy`);
    }
  });

  return {
    isValid: issues.length === 0,
    issues,
  };
};

/**
 * Alias for validateDiscoveredEndpoints for backward compatibility
 */
export const validateEndpoints = validateDiscoveredEndpoints;

// Helper function for sorting
const sortByApiAndFunction = (
  a: Endpoint<unknown, unknown>,
  b: Endpoint<unknown, unknown>
) =>
  a.api !== b.api
    ? a.api.localeCompare(b.api)
    : a.functionName.localeCompare(b.functionName);

/**
 * Type guard to check if an object is an endpoint
 *
 * This function performs runtime type checking to determine if an object
 * matches the complete Endpoint interface. It checks for the presence
 * and correct types of all required properties including computed ones.
 *
 * @param obj - The object to check
 * @returns True if the object is an Endpoint, false otherwise
 */
const isEndpoint = (obj: unknown): obj is Endpoint<unknown, unknown> => {
  if (!obj || typeof obj !== "object") return false;

  const candidate = obj as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.api === "string" &&
    typeof candidate.functionName === "string" &&
    typeof candidate.urlTemplate === "string" &&
    typeof candidate.endpoint === "string" &&
    !!candidate.inputSchema &&
    !!candidate.outputSchema &&
    typeof candidate.cacheStrategy === "string"
  );
};
