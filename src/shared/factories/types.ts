/**
 * @fileoverview Type Helpers for Factory Functions
 *
 * This module provides type helpers that map EndpointGroup definitions to
 * properly typed fetch function and hook function signatures.
 */

import type { UseQueryResult } from "@tanstack/react-query";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import type { QueryHookOptions } from "./createEndpointGroupHooks";
import type { FetchFunctionParams } from "./fetchFunctionFactory";

/**
 * Converts "getXyz" to "fetchXyz" or keeps name as-is
 */
type GetToFetchName<T extends string> = T extends `get${infer Rest}`
  ? `fetch${Rest}`
  : T;

/**
 * Converts "fetchXyz" to "useXyz" or adds "use" prefix
 */
type FetchToHookName<T extends string> = T extends `fetch${infer Rest}`
  ? `use${Rest}`
  : `use${Capitalize<T>}`;

/**
 * Extracts input/output types from an EndpointDefinition
 */
type ExtractEndpointTypes<T> = T extends EndpointDefinition<infer I, infer O>
  ? { input: I; output: O }
  : never;

/**
 * Creates a type mapping endpoint function names to fetch function signatures
 *
 * Example: For vesselStatsResource, this creates:
 * {
 *   fetchVesselStats: (params?: FetchFunctionParams<VesselStatsInput>) => Promise<VesselStat[]>,
 *   fetchVesselStatsByVesselId: (params?: FetchFunctionParams<VesselStatsByIdInput>) => Promise<VesselStat>
 * }
 */
export type FetchFunctionsMap<T extends EndpointGroup> = {
  [K in keyof T["endpoints"] as GetToFetchName<
    K & string
  >]: ExtractEndpointTypes<T["endpoints"][K]> extends {
    input: infer I;
    output: infer O;
  }
    ? (params?: FetchFunctionParams<I>) => Promise<O>
    : never;
};

/**
 * Creates a type mapping endpoint function names to hook function signatures
 *
 * Example: For vesselStatsResource, this creates:
 * {
 *   useVesselStats: (params?: VesselStatsInput, options?: QueryHookOptions<VesselStat[]>) => UseQueryResult<VesselStat[], Error>,
 *   useVesselStatsByVesselId: (params?: VesselStatsByIdInput, options?: QueryHookOptions<VesselStat>) => UseQueryResult<VesselStat, Error>
 * }
 */
export type HooksMap<T extends EndpointGroup> = {
  [K in keyof T["endpoints"] as FetchToHookName<
    GetToFetchName<K & string>
  >]: ExtractEndpointTypes<T["endpoints"][K]> extends {
    input: infer I;
    output: infer O;
  }
    ? (params?: I, options?: QueryHookOptions<O>) => UseQueryResult<O, Error>
    : never;
};
