/**
 * @fileoverview Endpoint Registry
 *
 * This module provides a centralized registry of all endpoints from the refactored
 * API structure. It creates a flat array of Endpoint objects for CLI and
 * e2e test consumption while maintaining compatibility with existing code.
 *
 * IMPORTANT: This module imports zod-openapi-init FIRST to ensure Zod schemas
 * have `.openapi()` method available before any API modules are imported.
 */

// Import Zod OpenAPI initialization FIRST, before any schema creation
// This ensures all schemas imported from API modules have .openapi() method
import "@/shared/zod-openapi-init";

import type {
  ApiDefinition,
  EndpointDefinition,
  EndpointGroup,
} from "@/apis/types";
// Import all API definitions
import { wsdotBorderCrossingsApi } from "@/apis/wsdot-border-crossings/apiDefinition";
import { wsdotBridgeClearancesApi } from "@/apis/wsdot-bridge-clearances/apiDefinition";
import { wsdotCommercialVehicleRestrictionsApi } from "@/apis/wsdot-commercial-vehicle-restrictions/apiDefinition";
import { wsdotHighwayAlertsApi } from "@/apis/wsdot-highway-alerts/apiDefinition";
import { wsdotHighwayCamerasApi } from "@/apis/wsdot-highway-cameras/apiDefinition";
import { wsdotMountainPassConditionsApi } from "@/apis/wsdot-mountain-pass-conditions/apiDefinition";
import { wsdotTollRatesApi } from "@/apis/wsdot-toll-rates/apiDefinition";
import { wsdotTrafficFlowApi } from "@/apis/wsdot-traffic-flow/apiDefinition";
import { wsdotTravelTimesApi } from "@/apis/wsdot-travel-times/apiDefinition";
import { wsdotWeatherInformationApi } from "@/apis/wsdot-weather-information/apiDefinition";
import { wsdotWeatherReadingsApi } from "@/apis/wsdot-weather-readings/apiDefinition";
import { wsdotWeatherStationsApi } from "@/apis/wsdot-weather-stations/apiDefinition";
import { wsfFaresApi } from "@/apis/wsf-fares/apiDefinition";
import { wsfScheduleApi } from "@/apis/wsf-schedule/apiDefinition";
import { wsfTerminalsApi } from "@/apis/wsf-terminals/apiDefinition";
import { wsfVesselsApi } from "@/apis/wsf-vessels/apiDefinition";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import type { Endpoint } from "./types";

/**
 * All API modules in a constant array
 *
 * This array contains all API definition objects that are imported
 * from various API modules. It's used to create the complete endpoint registry.
 */
const API_MODULES = [
  wsdotBorderCrossingsApi,
  wsdotBridgeClearancesApi,
  wsdotCommercialVehicleRestrictionsApi,
  wsdotHighwayAlertsApi,
  wsdotHighwayCamerasApi,
  wsdotMountainPassConditionsApi,
  wsdotTollRatesApi,
  wsdotTrafficFlowApi,
  wsdotTravelTimesApi,
  wsdotWeatherInformationApi,
  wsdotWeatherReadingsApi,
  wsdotWeatherStationsApi,
  wsfFaresApi,
  wsfScheduleApi,
  wsfTerminalsApi,
  wsfVesselsApi,
] as const;

/**
 * Creates a complete endpoint configuration object from ApiDefinition structure
 *
 * This factory function takes an endpoint from ApiDefinition structure
 * and enriches it with computed properties like complete URL template and
 * backward-compatible id. It combines the baseUrl from API definition with
 * the endpoint path.
 *
 * @template I - The input parameters type for endpoint
 * @template O - The output response type for endpoint
 * @param apiDefinition - The API definition containing baseUrl and metadata
 * @param endpointGroup - The endpoint group containing cache strategy
 * @param endpointDefinition - The endpoint definition with truncated URL
 * @returns Complete endpoint object with all computed properties
 */
const createEndpointFromDefinition = <I, O>(
  apiDefinition: ApiDefinition,
  endpointGroup: EndpointGroup,
  functionName: string,
  endpointDefinition: EndpointDefinition<I, O>
): Endpoint<I, O> => {
  return createEndpoint(
    apiDefinition,
    endpointGroup,
    endpointDefinition,
    functionName
  );
};

/**
 * All endpoints from all APIs as a flat array
 *
 * This array contains all endpoints from all APIs flattened into a single
 * array for easy iteration and processing by CLI and e2e tests.
 */
export const endpoints = API_MODULES.flatMap((apiDefinition) =>
  apiDefinition.endpointGroups.flatMap((endpointGroup) =>
    Object.entries(endpointGroup.endpoints).map(
      ([functionName, endpointDefinition]) =>
        createEndpointFromDefinition(
          apiDefinition,
          endpointGroup,
          functionName,
          endpointDefinition as EndpointDefinition<unknown, unknown>
        )
    )
  )
);

/**
 * All APIs with their endpoint groups
 *
 * This object provides access to APIs grouped by name for more structured
 * access when needed by consumers that need to work with specific APIs.
 */
export const apis = API_MODULES.reduce(
  (acc, apiDefinition) => {
    acc[apiDefinition.name] = apiDefinition;
    return acc;
  },
  {} as Record<string, ApiDefinition>
);
