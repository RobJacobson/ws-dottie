/**
 * @fileoverview API Registry
 *
 * This module serves as the single source of truth for all API definitions.
 * It imports and exports all API definitions from their respective api.ts files,
 * providing a centralized registry for consumers.
 *
 * IMPORTANT: This module imports zod-openapi-init FIRST to ensure Zod schemas
 * have `.openapi()` method available before any API modules are imported.
 */

// Import Zod OpenAPI initialization FIRST, before any schema creation
// This ensures all schemas imported from API modules have .openapi() method
import "@/shared/zod";

import type { ApiDefinition } from "@/apis/types";

// Import all API definitions
import { wsdotBorderCrossingsApi } from "@/apis/wsdot-border-crossings/api";
import { wsdotBridgeClearancesApi } from "@/apis/wsdot-bridge-clearances/api";
import { wsdotCommercialVehicleRestrictionsApi } from "@/apis/wsdot-commercial-vehicle-restrictions/api";
import { wsdotHighwayAlertsApi } from "@/apis/wsdot-highway-alerts/api";
import { wsdotHighwayCamerasApi } from "@/apis/wsdot-highway-cameras/api";
import { wsdotMountainPassConditionsApi } from "@/apis/wsdot-mountain-pass-conditions/api";
import { wsdotTollRatesApi } from "@/apis/wsdot-toll-rates/api";
import { wsdotTrafficFlowApi } from "@/apis/wsdot-traffic-flow/api";
import { wsdotTravelTimesApi } from "@/apis/wsdot-travel-times/api";
import { wsdotWeatherInformationApi } from "@/apis/wsdot-weather-information/api";
import { wsdotWeatherReadingsApi } from "@/apis/wsdot-weather-readings/api";
import { wsdotWeatherStationsApi } from "@/apis/wsdot-weather-stations/api";
import { wsfFaresApi } from "@/apis/wsf-fares/api";
import { wsfScheduleApi } from "@/apis/wsf-schedule/api";
import { wsfTerminalsApi } from "@/apis/wsf-terminals/api";
import { wsfVesselsApi } from "@/apis/wsf-vessels/api";

/**
 * All APIs with their endpoint groups
 *
 * This object provides access to APIs grouped by name for structured
 * access when needed by consumers that need to work with specific APIs.
 */
export const apis = {
  [wsdotBorderCrossingsApi.api.name]: wsdotBorderCrossingsApi,
  [wsdotBridgeClearancesApi.api.name]: wsdotBridgeClearancesApi,
  [wsdotCommercialVehicleRestrictionsApi.api.name]:
    wsdotCommercialVehicleRestrictionsApi,
  [wsdotHighwayAlertsApi.api.name]: wsdotHighwayAlertsApi,
  [wsdotHighwayCamerasApi.api.name]: wsdotHighwayCamerasApi,
  [wsdotMountainPassConditionsApi.api.name]: wsdotMountainPassConditionsApi,
  [wsdotTollRatesApi.api.name]: wsdotTollRatesApi,
  [wsdotTrafficFlowApi.api.name]: wsdotTrafficFlowApi,
  [wsdotTravelTimesApi.api.name]: wsdotTravelTimesApi,
  [wsdotWeatherInformationApi.api.name]: wsdotWeatherInformationApi,
  [wsdotWeatherReadingsApi.api.name]: wsdotWeatherReadingsApi,
  [wsdotWeatherStationsApi.api.name]: wsdotWeatherStationsApi,
  [wsfFaresApi.api.name]: wsfFaresApi,
  [wsfScheduleApi.api.name]: wsfScheduleApi,
  [wsfTerminalsApi.api.name]: wsfTerminalsApi,
  [wsfVesselsApi.api.name]: wsfVesselsApi,
} as const satisfies Record<string, ApiDefinition>;

// Re-export type for convenience
export type { ApiDefinition };
