/**
 * @fileoverview Fetch Function Factory
 *
 * Creates strongly-typed fetch functions from metadata objects.
 * This is a pure factory with no React Query dependencies.
 */

import type {
  ApiDefinition,
  EndpointGroupMeta,
  EndpointMeta,
} from "@/apis/types";
import { fetchDottie } from "@/shared/fetching";
import { buildDescriptor } from "./buildDescriptor";
import type { FetchFunctionParams } from "./types";

/**
 * Creates a strongly-typed fetch function from three metadata objects.
 */
export function createFetchFunction<I, O>(
  apiDefinition: ApiDefinition,
  group: EndpointGroupMeta,
  endpoint: EndpointMeta<I, O>
): (params?: FetchFunctionParams<I>) => Promise<O> {
  const descriptor = buildDescriptor(apiDefinition, group, endpoint);

  return (params?: FetchFunctionParams<I>): Promise<O> => {
    return fetchDottie<I, O>({
      endpoint: descriptor,
      ...params,
    });
  };
}
