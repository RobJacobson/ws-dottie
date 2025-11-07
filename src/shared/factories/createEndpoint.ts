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
 * Creates a typed endpoint for a specific endpoint definition
 *
 * This function creates a single typed Endpoint object from an endpoint definition.
 * It preserves input and output types from endpoint definition.
 *
 * @template TInput - The input parameters type
 * @template TOutput - The output response type
 * @param apiDefinition - The API definition (to get name and baseUrl)
 * @param endpointGroup - The endpoint group (to get cacheStrategy)
 * @param endpointDef - The endpoint definition
 * @returns A typed Endpoint object
 *
 * @example
 * ```typescript
 * import { vesselStatsResource } from "./vesselStats/vesselStats.endpoints";
 * import { wsfVesselsApi } from "./apiDefinition";
 *
 * const endpoint = createEndpoint(
 *   wsfVesselsApi,
 *   vesselStatsResource,
 *   vesselStatsResource.endpoints.getVesselStats
 * );
 * ```
 */
export const createEndpoint = <TInput, TOutput>(
  apiDefinition: ApiDefinition,
  endpointGroup: EndpointGroup,
  endpointDef: EndpointDefinition<TInput, TOutput>,
  includeSchemas: boolean = true
): Endpoint<TInput, TOutput> => ({
  api: apiDefinition.name,
  function: endpointDef.function,
  endpoint: endpointDef.endpoint,
  ...(includeSchemas && {
    inputSchema: endpointDef.inputSchema,
    outputSchema: endpointDef.outputSchema,
  }),
  sampleParams: endpointDef.sampleParams,
  cacheStrategy: endpointGroup.cacheStrategy,
  functionName: endpointDef.function,
  urlTemplate: `${apiDefinition.baseUrl}${endpointDef.endpoint}`,
  id: `${apiDefinition.name}:${endpointDef.function}`,
});
