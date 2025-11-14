/**
 * @fileoverview Endpoint Group Builder Factory
 *
 * This module provides a factory function to define endpoint groups with shared
 * metadata for documentation generation.
 */

import type { EndpointGroup, ResourceDocumentation } from "@/apis/types";
import type { CacheStrategy } from "@/shared/types";

/**
 * Configuration for defining an endpoint group
 */
export type DefineEndpointGroupConfig = {
  /** The name of endpoint group */
  name: string;
  /** Cache strategy for all endpoints in this group */
  cacheStrategy: CacheStrategy;
  /** Documentation for endpoint group */
  documentation: ResourceDocumentation;
};

/**
 * Defines an endpoint group with shared metadata
 *
 * This factory function creates a descriptor for an endpoint group with shared
 * metadata like cache strategy and documentation.
 *
 * @param config - Configuration for endpoint group
 * @returns An EndpointGroup descriptor
 *
 * @example
 * ```typescript
 * const group = defineEndpointGroup({
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
  config: DefineEndpointGroupConfig
): EndpointGroup {
  return {
    name: config.name,
    cacheStrategy: config.cacheStrategy,
    documentation: config.documentation,
  };
}
