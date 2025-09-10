/**
 * @fileoverview Barrel export for all client endpoint definitions
 *
 * This file serves as the single source of truth for all endpoint definitions,
 * providing a centralized import point for CLI, validator, and other consumers.
 * Each endpoint definition contains metadata, handler, and TanStack Query options.
 */

// WSDOT API endpoints
export * from "./wsdot-border-crossings";
export * from "./wsdot-bridge-clearances";
export * from "./wsdot-commercial-vehicle-restrictions";
export * from "./wsdot-highway-alerts";
export * from "./wsdot-highway-cameras";
export * from "./wsdot-mountain-pass-conditions";
export * from "./wsdot-toll-rates";
export * from "./wsdot-traffic-flow";
export * from "./wsdot-travel-times";
export * from "./wsdot-weather-information";
export * from "./wsdot-weather-information-extended";
export * from "./wsdot-weather-stations";

// WSF API endpoints - using explicit exports to avoid naming conflicts
export * from "./wsf-terminals";
export * from "./wsf-vessels";

// Export all from wsf-fares except ValidDateRange
export {
  getFaresCacheFlushDateDef,
  getFareLineItemsDef,
  getFareLineItemsBasicDef,
  getFareLineItemsVerboseDef,
  getFareTotalsDef,
  getFaresTerminalsDef,
  getFaresValidDateRangeDef,
  getFaresTerminalComboDef,
  getTerminalComboVerboseDef,
  getFaresTerminalMatesDef,
} from "./wsf-fares";

// Export all from wsf-schedule except ValidDateRange
export {
  getActiveSeasonsDef,
  getScheduleAlertsDef,
  getAllSailingsDef,
  getScheduleCacheFlushDateDef,
  getRouteDetailsDef,
  getRouteDetailsByRouteDef,
  getRouteDetailsByScheduleTerminalsDef,
  getRoutesByScheduleTerminalsDef,
  getRoutesHavingServiceDisruptionsDef,
  getRoutesWithDisruptionsDef,
  getSailingsDef,
  getScheduleByRouteDef,
  getScheduleByScheduleTerminalsDef,
  getScheduleTodayByRouteDef,
  getScheduleTodayByScheduleTerminalsDef,
  getScheduledRoutesBySeasonDef,
  getTerminalMatesDef,
  getScheduleTerminalsDef,
  getTerminalsAndMatesDef,
  getTerminalsAndMatesByRouteDef,
  getTimeAdjustmentsByRouteDef,
  getTimeAdjustmentsDef,
  getScheduleValidDateRangeDef as WsfScheduleValidDateRangeDef,
} from "./wsf-schedule";
