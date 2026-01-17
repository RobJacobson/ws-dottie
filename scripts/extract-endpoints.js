const fs = require("fs");
const path = require("path");

const apiDir = "src/apis";
const files = [
  "wsdot-bridge-clearances/bridgeClearances/bridgeClearances.ts",
  "wsdot-weather-stations/weatherStations/weatherStations.ts",
  "wsdot-weather-information/weatherInfo/weatherInformation.ts",
  "wsf-fares/terminalCombo/terminalComboFaresVerbose.ts",
  "wsf-schedule/sailings/allSailingsBySchedRouteID.ts",
  "wsdot-border-crossings/borderCrossingData/borderCrossings.ts",
  "wsf-terminals/terminalVerbose/terminalVerboseByTerminalId.ts",
  "wsf-terminals/terminalSailingSpace/terminalSailingSpaceByTerminalId.ts",
  "wsdot-toll-rates/tollTripRates/tollTripRates.ts",
  "wsf-schedule/schedules/scheduleByTripDateAndDepartingTerminalIdAndTerminalIds.ts",
  "wsdot-commercial-vehicle-restrictions/cvRestrictionDataWithId/commercialVehicleRestrictionsWithId.ts",
  "wsdot-highway-cameras/cameras/highwayCameras.ts",
  "wsdot-highway-cameras/cameras/searchHighwayCamerasByRouteAndMilepost.ts",
  "wsf-vessels/vesselLocations/vesselLocationsByVesselId.ts",
  "wsf-vessels/vesselBasics/vesselBasicsByVesselId.ts",
  "wsf-schedule/scheduleToday/scheduleTodayByTerminals.ts",
  "wsf-schedule/routeDetails/routeDetailsByTripDate.ts",
  "wsdot-toll-rates/tollTripVersion/tollTripVersion.ts",
  "wsdot-weather-readings/weatherReadings/weatherReadings.ts",
  "wsf-schedule/validDateRange/scheduleValidDateRange.ts",
  "wsf-terminals/terminalBasics/terminalBasicsByTerminalId.ts",
  "wsf-schedule/cacheFlushDate/shared/cacheFlushDate.endpoints.ts",
  "wsf-schedule/routeDetails/routeDetailsByTripDateAndRouteId.ts",
  "wsf-fares/fareLineItems/fareLineItemsByTripDateAndTerminals.ts",
  "wsf-schedule/scheduleAlerts/scheduleAlerts.ts",
  "wsdot-traffic-flow/flowData/trafficFlows.ts",
  "wsdot-highway-cameras/cameras/highwayCameraByCameraId.ts",
  "wsf-vessels/vesselVerbose/vesselsVerbose.ts",
  "wsf-fares/validDateRange/faresValidDateRange.ts",
  "wsf-terminals/terminalBulletins/terminalBulletinsByTerminalId.ts",
  "wsf-fares/fareLineItems/fareLineItemsVerbose.ts",
  "wsf-fares/terminals/terminalMatesFares.ts",
  "wsdot-bridge-clearances/bridgeClearances/bridgeClearancesByRoute.ts",
  "wsdot-toll-rates/tollRates/tollRates.ts",
  "wsdot-traffic-flow/flowData/trafficFlowById.ts",
  "wsf-terminals/terminalBasics/terminalBasics.ts",
  "wsf-schedule/scheduledRoutes/scheduledRoutesById.ts",
  "wsdot-toll-rates/tollTripInfo/tollTripInfo.ts",
  "wsf-schedule/timeAdjustments/timeAdjustments.ts",
  "wsdot-toll-rates/tollTripRates/tripRatesByVersion.ts",
  "wsdot-travel-times/travelTimeRoutes/travelTimes.ts",
  "wsf-vessels/cacheFlushDate/shared/cacheFlushDate.endpoints.ts",
  "wsf-schedule/scheduledRoutes/scheduledRoutes.ts",
  "wsdot-highway-alerts/highwayAlerts/alertsByMapArea.ts",
  "wsdot-commercial-vehicle-restrictions/cvRestrictionData/commercialVehicleRestrictions.ts",
  "wsf-schedule/schedules/scheduleByTripDateAndRouteId.ts",
  "wsdot-highway-alerts/eventCategories/eventCategories.ts",
  "wsf-schedule/terminals/terminalsAndMatesByRoute.ts",
  "wsf-vessels/vesselVerbose/vesselsVerboseById.ts",
  "wsf-schedule/routeDetails/routeDetailsByTripDateAndTerminals.ts",
  "wsdot-highway-alerts/highwayAlerts/alerts.ts",
  "wsf-fares/fareTotals/fareTotalsByTripDateAndRoute.ts",
  "wsdot-highway-alerts/highwayAlerts/searchAlerts.ts",
  "wsdot-highway-alerts/alertAreas/mapAreas.ts",
  "wsf-schedule/routes/routesByTripDate.ts",
  "wsf-schedule/scheduleToday/scheduleTodayByRoute.ts",
  "wsf-schedule/terminalMates/terminalMatesSchedule.ts",
  "wsf-vessels/vesselAccommodations/vesselAccommodationsByVesselId.ts",
  "wsdot-highway-alerts/highwayAlerts/alertById.ts",
  "wsdot-highway-alerts/highwayAlerts/alertsByRegionId.ts",
  "wsf-fares/cacheFlushDate/shared/cacheFlushDate.endpoints.ts",
  "wsdot-weather-readings/subSurfaceMeasurements/subSurfaceMeasurements.ts",
  "wsf-schedule/routes/routesByTripDateAndTerminals.ts",
  "wsf-terminals/terminalBulletins/terminalBulletins.ts",
  "wsf-schedule/sailings/sailingsByRouteID.ts",
  "wsdot-travel-times/travelTimeRoutes/travelTimeById.ts",
  "wsf-schedule/timeAdjustments/timeAdjustmentsByRoute.ts",
  "wsf-terminals/cacheFlushDate/shared/cacheFlushDate.endpoints.ts",
  "wsdot-weather-information/weatherInfo/searchWeatherInformation.ts",
  "wsf-vessels/vesselHistories/vesselHistoriesByVesselAndDates.ts",
  "wsf-schedule/timeAdjustments/timeAdjustmentsBySchedRoute.ts",
  "wsf-fares/terminalCombo/terminalComboFares.ts",
  "wsf-terminals/terminalVerbose/terminalVerbose.ts",
  "wsdot-weather-readings/surfaceMeasurements/surfaceMeasurements.ts",
  "wsdot-mountain-pass-conditions/passConditions/mountainPassConditions.ts",
  "wsf-vessels/vesselAccommodations/vesselAccommodations.ts",
  "wsf-schedule/terminals/terminalsAndMates.ts",
  "wsf-vessels/vesselStats/vesselStatsByVesselId.ts",
  "wsdot-weather-information/weatherInfo/weatherInformationByStationId.ts",
  "wsdot-weather-information/weatherInfo/currentWeatherForStations.ts",
  "wsf-schedule/terminals/terminals.ts",
  "wsf-terminals/terminalTransports/terminalTransportsByTerminalId.ts",
  "wsf-terminals/terminalWaitTimes/terminalWaitTimesByTerminalId.ts",
  "wsf-vessels/vesselStats/vesselStats.ts",
  "wsf-terminals/terminalLocations/terminalLocationsByTerminalId.ts",
  "wsdot-weather-stations/weatherStations/weatherStations.ts",
  "wsf-schedule/sailings/allSailingsBySchedRouteID.ts",
  "wsf-vessels/vesselBasics/vesselBasics.ts",
  "wsf-schedule/timeAdjustments/timeAdjustmentsBySchedRoute.ts",
  "wsdot-weather-information/weatherInfo/weatherInformationByStationId.ts",
  "wsf-terminals/terminalVerbose/terminalVerboseByTerminalId.ts",
  "wsf-schedule/validDateRange/scheduleValidDateRange.ts",
  "wsf-terminals/terminalSailingSpace/terminalSailingSpace.ts",
  "wsdot-toll-rates/tollTripVersion/tollTripVersion.ts",
  "wsf-schedule/scheduledRoutes/scheduledRoutesById.ts",
  "wsdot-border-crossings/borderCrossingData/borderCrossings.ts",
  "wsf-terminals/terminalWaitTimes/terminalWaitTimes.ts",
  "wsdot-toll-rates/tollRates/tollRates.ts",
];

