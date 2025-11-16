/**
 * @fileoverview Endpoint Registry
 *
 * This module provides a centralized registry of all endpoints from refactored
 * API structure. It creates a flat array of Endpoint objects for CLI and
 * e2e test consumption.
 *
 * IMPORTANT: This module imports zod-openapi-init FIRST to ensure Zod schemas
 * have `.openapi()` method available before any API modules are imported.
 */

// Import Zod OpenAPI initialization FIRST, before any schema creation
// This ensures all schemas imported from API modules have .openapi() method
import "@/shared/zod";

import type { ApiDefinition } from "@/apis/shared/apis";
// Import all API definitions
import { wsdotBorderCrossingsApi } from "@/apis/wsdot-border-crossings/apiDefinition";
// ============================================================================
// WSDOT Border Crossings API
// ============================================================================
import { fetchBorderCrossings } from "@/apis/wsdot-border-crossings/borderCrossingData/borderCrossingData.endpoints";
import { wsdotBridgeClearancesApi } from "@/apis/wsdot-bridge-clearances/apiDefinition";
// ============================================================================
// WSDOT Bridge Clearances API
// ============================================================================
import {
  fetchBridgeClearances,
  fetchBridgeClearancesByRoute,
} from "@/apis/wsdot-bridge-clearances/bridgeClearances/bridgeClearances.endpoints";
import { wsdotCommercialVehicleRestrictionsApi } from "@/apis/wsdot-commercial-vehicle-restrictions/apiDefinition";
// ============================================================================
// WSDOT Commercial Vehicle Restrictions API
// ============================================================================
import { fetchCommercialVehicleRestrictions } from "@/apis/wsdot-commercial-vehicle-restrictions/cvRestrictionData/cvRestrictionData.endpoints";
import { fetchCommercialVehicleRestrictionsWithId } from "@/apis/wsdot-commercial-vehicle-restrictions/cvRestrictionDataWithId/cvRestrictionDataWithId.endpoints";
// ============================================================================
// WSDOT Highway Alerts API
// ============================================================================
import { fetchMapAreas } from "@/apis/wsdot-highway-alerts/alertAreas/alertAreas.endpoints";
import { wsdotHighwayAlertsApi } from "@/apis/wsdot-highway-alerts/apiDefinition";
import { fetchEventCategories } from "@/apis/wsdot-highway-alerts/eventCategories/eventCategories.endpoints";
import {
  fetchAlertById,
  fetchAlerts,
  fetchAlertsByMapArea,
  fetchAlertsByRegionId,
  searchAlerts,
} from "@/apis/wsdot-highway-alerts/highwayAlerts/highwayAlerts.endpoints";
import { wsdotHighwayCamerasApi } from "@/apis/wsdot-highway-cameras/apiDefinition";
// ============================================================================
// WSDOT Highway Cameras API
// ============================================================================
import {
  fetchHighwayCameraByCameraId,
  fetchHighwayCameras,
  searchHighwayCamerasByRouteAndMilepost,
} from "@/apis/wsdot-highway-cameras/cameras/cameras.endpoints";
import { wsdotMountainPassConditionsApi } from "@/apis/wsdot-mountain-pass-conditions/apiDefinition";
// ============================================================================
// WSDOT Mountain Pass Conditions API
// ============================================================================
import {
  fetchMountainPassConditionById,
  fetchMountainPassConditions,
} from "@/apis/wsdot-mountain-pass-conditions/passConditions/passConditions.endpoints";
import { wsdotTollRatesApi } from "@/apis/wsdot-toll-rates/apiDefinition";
// ============================================================================
// WSDOT Toll Rates API
// ============================================================================
import { fetchTollRates } from "@/apis/wsdot-toll-rates/tollRates/tollRates.endpoints";
import { fetchTollTripInfo } from "@/apis/wsdot-toll-rates/tollTripInfo/tollTripInfo.endpoints";
import {
  fetchTollTripRates,
  fetchTripRatesByDate,
  fetchTripRatesByVersion,
} from "@/apis/wsdot-toll-rates/tollTripRates/tollTripRates.endpoints";
import { fetchTollTripVersion } from "@/apis/wsdot-toll-rates/tollTripVersion/tollTripVersion.endpoints";
import { wsdotTrafficFlowApi } from "@/apis/wsdot-traffic-flow/apiDefinition";
// ============================================================================
// WSDOT Traffic Flow API
// ============================================================================
import {
  fetchTrafficFlowById,
  fetchTrafficFlows,
} from "@/apis/wsdot-traffic-flow/flowData/flowData.endpoints";
import { wsdotTravelTimesApi } from "@/apis/wsdot-travel-times/apiDefinition";
// ============================================================================
// WSDOT Travel Times API
// ============================================================================
import {
  fetchTravelTimeById,
  fetchTravelTimes,
} from "@/apis/wsdot-travel-times/travelTimeRoutes/travelTimeRoutes.endpoints";
import { wsdotWeatherInformationApi } from "@/apis/wsdot-weather-information/apiDefinition";
// ============================================================================
// WSDOT Weather Information API
// ============================================================================
import {
  fetchCurrentWeatherForStations,
  fetchWeatherInformation,
  fetchWeatherInformationByStationId,
  searchWeatherInformation,
} from "@/apis/wsdot-weather-information/weatherInfo/weatherInfo.endpoints";
import { wsdotWeatherReadingsApi } from "@/apis/wsdot-weather-readings/apiDefinition";
import { fetchSubSurfaceMeasurements } from "@/apis/wsdot-weather-readings/subSurfaceMeasurements/subSurfaceMeasurements.endpoints";
import { fetchSurfaceMeasurements } from "@/apis/wsdot-weather-readings/surfaceMeasurements/surfaceMeasurements.endpoints";
// ============================================================================
// WSDOT Weather Readings API
// ============================================================================
import { fetchWeatherReadings } from "@/apis/wsdot-weather-readings/weatherReadings/weatherReadings.endpoints";
import { wsdotWeatherStationsApi } from "@/apis/wsdot-weather-stations/apiDefinition";
// ============================================================================
// WSDOT Weather Stations API
// ============================================================================
import { fetchWeatherStations } from "@/apis/wsdot-weather-stations/weatherStations/weatherStations.endpoints";
import { wsfFaresApi } from "@/apis/wsf-fares/apiDefinition";
// ============================================================================
// WSF Fares API
// ============================================================================
import { fetchCacheFlushDateFares } from "@/apis/wsf-fares/cacheFlushDate/cacheFlushDate.endpoints";
import {
  fetchFareLineItemsBasic,
  fetchFareLineItemsByTripDateAndTerminals,
  fetchFareLineItemsVerbose,
} from "@/apis/wsf-fares/fareLineItems/fareLineItems.endpoints";
import { fetchFareTotalsByTripDateAndRoute } from "@/apis/wsf-fares/fareTotals/fareTotals.endpoints";
import {
  fetchTerminalComboFares,
  fetchTerminalComboFaresVerbose,
} from "@/apis/wsf-fares/terminalCombo/terminalCombo.endpoints";
import {
  fetchTerminalFares,
  fetchTerminalMatesFares,
} from "@/apis/wsf-fares/terminals/terminals.endpoints";
import { fetchFaresValidDateRange } from "@/apis/wsf-fares/validDateRange/validDateRange.endpoints";
// ============================================================================
// WSF Schedule API
// ============================================================================
import { fetchActiveSeasons } from "@/apis/wsf-schedule/activeSeasons/activeSeasons.endpoints";
import { wsfScheduleApi } from "@/apis/wsf-schedule/apiDefinition";
import { fetchCacheFlushDateSchedule } from "@/apis/wsf-schedule/cacheFlushDate/cacheFlushDate.endpoints";
import {
  fetchRouteDetailsByTripDate,
  fetchRouteDetailsByTripDateAndRouteId,
  fetchRouteDetailsByTripDateAndTerminals,
} from "@/apis/wsf-schedule/routeDetails/routeDetails.endpoints";
import {
  fetchRoutesByTripDate,
  fetchRoutesByTripDateAndTerminals,
} from "@/apis/wsf-schedule/routes/routes.endpoints";
import {
  fetchAllSailingsBySchedRouteID,
  fetchSailingsByRouteID,
} from "@/apis/wsf-schedule/sailings/sailings.endpoints";
import { fetchScheduleAlerts } from "@/apis/wsf-schedule/scheduleAlerts/scheduleAlerts.endpoints";
import {
  fetchScheduledRoutes,
  fetchScheduledRoutesById,
} from "@/apis/wsf-schedule/scheduledRoutes/scheduledRoutes.endpoints";
import {
  fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds,
  fetchScheduleByTripDateAndRouteId,
} from "@/apis/wsf-schedule/schedules/schedules.endpoints";
import {
  fetchScheduleTodayByRoute,
  fetchScheduleTodayByTerminals,
} from "@/apis/wsf-schedule/scheduleToday/scheduleToday.endpoints";
import { fetchRoutesHavingServiceDisruptionsByTripDate } from "@/apis/wsf-schedule/serviceDisruptions/serviceDisruptions.endpoints";
import { fetchTerminalMatesSchedule } from "@/apis/wsf-schedule/terminalMates/terminalMates.endpoints";
import {
  fetchTerminals,
  fetchTerminalsAndMates,
  fetchTerminalsAndMatesByRoute,
} from "@/apis/wsf-schedule/terminals/terminals.endpoints";
import {
  fetchTimeAdjustments,
  fetchTimeAdjustmentsByRoute,
  fetchTimeAdjustmentsBySchedRoute,
} from "@/apis/wsf-schedule/timeAdjustments/timeAdjustments.endpoints";
import { fetchScheduleValidDateRange } from "@/apis/wsf-schedule/validDateRange/validDateRange.endpoints";
import { wsfTerminalsApi } from "@/apis/wsf-terminals/apiDefinition";
// ============================================================================
// WSF Terminals API
// ============================================================================
import { fetchCacheFlushDateTerminals } from "@/apis/wsf-terminals/cacheFlushDate/cacheFlushDate.endpoints";
import {
  fetchTerminalBasics,
  fetchTerminalBasicsByTerminalId,
} from "@/apis/wsf-terminals/terminalBasics/terminalBasics.endpoints";
import {
  fetchTerminalBulletins,
  fetchTerminalBulletinsByTerminalId,
} from "@/apis/wsf-terminals/terminalBulletins/terminalBulletins.endpoints";
import {
  fetchTerminalLocations,
  fetchTerminalLocationsByTerminalId,
} from "@/apis/wsf-terminals/terminalLocations/terminalLocations.endpoints";
import {
  fetchTerminalSailingSpace,
  fetchTerminalSailingSpaceByTerminalId,
} from "@/apis/wsf-terminals/terminalSailingSpace/terminalSailingSpace.endpoints";
import {
  fetchTerminalTransports,
  fetchTerminalTransportsByTerminalId,
} from "@/apis/wsf-terminals/terminalTransports/terminalTransports.endpoints";
import {
  fetchTerminalVerbose,
  fetchTerminalVerboseByTerminalId,
} from "@/apis/wsf-terminals/terminalVerbose/terminalVerbose.endpoints";
import {
  fetchTerminalWaitTimes,
  fetchTerminalWaitTimesByTerminalId,
} from "@/apis/wsf-terminals/terminalWaitTimes/terminalWaitTimes.endpoints";
import { wsfVesselsApi } from "@/apis/wsf-vessels/apiDefinition";
// ============================================================================
// WSF Vessels API
// ============================================================================
import { fetchCacheFlushDateVessels } from "@/apis/wsf-vessels/cacheFlushDate/cacheFlushDate.endpoints";
import {
  fetchVesselAccommodations,
  fetchVesselAccommodationsByVesselId,
} from "@/apis/wsf-vessels/vesselAccommodations/vesselAccommodations.endpoints";
import {
  fetchVesselBasics,
  fetchVesselBasicsByVesselId,
} from "@/apis/wsf-vessels/vesselBasics/vesselBasics.endpoints";
import {
  fetchVesselHistories,
  fetchVesselHistoriesByVesselNameAndDateRange,
} from "@/apis/wsf-vessels/vesselHistories/vesselHistories.endpoints";
import {
  fetchVesselLocations,
  fetchVesselLocationsByVesselId,
} from "@/apis/wsf-vessels/vesselLocations/vesselLocations.endpoints";
import {
  fetchVesselStats,
  fetchVesselStatsByVesselId,
} from "@/apis/wsf-vessels/vesselStats/vesselStats.endpoints";
import {
  fetchVesselsVerbose,
  fetchVesselsVerboseByVesselId,
} from "@/apis/wsf-vessels/vesselVerbose/vesselVerbose.endpoints";
import type { Endpoint } from "./types";

