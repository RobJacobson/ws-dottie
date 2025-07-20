// React-specific exports for the WSDOT API client
// This file re-exports the types and hooks that are used by React applications

// ============================================================================
// WSF (Washington State Ferries) API Types
// ============================================================================

// Fares API types
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
// Schedule API types
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
// Terminals API types
export type {
  TerminalBasics,
  TerminalBulletin,
  TerminalLocation,
  TerminalSailingSpace,
  TerminalTransport,
  TerminalVerbose,
  TerminalWaitTimes,
} from "@/api/wsf-terminals/types";
// Vessels API types
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
// WSDOT (Washington State Department of Transportation) API Types
// ============================================================================

// Border Crossings API types
export type {
  BorderCrossingData,
  BorderCrossingLocation,
  BorderCrossingsResponse,
} from "@/api/wsdot-border-crossings/types";
// Bridge Clearances API types
export type {
  BridgeClearancesResponse,
  BridgeDataGIS,
} from "@/api/wsdot-bridge-clearances/types";
// Commercial Vehicle Restrictions API types
export type {
  CommercialVehicleRestriction,
  CommercialVehicleRestrictionsResponse,
  CommercialVehicleRestrictionsWithIdResponse,
} from "@/api/wsdot-commercial-vehicle-restrictions/types";
// Highway Alerts API types
export type {
  HighwayAlert,
  HighwayAlertsResponse,
  RoadwayLocation,
} from "@/api/wsdot-highway-alerts/types";
// Highway Cameras API types
export type {
  Camera,
  CameraLocation,
  GetCameraResponse,
  GetCamerasResponse,
  SearchCamerasParams,
  SearchCamerasResponse,
} from "@/api/wsdot-highway-cameras/types";
// Mountain Pass Conditions API types
export type {
  MountainPassCondition,
  MountainPassConditionsResponse,
  TravelRestriction,
} from "@/api/wsdot-mountain-pass-conditions/types";
// Toll Rates API types
export type {
  TollRate,
  TollRatesResponse,
  TollTripInfo,
  TollTripInfoResponse,
  TollTripRate,
  TollTripRatesResponse,
} from "@/api/wsdot-toll-rates/types";
// Traffic Flow API types
export type {
  FlowStationLocation,
  TrafficFlow,
  TrafficFlowsResponse,
} from "@/api/wsdot-traffic-flow/types";
// Travel Times API types
export type {
  TravelTimeRoute,
  TravelTimesResponse,
} from "@/api/wsdot-travel-times/types";
// Weather Information API types
export type {
  WeatherInfo,
  WeatherInformationResponse,
} from "@/api/wsdot-weather-information/types";
// Weather Information Extended API types
export type {
  SubSurfaceMeasurement,
  SurfaceMeasurement,
  WeatherInformationExtendedResponse,
  WeatherReading,
} from "@/api/wsdot-weather-information-extended/types";
// Weather Stations API types
export type {
  WeatherStationData,
  WeatherStationsResponse,
} from "@/api/wsdot-weather-stations/types";

// ============================================================================
// WSF (Washington State Ferries) API React Query Hooks
// ============================================================================

// Fares API hooks
export * from "@/api/wsf-fares/hook";
// Schedule API hooks
export * from "@/api/wsf-schedule/hook";
// Terminals API hooks
export * from "@/api/wsf-terminals/hook";
// Vessels API hooks
export * from "@/api/wsf-vessels/hook";

// ============================================================================
// WSDOT (Washington State Department of Transportation) API React Query Hooks
// ============================================================================

// Border Crossings API hooks
export * from "@/api/wsdot-border-crossings/hook";
// Bridge Clearances API hooks
export * from "@/api/wsdot-bridge-clearances/hook";
// Commercial Vehicle Restrictions API hooks
export * from "@/api/wsdot-commercial-vehicle-restrictions/hook";
// Highway Alerts API hooks
export * from "@/api/wsdot-highway-alerts/hook";
// Highway Cameras API hooks
export * from "@/api/wsdot-highway-cameras/hook";
// Mountain Pass Conditions API hooks
export * from "@/api/wsdot-mountain-pass-conditions/hook";
// Toll Rates API hooks
export * from "@/api/wsdot-toll-rates/hook";
// Traffic Flow API hooks
export * from "@/api/wsdot-traffic-flow/hook";
// Travel Times API hooks
export * from "@/api/wsdot-travel-times/hook";
// Weather Information API hooks
export * from "@/api/wsdot-weather-information/hook";
// Weather Information Extended API hooks
export * from "@/api/wsdot-weather-information-extended/hook";
// Weather Stations API hooks
export * from "@/api/wsdot-weather-stations/hook";

// ============================================================================
// Shared Utilities
// ============================================================================

// Shared caching utilities
export * from "@/shared/caching";
