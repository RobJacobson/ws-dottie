/**
 * @fileoverview Endpoint Group Builder Factory
 *
 * This module provides a factory function to define endpoint groups with shared
 * metadata and collect endpoints for documentation generation.
 */

import type {
  ApiDefinition,
  EndpointDefinition,
  EndpointGroup,
} from "@/apis/types";
import type { CacheStrategy, Endpoint } from "@/shared/types";
import { createEndpoint } from "./createEndpoint";

/**
 * Configuration for defining an endpoint group
 */
type EndpointGroupConfig = {
  /** The API definition this group belongs to */
  api: ApiDefinition;
  /** The name of endpoint group */
  name: string;
  /** Cache strategy for all endpoints in this group */
  cacheStrategy: CacheStrategy;
  /** Documentation for endpoint group */
  documentation: {
    /** Description of resource being returned */
    resourceDescription: string;
    /** Business context for using this resource */
    businessContext: string;
  };
};

/**
 * Result of defining an endpoint group
 */
type EndpointGroupResult = {
  /** The API definition this group belongs to */
  api: ApiDefinition;
  /** The group descriptor with metadata */
  descriptor: EndpointGroup;
  /** Collects an endpoint into group registry */
  collect: <I, O>(
    def: EndpointDefinition<I, O>,
    fn: string
  ) => { endpoint: Endpoint<I, O> };
  /** Returns all collected endpoints for documentation */
  registry: () => Endpoint<unknown, unknown>[];
};

/**
 * Defines an endpoint group with shared metadata and endpoint collection
 *
 * This factory function creates a descriptor for an endpoint group with shared
 * metadata like cache strategy and documentation. It provides methods to collect
 * endpoints and retrieve them for documentation generation.
 *
 * @param config - Configuration for endpoint group
 * @returns An object with descriptor, collect method, and registry
 *
 * @example
 * ```typescript
 * const group = defineEndpointGroup({
 *   api: wsfVesselsApi,
 *   name: "vessel-locations",
 *   cacheStrategy: "REALTIME",
 *   documentation: {
 *     resourceDescription: "Real-time vessel tracking data",
 *     businessContext: "Use to track vessel positions",
 *   },
 * });
 * ```
 */
export function defineEndpointGroup(
  config: EndpointGroupConfig
): EndpointGroupResult {
  const descriptor: EndpointGroup = {
    name: config.name,
    cacheStrategy: config.cacheStrategy,
    documentation: config.documentation,
    endpoints: {} as Record<string, EndpointDefinition<unknown, unknown>>,
  };

  const endpoints: Endpoint<unknown, unknown>[] = [];

  return {
    api: config.api,
    descriptor,
    collect: <I, O>(def: EndpointDefinition<I, O>, fn: string) => {
      const endpoint = createEndpoint(config.api, descriptor, def, fn);
      endpoints.push(endpoint);
      return { endpoint };
    },
    registry: () => endpoints,
  };
}