const endpoints = [];

files.forEach((file) => {
  const filePath = path.join(apiDir, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf8");

    // Extract functionName
    const functionNameMatch = content.match(/functionName:\s*"([^"]+)"/);
    const functionName = functionNameMatch ? functionNameMatch[1] : null;

    // Extract inputs array - this is trickier because it can be multiline
    const inputsMatch = content.match(/inputs:\s*\[([^\]]*)\]/s);
    let inputs = [];
    if (inputsMatch) {
      const inputsStr = inputsMatch[1];
      // Split by quotes and filter out empty strings
      inputs = inputsStr.split('"').filter((item, index) => index % 2 === 1);
    }

    if (functionName) {
      endpoints.push({
        functionName,
        inputs,
      });
    }
  }
});

// Sort by functionName
endpoints.sort((a, b) => a.functionName.localeCompare(b.functionName));

// Generate markdown table
let markdown = "| Function Name | Inputs |\n|---------------|--------|\n";

endpoints.forEach((endpoint) => {
  const inputsStr =
    endpoint.inputs.length === 0
      ? "[]"
      : `[${endpoint.inputs.map((i) => `"${i}"`).join(", ")}]`;
  markdown += `| ${endpoint.functionName} | ${inputsStr} |\n`;
});

console.log(markdown);
