import type { z } from "zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/**
 * API object structure containing API metadata and endpoint definitions
 */
export interface ApiDefinition {
  /** The name of the API as a string */
  name: string;
  /** Array of EndpointDefinition objects for that API */
  endpointDefinitions: EndpointDefinition<unknown, unknown>[];
}

/**
 * Simplified endpoint definition for POJO approach
 *
 * This interface defines the structure for endpoint definitions without requiring
 * the api field, which is automatically added by createApiDefinition.
 */
export interface SimpleEndpointDefinition<I, O> {
  /** Function name (e.g., "getTravelTime") */
  function: string;
  /** HTTP endpoint URL template */
  endpoint: string;
  /** Zod schema for input validation */
  inputSchema: z.ZodSchema<I>;
  /** Zod schema for output validation */
  outputSchema: z.ZodSchema<O>;
  /** Optional sample parameters for testing */
  sampleParams?: Partial<I> | (() => Promise<Partial<I>>);
  /** Cache strategy */
  cacheStrategy: "STATIC" | "FREQUENT" | "MODERATE" | "REALTIME";
}

/**
 * Helper function to define endpoints with automatic type inference from schemas
 *
 * This abstracts away the z.infer calls and makes endpoint definitions much cleaner
 * while preserving full type safety and IntelliSense support.
 */
export function defineApiEndpoint<
  I extends z.ZodTypeAny,
  O extends z.ZodTypeAny,
>(
  input: I,
  output: O,
  definition: Omit<
    EndpointDefinition<z.infer<I>, z.infer<O>>,
    "inputSchema" | "outputSchema"
  >
): EndpointDefinition<z.infer<I>, z.infer<O>> {
  return {
    ...definition,
    inputSchema: input as z.ZodSchema<z.infer<I>>,
    outputSchema: output as z.ZodSchema<z.infer<O>>,
  };
}

/**
 * Creates an API definition from an array of simplified endpoint definitions
 *
 * This function automatically adds the API name to each endpoint and returns
 * a complete ApiDefinition object. It eliminates the need for individual
 * defineEndpoint calls and reduces boilerplate significantly.
 *
 * @param apiName - The name of the API (e.g., "wsdot-travel-times")
 * @param endpoints - Array of simplified endpoint definitions
 * @returns Complete API definition with all endpoints enriched
 *
 * @example
 * ```typescript
 * export const wsdotTravelTimesApi = createApiDefinition("wsdot-travel-times", [
 *   {
 *     function: "getTravelTime",
 *     endpoint: "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimeAsJson?TravelTimeID={TravelTimeID}",
 *     inputSchema: getTravelTimeInputSchema,
 *     outputSchema: travelTimeRouteSchema,
 *     sampleParams: { TravelTimeID: 1 },
 *     cacheStrategy: "STATIC",
 *   },
 * ]);
 * ```
 */
export function createApiDefinition<
  T extends readonly SimpleEndpointDefinition<unknown, unknown>[],
>(apiName: string, endpoints: T): ApiDefinition {
  const endpointDefinitions = endpoints.map((endpoint) => ({
    ...endpoint,
    api: apiName,
  })) as EndpointDefinition<unknown, unknown>[];

  return {
    name: apiName,
    endpointDefinitions,
  };
}