/**
 * All endpoints from all APIs as a flat array
 *
 * This array contains all endpoints from all APIs flattened into a single
 * array for easy iteration and processing by CLI and e2e tests.
 * Each endpoint is extracted from its `descriptor` property.
 */
export const endpoints: Endpoint<unknown, unknown>[] = [
  // WSDOT Border Crossings API
  fetchBorderCrossings.descriptor,

  // WSDOT Bridge Clearances API
  fetchBridgeClearances.descriptor,
  fetchBridgeClearancesByRoute.descriptor,

  // WSDOT Commercial Vehicle Restrictions API
  fetchCommercialVehicleRestrictions.descriptor,
  fetchCommercialVehicleRestrictionsWithId.descriptor,

  // WSDOT Highway Alerts API
  fetchMapAreas.descriptor,
  fetchEventCategories.descriptor,
  fetchAlerts.descriptor,
  fetchAlertById.descriptor,
  fetchAlertsByRegionId.descriptor,
  fetchAlertsByMapArea.descriptor,
  searchAlerts.descriptor,

  // WSDOT Highway Cameras API
  fetchHighwayCameras.descriptor,
  searchHighwayCamerasByRouteAndMilepost.descriptor,
  fetchHighwayCameraByCameraId.descriptor,

  // WSDOT Mountain Pass Conditions API
  fetchMountainPassConditionById.descriptor,
  fetchMountainPassConditions.descriptor,

  // WSDOT Toll Rates API
  fetchTollRates.descriptor,
  fetchTollTripInfo.descriptor,
  fetchTollTripRates.descriptor,
  fetchTripRatesByDate.descriptor,
  fetchTripRatesByVersion.descriptor,
  fetchTollTripVersion.descriptor,

  // WSDOT Traffic Flow API
  fetchTrafficFlows.descriptor,
  fetchTrafficFlowById.descriptor,

  // WSDOT Travel Times API
  fetchTravelTimeById.descriptor,
  fetchTravelTimes.descriptor,

  // WSDOT Weather Information API
  fetchWeatherInformation.descriptor,
  fetchWeatherInformationByStationId.descriptor,
  fetchCurrentWeatherForStations.descriptor,
  searchWeatherInformation.descriptor,

  // WSDOT Weather Readings API
  fetchWeatherReadings.descriptor,
  fetchSurfaceMeasurements.descriptor,
  fetchSubSurfaceMeasurements.descriptor,

  // WSDOT Weather Stations API
  fetchWeatherStations.descriptor,

  // WSF Fares API
  fetchCacheFlushDateFares.descriptor,
  fetchFareLineItemsByTripDateAndTerminals.descriptor,
  fetchFareLineItemsBasic.descriptor,
  fetchFareLineItemsVerbose.descriptor,
  fetchFareTotalsByTripDateAndRoute.descriptor,
  fetchTerminalComboFares.descriptor,
  fetchTerminalComboFaresVerbose.descriptor,
  fetchTerminalFares.descriptor,
  fetchTerminalMatesFares.descriptor,
  fetchFaresValidDateRange.descriptor,

  // WSF Schedule API
  fetchActiveSeasons.descriptor,
  fetchCacheFlushDateSchedule.descriptor,
  fetchRouteDetailsByTripDate.descriptor,
  fetchRouteDetailsByTripDateAndRouteId.descriptor,
  fetchRouteDetailsByTripDateAndTerminals.descriptor,
  fetchRoutesByTripDate.descriptor,
  fetchRoutesByTripDateAndTerminals.descriptor,
  fetchScheduleAlerts.descriptor,
  fetchScheduleTodayByRoute.descriptor,
  fetchScheduleTodayByTerminals.descriptor,
  fetchAllSailingsBySchedRouteID.descriptor,
  fetchSailingsByRouteID.descriptor,
  fetchScheduledRoutes.descriptor,
  fetchScheduledRoutesById.descriptor,
  fetchScheduleByTripDateAndRouteId.descriptor,
  fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds.descriptor,
  fetchTerminalMatesSchedule.descriptor,
  fetchTerminals.descriptor,
  fetchTerminalsAndMates.descriptor,
  fetchTerminalsAndMatesByRoute.descriptor,
  fetchTimeAdjustments.descriptor,
  fetchTimeAdjustmentsByRoute.descriptor,
  fetchTimeAdjustmentsBySchedRoute.descriptor,
  fetchRoutesHavingServiceDisruptionsByTripDate.descriptor,
  fetchScheduleValidDateRange.descriptor,

  // WSF Terminals API
  fetchCacheFlushDateTerminals.descriptor,
  fetchTerminalBasics.descriptor,
  fetchTerminalBasicsByTerminalId.descriptor,
  fetchTerminalBulletins.descriptor,
  fetchTerminalBulletinsByTerminalId.descriptor,
  fetchTerminalLocations.descriptor,
  fetchTerminalLocationsByTerminalId.descriptor,
  fetchTerminalSailingSpace.descriptor,
  fetchTerminalSailingSpaceByTerminalId.descriptor,
  fetchTerminalTransports.descriptor,
  fetchTerminalTransportsByTerminalId.descriptor,
  fetchTerminalVerbose.descriptor,
  fetchTerminalVerboseByTerminalId.descriptor,
  fetchTerminalWaitTimes.descriptor,
  fetchTerminalWaitTimesByTerminalId.descriptor,

  // WSF Vessels API
  fetchCacheFlushDateVessels.descriptor,
  fetchVesselAccommodations.descriptor,
  fetchVesselAccommodationsByVesselId.descriptor,
  fetchVesselBasics.descriptor,
  fetchVesselBasicsByVesselId.descriptor,
  fetchVesselHistories.descriptor,
  fetchVesselHistoriesByVesselNameAndDateRange.descriptor,
  fetchVesselLocations.descriptor,
  fetchVesselLocationsByVesselId.descriptor,
  fetchVesselStats.descriptor,
  fetchVesselStatsByVesselId.descriptor,
  fetchVesselsVerbose.descriptor,
  fetchVesselsVerboseByVesselId.descriptor,
];

/**
 * All APIs with their endpoint groups
 *
 * This object provides access to APIs grouped by name for more structured
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
