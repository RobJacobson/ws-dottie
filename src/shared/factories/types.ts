/**
 * @fileoverview Type Helpers for Factory Functions
 *
 * This module provides type helpers that map EndpointGroup definitions to
 * properly typed fetch function and hook function signatures. These types
 * enable full type safety when creating factories for endpoint groups.
 */

import type { UseQueryResult } from "@tanstack/react-query";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import type { FetchFunctionParams } from "./createFetchFunctions";
import type { QueryHookOptions } from "./createHooks";

/**
 * Converts endpoint key to hook function name.
 *
 * This type-level transformation converts endpoint function names to their
 * corresponding React hook names:
 * - "fetchXyz" -> "useXyz"
 * - "xyz" -> "useXyz" (capitalized)
 *
 * @template T - The endpoint function name string type
 */
type EndpointKeyToHookName<T extends string> = T extends `fetch${infer Rest}`
  ? `use${Rest}`
  : `use${Capitalize<T>}`;

/**
 * Extracts input/output types from an EndpointDefinition.
 *
 * This utility type extracts the generic type parameters from an
 * EndpointDefinition and returns them in a structured format.
 *
 * @template T - The EndpointDefinition type to extract from
 */
type ExtractEndpointTypes<T> = T extends EndpointDefinition<infer I, infer O>
  ? { input: I; output: O }
  : never;

/**
 * Creates a type mapping endpoint function names to fetch function signatures.
 *
 * This mapped type transforms an EndpointGroup's endpoints object into a
 * corresponding object where each key maps to a strongly-typed fetch function.
 * The fetch functions accept optional FetchFunctionParams and return Promises
 * with the correct output type.
 *
 * @template T - The EndpointGroup type to create fetch functions for
 *
 * @example
 * ```typescript
 * // For an endpoint group with:
 * // { fetchVesselStats: EndpointDefinition<VesselStatsInput, VesselStat[]> }
 * // This creates:
 * // {
 * //   fetchVesselStats: (params?: FetchFunctionParams<VesselStatsInput>) => Promise<VesselStat[]>
 * // }
 * ```
 */
export type FetchFunctionsMap<T extends EndpointGroup> = {
  [K in keyof T["endpoints"]]: ExtractEndpointTypes<T["endpoints"][K]> extends {
    input: infer I;
    output: infer O;
  }
    ? (params?: FetchFunctionParams<I>) => Promise<O>
    : never;
};

/**
 * Creates a type mapping endpoint function names to hook function signatures.
 *
 * This mapped type transforms an EndpointGroup's endpoints object into a
 * corresponding object where each key is converted to a hook name and maps
 * to a strongly-typed React Query hook function. The hooks accept optional
 * FetchFunctionParams and QueryHookOptions, and return UseQueryResult.
 *
 * @template T - The EndpointGroup type to create hooks for
 *
 * @example
 * ```typescript
 * // For an endpoint group with:
 * // { fetchVesselStats: EndpointDefinition<VesselStatsInput, VesselStat[]> }
 * // This creates:
 * // {
 * //   useVesselStats: (
 * //     params?: FetchFunctionParams<VesselStatsInput>,
 * //     options?: QueryHookOptions<VesselStat[]>
 * //   ) => UseQueryResult<VesselStat[], Error>
 * // }
 * ```
 */
export type HooksMap<T extends EndpointGroup> = {
  [K in keyof T["endpoints"] as EndpointKeyToHookName<
    K & string
  >]: ExtractEndpointTypes<T["endpoints"][K]> extends {
    input: infer I;
    output: infer O;
  }
    ? (
        params?: FetchFunctionParams<I>,
        options?: QueryHookOptions<O>
      ) => UseQueryResult<O, Error>
    : never;
};
