/**
 * WSF API function registry for CLI
 */

import * as WsfFares from "../../clients/wsf-fares";
import * as WsfSchedule from "../../clients/wsf-schedule";
import * as WsfTerminals from "../../clients/wsf-terminals";
import * as WsfVessels from "../../clients/wsf-vessels";

import type { FunctionRegistry } from "../types";

/**
 * WSF API function registry
 */
export const wsfRegistry: FunctionRegistry = {
  // Fares
  getFareLineItems: {
    module: WsfFares,
    function: WsfFares.getFareLineItems,
    paramsSchema: WsfFares.getFareLineItemsParamsSchema,
    description: "Get fare line items for WSF routes",
  },
  getFareLineItemsBasic: {
    module: WsfFares,
    function: WsfFares.getFareLineItemsBasic,
    paramsSchema: WsfFares.getFareLineItemsBasicParamsSchema,
    description: "Get basic fare line items for WSF routes",
  },
  getFareLineItemsVerbose: {
    module: WsfFares,
    function: WsfFares.getFareLineItemsVerbose,
    paramsSchema: WsfFares.getFareLineItemsVerboseParamsSchema,
    description: "Get verbose fare line items for WSF routes",
  },
  getFareTotals: {
    module: WsfFares,
    function: WsfFares.getFareTotals,
    paramsSchema: WsfFares.getFareTotalsParamsSchema,
    description: "Get fare totals for WSF routes",
  },
  getFaresTerminals: {
    module: WsfFares,
    function: WsfFares.getFaresTerminals,
    paramsSchema: WsfFares.getFaresTerminalsParamsSchema,
    description: "Get fare terminals data",
  },
  getFaresTerminalMates: {
    module: WsfFares,
    function: WsfFares.getFaresTerminalMates,
    paramsSchema: WsfFares.getFaresTerminalMatesParamsSchema,
    description: "Get fare terminal mates data",
  },
  getTerminalCombo: {
    module: WsfFares,
    function: WsfFares.getFaresTerminalCombo,
    paramsSchema: WsfFares.getFaresTerminalComboParamsSchema,
    description: "Get terminal combo data",
  },
  getTerminalComboVerbose: {
    module: WsfFares,
    function: WsfFares.getTerminalComboVerbose,
    paramsSchema: WsfFares.getTerminalComboVerboseParamsSchema,
    description: "Get verbose terminal combo data",
  },
  getFaresValidDateRange: {
    module: WsfFares,
    function: WsfFares.getFaresValidDateRange,
    paramsSchema: undefined, // No input parameters required
    description: "Get valid date range for fares",
  },

  // Schedule
  getRouteDetails: {
    module: WsfSchedule,
    function: WsfSchedule.getRouteDetailsByRoute,
    paramsSchema: WsfSchedule.getRouteDetailsByRouteParamsSchema,
    description: "Get route details for WSF schedule",
  },
  getRouteDetailsByTerminals: {
    module: WsfSchedule,
    function: WsfSchedule.getRouteDetailsByScheduleTerminals,
    paramsSchema: WsfSchedule.getRouteDetailsByScheduleTerminalsParamsSchema,
    description: "Get route details by terminals",
  },
  getRouteDetailsByRoute: {
    module: WsfSchedule,
    function: WsfSchedule.getRouteDetailsByRoute,
    paramsSchema: WsfSchedule.getRouteDetailsByRouteParamsSchema,
    description: "Get route details by route",
  },
  getRoutes: {
    module: WsfSchedule,
    function: WsfSchedule.getRoutesByScheduleTerminals,
    paramsSchema: WsfSchedule.getRoutesByScheduleTerminalsParamsSchema,
    description: "Get routes data",
  },
  getRoutesByTerminals: {
    module: WsfSchedule,
    function: WsfSchedule.getRoutesByScheduleTerminals,
    paramsSchema: WsfSchedule.getRoutesByScheduleTerminalsParamsSchema,
    description: "Get routes by terminals",
  },
  getRoutesWithDisruptions: {
    module: WsfSchedule,
    function: WsfSchedule.getRoutesWithDisruptions,
    paramsSchema: WsfSchedule.getRoutesWithDisruptionsParamsSchema,
    description: "Get routes with disruptions",
  },
  getScheduleByTerminals: {
    module: WsfSchedule,
    function: WsfSchedule.getScheduleByScheduleTerminals,
    paramsSchema: WsfSchedule.getScheduleByScheduleTerminalsParamsSchema,
    description: "Get schedule by terminals",
  },
  getScheduleByRoute: {
    module: WsfSchedule,
    function: WsfSchedule.getScheduleByRoute,
    paramsSchema: WsfSchedule.getScheduleByRouteParamsSchema,
    description: "Get schedule by route",
  },
  getScheduleTodayByTerminals: {
    module: WsfSchedule,
    function: WsfSchedule.getScheduleTodayByScheduleTerminals,
    paramsSchema: WsfSchedule.getScheduleTodayByScheduleTerminalsParamsSchema,
    description: "Get today's schedule by terminals",
  },
  getScheduleTodayByRoute: {
    module: WsfSchedule,
    function: WsfSchedule.getScheduleTodayByRoute,
    paramsSchema: WsfSchedule.getScheduleTodayByRouteParamsSchema,
    description: "Get today's schedule by route",
  },
  getSailings: {
    module: WsfSchedule,
    function: WsfSchedule.getSailings,
    paramsSchema: WsfSchedule.getSailingsParamsSchema,
    description: "Get sailings data",
  },
  getAllSailings: {
    module: WsfSchedule,
    function: WsfSchedule.getAllSailings,
    paramsSchema: WsfSchedule.getSailingsParamsSchema, // Reusing sailings schema
    description: "Get all sailings data",
  },
  getTerminals: {
    module: WsfSchedule,
    function: WsfSchedule.getScheduleTerminals,
    paramsSchema: WsfSchedule.getScheduleTerminalsParamsSchema,
    description: "Get terminals data",
  },
  getTerminalMates: {
    module: WsfSchedule,
    function: WsfSchedule.getTerminalMates,
    paramsSchema: WsfSchedule.getTerminalMatesParamsSchema,
    description: "Get terminal mates data",
  },
  getTerminalsAndMates: {
    module: WsfSchedule,
    function: WsfSchedule.getTerminalsAndMates,
    paramsSchema: WsfSchedule.getTerminalsAndMatesParamsSchema,
    description: "Get terminals and mates data",
  },
  getTerminalsAndMatesByRoute: {
    module: WsfSchedule,
    function: WsfSchedule.getTerminalsAndMatesByRoute,
    paramsSchema: WsfSchedule.getTerminalsAndMatesByRouteParamsSchema,
    description: "Get terminals and mates by route",
  },
  getActiveSeasons: {
    module: WsfSchedule,
    function: WsfSchedule.getActiveSeasons,
    paramsSchema: WsfSchedule.getActiveSeasonsParamsSchema,
    description: "Get active seasons data",
  },
  getAlerts: {
    module: WsfSchedule,
    function: WsfSchedule.getScheduleAlerts,
    paramsSchema: WsfSchedule.getScheduleAlertsParamsSchema,
    description: "Get alerts data",
  },
  getTimeAdjustments: {
    module: WsfSchedule,
    function: WsfSchedule.getTimeAdjustments,
    paramsSchema: WsfSchedule.getTimeAdjustmentsParamsSchema,
    description: "Get time adjustments data",
  },
  getTimeAdjustmentsByRoute: {
    module: WsfSchedule,
    function: WsfSchedule.getTimeAdjustmentsByRoute,
    paramsSchema: WsfSchedule.getTimeAdjustmentsByRouteParamsSchema,
    description: "Get time adjustments by route",
  },
  getScheduledRoutesBySeason: {
    module: WsfSchedule,
    function: WsfSchedule.getScheduledRoutesBySeason,
    paramsSchema: WsfSchedule.getScheduledRoutesBySeasonParamsSchema,
    description: "Get scheduled routes by season",
  },
  getValidDateRange: {
    module: WsfSchedule,
    function: WsfSchedule.getScheduleValidDateRange,
    paramsSchema: WsfSchedule.getValidDateRangeParamsSchema,
    description: "Get valid date range for schedule",
  },

  // Terminals
  getTerminalBasics: {
    module: WsfTerminals,
    function: WsfTerminals.getTerminalBasics,
    paramsSchema: WsfTerminals.getTerminalBasicsParamsSchema,
    description: "Get terminal basics data",
  },
  getTerminalBasicsByTerminalId: {
    module: WsfTerminals,
    function: WsfTerminals.getTerminalBasicsByTerminalId,
    paramsSchema: WsfTerminals.getTerminalBasicsByTerminalIdParamsSchema,
    description: "Get terminal basics by terminal ID",
  },
  getTerminalLocations: {
    module: WsfTerminals,
    function: WsfTerminals.getTerminalLocations,
    paramsSchema: WsfTerminals.getTerminalLocationsParamsSchema,
    description: "Get terminal locations data",
  },
  getTerminalLocationsByTerminalId: {
    module: WsfTerminals,
    function: WsfTerminals.getTerminalLocationsByTerminalId,
    paramsSchema: WsfTerminals.getTerminalLocationsByTerminalIdParamsSchema,
    description: "Get terminal locations by terminal ID",
  },
  getTerminalVerbose: {
    module: WsfTerminals,
    function: WsfTerminals.getTerminalVerbose,
    paramsSchema: WsfTerminals.getTerminalVerboseParamsSchema,
    description: "Get verbose terminal data",
  },
  getTerminalVerboseByTerminalId: {
    module: WsfTerminals,
    function: WsfTerminals.getTerminalVerboseByTerminalId,
    paramsSchema: WsfTerminals.getTerminalVerboseByTerminalIdParamsSchema,
    description: "Get verbose terminal data by terminal ID",
  },
  getTerminalSailingSpace: {
    module: WsfTerminals,
    function: WsfTerminals.getTerminalSailingSpace,
    paramsSchema: WsfTerminals.getTerminalSailingSpaceParamsSchema,
    description: "Get terminal sailing space data",
  },
  getTerminalSailingSpaceByTerminalId: {
    module: WsfTerminals,
    function: WsfTerminals.getTerminalSailingSpaceByTerminalId,
    paramsSchema: WsfTerminals.getTerminalSailingSpaceByTerminalIdParamsSchema,
    description: "Get terminal sailing space by terminal ID",
  },
  getTerminalWaitTimes: {
    module: WsfTerminals,
    function: WsfTerminals.getTerminalWaitTimes,
    paramsSchema: WsfTerminals.getTerminalWaitTimesParamsSchema,
    description: "Get terminal wait times data",
  },
  getTerminalWaitTimesByTerminalId: {
    module: WsfTerminals,
    function: WsfTerminals.getTerminalWaitTimesByTerminalId,
    paramsSchema: WsfTerminals.getTerminalWaitTimesByTerminalIdParamsSchema,
    description: "Get terminal wait times by terminal ID",
  },
  getTerminalBulletins: {
    module: WsfTerminals,
    function: WsfTerminals.getTerminalBulletins,
    paramsSchema: WsfTerminals.getTerminalBulletinsParamsSchema,
    description: "Get terminal bulletins data",
  },
  getTerminalBulletinsByTerminalId: {
    module: WsfTerminals,
    function: WsfTerminals.getTerminalBulletinsByTerminalId,
    paramsSchema: WsfTerminals.getTerminalBulletinsByTerminalIdParamsSchema,
    description: "Get terminal bulletins by terminal ID",
  },
  getTerminalTransports: {
    module: WsfTerminals,
    function: WsfTerminals.getTerminalTransports,
    paramsSchema: WsfTerminals.getTerminalTransportsParamsSchema,
    description: "Get terminal transports data",
  },
  getTerminalTransportsByTerminalId: {
    module: WsfTerminals,
    function: WsfTerminals.getTerminalTransportsByTerminalId,
    paramsSchema: WsfTerminals.getTerminalTransportsByTerminalIdParamsSchema,
    description: "Get terminal transports by terminal ID",
  },

  // Vessels
  getVesselBasics: {
    module: WsfVessels,
    function: WsfVessels.getVesselBasics,
    paramsSchema: WsfVessels.getVesselBasicsParamsSchema,
    description: "Get vessel basics data",
  },
  getVesselBasicsById: {
    module: WsfVessels,
    function: WsfVessels.getVesselBasicsById,
    paramsSchema: WsfVessels.getVesselBasicsByIdParamsSchema,
    description: "Get vessel basics by ID",
  },
  getVesselLocations: {
    module: WsfVessels,
    function: WsfVessels.getVesselLocations,
    paramsSchema: WsfVessels.getVesselLocationsParamsSchema,
    description: "Get vessel locations data",
  },
  getVesselLocationsByVesselId: {
    module: WsfVessels,
    function: WsfVessels.getVesselLocationsByVesselId,
    paramsSchema: WsfVessels.getVesselLocationsByVesselIdParamsSchema,
    description: "Get vessel locations by vessel ID",
  },
  getVesselVerbose: {
    module: WsfVessels,
    function: WsfVessels.getVesselVerbose,
    paramsSchema: WsfVessels.getVesselVerboseParamsSchema,
    description: "Get verbose vessel data",
  },
  getVesselVerboseById: {
    module: WsfVessels,
    function: WsfVessels.getVesselVerboseById,
    paramsSchema: WsfVessels.getVesselVerboseByIdParamsSchema,
    description: "Get verbose vessel data by ID",
  },
  getVesselStats: {
    module: WsfVessels,
    function: WsfVessels.getVesselStats,
    paramsSchema: WsfVessels.getVesselStatsParamsSchema,
    description: "Get vessel stats data",
  },
  getVesselStatsById: {
    module: WsfVessels,
    function: WsfVessels.getVesselStatsById,
    paramsSchema: WsfVessels.getVesselStatsByIdParamsSchema,
    description: "Get vessel stats by ID",
  },
  getVesselAccommodations: {
    module: WsfVessels,
    function: WsfVessels.getVesselAccommodations,
    paramsSchema: WsfVessels.getVesselAccommodationsParamsSchema,
    description: "Get vessel accommodations data",
  },
  getVesselAccommodationsById: {
    module: WsfVessels,
    function: WsfVessels.getVesselAccommodationsById,
    paramsSchema: WsfVessels.getVesselAccommodationsByIdParamsSchema,
    description: "Get vessel accommodations by ID",
  },
  getVesselHistory: {
    module: WsfVessels,
    function: WsfVessels.getVesselHistory,
    paramsSchema: WsfVessels.getVesselHistoryParamsSchema,
    description: "Get vessel history data",
  },
  getVesselHistoryByVesselAndDateRange: {
    module: WsfVessels,
    function: WsfVessels.getVesselHistoryByVesselAndDateRange,
    paramsSchema: WsfVessels.getVesselHistoryByVesselAndDateRangeParamsSchema,
    description: "Get vessel history by vessel and date range",
  },

  // Cache Flush Date
  getCacheFlushDate: {
    module: WsfVessels,
    function: WsfVessels.getVesselsCacheFlushDate,
    paramsSchema: WsfVessels.getVesselsCacheFlushDateParamsSchema,
    description: "Get cache flush date for WSF vessels API",
  },
};
