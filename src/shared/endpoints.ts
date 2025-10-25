/**
 * @fileoverview Endpoint System
 *
 * This module provides the core endpoint system for the WS-Dottie API library.
 * It includes type definitions, factory functions, and utilities that work together
 * to create a consistent endpoint management system across all API modules.
 */

import type { ApiDefinition, EndpointDefinition } from "@/apis/types";
// Import all API modules statically
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
import type { Api, Endpoint } from "./types";

/**
 * All API modules in a constant array
 *
 * This array contains all the API definition objects that are imported
 * from the various API modules. It's used by the loadApis function to
 * create the complete API structure.
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
  wsdotWeatherStationsApi,
  wsdotWeatherReadingsApi,
  wsfFaresApi,
  wsfScheduleApi,
  wsfTerminalsApi,
  wsfVesselsApi,
] as const;

/**
 * Loads all APIs from API_MODULES and returns an array of Api objects
 *
 * This function reads each ApiDefinition from API_MODULES and converts them
 * to Api objects with computed Endpoint objects. Each endpoint definition
 * is converted to a full Endpoint object with computed properties.
 *
 * @returns Array of Api objects with computed endpoints
 */
const loadApis = (): Api[] =>
  API_MODULES.map((apiDefinition) => ({
    name: apiDefinition.name,
    baseUrl: apiDefinition.baseUrl,
    endpoints: apiDefinition.endpointGroups.flatMap((endpointGroup) =>
      Object.values(endpointGroup.endpoints).map((endpointDefinition) =>
        defineApiEndpoint(apiDefinition, endpointDefinition)
      )
    ),
  }));

/**
 * Creates a complete endpoint configuration object from ApiDefinition structure
 *
 * This factory function takes an endpoint from the ApiDefinition structure
 * and enriches it with computed properties like the complete URL template and
 * backward-compatible id. It combines the baseUrl from the API definition with
 * the truncated endpoint path.
 *
 * @template I - The input parameters type for the endpoint
 * @template O - The output response type for the endpoint
 * @param apiDefinition - The API definition containing baseUrl and metadata
 * @param endpointDefinition - The endpoint definition with truncated URL
 * @returns Complete endpoint object with all computed properties
 */
const defineApiEndpoint = <I, O>(
  apiDefinition: ApiDefinition,
  endpointDefinition: EndpointDefinition<I, O>
): Endpoint<I, O> => ({
  api: apiDefinition.name,
  function: endpointDefinition.function,
  endpoint: endpointDefinition.endpoint,
  inputSchema: endpointDefinition.inputSchema,
  outputSchema: endpointDefinition.outputSchema,
  sampleParams: endpointDefinition.sampleParams,
  cacheStrategy: endpointDefinition.cacheStrategy ?? "STATIC",
  functionName: endpointDefinition.function,
  urlTemplate: `${apiDefinition.baseUrl}${endpointDefinition.endpoint}`,
  id: `${apiDefinition.name}:${endpointDefinition.function}`,
});

/**
 * All loaded APIs with computed endpoints
 *
 * This array contains all the API objects with their endpoints converted
 * to runtime Endpoint objects with computed properties.
 */
export const apis = loadApis();

/**
 * All endpoints from all APIs as a flat array
 *
 * This array contains all endpoints from all APIs flattened into a single
 * array for easy iteration and processing.
 */
export const endpoints = apis.flatMap((api) => api.endpoints);
