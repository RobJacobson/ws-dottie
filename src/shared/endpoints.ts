/**
 * @fileoverview Simple Endpoint System
 *
 * A simple, unified endpoint system that eliminates complexity and duplication.
 * KISS principle: Keep it simple, stupid.
 */

import type { z } from "zod";
import { configManager } from "./utils/configManager";
import type { CacheStrategy } from "./types";

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
 * This function dynamically imports all client modules and extracts endpoint
 * objects from them. All client modules export enriched endpoint objects.
 *
 * @returns Array of all discovered endpoints, sorted alphabetically
 */

export const discoverEndpoints = (): Endpoint<unknown, unknown>[] => {
  // Import all client modules
  const modules = [
    require("@/clients/wsdot-border-crossings"),
    require("@/clients/wsdot-bridge-clearances"),
    require("@/clients/wsdot-commercial-vehicle-restrictions"),
    require("@/clients/wsdot-highway-alerts"),
    require("@/clients/wsdot-highway-cameras"),
    require("@/clients/wsdot-mountain-pass-conditions"),
    require("@/clients/wsdot-toll-rates"),
    require("@/clients/wsdot-traffic-flow"),
    require("@/clients/wsdot-travel-times"),
    require("@/clients/wsdot-weather-information"),
    require("@/clients/wsdot-weather-information-extended"),
    require("@/clients/wsdot-weather-stations"),
    require("@/clients/wsf-fares"),
    require("@/clients/wsf-schedule"),
    require("@/clients/wsf-terminals"),
    require("@/clients/wsf-vessels"),
  ];

  return modules
    .flatMap((module) => Object.values(module))
    .filter(isEndpoint)
    .sort(sortByApiAndFunction);
};

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
