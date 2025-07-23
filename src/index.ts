// WSDOT API Client Library
// Main entry point for the WSDOT API client library

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
} from "./api/wsdot-border-crossings/types";
// WSDOT Bridge Clearances Types
export type { BridgeClearance as BridgeDataGIS } from "./api/wsdot-bridge-clearances/types";
// WSDOT Commercial Vehicle Restrictions Types
export type {
  CommercialVehicleRestriction,
  CommercialVehicleRestrictionWithId,
  RoadwayLocation as CVRoadwayLocation,
} from "./api/wsdot-commercial-vehicle-restrictions/types";
// WSDOT Highway Alerts Types
export type {
  HighwayAlert,
  RoadwayLocation,
} from "./api/wsdot-highway-alerts/types";
// WSDOT Highway Cameras Types
export type {
  Camera,
  CameraLocation,
  GetCameraResponse,
  SearchCamerasParams,
} from "./api/wsdot-highway-cameras/types";
// WSDOT Mountain Pass Conditions Types
export type {
  MountainPassCondition,
  TravelRestriction,
} from "./api/wsdot-mountain-pass-conditions/types";
// WSDOT Toll Rates Types
export type {
  TollRate,
  TollTripInfo,
  TollTripRate,
  TollTripRatesResponse,
} from "./api/wsdot-toll-rates/types";
// WSDOT Traffic Flow Types
export type {
  FlowStationLocation,
  TrafficFlow,
} from "./api/wsdot-traffic-flow/types";
// WSDOT Travel Times Types
export type {
  TravelTimeEndpoint,
  TravelTimeRoute,
} from "./api/wsdot-travel-times/types";
// WSDOT Weather Information Types
export type { WeatherInfo } from "./api/wsdot-weather-information/types";
// WSDOT Weather Information Extended Types
export type {
  SubSurfaceMeasurement,
  SurfaceMeasurement,
  WeatherReading,
} from "./api/wsdot-weather-information-extended/types";
// WSDOT Weather Stations Types
export type { WeatherStationData } from "./api/wsdot-weather-stations/types";
// WSF Fares Types
export type {
  FareLineItem,
  FareLineItemBasic,
  FareLineItemVerbose,
  FaresCacheFlushDate,
  FaresTerminal,
  FaresValidDateRange,
  FareTotal,
  TerminalCombo,
  TerminalComboVerbose,
  TerminalMate,
} from "./api/wsf-fares/types";
// WSF Schedule Types
export type {
  ActiveSeason,
  ActiveSeasonParams,
  Alert,
  AlertParams,
  AlternativeFormat,
  Annotation,
  ContingencyAdjustment,
  Journey,
  Route,
  RouteDetails,
  RouteParams,
  Sailing,
  Schedule,
  ScheduleCacheFlushDate,
  ScheduleDeparture,
  ScheduledRoute,
  ScheduleParams,
  ScheduleResponse,
  ScheduleResponseTerminalCombo,
  ScheduleTerminal,
  ScheduleTerminalCombo,
  ScheduleTime,
  ServiceDisruption,
  TerminalTime,
  TimeAdjustment,
  TimeAdjustmentParams,
  ValidDateRange,
} from "./api/wsf-schedule/types";
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
} from "./api/wsf-terminals/types";
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
} from "./api/wsf-vessels/types";

// ============================================================================
// TanStack Query Configuration
// ============================================================================

export { tanstackQueryOptions } from "./shared/caching/config";

// ============================================================================
// React Hooks (Direct Exports)
// ============================================================================

// WSDOT Hooks
export * from "@/api/wsdot-border-crossings/queries";
export * from "@/api/wsdot-bridge-clearances/queries";
export * from "@/api/wsdot-commercial-vehicle-restrictions/queries";
export * from "@/api/wsdot-highway-alerts/queries";
export * from "@/api/wsdot-highway-cameras/queries";
export * from "@/api/wsdot-mountain-pass-conditions/queries";
export * from "@/api/wsdot-toll-rates/queries";
export * from "@/api/wsdot-traffic-flow/queries";
export * from "@/api/wsdot-travel-times/queries";
export * from "@/api/wsdot-weather-information/queries";
export * from "@/api/wsdot-weather-information-extended/queries";
export * from "@/api/wsdot-weather-stations/queries";
// WSF Hooks
export * from "@/api/wsf-fares/queries";
export * from "@/api/wsf-schedule/queries";
export * from "@/api/wsf-terminals/queries";
export * from "@/api/wsf-vessels/queries";

// ============================================================================
// Shared Utilities
// ============================================================================

export * from "./shared";
