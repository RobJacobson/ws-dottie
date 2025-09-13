/**
 * Endpoint management utilities
 */

import {
  CLI_CONSTANTS,
  type EndpointsMap,
  type FunctionName,
  type AnyEndpointDefinition,
  type CliParams,
} from "./types";

// Import all endpoints to get the type information
import * as allEndpoints from "../../clients";

/**
 * Get all endpoint definitions from the clients module
 */
export const getAllEndpoints = (): EndpointsMap =>
  Object.entries(allEndpoints)
    .filter(([key]) => key.endsWith("Meta"))
    .reduce((acc, [, value]) => {
      const endpointDef = value as AnyEndpointDefinition;
      return { ...acc, [endpointDef.meta.function]: endpointDef };
    }, {} as EndpointsMap);

/**
 * Find endpoint by function name
 */
export const findEndpoint = (
  functionName: string
): AnyEndpointDefinition | null => {
  const endpoints = getAllEndpoints();
  return endpoints[functionName] || null;
};

/**
 * Get available function names
 */
export const getAvailableFunctions = (): FunctionName[] =>
  Object.keys(getAllEndpoints()) as FunctionName[];

/**
 * Parse JSON parameters with date coercion
 */
export const parseParams = (paramsString: string): CliParams => {
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
 * Only use defaults if no parameters are supplied at all.
 * If any parameters are provided, do not use any defaults.
 */
export const applyDefaults = (
  endpointDef: AnyEndpointDefinition,
  userParams: CliParams
): CliParams => {
  const sampleParams = endpointDef.meta.sampleParams || {};

  // If user provided any parameters, don't use defaults
  if (Object.keys(userParams).length > 0) {
    return userParams;
  }

  // If no parameters provided, use sample params as defaults
  return {
    ...sampleParams,
    ...userParams,
  };
};

/**
 * Validate parameters against schema
 */
export const validateParams = (
  params: CliParams,
  endpointDef: AnyEndpointDefinition
): CliParams => {
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
        `Expected parameters for ${endpointDef.meta.function}:\n` +
        `  ${JSON.stringify(params, null, 2)}`
    );
  }
};
