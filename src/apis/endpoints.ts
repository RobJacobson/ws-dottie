/**
 * @fileoverview Endpoint Registry
 *
 * This module provides a centralized registry of all endpoints from the new
 * API structure. It automatically discovers all endpoints by iterating through
 * the API graph: apis -> endpointGroups -> endpoints.
 *
 * ## Exports
 *
 * **`endpointsByApi`** - Nested structure organized by API name, then endpoint group, then function name.
 * Useful for direct hierarchical access when you know the full path to an endpoint.
 *
 * ```typescript
 * const endpoint = endpointsByApi['wsf-vessels']['vesselBasics']['vesselBasics'];
 * ```
 *
 * **`endpointsFlat`** - Flat array of all endpoints from all APIs. Ideal for iteration,
 * searching, and filtering operations. This is the primary export used by most consumers
 * (CLI, E2E tests, documentation generation).
 *
 * ```typescript
 * const endpoint = endpointsFlat.find(ep => ep.functionName === 'vesselBasics');
 * ```
 */

// Import Zod OpenAPI initialization FIRST, before any schema creation
// This ensures all schemas imported from API modules have .openapi() method
import "@/shared/zod";
import type {
  ApiMeta,
  Endpoint,
  EndpointGroupMeta,
  EndpointMeta,
} from "./types";

// Import all API definitions directly to avoid circular dependency with index.ts
import { wsdotBorderCrossings } from "./wsdot-border-crossings/api";
import { wsdotBridgeClearances } from "./wsdot-bridge-clearances/api";
import { wsdotCommercialVehicleRestrictions } from "./wsdot-commercial-vehicle-restrictions/api";
import { wsdotHighwayAlerts } from "./wsdot-highway-alerts/api";
import { wsdotHighwayCameras } from "./wsdot-highway-cameras/api";
import { wsdotMountainPassConditions } from "./wsdot-mountain-pass-conditions/api";
import { wsdotTollRates } from "./wsdot-toll-rates/api";
import { wsdotTrafficFlow } from "./wsdot-traffic-flow/api";
import { wsdotTravelTimes } from "./wsdot-travel-times/api";
import { wsdotWeatherInformation } from "./wsdot-weather-information/api";
import { wsdotWeatherReadings } from "./wsdot-weather-readings/api";
import { wsdotWeatherStations } from "./wsdot-weather-stations/api";
import { wsfFares } from "./wsf-fares/api";
import { wsfSchedule } from "./wsf-schedule/api";
import { wsfTerminals } from "./wsf-terminals/api";
import { wsfVessels } from "./wsf-vessels/api";

// Build apis object locally to avoid circular dependency
const apis = {
  wsdotBorderCrossings,
  wsdotBridgeClearances,
  wsdotCommercialVehicleRestrictions,
  wsdotHighwayAlerts,
  wsdotHighwayCameras,
  wsdotMountainPassConditions,
  wsdotTollRates,
  wsdotTrafficFlow,
  wsdotTravelTimes,
  wsdotWeatherInformation,
  wsdotWeatherReadings,
  wsdotWeatherStations,
  wsfFares,
  wsfSchedule,
  wsfTerminals,
  wsfVessels,
} as const;

/**
 * Builds a complete endpoint descriptor from metadata objects
 *
 * Combines API, group, and endpoint metadata into a single descriptor
 * with computed properties like urlTemplate and id.
 *
 * @template I - The input parameters type
 * @template O - The output response type
 * @param api - API metadata containing base URL and name
 * @param group - Endpoint group metadata containing cache strategy
 * @param endpoint - Endpoint metadata containing path, schemas, and function name
 * @returns A complete Endpoint object with all metadata and computed properties
 */
const toEndpoint = <I, O>(
  api: ApiMeta,
  group: EndpointGroupMeta,
  endpoint: EndpointMeta<I, O>
): Endpoint<I, O> => ({
  api,
  group,
  endpoint: endpoint.endpoint,
  functionName: endpoint.functionName,
  inputSchema: endpoint.inputSchema,
  outputSchema: endpoint.outputSchema,
  sampleParams: endpoint.sampleParams,
  endpointDescription: endpoint.endpointDescription,
  cacheStrategy: group.cacheStrategy,
  urlTemplate: `${api.baseUrl}${endpoint.endpoint}`,
  id: `${api.name}:${endpoint.functionName}`,
});

/**
 * All endpoints organized by API name, then endpoint group, then function name
 *
 * This nested structure provides organized access to endpoints by their
 * hierarchical structure: API -> Endpoint Group -> Function Name.
 * Useful for programmatic access when you know the API and group structure.
 */
export const endpointsByApi: Record<
  string,
  Record<string, Record<string, Endpoint<unknown, unknown>>>
> = Object.fromEntries(
  Object.values(apis).map((apiDefinition) => [
    apiDefinition.api.name,
    Object.fromEntries(
      apiDefinition.endpointGroups.map((group) => [
        group.name,
        Object.fromEntries(
          group.endpoints.map((endpoint) => [
            endpoint.functionName,
            toEndpoint(apiDefinition.api, group, endpoint),
          ])
        ),
      ])
    ),
  ])
) as Record<string, Record<string, Record<string, Endpoint<unknown, unknown>>>>;

/**
 * All endpoints from all APIs as a flat array
 *
 * This array contains all endpoints from all APIs flattened into a single
 * array for easy iteration and processing by CLI and e2e tests.
 * Endpoints are automatically discovered by iterating through the API graph:
 * apis -> endpointGroups -> endpoints.
 */
export const endpointsFlat: Endpoint<unknown, unknown>[] = Object.values(
  apis
).flatMap((apiDefinition) =>
  apiDefinition.endpointGroups.flatMap((group) =>
    group.endpoints.map((endpoint) =>
      toEndpoint(apiDefinition.api, group, endpoint)
    )
  )
) satisfies Endpoint<unknown, unknown>[];
