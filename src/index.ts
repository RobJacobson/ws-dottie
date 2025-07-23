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
// TanStack Query Configuration
// ============================================================================

// TanStack Query configuration options
export { tanstackQueryOptions } from "./shared/caching/config";

// ============================================================================
// TanStack Query Hooks and Types
// ============================================================================

export * from "@/api/wsdot-border-crossings/queries";
// WSDOT (Washington State Department of Transportation) API Types
export type {
  BorderCrossingData,
  BorderCrossingLocation,
  BorderCrossingsResponse,
} from "@/api/wsdot-border-crossings/types";
export * from "@/api/wsdot-bridge-clearances/queries";
export type {
  BridgeClearancesResponse,
  BridgeDataGIS,
} from "@/api/wsdot-bridge-clearances/types";
export * from "@/api/wsdot-commercial-vehicle-restrictions/queries";
export type {
  CommercialVehicleRestriction,
  CommercialVehicleRestrictionsResponse,
  CommercialVehicleRestrictionsWithIdResponse,
} from "@/api/wsdot-commercial-vehicle-restrictions/types";
export * from "@/api/wsdot-highway-alerts/queries";
export type {
  HighwayAlert,
  HighwayAlertsResponse,
  RoadwayLocation,
} from "@/api/wsdot-highway-alerts/types";
export * from "@/api/wsdot-highway-cameras/queries";
export type {
  Camera,
  CameraLocation,
  GetCameraResponse,
  GetCamerasResponse,
  SearchCamerasParams,
  SearchCamerasResponse,
} from "@/api/wsdot-highway-cameras/types";
export * from "@/api/wsdot-mountain-pass-conditions/queries";
export type {
  MountainPassCondition,
  MountainPassConditionsResponse,
  TravelRestriction,
} from "@/api/wsdot-mountain-pass-conditions/types";
export * from "@/api/wsdot-toll-rates/queries";
export type {
  TollRate,
  TollRatesResponse,
  TollTripInfo,
  TollTripInfoResponse,
  TollTripRate,
  TollTripRatesResponse,
} from "@/api/wsdot-toll-rates/types";
export * from "@/api/wsdot-traffic-flow/queries";
export type {
  FlowStationLocation,
  TrafficFlow,
  TrafficFlowsResponse,
} from "@/api/wsdot-traffic-flow/types";
export * from "@/api/wsdot-travel-times/queries";
export type {
  TravelTimeRoute,
  TravelTimesResponse,
} from "@/api/wsdot-travel-times/types";
export * from "@/api/wsdot-weather-information/queries";
export type {
  WeatherInfo,
  WeatherInformationResponse,
} from "@/api/wsdot-weather-information/types";
export * from "@/api/wsdot-weather-information-extended/queries";
export type {
  SubSurfaceMeasurement,
  SurfaceMeasurement,
  WeatherInformationExtendedResponse,
  WeatherReading,
} from "@/api/wsdot-weather-information-extended/types";
export * from "@/api/wsdot-weather-stations/queries";
export type {
  WeatherStationData,
  WeatherStationsResponse,
} from "@/api/wsdot-weather-stations/types";
// TanStack Query Hooks
export * from "@/api/wsf-fares/queries";
// WSF (Washington State Ferries) API Types
export type {
  FareLineItem,
  FareLineItemsVerboseResponse,
  FareLineItemVerbose,
  FaresCacheFlushDate,
  FaresTerminal,
  FaresValidDateRange,
  FareTotal,
  TerminalCombo,
  TerminalComboVerbose,
  TerminalMate,
} from "@/api/wsf-fares/types";
export * from "@/api/wsf-schedule/queries";
export type {
  ActiveSeason,
  Alert,
  AlternativeFormat,
  Route,
  RouteDetails,
  Sailing,
  Schedule,
  ScheduleCacheFlushDate,
  ScheduleDeparture,
  ScheduledRoute,
  ScheduleResponse,
  ScheduleResponseTerminalCombo,
  ScheduleTerminal,
  ScheduleTerminalCombo,
  ScheduleTime,
  TimeAdjustment,
  ValidDateRange,
} from "@/api/wsf-schedule/types";
export * from "@/api/wsf-terminals/queries";
export type {
  TerminalBasics,
  TerminalBulletin,
  TerminalLocation,
  TerminalSailingSpace,
  TerminalTransport,
  TerminalVerbose,
  TerminalWaitTimes,
} from "@/api/wsf-terminals/types";
export * from "@/api/wsf-vessels/queries";
export type {
  VesselAccommodation,
  VesselBasic,
  VesselHistory,
  VesselLocation,
  VesselStats,
  VesselsCacheFlushDate,
  VesselVerbose,
} from "@/api/wsf-vessels/types";

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
