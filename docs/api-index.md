# API Index

This document provides a comprehensive index of all available API endpoints in the ws-dottie library.

| API Name | Function Name | Endpoint URL | Sample Parameters |
|----------|---------------|--------------|-------------------|
| wsdot-border-crossings | getBorderCrossings | /Traffic/api/BorderCrossings/BorderCrossingsREST.svc/GetBorderCrossingsAsJson | `{}` |
| wsdot-bridge-clearances | getBridgeClearances | /Traffic/api/Bridges/ClearanceREST.svc/GetClearancesAsJson | `{}` |
| wsdot-bridge-clearances | getBridgeClearancesByRoute | /Traffic/api/Bridges/ClearanceREST.svc/GetClearancesAsJson?Route={Route} | `{"Route": "005"}` |
| wsdot-commercial-vehicle-restrictions | getCommercialVehicleRestrictions | /Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsAsJson | `{}` |
| wsdot-commercial-vehicle-restrictions | getCommercialVehicleRestrictionsWithId | /Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsWithIdAsJson | `{}` |
| wsdot-highway-alerts | getAlert | /Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertAsJson?AlertID={AlertID} | `{"AlertID": 468632}` |
| wsdot-highway-alerts | getAlerts | /Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson | `{}` |
| wsdot-highway-alerts | getAlertsByRegionId | /Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsByRegionIDAsJson?RegionID={RegionID} | `{"RegionID": 9}` |
| wsdot-highway-alerts | getAlertsForMapArea | /Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsByMapAreaAsJson?MapArea={MapArea} | `{"MapArea": "Seattle"}` |
| wsdot-highway-alerts | getEventCategories | /Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetEventCategoriesAsJson | `{}` |
| wsdot-highway-alerts | getMapAreas | /Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetMapAreasAsJson | `{}` |
| wsdot-highway-alerts | searchAlerts | /Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/SearchAlertsAsJson?StateRoute={StateRoute}&Region={Region}&SearchTimeStart={SearchTimeStart}&SearchTimeEnd={SearchTimeEnd}&StartingMilepost={StartingMilepost}&EndingMilepost={EndingMilepost} | `{"StateRoute": "405", "SearchTimeStart": "2025-08-01", "SearchTimeEnd": "2025-09-30"}` |
| wsdot-highway-cameras | getHighwayCamera | /Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCameraAsJson?CameraID={CameraID} | `{"CameraID": 9818}` |
| wsdot-highway-cameras | getHighwayCameras | /Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCamerasAsJson | `{}` |
| wsdot-highway-cameras | searchHighwayCameras | /Traffic/api/HighwayCameras/HighwayCamerasREST.svc/SearchCamerasAsJson | `{}` |
| wsdot-mountain-pass-conditions | getMountainPassCondition | /Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionAsJon?PassConditionID={PassConditionID} | `{"PassConditionID": 12}` |
| wsdot-mountain-pass-conditions | getMountainPassConditions | /Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionsAsJson | `{}` |
| wsdot-toll-rates | getTollRates | /Traffic/api/TollRates/TollRatesREST.svc/GetTollRatesAsJson | `{}` |
| wsdot-toll-rates | getTollTripInfo | /Traffic/api/TollRates/TollRatesREST.svc/GetTollTripInfoAsJson | `{}` |
| wsdot-toll-rates | getTollTripRates | /Traffic/api/TollRates/TollRatesREST.svc/GetTollTripRatesAsJson | `{}` |
| wsdot-toll-rates | getTollTripVersion | /Traffic/api/TollRates/TollRatesREST.svc/GetTollTripVersionAsJson | `{}` |
| wsdot-toll-rates | getTripRatesByDate | /Traffic/api/TollRates/TollRatesREST.svc/GetTripRatesByDateAsJson?FromDate={FromDate}&ToDate={ToDate} | `{"FromDate": "2025-08-01", "ToDate": "2025-08-02"}` |
| wsdot-toll-rates | getTripRatesByVersion | /Traffic/api/TollRates/TollRatesREST.svc/GetTripRatesByVersionAsJson?Version={Version} | `{"Version": 352417}` |
| wsdot-traffic-flow | getTrafficFlow | /traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowsAsJson | `{}` |
| wsdot-traffic-flow | getTrafficFlowById | /traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowAsJson?FlowDataID={FlowDataID} | `{"FlowDataID": 2482}` |
| wsdot-travel-times | getTravelTime | /Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimeAsJson?TravelTimeID={TravelTimeID} | `{"TravelTimeID": 1}` |
| wsdot-travel-times | getTravelTimes | /Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson | `{}` |
| wsdot-weather-information | getWeatherInformation | /Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationAsJson | `{}` |
| wsdot-weather-information | getWeatherInformationByStationId | /Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationByStationIDAsJson?StationID={StationID} | `{"StationID": 1909}` |
| wsdot-weather-information-extended | getWeatherInformationExtended | /traffic/api/api/Scanweb | `{}` |
| wsdot-weather-stations | getWeatherStations | /Traffic/api/WeatherStations/WeatherStationsREST.svc/GetCurrentStationsAsJson | `{}` |
| wsf-fares | cacheFlushDate | /ferries/api/fares/rest/cacheflushdate | `{}` |
| wsf-fares | fareLineItems | /ferries/api/fares/rest/farelineitems/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip} | `{"TripDate": "2025-08-01", "DepartingTerminalID": 3, "ArrivingTerminalID": 7, "RoundTrip": false}` |
| wsf-fares | fareLineItemsBasic | /ferries/api/fares/rest/farelineitemsbasic/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip} | `{"TripDate": "2025-08-01", "DepartingTerminalID": 1, "ArrivingTerminalID": 10, "RoundTrip": false}` |
| wsf-fares | fareLineItemsVerbose | /ferries/api/fares/rest/farelineitemsverbose/{TripDate} | `{"TripDate": "2025-08-01"}` |
| wsf-fares | faresTerminals | /ferries/api/fares/rest/terminals/{TripDate} | `{"TripDate": "2025-08-01"}` |
| wsf-fares | faresValidDateRange | /ferries/api/fares/rest/validdaterange | `{}` |
| wsf-fares | fareTotals | /ferries/api/fares/rest/faretotals/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}/{FareLineItemID}/{Quantity} | `{"TripDate": "2025-08-01", "DepartingTerminalID": 1, "ArrivingTerminalID": 10, "RoundTrip": false, "FareLineItemID": 1, "Quantity": 2}` |
| wsf-fares | terminalCombo | /ferries/api/fares/rest/terminalcombo/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID} | `{"TripDate": "2025-08-01", "DepartingTerminalID": 1, "ArrivingTerminalID": 10}` |
| wsf-fares | terminalComboVerbose | /ferries/api/fares/rest/terminalcomboverbose/{TripDate} | `{"TripDate": "2025-08-01"}` |
| wsf-fares | terminalMates | /ferries/api/fares/rest/terminalmates/{TripDate}/{TerminalID} | `{"TripDate": "2025-08-01", "TerminalID": 1}` |
| wsf-schedule | activeSeasons | /ferries/api/schedule/rest/activeseasons | `{}` |
| wsf-schedule | allSailings | /ferries/api/schedule/rest/allsailings/{SchedRouteID}/{Y} | `{"SchedRouteID": 2327, "Y": 1}` |
| wsf-schedule | cacheFlushDate | /ferries/api/schedule/rest/cacheflushdate | `{}` |
| wsf-schedule | routeDetails | /ferries/api/schedule/rest/routedetails/{TripDate} | `{"TripDate": "2025-08-01"}` |
| wsf-schedule | routeDetailsByRoute | /ferries/api/schedule/rest/routedetails/{TripDate}/{RouteID} | `{"TripDate": "2025-08-01", "RouteID": 1}` |
| wsf-schedule | routeDetailsByTerminals | /ferries/api/schedule/rest/routedetails/{TripDate}/{DepartingScheduleTerminalID}/{ArrivingScheduleTerminalID} | `{"TripDate": "2025-08-01", "DepartingScheduleTerminalID": 1, "ArrivingScheduleTerminalID": 10}` |
| wsf-schedule | routes | /ferries/api/schedule/rest/routes/{TripDate} | `{"TripDate": "2025-08-01"}` |
| wsf-schedule | routesByTerminals | /ferries/api/schedule/rest/routes/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID} | `{"TripDate": "2025-08-01", "DepartingTerminalID": 1, "ArrivingTerminalID": 10}` |
| wsf-schedule | routesHavingServiceDisruptions | /ferries/api/schedule/rest/routeshavingservicedisruptions/{TripDate} | `{"TripDate": "2025-08-01"}` |
| wsf-schedule | routesWithDisruptions | /ferries/api/schedule/rest/routeshavingservicedisruptions/{TripDate} | `{"TripDate": "2025-08-01"}` |
| wsf-schedule | sailings | /ferries/api/schedule/rest/sailings/{SchedRouteID} | `{"SchedRouteID": 2327}` |
| wsf-schedule | scheduleAlerts | /ferries/api/schedule/rest/alerts | `{}` |
| wsf-schedule | scheduleByRoute | /ferries/api/schedule/rest/schedule/{TripDate}/{RouteID} | `{"TripDate": "2025-08-01", "RouteID": 1}` |
| wsf-schedule | scheduleByTerminals | /ferries/api/schedule/rest/schedule/{TripDate}/{DepartingScheduleTerminalID}/{ArrivingScheduleTerminalID} | `{"TripDate": "2025-08-01", "DepartingScheduleTerminalID": 1, "ArrivingScheduleTerminalID": 10}` |
| wsf-schedule | scheduledRoutes | /ferries/api/schedule/rest/schedroutes | `{}` |
| wsf-schedule | scheduledRoutesBySeason | /ferries/api/schedule/rest/schedroutes/{SeasonID} | `{"SeasonID": 192}` |
| wsf-schedule | scheduleTodayByRoute | /ferries/api/schedule/rest/scheduletoday/{RouteID}/{OnlyRemainingTimes} | `{"RouteID": 1, "OnlyRemainingTimes": false}` |
| wsf-schedule | scheduleTodayByTerminals | /ferries/api/schedule/rest/scheduletoday/{DepartingScheduleTerminalID}/{ArrivingScheduleTerminalID}/{OnlyRemainingTimes} | `{"DepartingScheduleTerminalID": 1, "ArrivingScheduleTerminalID": 10, "OnlyRemainingTimes": false}` |
| wsf-schedule | scheduleValidDateRange | /ferries/api/schedule/rest/validdaterange | `{}` |
| wsf-schedule | terminalMates | /ferries/api/schedule/rest/terminalmates/{TripDate}/{TerminalID} | `{"TripDate": "2025-08-01", "TerminalID": 1}` |
| wsf-schedule | terminals | /ferries/api/schedule/rest/terminals/{TripDate} | `{"TripDate": "2025-08-01"}` |
| wsf-schedule | terminalsAndMates | /ferries/api/schedule/rest/terminalsandmates/{TripDate} | `{"TripDate": "2025-08-01"}` |
| wsf-schedule | terminalsAndMatesByRoute | /ferries/api/schedule/rest/terminalsandmatesbyroute/{TripDate}/{RouteID} | `{"TripDate": "2025-08-01", "RouteID": 1}` |
| wsf-schedule | timeAdjustments | /ferries/api/schedule/rest/timeadj | `{}` |
| wsf-schedule | timeAdjustmentsByRoute | /ferries/api/schedule/rest/timeadjbyroute/{RouteID} | `{"RouteID": 1}` |
| wsf-terminals | cacheFlushDate | /ferries/api/terminals/rest/cacheflushdate | `{}` |
| wsf-terminals | terminalBasics | /ferries/api/terminals/rest/terminalbasics | `{}` |
| wsf-terminals | terminalBasicsById | /ferries/api/terminals/rest/terminalbasics/{TerminalID} | `{"TerminalID": 1}` |
| wsf-terminals | terminalBulletins | /ferries/api/terminals/rest/terminalbulletins | `{}` |
| wsf-terminals | terminalBulletinsById | /ferries/api/terminals/rest/terminalbulletins/{TerminalID} | `{"TerminalID": 3}` |
| wsf-terminals | terminalLocations | /ferries/api/terminals/rest/terminallocations | `{}` |
| wsf-terminals | terminalLocationsById | /ferries/api/terminals/rest/terminallocations/{TerminalID} | `{"TerminalID": 5}` |
| wsf-terminals | terminalSailingSpace | /ferries/api/terminals/rest/terminalsailingspace | `{}` |
| wsf-terminals | terminalSailingSpaceById | /ferries/api/terminals/rest/terminalsailingspace/{TerminalID} | `{"TerminalID": 7}` |
| wsf-terminals | terminalTransports | /ferries/api/terminals/rest/terminaltransports | `{}` |
| wsf-terminals | terminalTransportsById | /ferries/api/terminals/rest/terminaltransports/{TerminalID} | `{"TerminalID": 10}` |
| wsf-terminals | terminalVerbose | /ferries/api/terminals/rest/terminalverbose | `{}` |
| wsf-terminals | terminalVerboseById | /ferries/api/terminals/rest/terminalverbose/{TerminalID} | `{"TerminalID": 4}` |
| wsf-terminals | terminalWaitTimes | /ferries/api/terminals/rest/terminalwaittimes | `{}` |
| wsf-terminals | terminalWaitTimesById | /ferries/api/terminals/rest/terminalwaittimes/{TerminalID} | `{"TerminalID": 11}` |
| wsf-vessels | cacheFlushDate | /ferries/api/vessels/rest/cacheflushdate | `{}` |
| wsf-vessels | vesselAccommodations | /ferries/api/vessels/rest/vesselaccommodations | `{}` |
| wsf-vessels | vesselAccommodationsById | /ferries/api/vessels/rest/vesselaccommodations/{VesselID} | `{"VesselID": 65}` |
| wsf-vessels | vesselBasics | /ferries/api/vessels/rest/vesselbasics | `{}` |
| wsf-vessels | vesselBasicsById | /ferries/api/vessels/rest/vesselbasics/{VesselID} | `{"VesselID": 15}` |
| wsf-vessels | vesselHistories | /ferries/api/vessels/rest/vesselhistory | `{}` |
| wsf-vessels | vesselHistoriesByVesselAndDateRange | /ferries/api/vessels/rest/vesselhistory/{VesselName}/{DateStart}/{DateEnd} | `{"VesselName": "Cathlamet", "DateStart": "2025-08-01", "DateEnd": "2025-08-31"}` |
| wsf-vessels | vesselLocations | /ferries/api/vessels/rest/vessellocations | `{}` |
| wsf-vessels | vesselLocationsById | /ferries/api/vessels/rest/vessellocations/{VesselID} | `{"VesselID": 18}` |
| wsf-vessels | vesselStats | /ferries/api/vessels/rest/vesselstats | `{}` |
| wsf-vessels | vesselStatsById | /ferries/api/vessels/rest/vesselstats/{VesselID} | `{"VesselID": 32}` |
| wsf-vessels | vesselsVerbose | /ferries/api/vessels/rest/vesselverbose | `{}` |
| wsf-vessels | vesselsVerboseById | /ferries/api/vessels/rest/vesselverbose/{VesselID} | `{"VesselID": 68}` |

## Summary

This index contains **89 API endpoints** across **8 different API groups**:

- **wsdot-border-crossings**: 1 endpoint
- **wsdot-bridge-clearances**: 2 endpoints  
- **wsdot-commercial-vehicle-restrictions**: 2 endpoints
- **wsdot-highway-alerts**: 7 endpoints
- **wsdot-highway-cameras**: 3 endpoints
- **wsdot-mountain-pass-conditions**: 2 endpoints
- **wsdot-toll-rates**: 6 endpoints
- **wsdot-traffic-flow**: 2 endpoints
- **wsdot-travel-times**: 2 endpoints
- **wsdot-weather-information**: 2 endpoints
- **wsdot-weather-information-extended**: 1 endpoint
- **wsdot-weather-stations**: 1 endpoint
- **wsf-fares**: 11 endpoints
- **wsf-schedule**: 26 endpoints
- **wsf-terminals**: 15 endpoints
- **wsf-vessels**: 14 endpoints

The endpoints are sorted alphabetically first by API name, then by function name as requested.
