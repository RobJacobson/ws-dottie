/**
 * @fileoverview Unified API Hooks
 *
 * This module provides preconfigured TanStack Query hooks for all APIs in WS-Dottie.
 * These hooks are generated automatically from endpoint definitions and include
 * automatic cache invalidation for static data endpoints.
 */

import { endpoints } from "@/shared/endpoints";
import { createHooksForEndpoints } from "./createHooks";

// Create hooks for all endpoints with appropriate cache invalidation
export const apiHooks = createHooksForEndpoints(endpoints, {
  // Cache invalidation will be applied automatically based on endpoint cache strategy
  useCacheInvalidation: true,
});

// Export individual hooks for tree-shaking
export const {
  // Border Crossings
  useGetBorderCrossings,

  // Bridge Clearances
  useGetBridgeClearances,
  useGetBridgeClearancesByRoute,

  // Commercial Vehicle Restrictions
  useGetCommercialVehicleRestrictions,
  useGetCommercialVehicleRestrictionsWithId,

  // Highway Alerts
  useGetAlerts,
  useGetAlertById,
  useGetAlertsByRegionId,
  useGetAlertsByMapArea,
  useSearchAlerts,

  // Highway Cameras
  useGetHighwayCameras,
  useSearchHighwayCamerasByRouteAndMilepost,
  useGetHighwayCameraByCameraId,

  // Mountain Pass Conditions
  useGetMountainPassConditionById,
  useGetMountainPassConditions,

  // Toll Rates
  useGetTollRates,
  useGetTollTripInfo,
  useGetTollTripRates,
  useGetTripRatesByDate,
  useGetTripRatesByVersion,
  useGetTollTripVersion,

  // Traffic Flow
  useGetTrafficFlows,
  useGetTrafficFlowById,

  // Travel Times
  useGetTravelTimeById,
  useGetTravelTimes,

  // Weather Information
  useGetWeatherInformation,
  useGetWeatherInformationByStationId,
  useGetCurrentWeatherForStations,
  useSearchWeatherInformation,

  // Weather Readings
  useGetWeatherReadings,
  useGetSurfaceMeasurements,
  useGetSubSurfaceMeasurements,

  // Weather Stations
  useGetWeatherStations,

  // WSF Fares
  useGetFaresTerminals,
  useGetTerminalMates,
  useGetTerminalCombo,
  useGetTerminalComboVerbose,
  useGetFareLineItemsByTripDateAndTerminals,
  useGetFareLineItemsBasic,
  useGetFareLineItemsVerbose,
  useGetFareTotalsByTripDateAndRoute,
  useGetFaresValidDateRange,

  // WSF Schedule
  useGetActiveSeasons,
  useGetRouteDetailsByTripDate,
  useGetRouteDetailsByTripDateAndRouteId,
  useGetRouteDetailsByTripDateAndTerminals,
  useGetRoutesByTripDate,
  useGetRoutesByTripDateAndTerminals,
  useGetAllSailingsBySchedRouteID,
  useGetSailingsByRouteID,
  useGetScheduleAlerts,
  useGetScheduledRoutes,
  useGetScheduledRoutesById,
  useGetScheduleByTripDateAndRouteId,
  useGetScheduleByTripDateAndDepartingTerminalIdAndTerminalIds,
  useGetScheduleTodayByRoute,
  useGetScheduleTodayByTerminals,
  useGetRoutesHavingServiceDisruptionsByTripDate,
  useGetTimeAdjustments,
  useGetTimeAdjustmentsByRoute,
  useGetTimeAdjustmentsBySchedRoute,
  useGetScheduleValidDateRange,

  // WSF Terminals
  useGetTerminalBasics,
  useGetTerminalBasicsByTerminalId,
  useGetTerminalBulletins,
  useGetTerminalBulletinsByTerminalId,
  useGetTerminalLocations,
  useGetTerminalLocationsByTerminalId,
  useGetTerminalSailingSpace,
  useGetTerminalSailingSpaceByTerminalId,
  useGetTerminalTransports,
  useGetTerminalTransportsByTerminalId,
  useGetTerminalVerbose,
  useGetTerminalVerboseByTerminalId,
  useGetTerminalWaitTimes,
  useGetTerminalWaitTimesByTerminalId,

  // WSF Vessels
  useGetVesselAccommodations,
  useGetVesselAccommodationsByVesselId,
  useGetVesselBasics,
  useGetVesselBasicsByVesselId,
  useGetVesselHistories,
  useGetVesselHistoriesByVesselNameAndDateRange,
  useGetVesselLocations,
  useGetVesselLocationsByVesselId,
  useGetVesselStats,
  useGetVesselStatsByVesselId,
  useGetVesselsVerbose,
  useGetVesselsVerboseByVesselId,
} = apiHooks;
