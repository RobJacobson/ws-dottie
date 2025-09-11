/**
 * Endpoint management utilities
 */

import type { EndpointDefinition } from "@/shared/endpoints";
import { CLI_CONSTANTS } from "./types";

// Import all endpoints to get the type information
import * as allEndpoints from "../../clients";

/**
 * Get all endpoint definitions from the clients module
 */
export const getAllEndpoints = (): Record<
  string,
  EndpointDefinition<unknown, unknown>
> =>
  Object.entries(allEndpoints)
    .filter(([key]) => key.endsWith(CLI_CONSTANTS.ENDPOINT_SUFFIX))
    .filter(
      ([, value]) =>
        typeof value === "object" &&
        value !== null &&
        "meta" in value &&
        "handleFetch" in value
    )
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

/**
 * Find endpoint by function name
 */
export const findEndpoint = (
  functionName: string
): EndpointDefinition<unknown, unknown> | null => {
  const endpoints = getAllEndpoints();
  return endpoints[`${functionName}${CLI_CONSTANTS.ENDPOINT_SUFFIX}`] || null;
};

/**
 * Get available function names
 */
export const getAvailableFunctions = (): string[] =>
  Object.keys(getAllEndpoints()).map((key) =>
    key.replace(CLI_CONSTANTS.ENDPOINT_SUFFIX, "")
  );

/**
 * Parse JSON parameters with date coercion
 */
export const parseParams = (paramsString: string): Record<string, unknown> => {
  try {
    return JSON.parse(paramsString, (_, value) => {
      if (
        typeof value === "string" &&
        CLI_CONSTANTS.ISO_DATE_REGEX.test(value)
      ) {
        return new Date(value);
      }
      return value;
    });
  } catch (error) {
    throw new Error(`Invalid JSON parameters: ${error}`);
  }
};

/**
 * Apply default parameters
 */
export const applyDefaults = (
  endpointDef: EndpointDefinition<unknown, unknown>,
  userParams: Record<string, unknown>
): Record<string, unknown> => ({
  ...(endpointDef.meta.sampleParams || {}),
  ...userParams,
});

/**
 * Validate parameters against schema
 */
export const validateParams = (
  params: Record<string, unknown>,
  endpointDef: EndpointDefinition<unknown, unknown>
): Record<string, unknown> => {
  if (!endpointDef.meta.inputSchema) {
    throw new Error("No parameter schema defined for this function");
  }

  try {
    return endpointDef.meta.inputSchema.parse(params) as Record<
      string,
      unknown
    >;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Parameter validation failed: ${message}\n` +
        `Expected parameters for ${endpointDef.meta.functionName}:\n` +
        `  ${JSON.stringify(params, null, 2)}`
    );
  }
};
