/**
 * WSDOT API function registry for CLI
 */

import * as WsdotBorderCrossings from "../../clients/wsdot-border-crossings";
import * as WsdotBridgeClearances from "../../clients/wsdot-bridge-clearances";
import * as WsdotCommercialVehicleRestrictions from "../../clients/wsdot-commercial-vehicle-restrictions";
import * as WsdotHighwayAlerts from "../../clients/wsdot-highway-alerts";
import * as WsdotHighwayCameras from "../../clients/wsdot-highway-cameras";
import * as WsdotMountainPassConditions from "../../clients/wsdot-mountain-pass-conditions";
import * as WsdotTollRates from "../../clients/wsdot-toll-rates";
import * as WsdotTrafficFlow from "../../clients/wsdot-traffic-flow";
import * as WsdotTravelTimes from "../../clients/wsdot-travel-times";
import * as WsdotWeatherInformation from "../../clients/wsdot-weather-information";
import * as WsdotWeatherInformationExtended from "../../clients/wsdot-weather-information-extended";
import * as WsdotWeatherStations from "../../clients/wsdot-weather-stations";

import type { FunctionRegistry } from "../types";

/**
 * WSDOT API function registry
 */
export const wsdotRegistry: FunctionRegistry = {
  // Border Crossings
  getBorderCrossings: {
    module: WsdotBorderCrossings,
    function: WsdotBorderCrossings.getBorderCrossings,
    paramsSchema: WsdotBorderCrossings.getBorderCrossingsParamsSchema,
    description:
      "Get real-time border crossing data for all Washington State border crossings",
  },

  // Bridge Clearances
  getBridgeClearances: {
    module: WsdotBridgeClearances,
    function: WsdotBridgeClearances.getBridgeClearances,
    paramsSchema: WsdotBridgeClearances.getBridgeClearancesParamsSchema,
    description: "Get bridge clearance data for Washington State highways",
  },

  // Commercial Vehicle Restrictions
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

  // Highway Alerts
  getHighwayAlerts: {
    module: WsdotHighwayAlerts,
    function: WsdotHighwayAlerts.getAlerts,
    paramsSchema: WsdotHighwayAlerts.getAlertsParamsSchema,
    description: "Get highway alert data for Washington State highways",
  },
  getHighwayAlertById: {
    module: WsdotHighwayAlerts,
    function: WsdotHighwayAlerts.getAlert,
    paramsSchema: WsdotHighwayAlerts.getAlertParamsSchema,
    description: "Get highway alert data by ID",
  },
  getHighwayAlertsByMapArea: {
    module: WsdotHighwayAlerts,
    function: WsdotHighwayAlerts.getAlertsForMapArea,
    paramsSchema: WsdotHighwayAlerts.getAlertsForMapAreaParamsSchema,
    description: "Get highway alert data by map area",
  },
  getHighwayAlertsByRegionId: {
    module: WsdotHighwayAlerts,
    function: WsdotHighwayAlerts.getAlertsByRegionId,
    paramsSchema: WsdotHighwayAlerts.getAlertsByRegionIdParamsSchema,
    description: "Get highway alert data by region ID",
  },
  searchHighwayAlerts: {
    module: WsdotHighwayAlerts,
    function: WsdotHighwayAlerts.searchAlerts,
    paramsSchema: WsdotHighwayAlerts.searchAlertsParamsSchema,
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

  // Highway Cameras
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

  // Mountain Pass Conditions
  getMountainPassCondition: {
    module: WsdotMountainPassConditions,
    function: WsdotMountainPassConditions.getMountainPassCondition,
    paramsSchema:
      WsdotMountainPassConditions.getMountainPassConditionParamsSchema,
    description: "Get mountain pass condition data by ID",
  },
  getMountainPassConditions: {
    module: WsdotMountainPassConditions,
    function: WsdotMountainPassConditions.getMountainPassConditions,
    paramsSchema:
      WsdotMountainPassConditions.getMountainPassConditionsParamsSchema,
    description: "Get mountain pass condition data for all passes",
  },

  // Toll Rates
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

  // Traffic Flow
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

  // Travel Times
  getTravelTime: {
    module: WsdotTravelTimes,
    function: WsdotTravelTimes.getTravelTime,
    paramsSchema: WsdotTravelTimes.getTravelTimeParamsSchema,
    description: "Get travel time data by ID",
  },
  getTravelTimes: {
    module: WsdotTravelTimes,
    function: WsdotTravelTimes.getTravelTimes,
    paramsSchema: WsdotTravelTimes.getTravelTimesParamsSchema,
    description: "Get travel time data for all times",
  },

  // Weather Information
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

  // Weather Information Extended
  getWeatherInformationExtended: {
    module: WsdotWeatherInformationExtended,
    function: WsdotWeatherInformationExtended.getWeatherInformationExtended,
    paramsSchema:
      WsdotWeatherInformationExtended.getWeatherInformationExtendedParamsSchema,
    description: "Get extended weather information by station ID",
  },

  // Weather Stations
  getWeatherStations: {
    module: WsdotWeatherStations,
    function: WsdotWeatherStations.getWeatherStations,
    paramsSchema: WsdotWeatherStations.getWeatherStationsParamsSchema,
    description: "Get weather station data",
  },
};
