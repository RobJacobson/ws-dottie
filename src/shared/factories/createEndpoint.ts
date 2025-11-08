/**
 * @fileoverview Endpoint Generator Factory
 *
 * This module provides a factory function to create a typed Endpoint object
 * from an endpoint definition with all properties needed by fetchDottie.
 */

import type {
  ApiDefinition,
  EndpointDefinition,
  EndpointGroup,
} from "@/apis/types";
import type { Endpoint } from "@/shared/types";

/**
 * Creates a typed endpoint for a specific endpoint definition.
 *
 * This is a pure function that transforms endpoint definitions into fully
 * configured Endpoint objects with computed properties like URL templates
 * and unique identifiers.
 *
 * @template TInput - The input parameters type for the endpoint
 * @template TOutput - The output response type for the endpoint
 * @param apiDefinition - The API definition containing name and baseUrl
 * @param endpointGroup - The endpoint group containing cacheStrategy
 * @param endpointDef - The endpoint definition with path and schemas
 * @param functionName - The canonical function name for this endpoint
 * @returns A fully configured Endpoint object with all computed properties
 *
 * @example
 * ```typescript
 * const endpoint = createEndpoint(
 *   wsfVesselsApi,
 *   vesselStatsResource,
 *   vesselStatsResource.endpoints.fetchVesselStats,
 *   "fetchVesselStats"
 * );
 * ```
 */
export const createEndpoint = <TInput, TOutput>(
  apiDefinition: ApiDefinition,
  endpointGroup: EndpointGroup,
  endpointDef: EndpointDefinition<TInput, TOutput>,
  functionName: string
): Endpoint<TInput, TOutput> => ({
  api: apiDefinition.name,
  function: functionName,
  endpoint: endpointDef.endpoint,
  inputSchema: endpointDef.inputSchema,
  outputSchema: endpointDef.outputSchema,
  sampleParams: endpointDef.sampleParams,
  cacheStrategy: endpointGroup.cacheStrategy,
  functionName,
  urlTemplate: `${apiDefinition.baseUrl}${endpointDef.endpoint}`,
  id: `${apiDefinition.name}:${functionName}`,
});
