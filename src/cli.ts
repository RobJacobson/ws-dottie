#!/usr/bin/env node

/**
 * ws-dottie CLI
 *
 * Command-line interface for accessing Washington State transportation APIs
 * (WSDOT and WSF) with smart caching and data transformation.
 *
 * Usage: ws-dottie <function-name> [params] [--pretty=false]
 */

import chalk from "chalk";
import { Command } from "commander";

// ============================================================================
// Import API modules
// ============================================================================

import * as WsdotBorderCrossings from "./api/wsdot-border-crossings";
import * as WsdotBridgeClearances from "./api/wsdot-bridge-clearances";
import * as WsdotCommercialVehicleRestrictions from "./api/wsdot-commercial-vehicle-restrictions";
import * as WsdotHighwayAlerts from "./api/wsdot-highway-alerts";
import * as WsdotHighwayCameras from "./api/wsdot-highway-cameras";
import * as WsdotMountainPassConditions from "./api/wsdot-mountain-pass-conditions";
import * as WsdotTollRates from "./api/wsdot-toll-rates";
import * as WsdotTrafficFlow from "./api/wsdot-traffic-flow";
import * as WsdotTravelTimes from "./api/wsdot-travel-times";
import * as WsdotWeatherInformation from "./api/wsdot-weather-information";
import * as WsdotWeatherInformationExtended from "./api/wsdot-weather-information-extended";
import * as WsdotWeatherStations from "./api/wsdot-weather-stations";
import * as WsfFares from "./api/wsf-fares";
import * as WsfSchedule from "./api/wsf-schedule";
import * as WsfTerminals from "./api/wsf-terminals";
import * as WsfVessels from "./api/wsf-vessels";

// ============================================================================
// Function Registry
// ============================================================================

/**
 * Registry of available CLI functions with their metadata
 */
