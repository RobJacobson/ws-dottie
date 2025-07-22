// WSDOT API Client Library
// Main entry point for the WSDOT API client library

// ============================================================================
// WSDOT (Washington State Department of Transportation) API Modules
// ============================================================================

// Border Crossings API
export * as WsdotBorderCrossings from "./api/wsdot-border-crossings";
// Bridge Clearances API
export * as WsdotBridgeClearances from "./api/wsdot-bridge-clearances";
// Commercial Vehicle Restrictions API
export * as WsdotCommercialVehicleRestrictions from "./api/wsdot-commercial-vehicle-restrictions";
// Highway Alerts API
export * as WsdotHighwayAlerts from "./api/wsdot-highway-alerts";
// Highway Cameras API
export * as WsdotHighwayCameras from "./api/wsdot-highway-cameras";
// Mountain Pass Conditions API
export * as WsdotMountainPassConditions from "./api/wsdot-mountain-pass-conditions";
// Toll Rates API
export * as WsdotTollRates from "./api/wsdot-toll-rates";
// Traffic Flow API
export * as WsdotTrafficFlow from "./api/wsdot-traffic-flow";
// Travel Times API
export * as WsdotTravelTimes from "./api/wsdot-travel-times";
// Weather Information API
export * as WsdotWeatherInformation from "./api/wsdot-weather-information";
// Weather Information Extended API
export * as WsdotWeatherInformationExtended from "./api/wsdot-weather-information-extended";
// Weather Stations API
export * as WsdotWeatherStations from "./api/wsdot-weather-stations";

// ============================================================================
// WSF (Washington State Ferries) API Modules
// ============================================================================

// Fares API
export * as WsfFares from "./api/wsf-fares";
// Schedule API
export * as WsfSchedule from "./api/wsf-schedule";
// Terminals API
export * as WsfTerminals from "./api/wsf-terminals";
// Vessels API
export * as WsfVessels from "./api/wsf-vessels";

// ============================================================================
// React Integration
// ============================================================================

// React-specific exports (hooks, types, and utilities)
export * from "./react";

// ============================================================================
// Shared Utilities
// ============================================================================

// Shared utilities (caching, fetching, etc.)
export * from "./shared";

// ============================================================================
// Legacy Exports (for backward compatibility)
// ============================================================================

// Individual shared module exports for backward compatibility
export * from "./shared/fetching/config";
export * from "./shared/fetching/dateUtils";
export * from "./shared/fetching/errors";
export * from "./shared/fetching/fetchInternal";
export * from "./shared/fetching/parseJson";
