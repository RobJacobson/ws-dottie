/**
 * @fileoverview APIs Registry Export
 *
 * This module provides the centralized APIs registry for consumers who need
 * to access API definitions programmatically.
 */

// Import Zod OpenAPI initialization FIRST, before any schema creation
// This ensures all schemas imported from API modules have .openapi() method
import "@/shared/zod";

// Re-export all types from types module
export type * from "./types";

// Import all API definitions
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

// Export each API individually (standard barrel export)
export { wsdotBorderCrossings };
export { wsdotBridgeClearances };
export { wsdotCommercialVehicleRestrictions };
export { wsdotHighwayAlerts };
export { wsdotHighwayCameras };
export { wsdotMountainPassConditions };
export { wsdotTollRates };
export { wsdotTrafficFlow };
export { wsdotTravelTimes };
export { wsdotWeatherInformation };
export { wsdotWeatherReadings };
export { wsdotWeatherStations };
export { wsfFares };
export { wsfSchedule };
export { wsfTerminals };
export { wsfVessels };

/**
 * All APIs as a simple object for iteration and programmatic access
 *
 * This object provides access to all APIs for consumers that need to
 * iterate over them or access them programmatically.
 */
export const apis = {
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

// Re-export endpoints registry
export { endpoints } from "./endpoints";
