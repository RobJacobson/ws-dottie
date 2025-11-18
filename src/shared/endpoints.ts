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
import { apis as apiMetas } from "@/apis/shared/apis";
// Import all API definitions
import { wsdotBorderCrossingsApi } from "@/apis/wsdot-border-crossings/apiDefinition";
import { borderCrossingsMeta } from "@/apis/wsdot-border-crossings/borderCrossingData/borderCrossings";
// ============================================================================
// WSDOT Border Crossings API
// ============================================================================
import { borderCrossingDataGroup } from "@/apis/wsdot-border-crossings/borderCrossingData/shared/borderCrossingData.endpoints";
import { wsdotBridgeClearancesApi } from "@/apis/wsdot-bridge-clearances/apiDefinition";
import { bridgeClearancesMeta } from "@/apis/wsdot-bridge-clearances/bridgeClearances/bridgeClearances";
import { bridgeClearancesByRouteMeta } from "@/apis/wsdot-bridge-clearances/bridgeClearances/bridgeClearancesByRoute";
// ============================================================================
// WSDOT Bridge Clearances API
// ============================================================================
import { bridgeClearancesGroup } from "@/apis/wsdot-bridge-clearances/bridgeClearances/shared/bridgeClearances.endpoints";
import { wsdotCommercialVehicleRestrictionsApi } from "@/apis/wsdot-commercial-vehicle-restrictions/apiDefinition";
import { commercialVehicleRestrictionsMeta } from "@/apis/wsdot-commercial-vehicle-restrictions/cvRestrictionData/commercialVehicleRestrictions";
// ============================================================================
// WSDOT Commercial Vehicle Restrictions API
// ============================================================================
import { cvRestrictionDataGroup } from "@/apis/wsdot-commercial-vehicle-restrictions/cvRestrictionData/shared/cvRestrictionData.endpoints";
import { commercialVehicleRestrictionsWithIdMeta } from "@/apis/wsdot-commercial-vehicle-restrictions/cvRestrictionDataWithId/commercialVehicleRestrictionsWithId";
import { cvRestrictionDataWithIdGroup } from "@/apis/wsdot-commercial-vehicle-restrictions/cvRestrictionDataWithId/shared/cvRestrictionDataWithId.endpoints";
import { mapAreasMeta } from "@/apis/wsdot-highway-alerts/alertAreas/mapAreas";
// ============================================================================
// WSDOT Highway Alerts API
// ============================================================================
import { alertAreasGroup } from "@/apis/wsdot-highway-alerts/alertAreas/shared/alertAreas.endpoints";
import { wsdotHighwayAlertsApi } from "@/apis/wsdot-highway-alerts/apiDefinition";
import { eventCategoriesMeta } from "@/apis/wsdot-highway-alerts/eventCategories/eventCategories";
import { eventCategoriesGroup } from "@/apis/wsdot-highway-alerts/eventCategories/shared/eventCategories.endpoints";
import { alertByIdMeta } from "@/apis/wsdot-highway-alerts/highwayAlerts/alertById";
import { alertsMeta } from "@/apis/wsdot-highway-alerts/highwayAlerts/alerts";
import { alertsByMapAreaMeta } from "@/apis/wsdot-highway-alerts/highwayAlerts/alertsByMapArea";
import { alertsByRegionIdMeta } from "@/apis/wsdot-highway-alerts/highwayAlerts/alertsByRegionId";
import { searchAlertsMeta } from "@/apis/wsdot-highway-alerts/highwayAlerts/searchAlerts";
import { highwayAlertsGroup } from "@/apis/wsdot-highway-alerts/highwayAlerts/shared/highwayAlerts.endpoints";
import { wsdotHighwayCamerasApi } from "@/apis/wsdot-highway-cameras/apiDefinition";
import { highwayCameraByCameraIdMeta } from "@/apis/wsdot-highway-cameras/cameras/highwayCameraByCameraId";
import { highwayCamerasMeta } from "@/apis/wsdot-highway-cameras/cameras/highwayCameras";
import { searchHighwayCamerasByRouteAndMilepostMeta } from "@/apis/wsdot-highway-cameras/cameras/searchHighwayCamerasByRouteAndMilepost";
// ============================================================================
// WSDOT Highway Cameras API
// ============================================================================
import { camerasGroup } from "@/apis/wsdot-highway-cameras/cameras/shared/cameras.endpoints";
import { wsdotMountainPassConditionsApi } from "@/apis/wsdot-mountain-pass-conditions/apiDefinition";
import { mountainPassConditionByIdMeta } from "@/apis/wsdot-mountain-pass-conditions/passConditions/mountainPassConditionById";
import { mountainPassConditionsMeta } from "@/apis/wsdot-mountain-pass-conditions/passConditions/mountainPassConditions";
// ============================================================================
// WSDOT Mountain Pass Conditions API
// ============================================================================
import { passConditionsGroup } from "@/apis/wsdot-mountain-pass-conditions/passConditions/shared/passConditions.endpoints";
import { wsdotTollRatesApi } from "@/apis/wsdot-toll-rates/apiDefinition";
// ============================================================================
// WSDOT Toll Rates API
// ============================================================================
import { tollRatesGroup } from "@/apis/wsdot-toll-rates/tollRates/shared/tollRates.endpoints";
import { tollRatesMeta } from "@/apis/wsdot-toll-rates/tollRates/tollRates";
import { tollTripInfoGroup } from "@/apis/wsdot-toll-rates/tollTripInfo/shared/tollTripInfo.endpoints";
import { tollTripInfoMeta } from "@/apis/wsdot-toll-rates/tollTripInfo/tollTripInfo";
import { tollTripRatesGroup } from "@/apis/wsdot-toll-rates/tollTripRates/shared/tollTripRates.endpoints";
import { tollTripRatesMeta } from "@/apis/wsdot-toll-rates/tollTripRates/tollTripRates";
import { tripRatesByDateMeta } from "@/apis/wsdot-toll-rates/tollTripRates/tripRatesByDate";
import { tripRatesByVersionMeta } from "@/apis/wsdot-toll-rates/tollTripRates/tripRatesByVersion";
import { tollTripVersionGroup } from "@/apis/wsdot-toll-rates/tollTripVersion/shared/tollTripVersion.endpoints";
import { tollTripVersionMeta } from "@/apis/wsdot-toll-rates/tollTripVersion/tollTripVersion";
import { wsdotTrafficFlowApi } from "@/apis/wsdot-traffic-flow/apiDefinition";
// ============================================================================
// WSDOT Traffic Flow API
// ============================================================================
import { flowDataGroup } from "@/apis/wsdot-traffic-flow/flowData/shared/flowData.endpoints";
import { trafficFlowByIdMeta } from "@/apis/wsdot-traffic-flow/flowData/trafficFlowById";
import { trafficFlowsMeta } from "@/apis/wsdot-traffic-flow/flowData/trafficFlows";
import { wsdotTravelTimesApi } from "@/apis/wsdot-travel-times/apiDefinition";
// ============================================================================
// WSDOT Travel Times API
// ============================================================================
import { travelTimeRoutesGroup } from "@/apis/wsdot-travel-times/travelTimeRoutes/shared/travelTimeRoutes.endpoints";
import { travelTimeByIdMeta } from "@/apis/wsdot-travel-times/travelTimeRoutes/travelTimeById";
import { travelTimesMeta } from "@/apis/wsdot-travel-times/travelTimeRoutes/travelTimes";
import { wsdotWeatherInformationApi } from "@/apis/wsdot-weather-information/apiDefinition";
import { currentWeatherForStationsMeta } from "@/apis/wsdot-weather-information/weatherInfo/currentWeatherForStations";
import { searchWeatherInformationMeta } from "@/apis/wsdot-weather-information/weatherInfo/searchWeatherInformation";
// ============================================================================
// WSDOT Weather Information API
// ============================================================================
import { weatherInfoGroup } from "@/apis/wsdot-weather-information/weatherInfo/shared/weatherInfo.endpoints";
import { weatherInformationMeta } from "@/apis/wsdot-weather-information/weatherInfo/weatherInformation";
import { weatherInformationByStationIdMeta } from "@/apis/wsdot-weather-information/weatherInfo/weatherInformationByStationId";
import { wsdotWeatherReadingsApi } from "@/apis/wsdot-weather-readings/apiDefinition";
// ============================================================================
// WSDOT Weather Readings API
// ============================================================================
import { subSurfaceMeasurementsGroup } from "@/apis/wsdot-weather-readings/subSurfaceMeasurements/shared/subSurfaceMeasurements.endpoints";
import { subSurfaceMeasurementsMeta } from "@/apis/wsdot-weather-readings/subSurfaceMeasurements/subSurfaceMeasurements";
import { surfaceMeasurementsGroup } from "@/apis/wsdot-weather-readings/surfaceMeasurements/shared/surfaceMeasurements.endpoints";
import { surfaceMeasurementsMeta } from "@/apis/wsdot-weather-readings/surfaceMeasurements/surfaceMeasurements";
import { weatherReadingsGroup } from "@/apis/wsdot-weather-readings/weatherReadings/shared/weatherReadings.endpoints";
import { weatherReadingsMeta } from "@/apis/wsdot-weather-readings/weatherReadings/weatherReadings";
import { wsdotWeatherStationsApi } from "@/apis/wsdot-weather-stations/apiDefinition";
// ============================================================================
// WSDOT Weather Stations API
// ============================================================================
import { weatherStationsGroup } from "@/apis/wsdot-weather-stations/weatherStations/shared/weatherStations.endpoints";
import { weatherStationsMeta } from "@/apis/wsdot-weather-stations/weatherStations/weatherStations";
import { wsfFaresApi } from "@/apis/wsf-fares/apiDefinition";
// ============================================================================
// WSF Fares API
// ============================================================================
import {
  cacheFlushDateFaresGroup,
  cacheFlushDateFaresMeta,
} from "@/apis/wsf-fares/cacheFlushDate/shared/cacheFlushDate.endpoints";
import { fareLineItemsBasicMeta } from "@/apis/wsf-fares/fareLineItems/fareLineItemsBasic";
import { fareLineItemsByTripDateAndTerminalsMeta } from "@/apis/wsf-fares/fareLineItems/fareLineItemsByTripDateAndTerminals";
import { fareLineItemsVerboseMeta } from "@/apis/wsf-fares/fareLineItems/fareLineItemsVerbose";
import { fareLineItemsGroup } from "@/apis/wsf-fares/fareLineItems/shared/fareLineItems.endpoints";
import { fareTotalsByTripDateAndRouteMeta } from "@/apis/wsf-fares/fareTotals/fareTotalsByTripDateAndRoute";
import { fareTotalsGroup } from "@/apis/wsf-fares/fareTotals/shared/fareTotals.endpoints";
import { terminalComboGroup } from "@/apis/wsf-fares/terminalCombo/shared/terminalCombo.endpoints";
import { terminalComboFaresMeta } from "@/apis/wsf-fares/terminalCombo/terminalComboFares";
import { terminalComboFaresVerboseMeta } from "@/apis/wsf-fares/terminalCombo/terminalComboFaresVerbose";
import { terminalsGroup } from "@/apis/wsf-fares/terminals/shared/terminals.endpoints";
import { terminalFaresMeta } from "@/apis/wsf-fares/terminals/terminalFares";
import { terminalMatesFaresMeta } from "@/apis/wsf-fares/terminals/terminalMatesFares";
import { faresValidDateRangeMeta } from "@/apis/wsf-fares/validDateRange/faresValidDateRange";
import { validDateRangeGroup } from "@/apis/wsf-fares/validDateRange/shared/validDateRange.endpoints";
import { activeSeasonsMeta } from "@/apis/wsf-schedule/activeSeasons/activeSeasons";
// ============================================================================
// WSF Schedule API
// ============================================================================
import { activeSeasonsGroup } from "@/apis/wsf-schedule/activeSeasons/shared/activeSeasons.endpoints";
import { wsfScheduleApi } from "@/apis/wsf-schedule/apiDefinition";
import {
  cacheFlushDateScheduleGroup,
  cacheFlushDateScheduleMeta,
} from "@/apis/wsf-schedule/cacheFlushDate/shared/cacheFlushDate.endpoints";
import { routeDetailsByTripDateMeta } from "@/apis/wsf-schedule/routeDetails/routeDetailsByTripDate";
import { routeDetailsByTripDateAndRouteIdMeta } from "@/apis/wsf-schedule/routeDetails/routeDetailsByTripDateAndRouteId";
import { routeDetailsByTripDateAndTerminalsMeta } from "@/apis/wsf-schedule/routeDetails/routeDetailsByTripDateAndTerminals";
import { routeDetailsGroup } from "@/apis/wsf-schedule/routeDetails/shared/routeDetails.endpoints";
import { routesByTripDateMeta } from "@/apis/wsf-schedule/routes/routesByTripDate";
import { routesByTripDateAndTerminalsMeta } from "@/apis/wsf-schedule/routes/routesByTripDateAndTerminals";
import { routesGroup } from "@/apis/wsf-schedule/routes/shared/routes.endpoints";
import { allSailingsBySchedRouteIDMeta } from "@/apis/wsf-schedule/sailings/allSailingsBySchedRouteID";
import { sailingsByRouteIDMeta } from "@/apis/wsf-schedule/sailings/sailingsByRouteID";
import { sailingsGroup } from "@/apis/wsf-schedule/sailings/shared/sailings.endpoints";
import { scheduleAlertsMeta } from "@/apis/wsf-schedule/scheduleAlerts/scheduleAlerts";
import { scheduleAlertsGroup } from "@/apis/wsf-schedule/scheduleAlerts/shared/scheduleAlerts.endpoints";
import { scheduledRoutesMeta } from "@/apis/wsf-schedule/scheduledRoutes/scheduledRoutes";
import { scheduledRoutesByIdMeta } from "@/apis/wsf-schedule/scheduledRoutes/scheduledRoutesById";
import { scheduledRoutesGroup } from "@/apis/wsf-schedule/scheduledRoutes/shared/scheduledRoutes.endpoints";
import { scheduleByTripDateAndDepartingTerminalIdAndTerminalIdsMeta } from "@/apis/wsf-schedule/schedules/scheduleByTripDateAndDepartingTerminalIdAndTerminalIds";
import { scheduleByTripDateAndRouteIdMeta } from "@/apis/wsf-schedule/schedules/scheduleByTripDateAndRouteId";
import { schedulesGroup } from "@/apis/wsf-schedule/schedules/shared/schedules.endpoints";
import { scheduleTodayByRouteMeta } from "@/apis/wsf-schedule/scheduleToday/scheduleTodayByRoute";
import { scheduleTodayByTerminalsMeta } from "@/apis/wsf-schedule/scheduleToday/scheduleTodayByTerminals";
import { scheduleTodayGroup } from "@/apis/wsf-schedule/scheduleToday/shared/scheduleToday.endpoints";
import { routesHavingServiceDisruptionsByTripDateMeta } from "@/apis/wsf-schedule/serviceDisruptions/routesHavingServiceDisruptionsByTripDate";
import { serviceDisruptionsGroup } from "@/apis/wsf-schedule/serviceDisruptions/shared/serviceDisruptions.endpoints";
import { scheduleTerminalMatesGroup } from "@/apis/wsf-schedule/terminalMates/shared/terminalMates.endpoints";
import { terminalMatesScheduleMeta } from "@/apis/wsf-schedule/terminalMates/terminalMatesSchedule";
import { scheduleTerminalsGroup } from "@/apis/wsf-schedule/terminals/shared/terminals.endpoints";
import { terminalsMeta } from "@/apis/wsf-schedule/terminals/terminals";
import { terminalsAndMatesMeta } from "@/apis/wsf-schedule/terminals/terminalsAndMates";
import { terminalsAndMatesByRouteMeta } from "@/apis/wsf-schedule/terminals/terminalsAndMatesByRoute";
import { timeAdjustmentsGroup } from "@/apis/wsf-schedule/timeAdjustments/shared/timeAdjustments.endpoints";
import { timeAdjustmentsMeta } from "@/apis/wsf-schedule/timeAdjustments/timeAdjustments";
import { timeAdjustmentsByRouteMeta } from "@/apis/wsf-schedule/timeAdjustments/timeAdjustmentsByRoute";
import { timeAdjustmentsBySchedRouteMeta } from "@/apis/wsf-schedule/timeAdjustments/timeAdjustmentsBySchedRoute";
import { scheduleValidDateRangeMeta } from "@/apis/wsf-schedule/validDateRange/scheduleValidDateRange";
import { scheduleValidDateRangeGroup } from "@/apis/wsf-schedule/validDateRange/shared/validDateRange.endpoints";
import { wsfTerminalsApi } from "@/apis/wsf-terminals/apiDefinition";
// ============================================================================
// WSF Terminals API
// ============================================================================
import {
  cacheFlushDateTerminalsGroup,
  cacheFlushDateTerminalsMeta,
} from "@/apis/wsf-terminals/cacheFlushDate/shared/cacheFlushDate.endpoints";
import { terminalBasicsGroup } from "@/apis/wsf-terminals/terminalBasics/shared/terminalBasics.endpoints";
import { terminalBasicsMeta } from "@/apis/wsf-terminals/terminalBasics/terminalBasics";
import { terminalBasicsByTerminalIdMeta } from "@/apis/wsf-terminals/terminalBasics/terminalBasicsByTerminalId";
import { terminalBulletinsGroup } from "@/apis/wsf-terminals/terminalBulletins/shared/terminalBulletins.endpoints";
import { terminalBulletinsMeta } from "@/apis/wsf-terminals/terminalBulletins/terminalBulletins";
import { terminalBulletinsByTerminalIdMeta } from "@/apis/wsf-terminals/terminalBulletins/terminalBulletinsByTerminalId";
import { terminalLocationsGroup } from "@/apis/wsf-terminals/terminalLocations/shared/terminalLocations.endpoints";
import { terminalLocationsMeta } from "@/apis/wsf-terminals/terminalLocations/terminalLocations";
import { terminalLocationsByTerminalIdMeta } from "@/apis/wsf-terminals/terminalLocations/terminalLocationsByTerminalId";
import { terminalSailingSpaceGroup } from "@/apis/wsf-terminals/terminalSailingSpace/shared/terminalSailingSpace.endpoints";
import { terminalSailingSpaceMeta } from "@/apis/wsf-terminals/terminalSailingSpace/terminalSailingSpace";
import { terminalSailingSpaceByTerminalIdMeta } from "@/apis/wsf-terminals/terminalSailingSpace/terminalSailingSpaceByTerminalId";
import { terminalTransportsGroup } from "@/apis/wsf-terminals/terminalTransports/shared/terminalTransports.endpoints";
import { terminalTransportsMeta } from "@/apis/wsf-terminals/terminalTransports/terminalTransports";
import { terminalTransportsByTerminalIdMeta } from "@/apis/wsf-terminals/terminalTransports/terminalTransportsByTerminalId";
import { terminalVerboseGroup } from "@/apis/wsf-terminals/terminalVerbose/shared/terminalVerbose.endpoints";
import { terminalVerboseMeta } from "@/apis/wsf-terminals/terminalVerbose/terminalVerbose";
import { terminalVerboseByTerminalIdMeta } from "@/apis/wsf-terminals/terminalVerbose/terminalVerboseByTerminalId";
import { terminalWaitTimesGroup } from "@/apis/wsf-terminals/terminalWaitTimes/shared/terminalWaitTimes.endpoints";
import { terminalWaitTimesMeta } from "@/apis/wsf-terminals/terminalWaitTimes/terminalWaitTimes";
import { terminalWaitTimesByTerminalIdMeta } from "@/apis/wsf-terminals/terminalWaitTimes/terminalWaitTimesByTerminalId";
import { wsfVesselsApi } from "@/apis/wsf-vessels/apiDefinition";
// ============================================================================
// WSF Vessels API
// ============================================================================
import {
  cacheFlushDateVesselsGroup,
  cacheFlushDateVesselsMeta,
} from "@/apis/wsf-vessels/cacheFlushDate/shared/cacheFlushDate.endpoints";
import { vesselAccommodationsGroup } from "@/apis/wsf-vessels/vesselAccommodations/shared/vesselAccommodations.endpoints";
import { vesselAccommodationsMeta } from "@/apis/wsf-vessels/vesselAccommodations/vesselAccommodations";
import { vesselAccommodationsByVesselIdMeta } from "@/apis/wsf-vessels/vesselAccommodations/vesselAccommodationsByVesselId";
import { vesselBasicsGroup } from "@/apis/wsf-vessels/vesselBasics/shared/vesselBasics.endpoints";
import { vesselBasicsMeta } from "@/apis/wsf-vessels/vesselBasics/vesselBasics";
import { vesselBasicsByVesselIdMeta } from "@/apis/wsf-vessels/vesselBasics/vesselBasicsByVesselId";
import { vesselHistoriesGroup } from "@/apis/wsf-vessels/vesselHistories/shared/vesselHistories.endpoints";
import { vesselHistoriesMeta } from "@/apis/wsf-vessels/vesselHistories/vesselHistories";
import { vesselHistoriesByVesselNameAndDateRangeMeta } from "@/apis/wsf-vessels/vesselHistories/vesselHistoriesByVesselNameAndDateRange";
import { vesselLocationsGroup } from "@/apis/wsf-vessels/vesselLocations/shared/vesselLocations.endpoints";
import { vesselLocationsMeta } from "@/apis/wsf-vessels/vesselLocations/vesselLocations";
import { vesselLocationsByVesselIdMeta } from "@/apis/wsf-vessels/vesselLocations/vesselLocationsByVesselId";
import { vesselStatsGroup } from "@/apis/wsf-vessels/vesselStats/shared/vesselStats.endpoints";
import { vesselStatsMeta } from "@/apis/wsf-vessels/vesselStats/vesselStats";
import { vesselStatsByVesselIdMeta } from "@/apis/wsf-vessels/vesselStats/vesselStatsByVesselId";
import { vesselVerboseGroup } from "@/apis/wsf-vessels/vesselVerbose/shared/vesselVerbose.endpoints";
import { vesselsVerboseMeta } from "@/apis/wsf-vessels/vesselVerbose/vesselsVerbose";
import { vesselsVerboseByVesselIdMeta } from "@/apis/wsf-vessels/vesselVerbose/vesselsVerboseById";
import { buildDescriptor } from "@/shared/factories/metaEndpointFactory";
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
  buildDescriptor(
    apiMetas.wsdotBorderCrossings,
    borderCrossingDataGroup,
    borderCrossingsMeta
  ),

  // WSDOT Bridge Clearances API
  buildDescriptor(
    apiMetas.wsdotBridgeClearances,
    bridgeClearancesGroup,
    bridgeClearancesMeta
  ),
  buildDescriptor(
    apiMetas.wsdotBridgeClearances,
    bridgeClearancesGroup,
    bridgeClearancesByRouteMeta
  ),

  // WSDOT Commercial Vehicle Restrictions API
  buildDescriptor(
    apiMetas.wsdotCommercialVehicleRestrictions,
    cvRestrictionDataGroup,
    commercialVehicleRestrictionsMeta
  ),
  buildDescriptor(
    apiMetas.wsdotCommercialVehicleRestrictions,
    cvRestrictionDataWithIdGroup,
    commercialVehicleRestrictionsWithIdMeta
  ),

  // WSDOT Highway Alerts API
  buildDescriptor(apiMetas.wsdotHighwayAlerts, alertAreasGroup, mapAreasMeta),
  buildDescriptor(
    apiMetas.wsdotHighwayAlerts,
    eventCategoriesGroup,
    eventCategoriesMeta
  ),
  buildDescriptor(apiMetas.wsdotHighwayAlerts, highwayAlertsGroup, alertsMeta),
  buildDescriptor(
    apiMetas.wsdotHighwayAlerts,
    highwayAlertsGroup,
    alertByIdMeta
  ),
  buildDescriptor(
    apiMetas.wsdotHighwayAlerts,
    highwayAlertsGroup,
    alertsByRegionIdMeta
  ),
  buildDescriptor(
    apiMetas.wsdotHighwayAlerts,
    highwayAlertsGroup,
    alertsByMapAreaMeta
  ),
  buildDescriptor(
    apiMetas.wsdotHighwayAlerts,
    highwayAlertsGroup,
    searchAlertsMeta
  ),

  // WSDOT Highway Cameras API
  buildDescriptor(
    apiMetas.wsdotHighwayCameras,
    camerasGroup,
    highwayCamerasMeta
  ),
  buildDescriptor(
    apiMetas.wsdotHighwayCameras,
    camerasGroup,
    searchHighwayCamerasByRouteAndMilepostMeta
  ),
  buildDescriptor(
    apiMetas.wsdotHighwayCameras,
    camerasGroup,
    highwayCameraByCameraIdMeta
  ),

  // WSDOT Mountain Pass Conditions API
  buildDescriptor(
    apiMetas.wsdotMountainPassConditions,
    passConditionsGroup,
    mountainPassConditionByIdMeta
  ),
  buildDescriptor(
    apiMetas.wsdotMountainPassConditions,
    passConditionsGroup,
    mountainPassConditionsMeta
  ),

  // WSDOT Toll Rates API
  buildDescriptor(apiMetas.wsdotTollRates, tollRatesGroup, tollRatesMeta),
  buildDescriptor(apiMetas.wsdotTollRates, tollTripInfoGroup, tollTripInfoMeta),
  buildDescriptor(
    apiMetas.wsdotTollRates,
    tollTripRatesGroup,
    tollTripRatesMeta
  ),
  buildDescriptor(
    apiMetas.wsdotTollRates,
    tollTripRatesGroup,
    tripRatesByDateMeta
  ),
  buildDescriptor(
    apiMetas.wsdotTollRates,
    tollTripRatesGroup,
    tripRatesByVersionMeta
  ),
  buildDescriptor(
    apiMetas.wsdotTollRates,
    tollTripVersionGroup,
    tollTripVersionMeta
  ),

  // WSDOT Traffic Flow API
  buildDescriptor(
    apiMetas.wsdotTrafficFlow,
    flowDataGroup,
    trafficFlowByIdMeta
  ),
  buildDescriptor(apiMetas.wsdotTrafficFlow, flowDataGroup, trafficFlowsMeta),

  // WSDOT Travel Times API
  buildDescriptor(
    apiMetas.wsdotTravelTimes,
    travelTimeRoutesGroup,
    travelTimeByIdMeta
  ),
  buildDescriptor(
    apiMetas.wsdotTravelTimes,
    travelTimeRoutesGroup,
    travelTimesMeta
  ),

  // WSDOT Weather Information API
  buildDescriptor(
    apiMetas.wsdotWeatherInformation,
    weatherInfoGroup,
    weatherInformationMeta
  ),
  buildDescriptor(
    apiMetas.wsdotWeatherInformation,
    weatherInfoGroup,
    weatherInformationByStationIdMeta
  ),
  buildDescriptor(
    apiMetas.wsdotWeatherInformation,
    weatherInfoGroup,
    currentWeatherForStationsMeta
  ),
  buildDescriptor(
    apiMetas.wsdotWeatherInformation,
    weatherInfoGroup,
    searchWeatherInformationMeta
  ),

  // WSDOT Weather Readings API
  buildDescriptor(
    apiMetas.wsdotWeatherReadings,
    weatherReadingsGroup,
    weatherReadingsMeta
  ),
  buildDescriptor(
    apiMetas.wsdotWeatherReadings,
    surfaceMeasurementsGroup,
    surfaceMeasurementsMeta
  ),
  buildDescriptor(
    apiMetas.wsdotWeatherReadings,
    subSurfaceMeasurementsGroup,
    subSurfaceMeasurementsMeta
  ),

  // WSDOT Weather Stations API
  buildDescriptor(
    apiMetas.wsdotWeatherStations,
    weatherStationsGroup,
    weatherStationsMeta
  ),

  // WSF Fares API
  buildDescriptor(
    apiMetas.wsfFares,
    cacheFlushDateFaresGroup,
    cacheFlushDateFaresMeta
  ),
  buildDescriptor(
    apiMetas.wsfFares,
    fareLineItemsGroup,
    fareLineItemsBasicMeta
  ),
  buildDescriptor(
    apiMetas.wsfFares,
    fareLineItemsGroup,
    fareLineItemsByTripDateAndTerminalsMeta
  ),
  buildDescriptor(
    apiMetas.wsfFares,
    fareLineItemsGroup,
    fareLineItemsVerboseMeta
  ),
  buildDescriptor(
    apiMetas.wsfFares,
    fareTotalsGroup,
    fareTotalsByTripDateAndRouteMeta
  ),
  buildDescriptor(
    apiMetas.wsfFares,
    terminalComboGroup,
    terminalComboFaresMeta
  ),
  buildDescriptor(
    apiMetas.wsfFares,
    terminalComboGroup,
    terminalComboFaresVerboseMeta
  ),
  buildDescriptor(apiMetas.wsfFares, terminalsGroup, terminalFaresMeta),
  buildDescriptor(apiMetas.wsfFares, terminalsGroup, terminalMatesFaresMeta),
  buildDescriptor(
    apiMetas.wsfFares,
    validDateRangeGroup,
    faresValidDateRangeMeta
  ),

  // WSF Schedule API
  buildDescriptor(apiMetas.wsfSchedule, activeSeasonsGroup, activeSeasonsMeta),
  buildDescriptor(
    apiMetas.wsfSchedule,
    cacheFlushDateScheduleGroup,
    cacheFlushDateScheduleMeta
  ),
  buildDescriptor(
    apiMetas.wsfSchedule,
    routeDetailsGroup,
    routeDetailsByTripDateMeta
  ),
  buildDescriptor(
    apiMetas.wsfSchedule,
    routeDetailsGroup,
    routeDetailsByTripDateAndRouteIdMeta
  ),
  buildDescriptor(
    apiMetas.wsfSchedule,
    routeDetailsGroup,
    routeDetailsByTripDateAndTerminalsMeta
  ),
  buildDescriptor(apiMetas.wsfSchedule, routesGroup, routesByTripDateMeta),
  buildDescriptor(
    apiMetas.wsfSchedule,
    routesGroup,
    routesByTripDateAndTerminalsMeta
  ),
  buildDescriptor(
    apiMetas.wsfSchedule,
    sailingsGroup,
    allSailingsBySchedRouteIDMeta
  ),
  buildDescriptor(apiMetas.wsfSchedule, sailingsGroup, sailingsByRouteIDMeta),
  buildDescriptor(
    apiMetas.wsfSchedule,
    scheduleAlertsGroup,
    scheduleAlertsMeta
  ),
  buildDescriptor(
    apiMetas.wsfSchedule,
    scheduledRoutesGroup,
    scheduledRoutesMeta
  ),
  buildDescriptor(
    apiMetas.wsfSchedule,
    scheduledRoutesGroup,
    scheduledRoutesByIdMeta
  ),
  buildDescriptor(
    apiMetas.wsfSchedule,
    schedulesGroup,
    scheduleByTripDateAndRouteIdMeta
  ),
  buildDescriptor(
    apiMetas.wsfSchedule,
    schedulesGroup,
    scheduleByTripDateAndDepartingTerminalIdAndTerminalIdsMeta
  ),
  buildDescriptor(
    apiMetas.wsfSchedule,
    scheduleTodayGroup,
    scheduleTodayByRouteMeta
  ),
  buildDescriptor(
    apiMetas.wsfSchedule,
    scheduleTodayGroup,
    scheduleTodayByTerminalsMeta
  ),
  buildDescriptor(
    apiMetas.wsfSchedule,
    serviceDisruptionsGroup,
    routesHavingServiceDisruptionsByTripDateMeta
  ),
  buildDescriptor(
    apiMetas.wsfSchedule,
    scheduleTerminalMatesGroup,
    terminalMatesScheduleMeta
  ),
  buildDescriptor(apiMetas.wsfSchedule, scheduleTerminalsGroup, terminalsMeta),
  buildDescriptor(
    apiMetas.wsfSchedule,
    scheduleTerminalsGroup,
    terminalsAndMatesMeta
  ),
  buildDescriptor(
    apiMetas.wsfSchedule,
    scheduleTerminalsGroup,
    terminalsAndMatesByRouteMeta
  ),
  buildDescriptor(
    apiMetas.wsfSchedule,
    timeAdjustmentsGroup,
    timeAdjustmentsMeta
  ),
  buildDescriptor(
    apiMetas.wsfSchedule,
    timeAdjustmentsGroup,
    timeAdjustmentsByRouteMeta
  ),
  buildDescriptor(
    apiMetas.wsfSchedule,
    timeAdjustmentsGroup,
    timeAdjustmentsBySchedRouteMeta
  ),
  buildDescriptor(
    apiMetas.wsfSchedule,
    scheduleValidDateRangeGroup,
    scheduleValidDateRangeMeta
  ),

  // WSF Terminals API
  buildDescriptor(
    apiMetas.wsfTerminals,
    cacheFlushDateTerminalsGroup,
    cacheFlushDateTerminalsMeta
  ),
  buildDescriptor(
    apiMetas.wsfTerminals,
    terminalBasicsGroup,
    terminalBasicsMeta
  ),
  buildDescriptor(
    apiMetas.wsfTerminals,
    terminalBasicsGroup,
    terminalBasicsByTerminalIdMeta
  ),
  buildDescriptor(
    apiMetas.wsfTerminals,
    terminalBulletinsGroup,
    terminalBulletinsMeta
  ),
  buildDescriptor(
    apiMetas.wsfTerminals,
    terminalBulletinsGroup,
    terminalBulletinsByTerminalIdMeta
  ),
  buildDescriptor(
    apiMetas.wsfTerminals,
    terminalLocationsGroup,
    terminalLocationsMeta
  ),
  buildDescriptor(
    apiMetas.wsfTerminals,
    terminalLocationsGroup,
    terminalLocationsByTerminalIdMeta
  ),
  buildDescriptor(
    apiMetas.wsfTerminals,
    terminalSailingSpaceGroup,
    terminalSailingSpaceMeta
  ),
  buildDescriptor(
    apiMetas.wsfTerminals,
    terminalSailingSpaceGroup,
    terminalSailingSpaceByTerminalIdMeta
  ),
  buildDescriptor(
    apiMetas.wsfTerminals,
    terminalTransportsGroup,
    terminalTransportsMeta
  ),
  buildDescriptor(
    apiMetas.wsfTerminals,
    terminalTransportsGroup,
    terminalTransportsByTerminalIdMeta
  ),
  buildDescriptor(
    apiMetas.wsfTerminals,
    terminalVerboseGroup,
    terminalVerboseMeta
  ),
  buildDescriptor(
    apiMetas.wsfTerminals,
    terminalVerboseGroup,
    terminalVerboseByTerminalIdMeta
  ),
  buildDescriptor(
    apiMetas.wsfTerminals,
    terminalWaitTimesGroup,
    terminalWaitTimesMeta
  ),
  buildDescriptor(
    apiMetas.wsfTerminals,
    terminalWaitTimesGroup,
    terminalWaitTimesByTerminalIdMeta
  ),

  // WSF Vessels API
  buildDescriptor(
    apiMetas.wsfVessels,
    cacheFlushDateVesselsGroup,
    cacheFlushDateVesselsMeta
  ),
  buildDescriptor(
    apiMetas.wsfVessels,
    vesselAccommodationsGroup,
    vesselAccommodationsMeta
  ),
  buildDescriptor(
    apiMetas.wsfVessels,
    vesselAccommodationsGroup,
    vesselAccommodationsByVesselIdMeta
  ),
  buildDescriptor(apiMetas.wsfVessels, vesselBasicsGroup, vesselBasicsMeta),
  buildDescriptor(
    apiMetas.wsfVessels,
    vesselBasicsGroup,
    vesselBasicsByVesselIdMeta
  ),
  buildDescriptor(
    apiMetas.wsfVessels,
    vesselHistoriesGroup,
    vesselHistoriesMeta
  ),
  buildDescriptor(
    apiMetas.wsfVessels,
    vesselHistoriesGroup,
    vesselHistoriesByVesselNameAndDateRangeMeta
  ),
  buildDescriptor(
    apiMetas.wsfVessels,
    vesselLocationsGroup,
    vesselLocationsMeta
  ),
  buildDescriptor(
    apiMetas.wsfVessels,
    vesselLocationsGroup,
    vesselLocationsByVesselIdMeta
  ),
  buildDescriptor(apiMetas.wsfVessels, vesselStatsGroup, vesselStatsMeta),
  buildDescriptor(
    apiMetas.wsfVessels,
    vesselStatsGroup,
    vesselStatsByVesselIdMeta
  ),
  buildDescriptor(apiMetas.wsfVessels, vesselVerboseGroup, vesselsVerboseMeta),
  buildDescriptor(
    apiMetas.wsfVessels,
    vesselVerboseGroup,
    vesselsVerboseByVesselIdMeta
  ),
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
