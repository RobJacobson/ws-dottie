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
import { apis } from "@/apis/shared/apis";
import type { EndpointGroupMeta, EndpointMeta } from "@/apis/types";
// Import endpoint groups and metadata for building endpoints array
import { borderCrossingsMeta } from "@/apis/wsdot-border-crossings/borderCrossingData/borderCrossings";
// ============================================================================
// WSDOT Border Crossings API
// ============================================================================
import { borderCrossingDataGroup } from "@/apis/wsdot-border-crossings/borderCrossingData/shared/borderCrossingData.endpoints";
import { bridgeClearancesMeta } from "@/apis/wsdot-bridge-clearances/bridgeClearances/bridgeClearances";
import { bridgeClearancesByRouteMeta } from "@/apis/wsdot-bridge-clearances/bridgeClearances/bridgeClearancesByRoute";
// ============================================================================
// WSDOT Bridge Clearances API
// ============================================================================
import { bridgeClearancesGroup } from "@/apis/wsdot-bridge-clearances/bridgeClearances/shared/bridgeClearances.endpoints";
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
import { eventCategoriesMeta } from "@/apis/wsdot-highway-alerts/eventCategories/eventCategories";
import { eventCategoriesGroup } from "@/apis/wsdot-highway-alerts/eventCategories/shared/eventCategories.endpoints";
import { alertByIdMeta } from "@/apis/wsdot-highway-alerts/highwayAlerts/alertById";
import { alertsMeta } from "@/apis/wsdot-highway-alerts/highwayAlerts/alerts";
import { alertsByMapAreaMeta } from "@/apis/wsdot-highway-alerts/highwayAlerts/alertsByMapArea";
import { alertsByRegionIdMeta } from "@/apis/wsdot-highway-alerts/highwayAlerts/alertsByRegionId";
import { searchAlertsMeta } from "@/apis/wsdot-highway-alerts/highwayAlerts/searchAlerts";
import { highwayAlertsGroup } from "@/apis/wsdot-highway-alerts/highwayAlerts/shared/highwayAlerts.endpoints";
import { highwayCameraByCameraIdMeta } from "@/apis/wsdot-highway-cameras/cameras/highwayCameraByCameraId";
import { highwayCamerasMeta } from "@/apis/wsdot-highway-cameras/cameras/highwayCameras";
import { searchHighwayCamerasByRouteAndMilepostMeta } from "@/apis/wsdot-highway-cameras/cameras/searchHighwayCamerasByRouteAndMilepost";
// ============================================================================
// WSDOT Highway Cameras API
// ============================================================================
import { camerasGroup } from "@/apis/wsdot-highway-cameras/cameras/shared/cameras.endpoints";
import { mountainPassConditionByIdMeta } from "@/apis/wsdot-mountain-pass-conditions/passConditions/mountainPassConditionById";
import { mountainPassConditionsMeta } from "@/apis/wsdot-mountain-pass-conditions/passConditions/mountainPassConditions";
// ============================================================================
// WSDOT Mountain Pass Conditions API
// ============================================================================
import { passConditionsGroup } from "@/apis/wsdot-mountain-pass-conditions/passConditions/shared/passConditions.endpoints";
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
// ============================================================================
// WSDOT Traffic Flow API
// ============================================================================
import { flowDataGroup } from "@/apis/wsdot-traffic-flow/flowData/shared/flowData.endpoints";
import { trafficFlowByIdMeta } from "@/apis/wsdot-traffic-flow/flowData/trafficFlowById";
import { trafficFlowsMeta } from "@/apis/wsdot-traffic-flow/flowData/trafficFlows";
// ============================================================================
// WSDOT Travel Times API
// ============================================================================
import { travelTimeRoutesGroup } from "@/apis/wsdot-travel-times/travelTimeRoutes/shared/travelTimeRoutes.endpoints";
import { travelTimeByIdMeta } from "@/apis/wsdot-travel-times/travelTimeRoutes/travelTimeById";
import { travelTimesMeta } from "@/apis/wsdot-travel-times/travelTimeRoutes/travelTimes";
import { currentWeatherForStationsMeta } from "@/apis/wsdot-weather-information/weatherInfo/currentWeatherForStations";
import { searchWeatherInformationMeta } from "@/apis/wsdot-weather-information/weatherInfo/searchWeatherInformation";
// ============================================================================
// WSDOT Weather Information API
// ============================================================================
import { weatherInfoGroup } from "@/apis/wsdot-weather-information/weatherInfo/shared/weatherInfo.endpoints";
import { weatherInformationMeta } from "@/apis/wsdot-weather-information/weatherInfo/weatherInformation";
import { weatherInformationByStationIdMeta } from "@/apis/wsdot-weather-information/weatherInfo/weatherInformationByStationId";
// ============================================================================
// WSDOT Weather Readings API
// ============================================================================
import { subSurfaceMeasurementsGroup } from "@/apis/wsdot-weather-readings/subSurfaceMeasurements/shared/subSurfaceMeasurements.endpoints";
import { subSurfaceMeasurementsMeta } from "@/apis/wsdot-weather-readings/subSurfaceMeasurements/subSurfaceMeasurements";
import { surfaceMeasurementsGroup } from "@/apis/wsdot-weather-readings/surfaceMeasurements/shared/surfaceMeasurements.endpoints";
import { surfaceMeasurementsMeta } from "@/apis/wsdot-weather-readings/surfaceMeasurements/surfaceMeasurements";
import { weatherReadingsGroup } from "@/apis/wsdot-weather-readings/weatherReadings/shared/weatherReadings.endpoints";
import { weatherReadingsMeta } from "@/apis/wsdot-weather-readings/weatherReadings/weatherReadings";
// ============================================================================
// WSDOT Weather Stations API
// ============================================================================
import { weatherStationsGroup } from "@/apis/wsdot-weather-stations/weatherStations/shared/weatherStations.endpoints";
import { weatherStationsMeta } from "@/apis/wsdot-weather-stations/weatherStations/weatherStations";
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
import { buildDescriptor } from "@/shared/factories";
import type { Endpoint } from "./types";

