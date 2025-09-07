/**
 * Function registry exports
 */

import { wsdotRegistry } from "./wsdot";
import { wsfRegistry } from "./wsf";
import type { FunctionRegistry } from "../types";

/**
 * Complete function registry combining WSDOT and WSF APIs
 */
export const FUNCTION_REGISTRY: FunctionRegistry = {
  ...wsdotRegistry,
  ...wsfRegistry,
} as const;

// Export individual registries for potential future use
export { wsdotRegistry, wsfRegistry };
