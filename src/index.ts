// WSDOT API Client Library
// Main entry point for the WSDOT API client library

// ============================================================================
// Configuration
// ============================================================================

export {
  configManager,
  type WsdotConfig,
} from "./shared/configManager";
export type { LoggingMode } from "./shared/utils";

// ============================================================================
// API Modules (Namespace Exports)
// ============================================================================

// WSDOT APIs
export * as WsdotBorderCrossings from "./api/wsdot-border-crossings";
export * as WsdotBridgeClearances from "./api/wsdot-bridge-clearances";
export * as WsdotCommercialVehicleRestrictions from "./api/wsdot-commercial-vehicle-restrictions";
export * as WsdotHighwayAlerts from "./api/wsdot-highway-alerts";
export * as WsdotHighwayCameras from "./api/wsdot-highway-cameras";
export * as WsdotMountainPassConditions from "./api/wsdot-mountain-pass-conditions";
export * as WsdotTollRates from "./api/wsdot-toll-rates";
export * as WsdotTrafficFlow from "./api/wsdot-traffic-flow";
export * as WsdotTravelTimes from "./api/wsdot-travel-times";
export * as WsdotWeatherInformation from "./api/wsdot-weather-information";
export * as WsdotWeatherInformationExtended from "./api/wsdot-weather-information-extended";
export * as WsdotWeatherStations from "./api/wsdot-weather-stations";
// WSF APIs
export * as WsfFares from "./api/wsf-fares";
export * as WsfSchedule from "./api/wsf-schedule";
export * as WsfTerminals from "./api/wsf-terminals";
export * as WsfVessels from "./api/wsf-vessels";

// ============================================================================
// TanStack Query Configuration
// ============================================================================

export { tanstackQueryOptions } from "./shared/config";

// ============================================================================
// Shared Utilities
// ============================================================================

export * from "./shared";