const FUNCTION_REGISTRY = {
  // WSDOT APIs
  getBorderCrossings: {
    module: WsdotBorderCrossings,
    function: WsdotBorderCrossings.getBorderCrossings,
    paramsSchema: WsdotBorderCrossings.getBorderCrossingsParamsSchema,
    description:
      "Get real-time border crossing data for all Washington State border crossings",
  },
  getBridgeClearances: {
    module: WsdotBridgeClearances,
    function: WsdotBridgeClearances.getBridgeClearances,
    paramsSchema: WsdotBridgeClearances.getBridgeClearancesParamsSchema,
    description: "Get bridge clearance data for Washington State highways",
  },
  getCommercialVehicleRestrictions: {
    module: WsdotCommercialVehicleRestrictions,
    function:
      WsdotCommercialVehicleRestrictions.getCommercialVehicleRestrictions,
    paramsSchema:
      WsdotCommercialVehicleRestrictions.getCommercialVehicleRestrictionsParamsSchema,
    description:
      "Get commercial vehicle restriction data for Washington State highways",
  },
  getCommercialVehicleRestrictionsWithId: {
    module: WsdotCommercialVehicleRestrictions,
    function:
      WsdotCommercialVehicleRestrictions.getCommercialVehicleRestrictionsWithId,
    paramsSchema:
      WsdotCommercialVehicleRestrictions.getCommercialVehicleRestrictionsWithIdParamsSchema,
    description: "Get commercial vehicle restriction data by ID",
  },
  getHighwayAlerts: {
    module: WsdotHighwayAlerts,
    function: WsdotHighwayAlerts.getHighwayAlerts,
    paramsSchema: WsdotHighwayAlerts.getHighwayAlertsParamsSchema,
    description: "Get highway alert data for Washington State highways",
  },
  getHighwayAlertById: {
    module: WsdotHighwayAlerts,
    function: WsdotHighwayAlerts.getHighwayAlertById,
    paramsSchema: WsdotHighwayAlerts.getHighwayAlertByIdParamsSchema,
    description: "Get highway alert data by ID",
  },
  getHighwayAlertsByMapArea: {
    module: WsdotHighwayAlerts,
    function: WsdotHighwayAlerts.getHighwayAlertsByMapArea,
    paramsSchema: WsdotHighwayAlerts.getHighwayAlertsByMapAreaParamsSchema,
    description: "Get highway alert data by map area",
  },
  getHighwayAlertsByRegionId: {
    module: WsdotHighwayAlerts,
    function: WsdotHighwayAlerts.getHighwayAlertsByRegionId,
    paramsSchema: WsdotHighwayAlerts.getHighwayAlertsByRegionIdParamsSchema,
    description: "Get highway alert data by region ID",
  },
  searchHighwayAlerts: {
    module: WsdotHighwayAlerts,
    function: WsdotHighwayAlerts.searchHighwayAlerts,
    paramsSchema: WsdotHighwayAlerts.searchHighwayAlertsParamsSchema,
    description: "Search highway alerts by route/region/time/milepost",
  },
  getEventCategories: {
    module: WsdotHighwayAlerts,
    function: WsdotHighwayAlerts.getEventCategories,
    paramsSchema: WsdotHighwayAlerts.getEventCategoriesParamsSchema,
    description: "Get highway alert event categories",
  },
  getMapAreas: {
    module: WsdotHighwayAlerts,
    function: WsdotHighwayAlerts.getMapAreas,
    paramsSchema: WsdotHighwayAlerts.getMapAreasParamsSchema,
    description: "Get highway alert map areas",
  },
  getHighwayCamera: {
    module: WsdotHighwayCameras,
    function: WsdotHighwayCameras.getHighwayCamera,
    paramsSchema: WsdotHighwayCameras.getHighwayCameraParamsSchema,
    description: "Get highway camera data by camera ID",
  },
  getHighwayCameras: {
    module: WsdotHighwayCameras,
    function: WsdotHighwayCameras.getHighwayCameras,
    paramsSchema: WsdotHighwayCameras.getHighwayCamerasParamsSchema,
    description: "Get highway camera data for all cameras",
  },
  searchHighwayCameras: {
    module: WsdotHighwayCameras,
    function: WsdotHighwayCameras.searchHighwayCameras,
    paramsSchema: WsdotHighwayCameras.searchHighwayCamerasParamsSchema,
    description: "Search highway cameras by route/region/milepost",
  },
  getMountainPassConditionById: {
    module: WsdotMountainPassConditions,
    function: WsdotMountainPassConditions.getMountainPassConditionById,
    paramsSchema:
      WsdotMountainPassConditions.getMountainPassConditionByIdParamsSchema,
    description: "Get mountain pass condition data by ID",
  },
  getMountainPassConditions: {
    module: WsdotMountainPassConditions,
    function: WsdotMountainPassConditions.getMountainPassConditions,
    paramsSchema:
      WsdotMountainPassConditions.getMountainPassConditionsParamsSchema,
    description: "Get mountain pass condition data for all passes",
  },
  getTollRates: {
    module: WsdotTollRates,
    function: WsdotTollRates.getTollRates,
    paramsSchema: WsdotTollRates.getTollRatesParamsSchema,
    description: "Get toll rate data",
  },
  getTollTripRates: {
    module: WsdotTollRates,
    function: WsdotTollRates.getTollTripRates,
    paramsSchema: WsdotTollRates.getTollTripRatesParamsSchema,
    description: "Get toll trip rate data",
  },
  getTollTripInfo: {
    module: WsdotTollRates,
    function: WsdotTollRates.getTollTripInfo,
    paramsSchema: WsdotTollRates.getTollTripInfoParamsSchema,
    description: "Get toll trip information",
  },
  getTollTripVersion: {
    module: WsdotTollRates,
    function: WsdotTollRates.getTollTripVersion,
    paramsSchema: WsdotTollRates.getTollTripVersionParamsSchema,
    description: "Get toll trip version information",
  },
  getTripRatesByDate: {
    module: WsdotTollRates,
    function: WsdotTollRates.getTripRatesByDate,
    paramsSchema: WsdotTollRates.getTripRatesByDateParamsSchema,
    description: "Get trip rates by date",
  },
  getTrafficFlowById: {
    module: WsdotTrafficFlow,
    function: WsdotTrafficFlow.getTrafficFlowById,
    paramsSchema: WsdotTrafficFlow.getTrafficFlowByIdParamsSchema,
    description: "Get traffic flow data by ID",
  },
  getTrafficFlows: {
    module: WsdotTrafficFlow,
    function: WsdotTrafficFlow.getTrafficFlows,
    paramsSchema: WsdotTrafficFlow.getTrafficFlowsParamsSchema,
    description: "Get traffic flow data for all flows",
  },
  getTravelTimeById: {
    module: WsdotTravelTimes,
    function: WsdotTravelTimes.getTravelTimeById,
    paramsSchema: WsdotTravelTimes.getTravelTimeByIdParamsSchema,
    description: "Get travel time data by ID",
  },
  getTravelTimes: {
    module: WsdotTravelTimes,
    function: WsdotTravelTimes.getTravelTimes,
    paramsSchema: WsdotTravelTimes.getTravelTimesParamsSchema,
    description: "Get travel time data for all times",
  },
  getWeatherInformation: {
    module: WsdotWeatherInformation,
    function: WsdotWeatherInformation.getWeatherInformation,
    paramsSchema: WsdotWeatherInformation.getWeatherInformationParamsSchema,
    description: "Get weather information for all stations",
  },
  getWeatherInformationByStationId: {
    module: WsdotWeatherInformation,
    function: WsdotWeatherInformation.getWeatherInformationByStationId,
    paramsSchema:
      WsdotWeatherInformation.getWeatherInformationByStationIdParamsSchema,
    description: "Get weather information by station ID",
  },
  getWeatherInformationForStations: {
    module: WsdotWeatherInformation,
    function: WsdotWeatherInformation.getWeatherInformationForStations,
    paramsSchema:
      WsdotWeatherInformation.getWeatherInformationForStationsParamsSchema,
    description: "Get weather information for multiple stations",
  },
  getSearchWeatherInformation: {
    module: WsdotWeatherInformation,
    function: WsdotWeatherInformation.getSearchWeatherInformation,
    paramsSchema:
      WsdotWeatherInformation.getSearchWeatherInformationParamsSchema,
    description: "Search weather information by text",
  },
  getWeatherInformationExtended: {
    module: WsdotWeatherInformationExtended,
    function: WsdotWeatherInformationExtended.getWeatherInformationExtended,
    paramsSchema:
      WsdotWeatherInformationExtended.getWeatherInformationExtendedParamsSchema,
    description: "Get extended weather information by station ID",
  },
  getWeatherStations: {
    module: WsdotWeatherStations,
    function: WsdotWeatherStations.getWeatherStations,
    paramsSchema: WsdotWeatherStations.getWeatherStationsParamsSchema,
    description: "Get weather station data",
  },

  // WSF APIs
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
    function: WsfFares.getTerminalCombo,
    paramsSchema: WsfFares.getTerminalComboParamsSchema,
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
    paramsSchema: WsfFares.getFaresValidDateRangeParamsSchema,
    description: "Get valid date range for fares",
  },
  getRouteDetails: {
    module: WsfSchedule,
    function: WsfSchedule.getRouteDetails,
    paramsSchema: WsfSchedule.getRouteDetailsParamsSchema,
    description: "Get route details for WSF schedule",
  },
  getRouteDetailsByTerminals: {
    module: WsfSchedule,
    function: WsfSchedule.getRouteDetailsByTerminals,
    paramsSchema: WsfSchedule.getRouteDetailsByTerminalsParamsSchema,
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
    function: WsfSchedule.getRoutes,
    paramsSchema: WsfSchedule.getRoutesParamsSchema,
    description: "Get routes data",
  },
  getRoutesByTerminals: {
    module: WsfSchedule,
    function: WsfSchedule.getRoutesByTerminals,
    paramsSchema: WsfSchedule.getRoutesByTerminalsParamsSchema,
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
    function: WsfSchedule.getScheduleByTerminals,
    paramsSchema: WsfSchedule.getScheduleByTerminalsParamsSchema,
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
    function: WsfSchedule.getScheduleTodayByTerminals,
    paramsSchema: WsfSchedule.getScheduleTodayByTerminalsParamsSchema,
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
    function: WsfSchedule.getTerminals,
    paramsSchema: WsfSchedule.getTerminalsParamsSchema,
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
  // Temporarily commented out due to missing schema exports
  // getActiveSeasons: {
  //   module: WsfSchedule,
  //   function: WsfSchedule.getActiveSeasons,
  //   paramsSchema: WsfSchedule.getActiveSeasonsParamsSchema,
  //   description: "Get active seasons data",
  // },
  // getAlerts: {
  //   module: WsfSchedule,
  //   function: WsfSchedule.getAlerts,
  //   paramsSchema: WsfSchedule.getAlertsParamsSchema,
  //   description: "Get alerts data",
  // },
  // Temporarily commented out due to missing schema exports
  // getTimeAdjustments: {
  //   module: WsfSchedule,
  //   function: WsfSchedule.getTimeAdjustments,
  //   paramsSchema: WsfSchedule.getTimeAdjustmentsParamsSchema,
  //   description: "Get time adjustments data",
  // },
  // getTimeAdjustmentsByRoute: {
  //   module: WsfSchedule,
  //   function: WsfSchedule.getTimeAdjustmentsByRoute,
  //   paramsSchema: WsfSchedule.getTimeAdjustmentsByRouteParamsSchema,
  //   description: "Get time adjustments by route",
  // },
  // getScheduledRoutes: {
  //   module: WsfSchedule,
  //   function: WsfSchedule.getScheduledRoutes,
  //   paramsSchema: WsfSchedule.getScheduledRoutesParamsSchema,
  //   description: "Get scheduled routes data",
  // },
  // getScheduledRoutesBySeason: {
  //   module: WsfSchedule,
  //   function: WsfSchedule.getScheduledRoutesBySeason,
  //   paramsSchema: WsfSchedule.getScheduledRoutesBySeasonParamsSchema,
  //   description: "Get scheduled routes by season",
  // },
  // getValidDateRange: {
  //   module: WsfSchedule,
  //   function: WsfSchedule.getValidDateRange,
  //   paramsSchema: WsfSchedule.getValidDateRangeParamsSchema,
  //   description: "Get valid date range for schedule",
  // },
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

  getCacheFlushDate: {
    module: WsfVessels,
    function: WsfVessels.getCacheFlushDateVessels,
    paramsSchema: WsfVessels.getCacheFlushDateParamsSchema,
    description: "Get cache flush date for WSF APIs",
  },
} as const;

