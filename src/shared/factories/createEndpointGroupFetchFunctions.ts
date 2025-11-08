/**
 * @fileoverview Create Endpoint Group Fetch Functions Utility
 *
 * This module provides a utility function to create fetch functions for all
 * endpoints in an endpoint group. Endpoint keys are treated as the canonical
 * function names and are used directly when generating fetch functions.
 */

import type {
  ApiDefinition,
  EndpointDefinition,
  EndpointGroup,
} from "@/apis/types";
import { createEndpoint } from "./createEndpoint";
import { createFetchFunction } from "./fetchFunctionFactory";
import type { FetchFunctionsMap } from "./types";

/**
 * Creates fetch functions for all endpoints in an endpoint group
 *
 * This utility function iterates through all endpoints in an endpoint group,
 * creates typed Endpoint objects, and generates fetch functions using the factory.
 * Endpoint keys (e.g., \"fetchVesselStats\" or \"searchAlerts\") become the exported
 * fetch function names.
 *
 * @template TApi - The API definition type (inferred from parameter)
 * @template TGroup - The endpoint group type (inferred from parameter)
 * @param api - The API definition containing base URL and name
 * @param endpointGroup - The endpoint group containing endpoints
 * @returns An object containing fetch functions for all endpoints in the group
 *
 * @example
 * ```typescript
 * import { wsdotBridgeClearancesApi } from "../apiDefinition";
 * import { bridgeClearancesGroup } from "./bridgeClearances.endpoints";
 *
 * const fetchFunctions = createEndpointGroupFetchFunctions(
 *   wsdotBridgeClearancesApi,
 *   bridgeClearancesGroup
 * );
 * // fetchFunctions.fetchBridgeClearances is a typed fetch function
 * ```
 */
export function createEndpointGroupFetchFunctions<
  TApi extends ApiDefinition,
  TGroup extends EndpointGroup,
>(api: TApi, endpointGroup: TGroup): FetchFunctionsMap<TGroup> {
  const fetchFunctions = {} as FetchFunctionsMap<TGroup>;

  // Process each endpoint in the group
  for (const [functionName, endpointDef] of Object.entries(
    endpointGroup.endpoints
  )) {
    // Type assertion: endpointDef is EndpointDefinition<unknown, unknown>
    const typedEndpointDef = endpointDef as EndpointDefinition<
      unknown,
      unknown
    >;
    // Create a typed endpoint object
    const endpoint = createEndpoint(
      api,
      endpointGroup,
      typedEndpointDef,
      functionName
    );

    // Create a strongly-typed fetch function using the factory
    const fetchFunction = createFetchFunction(endpoint);

    // Store the fetch function using the canonical function name
    fetchFunctions[functionName as keyof FetchFunctionsMap<TGroup>] =
      fetchFunction as FetchFunctionsMap<TGroup>[keyof FetchFunctionsMap<TGroup>];
  }

  return fetchFunctions;
}