/**
 * Endpoint mapping configuration
 *
 * Defines the mapping between API, group, and endpoint metadata
 * for generating endpoint descriptors.
 */
interface EndpointMapping<I, O> {
  /** API key from the apis object */
  apiKey: keyof typeof apis;
  /** Endpoint group metadata */
  group: EndpointGroupMeta;
  /** Endpoint metadata */
  meta: EndpointMeta<I, O>;
}

/**
 * Endpoint mappings configuration
 *
 * This array defines all endpoint mappings in a declarative format.
 * The actual endpoint descriptors are generated by mapping over this array.
 */
const endpointMappings: EndpointMapping<unknown, unknown>[] = [
  // WSDOT Border Crossings API
  {
    apiKey: "wsdot-border-crossings",
    group: borderCrossingDataGroup,
    meta: borderCrossingsMeta,
  },

  // WSDOT Bridge Clearances API
  {
    apiKey: "wsdot-bridge-clearances",
    group: bridgeClearancesGroup,
    meta: bridgeClearancesMeta,
  },
  {
    apiKey: "wsdot-bridge-clearances",
    group: bridgeClearancesGroup,
    meta: bridgeClearancesByRouteMeta,
  },

  // WSDOT Commercial Vehicle Restrictions API
  {
    apiKey: "wsdot-commercial-vehicle-restrictions",
    group: cvRestrictionDataGroup,
    meta: commercialVehicleRestrictionsMeta,
  },
  {
    apiKey: "wsdot-commercial-vehicle-restrictions",
    group: cvRestrictionDataWithIdGroup,
    meta: commercialVehicleRestrictionsWithIdMeta,
  },

  // WSDOT Highway Alerts API
  {
    apiKey: "wsdot-highway-alerts",
    group: alertAreasGroup,
    meta: mapAreasMeta,
  },
  {
    apiKey: "wsdot-highway-alerts",
    group: eventCategoriesGroup,
    meta: eventCategoriesMeta,
  },
  {
    apiKey: "wsdot-highway-alerts",
    group: highwayAlertsGroup,
    meta: alertsMeta,
  },
  {
    apiKey: "wsdot-highway-alerts",
    group: highwayAlertsGroup,
    meta: alertByIdMeta,
  },
  {
    apiKey: "wsdot-highway-alerts",
    group: highwayAlertsGroup,
    meta: alertsByRegionIdMeta,
  },
  {
    apiKey: "wsdot-highway-alerts",
    group: highwayAlertsGroup,
    meta: alertsByMapAreaMeta,
  },
  {
    apiKey: "wsdot-highway-alerts",
    group: highwayAlertsGroup,
    meta: searchAlertsMeta,
  },

  // WSDOT Highway Cameras API
  {
    apiKey: "wsdot-highway-cameras",
    group: camerasGroup,
    meta: highwayCamerasMeta,
  },
  {
    apiKey: "wsdot-highway-cameras",
    group: camerasGroup,
    meta: searchHighwayCamerasByRouteAndMilepostMeta,
  },
  {
    apiKey: "wsdot-highway-cameras",
    group: camerasGroup,
    meta: highwayCameraByCameraIdMeta,
  },

  // WSDOT Mountain Pass Conditions API
  {
    apiKey: "wsdot-mountain-pass-conditions",
    group: passConditionsGroup,
    meta: mountainPassConditionByIdMeta,
  },
  {
    apiKey: "wsdot-mountain-pass-conditions",
    group: passConditionsGroup,
    meta: mountainPassConditionsMeta,
  },

  // WSDOT Toll Rates API
  {
    apiKey: "wsdot-toll-rates",
    group: tollRatesGroup,
    meta: tollRatesMeta,
  },
  {
    apiKey: "wsdot-toll-rates",
    group: tollTripInfoGroup,
    meta: tollTripInfoMeta,
  },
  {
    apiKey: "wsdot-toll-rates",
    group: tollTripRatesGroup,
    meta: tollTripRatesMeta,
  },
  {
    apiKey: "wsdot-toll-rates",
    group: tollTripRatesGroup,
    meta: tripRatesByDateMeta,
  },
  {
    apiKey: "wsdot-toll-rates",
    group: tollTripRatesGroup,
    meta: tripRatesByVersionMeta,
  },
  {
    apiKey: "wsdot-toll-rates",
    group: tollTripVersionGroup,
    meta: tollTripVersionMeta,
  },

  // WSDOT Traffic Flow API
  {
    apiKey: "wsdot-traffic-flow",
    group: flowDataGroup,
    meta: trafficFlowByIdMeta,
  },
  {
    apiKey: "wsdot-traffic-flow",
    group: flowDataGroup,
    meta: trafficFlowsMeta,
  },

  // WSDOT Travel Times API
  {
    apiKey: "wsdot-travel-times",
    group: travelTimeRoutesGroup,
    meta: travelTimeByIdMeta,
  },
  {
    apiKey: "wsdot-travel-times",
    group: travelTimeRoutesGroup,
    meta: travelTimesMeta,
  },

  // WSDOT Weather Information API
  {
    apiKey: "wsdot-weather-information",
    group: weatherInfoGroup,
    meta: weatherInformationMeta,
  },
  {
    apiKey: "wsdot-weather-information",
    group: weatherInfoGroup,
    meta: weatherInformationByStationIdMeta,
  },
  {
    apiKey: "wsdot-weather-information",
    group: weatherInfoGroup,
    meta: currentWeatherForStationsMeta,
  },
  {
    apiKey: "wsdot-weather-information",
    group: weatherInfoGroup,
    meta: searchWeatherInformationMeta,
  },

  // WSDOT Weather Readings API
  {
    apiKey: "wsdot-weather-readings",
    group: weatherReadingsGroup,
    meta: weatherReadingsMeta,
  },
  {
    apiKey: "wsdot-weather-readings",
    group: surfaceMeasurementsGroup,
    meta: surfaceMeasurementsMeta,
  },
  {
    apiKey: "wsdot-weather-readings",
    group: subSurfaceMeasurementsGroup,
    meta: subSurfaceMeasurementsMeta,
  },

  // WSDOT Weather Stations API
  {
    apiKey: "wsdot-weather-stations",
    group: weatherStationsGroup,
    meta: weatherStationsMeta,
  },

  // WSF Fares API
  {
    apiKey: "wsf-fares",
    group: cacheFlushDateFaresGroup,
    meta: cacheFlushDateFaresMeta,
  },
  {
    apiKey: "wsf-fares",
    group: fareLineItemsGroup,
    meta: fareLineItemsBasicMeta,
  },
  {
    apiKey: "wsf-fares",
    group: fareLineItemsGroup,
    meta: fareLineItemsByTripDateAndTerminalsMeta,
  },
  {
    apiKey: "wsf-fares",
    group: fareLineItemsGroup,
    meta: fareLineItemsVerboseMeta,
  },
  {
    apiKey: "wsf-fares",
    group: fareTotalsGroup,
    meta: fareTotalsByTripDateAndRouteMeta,
  },
  {
    apiKey: "wsf-fares",
    group: terminalComboGroup,
    meta: terminalComboFaresMeta,
  },
  {
    apiKey: "wsf-fares",
    group: terminalComboGroup,
    meta: terminalComboFaresVerboseMeta,
  },
  {
    apiKey: "wsf-fares",
    group: terminalsGroup,
    meta: terminalFaresMeta,
  },
  {
    apiKey: "wsf-fares",
    group: terminalsGroup,
    meta: terminalMatesFaresMeta,
  },
  {
    apiKey: "wsf-fares",
    group: validDateRangeGroup,
    meta: faresValidDateRangeMeta,
  },

  // WSF Schedule API
  {
    apiKey: "wsf-schedule",
    group: activeSeasonsGroup,
    meta: activeSeasonsMeta,
  },
  {
    apiKey: "wsf-schedule",
    group: cacheFlushDateScheduleGroup,
    meta: cacheFlushDateScheduleMeta,
  },
  {
    apiKey: "wsf-schedule",
    group: routeDetailsGroup,
    meta: routeDetailsByTripDateMeta,
  },
  {
    apiKey: "wsf-schedule",
    group: routeDetailsGroup,
    meta: routeDetailsByTripDateAndRouteIdMeta,
  },
  {
    apiKey: "wsf-schedule",
    group: routeDetailsGroup,
    meta: routeDetailsByTripDateAndTerminalsMeta,
  },
  {
    apiKey: "wsf-schedule",
    group: routesGroup,
    meta: routesByTripDateMeta,
  },
  {
    apiKey: "wsf-schedule",
    group: routesGroup,
    meta: routesByTripDateAndTerminalsMeta,
  },
  {
    apiKey: "wsf-schedule",
    group: sailingsGroup,
    meta: allSailingsBySchedRouteIDMeta,
  },
  {
    apiKey: "wsf-schedule",
    group: sailingsGroup,
    meta: sailingsByRouteIDMeta,
  },
  {
    apiKey: "wsf-schedule",
    group: scheduleAlertsGroup,
    meta: scheduleAlertsMeta,
  },
  {
    apiKey: "wsf-schedule",
    group: scheduledRoutesGroup,
    meta: scheduledRoutesMeta,
  },
  {
    apiKey: "wsf-schedule",
    group: scheduledRoutesGroup,
    meta: scheduledRoutesByIdMeta,
  },
  {
    apiKey: "wsf-schedule",
    group: schedulesGroup,
    meta: scheduleByTripDateAndRouteIdMeta,
  },
  {
    apiKey: "wsf-schedule",
    group: schedulesGroup,
    meta: scheduleByTripDateAndDepartingTerminalIdAndTerminalIdsMeta,
  },
  {
    apiKey: "wsf-schedule",
    group: scheduleTodayGroup,
    meta: scheduleTodayByRouteMeta,
  },
  {
    apiKey: "wsf-schedule",
    group: scheduleTodayGroup,
    meta: scheduleTodayByTerminalsMeta,
  },
  {
    apiKey: "wsf-schedule",
    group: serviceDisruptionsGroup,
    meta: routesHavingServiceDisruptionsByTripDateMeta,
  },
  {
    apiKey: "wsf-schedule",
    group: scheduleTerminalMatesGroup,
    meta: terminalMatesScheduleMeta,
  },
  {
    apiKey: "wsf-schedule",
    group: scheduleTerminalsGroup,
    meta: terminalsMeta,
  },
  {
    apiKey: "wsf-schedule",
    group: scheduleTerminalsGroup,
    meta: terminalsAndMatesMeta,
  },
  {
    apiKey: "wsf-schedule",
    group: scheduleTerminalsGroup,
    meta: terminalsAndMatesByRouteMeta,
  },
  {
    apiKey: "wsf-schedule",
    group: timeAdjustmentsGroup,
    meta: timeAdjustmentsMeta,
  },
  {
    apiKey: "wsf-schedule",
    group: timeAdjustmentsGroup,
    meta: timeAdjustmentsByRouteMeta,
  },
  {
    apiKey: "wsf-schedule",
    group: timeAdjustmentsGroup,
    meta: timeAdjustmentsBySchedRouteMeta,
  },
  {
    apiKey: "wsf-schedule",
    group: scheduleValidDateRangeGroup,
    meta: scheduleValidDateRangeMeta,
  },

  // WSF Terminals API
  {
    apiKey: "wsf-terminals",
    group: cacheFlushDateTerminalsGroup,
    meta: cacheFlushDateTerminalsMeta,
  },
  {
    apiKey: "wsf-terminals",
    group: terminalBasicsGroup,
    meta: terminalBasicsMeta,
  },
  {
    apiKey: "wsf-terminals",
    group: terminalBasicsGroup,
    meta: terminalBasicsByTerminalIdMeta,
  },
  {
    apiKey: "wsf-terminals",
    group: terminalBulletinsGroup,
    meta: terminalBulletinsMeta,
  },
  {
    apiKey: "wsf-terminals",
    group: terminalBulletinsGroup,
    meta: terminalBulletinsByTerminalIdMeta,
  },
  {
    apiKey: "wsf-terminals",
    group: terminalLocationsGroup,
    meta: terminalLocationsMeta,
  },
  {
    apiKey: "wsf-terminals",
    group: terminalLocationsGroup,
    meta: terminalLocationsByTerminalIdMeta,
  },
  {
    apiKey: "wsf-terminals",
    group: terminalSailingSpaceGroup,
    meta: terminalSailingSpaceMeta,
  },
  {
    apiKey: "wsf-terminals",
    group: terminalSailingSpaceGroup,
    meta: terminalSailingSpaceByTerminalIdMeta,
  },
  {
    apiKey: "wsf-terminals",
    group: terminalTransportsGroup,
    meta: terminalTransportsMeta,
  },
  {
    apiKey: "wsf-terminals",
    group: terminalTransportsGroup,
    meta: terminalTransportsByTerminalIdMeta,
  },
  {
    apiKey: "wsf-terminals",
    group: terminalVerboseGroup,
    meta: terminalVerboseMeta,
  },
  {
    apiKey: "wsf-terminals",
    group: terminalVerboseGroup,
    meta: terminalVerboseByTerminalIdMeta,
  },
  {
    apiKey: "wsf-terminals",
    group: terminalWaitTimesGroup,
    meta: terminalWaitTimesMeta,
  },
  {
    apiKey: "wsf-terminals",
    group: terminalWaitTimesGroup,
    meta: terminalWaitTimesByTerminalIdMeta,
  },

  // WSF Vessels API
  {
    apiKey: "wsf-vessels",
    group: cacheFlushDateVesselsGroup,
    meta: cacheFlushDateVesselsMeta,
  },
  {
    apiKey: "wsf-vessels",
    group: vesselAccommodationsGroup,
    meta: vesselAccommodationsMeta,
  },
  {
    apiKey: "wsf-vessels",
    group: vesselAccommodationsGroup,
    meta: vesselAccommodationsByVesselIdMeta,
  },
  {
    apiKey: "wsf-vessels",
    group: vesselBasicsGroup,
    meta: vesselBasicsMeta,
  },
  {
    apiKey: "wsf-vessels",
    group: vesselBasicsGroup,
    meta: vesselBasicsByVesselIdMeta,
  },
  {
    apiKey: "wsf-vessels",
    group: vesselHistoriesGroup,
    meta: vesselHistoriesMeta,
  },
  {
    apiKey: "wsf-vessels",
    group: vesselHistoriesGroup,
    meta: vesselHistoriesByVesselNameAndDateRangeMeta,
  },
  {
    apiKey: "wsf-vessels",
    group: vesselLocationsGroup,
    meta: vesselLocationsMeta,
  },
  {
    apiKey: "wsf-vessels",
    group: vesselLocationsGroup,
    meta: vesselLocationsByVesselIdMeta,
  },
  {
    apiKey: "wsf-vessels",
    group: vesselStatsGroup,
    meta: vesselStatsMeta,
  },
  {
    apiKey: "wsf-vessels",
    group: vesselStatsGroup,
    meta: vesselStatsByVesselIdMeta,
  },
  {
    apiKey: "wsf-vessels",
    group: vesselVerboseGroup,
    meta: vesselsVerboseMeta,
  },
  {
    apiKey: "wsf-vessels",
    group: vesselVerboseGroup,
    meta: vesselsVerboseByVesselIdMeta,
  },
];

/**
 * All endpoints from all APIs as a flat array
 *
 * This array contains all endpoints from all APIs flattened into a single
 * array for easy iteration and processing by CLI and e2e tests.
 * Each endpoint is generated by mapping over the endpointMappings configuration.
 */
export const endpoints: Endpoint<unknown, unknown>[] = endpointMappings.map(
  ({ apiKey, group, meta }) => buildDescriptor(apis[apiKey], group, meta)
);

// Re-export apis from the single source of truth for backward compatibility
export { apis } from "@/apis/shared/apis";