// ============================================================================
// Types
// ============================================================================

/**
 * CLI options interface
 */
interface CliOptions {
  pretty: boolean;
  raw: boolean;
  agent: boolean;
  quiet: boolean;
  silent: boolean;
}

// ============================================================================
// CLI Implementation
// ============================================================================

/**
 * Main CLI program
 */
const program = new Command();

program
  .name("ws-dottie")
  .description("CLI for Washington State transportation APIs (WSDOT and WSF)")
  .version("1.0.0")
  .argument("<function>", "API function name to call")
  .argument("[params]", "JSON parameters object as string", "{}")
  .option("--pretty", "pretty-print JSON output with 2-space indentation", true)
  .option("--raw", "output raw (unformatted) JSON", false)
  .option(
    "--agent",
    "agent mode: suppress debug output and verbose messages",
    false
  )
  .option(
    "--quiet",
    "quiet mode: suppress debug output and verbose messages",
    false
  )
  .option(
    "--silent",
    "silent mode: suppress all output except final JSON result",
    false
  )
  .action(
    async (functionName: string, paramsString: string, options: CliOptions) => {
      // Determine output modes
      const prettyPrint = options.pretty && !options.raw;
      const isQuiet = options.agent || options.quiet || options.silent;

      // Suppress console output in quiet/silent modes (except for final result)
      const originalConsoleLog = console.log;
      const originalConsoleError = console.error;

      try {
        if (isQuiet) {
          console.log = () => {}; // Suppress all log output
          console.error = () => {}; // Suppress error output
        }

        // Validate function exists
        if (!(functionName in FUNCTION_REGISTRY)) {
          const availableFunctions = Object.keys(FUNCTION_REGISTRY).join(", ");

          // Restore console for error output
          if (isQuiet) {
            console.error = originalConsoleError;
          }

          console.error(chalk.red(`❌ Unknown function: ${functionName}`));
          console.error(chalk.yellow(`\nAvailable functions:`));
          console.error(chalk.gray(availableFunctions));
          process.exit(1);
        }

        // Parse parameters
        let params: Record<string, unknown> = {};
        if (paramsString && paramsString !== "{}") {
          try {
            params = JSON.parse(paramsString);
          } catch (error) {
            // Restore console for error output
            if (isQuiet) {
              console.error = originalConsoleError;
            }
            console.error(
              chalk.red(`❌ Invalid JSON parameters: ${paramsString}`)
            );
            console.error(chalk.yellow(`Error: ${(error as Error).message}`));
            process.exit(1);
          }
        }

        // Coerce ISO-like date strings (YYYY-MM-DD, optional time) to JS Date
        const coerceDateStrings = (value: unknown): unknown => {
          if (Array.isArray(value)) return value.map(coerceDateStrings);
          if (value && typeof value === "object") {
            const out: Record<string, unknown> = {};
            for (const [k, v] of Object.entries(
              value as Record<string, unknown>
            )) {
              out[k] = coerceDateStrings(v);
            }
            return out;
          }
          if (typeof value === "string") {
            const ISOish =
              /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}:\d{2}(?:\.\d+)?)?Z?$/i;
            if (ISOish.test(value)) {
              // If a time is present without Z, assume UTC; date-only is fine
              const needsZ = value.length > 10 && !value.endsWith("Z");
              return new Date(needsZ ? `${value}Z` : value);
            }
          }
          return value;
        };

        params = coerceDateStrings(params) as Record<string, unknown>;

        // Get function metadata
        const functionMeta =
          FUNCTION_REGISTRY[functionName as keyof typeof FUNCTION_REGISTRY];

        // Validate parameters against schema
        try {
          const validatedParams = functionMeta.paramsSchema.parse(
            params
          ) as Record<string, unknown>;

          if (!isQuiet) {
            console.error(chalk.blue(`🔍 Calling ${functionName}...`));
          }

          // In quiet/agent/silent mode, suppress ANY writes to stdout from internals
          // to guarantee pure JSON on stdout.
          const originalStdoutWrite = process.stdout.write;
          if (isQuiet) {
            // biome-ignore lint/suspicious/noExplicitAny: Node typings
            (process.stdout as any).write = (..._args: unknown[]) => true;
          }

          // Call the function with validated parameters
          // biome-ignore lint/suspicious/noExplicitAny: Needed for metadata
          const result = await (functionMeta.function as any)(validatedParams);

          // Restore console functions for final output
          if (isQuiet) {
            console.log = originalConsoleLog;
            console.error = originalConsoleError;
            // biome-ignore lint/suspicious/noExplicitAny: Node typings
            (process.stdout as any).write = originalStdoutWrite as unknown as (
              ...args: unknown[]
            ) => boolean;
          }

          // Output result (always show final result, even in silent mode for now)
          if (prettyPrint) {
            console.log(JSON.stringify(result, null, 2));
          } else {
            console.log(JSON.stringify(result));
          }
        } catch (validationError: unknown) {
          const error = validationError as Error;

          // Restore console for error output
          if (isQuiet) {
            console.error = originalConsoleError;
          }

          console.error(chalk.red(`❌ Parameter validation failed:`));
          console.error(chalk.yellow(error.message));
          console.error(
            chalk.gray(`\nExpected parameters for ${functionName}:`)
          );
          console.error(
            chalk.gray(`See function documentation or use --help for examples`)
          );
          process.exit(1);
        }
      } catch (error: unknown) {
        const err = error as Error;

        // Restore console for error output
        if (isQuiet) {
          console.error = originalConsoleError;
        }

        console.error(chalk.red(`❌ Error calling ${functionName}:`));
        console.error(chalk.yellow(err.message));
        if (err.cause) {
          console.error(chalk.gray(`Cause: ${err.cause}`));
        }
        process.exit(1);
      }
    }
  );

// Add help examples
program.addHelpText(
  "after",
  `
Examples:
  $ ws-dottie getBorderCrossings
  $ ws-dottie getBridgeClearances '{"route": "005"}'
  $ ws-dottie getFareLineItems '{"originTerminalId": 7, "destinationTerminalId": 3, "date": "2025-01-27"}'
  $ ws-dottie getBorderCrossings --raw

Available functions:
${Object.entries(FUNCTION_REGISTRY)
  .map(([name, meta]) => `  ${chalk.cyan(name)} - ${meta.description}`)
  .join("\n")}

For more information about parameters, see the ws-dottie documentation.
`
);

// ============================================================================
// Main Execution
// ============================================================================

/**
 * Main entry point
 */
async function main() {
  try {
    await program.parseAsync(process.argv);
  } catch (error) {
    console.error(chalk.red("Unexpected error:"), error);
    process.exit(1);
  }
}

// Run CLI if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default program;
