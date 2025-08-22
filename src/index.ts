// WSDOT API Client Library
// Main entry point for the WSDOT API client library

// ============================================================================
// Configuration
// ============================================================================

export {
  configManager,
  type WsdotConfig,
} from "./shared/config";
export type { LoggingMode } from "./shared/logger";

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
// Direct Type Exports (for better compatibility)
// ============================================================================

// WSDOT Border Crossings Types
export type {
  BorderCrossingData,
  BorderCrossingLocation,
} from "./api/wsdot-border-crossings";
// WSDOT Bridge Clearances Types
export type { BridgeDataGIS } from "./api/wsdot-bridge-clearances";
// WSDOT Commercial Vehicle Restrictions Types
export type {
  CommercialVehicleRestriction,
  CommercialVehicleRestrictionRoadwayLocation,
  CommercialVehicleRestrictionWithId,
} from "./api/wsdot-commercial-vehicle-restrictions";
// WSDOT Highway Alerts Types
export type {
  HighwayAlert,
  HighwayAlertRoadwayLocation,
} from "./api/wsdot-highway-alerts";
// WSDOT Highway Cameras Types
export type {
  Camera,
  CameraLocation,
  GetHighwayCameraParams,
  GetHighwayCamerasParams,
  SearchHighwayCamerasParams,
} from "./api/wsdot-highway-cameras";
// WSDOT Mountain Pass Conditions Types
export type {
  MountainPassCondition,
  TravelRestriction,
} from "./api/wsdot-mountain-pass-conditions";
// WSDOT Toll Rates Types
export type {
  TollRate,
  TollTripInfo,
  TollTripRate,
  TollTripRates,
} from "./api/wsdot-toll-rates";
// WSDOT Traffic Flow Types
export type {
  FlowStationLocation,
  TrafficFlow,
} from "./api/wsdot-traffic-flow";
// WSDOT Travel Times Types
export type {
  TravelTimeEndpoint,
  TravelTimeRoute,
} from "./api/wsdot-travel-times";
// WSDOT Weather Information Types
export type { WeatherInfo } from "./api/wsdot-weather-information";
// WSDOT Weather Information Extended Types
export type {
  SubSurfaceMeasurement,
  SurfaceMeasurement,
  WeatherReading,
} from "./api/wsdot-weather-information-extended";
// WSDOT Weather Stations Types
export type { WeatherStationData } from "./api/wsdot-weather-stations";
// WSF Fares Types
export type {
  FareLineItem,
  FaresTerminal,
  FaresValidDateRange,
  FareTotal,
  TerminalCombo,
  TerminalComboVerbose,
  TerminalMate,
} from "./api/wsf-fares";
// WSF Schedule Types
export type {
  ActiveSeason,
  Alert,
  AlternativeFormat,
  Route,
  RouteDetails,
  Sailing,
  ScheduledRoute,
  ScheduleTerminal,
  ScheduleTerminalCombo,
  TimeAdjustment,
  ValidDateRange,
} from "./api/wsf-schedule";
// WSF Terminals Types
export type {
  TerminalArrivalSpace,
  TerminalBasics,
  TerminalBulletin,
  TerminalBulletinItem,
  TerminalDepartingSpace,
  TerminalLocation,
  TerminalSailingSpace,
  TerminalTransitLink,
  TerminalTransport,
  TerminalVerbose,
  TerminalWaitTime,
  TerminalWaitTimes,
} from "./api/wsf-terminals";
// WSF Vessels Types
export type {
  VesselAccommodation,
  VesselBasic,
  VesselClass,
  VesselHistory,
  VesselLocation,
  VesselStats,
  VesselsCacheFlushDate,
  VesselVerbose,
} from "./api/wsf-vessels";

// ============================================================================
// TanStack Query Configuration
// ============================================================================

export { tanstackQueryOptions } from "./shared/caching/config";

// ============================================================================
// React Hooks (Direct Exports)
// ============================================================================

// WSDOT Hooks
export * from "@/api/wsdot-border-crossings";
export * from "@/api/wsdot-bridge-clearances";
export * from "@/api/wsdot-commercial-vehicle-restrictions";
export * from "@/api/wsdot-highway-alerts";
export * from "@/api/wsdot-highway-cameras";
export * from "@/api/wsdot-mountain-pass-conditions";
export * from "@/api/wsdot-toll-rates";
export * from "@/api/wsdot-traffic-flow";
export * from "@/api/wsdot-travel-times";
export * from "@/api/wsdot-weather-information";
export * from "@/api/wsdot-weather-information-extended";
export * from "@/api/wsdot-weather-stations";
// WSF Hooks
export * from "@/api/wsf-fares";
export * from "@/api/wsf-schedule";
export * from "@/api/wsf-terminals";
export * from "@/api/wsf-vessels";

// ============================================================================
// Shared Utilities
// ============================================================================

export * from "./shared";
