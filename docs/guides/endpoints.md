# API Endpoints Overview

This table reflects all current endpoints defined under `src/apis` as of 2025-01-28.

## Quick Reference by Category

### Ferry APIs (WSF)
| API | Key Endpoints | Common Use Cases |
|------|---------------|-----------------|
| **WSF Vessels** | `fetchVesselLocations`, `fetchVesselLocationsByVesselId` | Real-time vessel tracking |
| **WSF Terminals** | `fetchTerminalWaitTimes`, `fetchTerminalSailingSpace` | Terminal monitoring and capacity |
| **WSF Schedule** | `fetchScheduleByTripDateAndRouteId`, `fetchSailingsByRouteID` | Trip planning and schedules |
| **WSF Fares** | `fetchFareLineItemsByTripDateAndTerminals`, `fetchFareTotalsByTripDateAndRoute` | Cost calculation and pricing |

### Traffic APIs (WSDOT)
| API | Key Endpoints | Common Use Cases |
|------|---------------|-----------------|
| **WSDOT Highway Alerts** | `fetchAlerts`, `fetchAlertsByRegionId`, `fetchAlertById` | Traffic incident monitoring |
| **WSDOT Traffic Flow** | `fetchTrafficFlows`, `fetchTrafficFlowById` | Traffic speed and congestion analysis |
| **WSDOT Travel Times** | `fetchTravelTimes`, `fetchTravelTimeById` | Route planning and ETA calculation |
| **WSDOT Highway Cameras** | `fetchHighwayCameras`, `fetchHighwayCameraByCameraId` | Visual traffic monitoring |
| **WSDOT Toll Rates** | `fetchTollRates`, `fetchTollTripInfo` | Toll planning and cost calculation |

### Weather APIs (WSDOT)
| API | Key Endpoints | Common Use Cases |
|------|---------------|-----------------|
| **WSDOT Weather Information** | `fetchWeatherInformation`, `fetchWeatherInformationByStationId` | Current weather conditions |
| **WSDOT Weather Readings** | `fetchWeatherReadings`, `fetchSurfaceMeasurements`, `fetchSubSurfaceMeasurements` | Scientific weather data |
| **WSDOT Weather Stations** | `fetchWeatherStations` | Weather station locations and metadata |
| **WSDOT Mountain Pass Conditions** | `fetchMountainPassConditions`, `fetchMountainPassConditionById` | Mountain pass status and restrictions |

### Infrastructure APIs (WSDOT)
| API | Key Endpoints | Common Use Cases |
|------|---------------|-----------------|
| **WSDOT Bridge Clearances** | `fetchBridgeClearances`, `fetchBridgeClearancesByRoute` | Commercial vehicle routing |
| **WSDOT Commercial Vehicle Restrictions** | `fetchCommercialVehicleRestrictions`, `fetchCommercialVehicleRestrictionsWithId` | Truck routing and compliance |
| **WSDOT Border Crossings** | `fetchBorderCrossings` | Border planning and wait time monitoring |

## Detailed Endpoint Reference

| API Name | Endpoint Group Name | Function Name | Hook Name | Endpoint URL | Input Schema | Output Schema | Description |
|---|---|---|---|---|---|---|---|
| wsdot-border-crossings | border-crossing-data | fetchBorderCrossings | useBorderCrossings | /GetBorderCrossingsAsJson | borderCrossingsInputSchema | z.array(borderCrossingSchema) | Get all border crossing wait times and conditions |
| wsdot-bridge-clearances | bridge-clearances | fetchBridgeClearances | useBridgeClearances | /getClearancesAsJson | bridgeClearancesInputSchema | z.array(bridgeClearanceSchema) | Get bridge height restrictions for all routes |
| wsdot-bridge-clearances | bridge-clearances | fetchBridgeClearancesByRoute | useBridgeClearancesByRoute | /getClearancesAsJson?Route={Route} | bridgeClearancesByRouteInputSchema | z.array(bridgeClearanceSchema) | Get bridge clearances for specific route |
| wsdot-commercial-vehicle-restrictions | cv-restriction-data | fetchCommercialVehicleRestrictions | useCommercialVehicleRestrictions | /getCommercialVehicleRestrictionsAsJson | commercialVehicleRestrictionsInputSchema | z.array(cvRestrictionSchema) | Get commercial vehicle restrictions statewide |
| wsdot-commercial-vehicle-restrictions | cv-restriction-data-with-id | fetchCommercialVehicleRestrictionsWithId | useCommercialVehicleRestrictionsWithId | /getCommercialVehicleRestrictionsWithIdAsJson | commercialVehicleRestrictionsWithIdInputSchema | z.array(cvRestrictionWithIdSchema) | Get commercial vehicle restrictions with IDs |
| wsdot-highway-alerts | alert-areas | fetchMapAreas | useMapAreas | /getMapAreasAsJson | mapAreasInputSchema | z.array(areaSchema) | Get alert map areas for filtering |
| wsdot-highway-alerts | event-categories | fetchEventCategories | useEventCategories | /getEventCategoriesAsJson | eventCategoriesInputSchema | z.array(z.string()) | Get alert event categories |
| wsdot-highway-alerts | highwayAlerts | fetchAlertById | useAlertById | /getAlertAsJson?AlertID={AlertID} | alertByIdInputSchema | alertSchema | Get specific highway alert by ID |
| wsdot-highway-alerts | highwayAlerts | fetchAlerts | useAlerts | /getAlertsAsJson | alertsInputSchema | z.array(alertSchema) | Get all highway alerts |
| wsdot-highway-alerts | highwayAlerts | fetchAlertsByMapArea | useAlertsByMapArea | /getAlertsByMapAreaAsJson?MapArea={MapArea} | alertsByMapAreaInputSchema | z.array(alertSchema) | Get highway alerts for specific map area |
| wsdot-highway-alerts | highwayAlerts | fetchAlertsByRegionId | useAlertsByRegionId | /getAlertsByRegionIDAsJson?RegionID={RegionID} | alertsByRegionIDInputSchema | z.array(alertSchema) | Get highway alerts for specific region |
| wsdot-highway-alerts | highwayAlerts | searchAlerts | useSearchAlerts | /searchAlertsAsJson?StateRoute={StateRoute}&Region={Region}&SearchTimeStart={SearchTimeStart}&SearchTimeEnd={SearchTimeEnd}&StartingMilepost={StartingMilepost}&EndingMilepost={EndingMilepost} | searchAlertsInputSchema | z.array(alertSchema) | Search highway alerts by multiple criteria |
| wsdot-highway-cameras | cameras | fetchHighwayCameraByCameraId | useHighwayCameraByCameraId | /getCameraAsJson?CameraID={CameraID} | highwayCameraByCameraIdInputSchema | cameraSchema | Get specific highway camera by ID |
| wsdot-highway-cameras | cameras | fetchHighwayCameras | useHighwayCameras | /getCamerasAsJson | highwayCamerasInputSchema | z.array(cameraSchema) | Get all highway cameras |
| wsdot-highway-cameras | cameras | searchHighwayCamerasByRouteAndMilepost | useSearchHighwayCamerasByRouteAndMilepost | /searchCamerasAsJson?StateRoute={StateRoute}&StartingMilepost={StartingMilepost}&EndingMilepost={EndingMilepost} | highwayCamerasByRouteAndMilepostInputSchema | z.array(cameraSchema) | Search highway cameras by route and milepost |
| wsdot-mountain-pass-conditions | pass-conditions | fetchMountainPassConditionById | useMountainPassConditionById | /getMountainPassConditionAsJon?PassConditionID={PassConditionID} | mountainPassConditionByIdInputSchema | passConditionSchema | Get specific mountain pass condition by ID |
| wsdot-mountain-pass-conditions | pass-conditions | fetchMountainPassConditions | useMountainPassConditions | /getMountainPassConditionsAsJson | mountainPassConditionsInputSchema | z.array(passConditionSchema) | Get all mountain pass conditions |
| wsdot-toll-rates | toll-rates | fetchTollRates | useTollRates | /getTollRatesAsJson | tollRatesInputSchema | z.array(tollRateSchema) | Get all toll rates |
| wsdot-toll-rates | toll-trip-info | fetchTollTripInfo | useTollTripInfo | /getTollTripInfoAsJson | tollTripInfoInputSchema | z.array(tollTripInfoSchema) | Get toll trip information |
| wsdot-toll-rates | toll-trip-rates | fetchTollTripRates | useTollTripRates | /getTollTripRatesAsJson | tollTripRatesInputSchema | tollTripsRatesSchema | Get toll trip rates |
| wsdot-toll-rates | toll-trip-rates | fetchTripRatesByDate | useTripRatesByDate | /getTripRatesByDateAsJson?FromDate={FromDate}&ToDate={ToDate} | tripRatesByDateInputSchema | z.array(tollTripsRatesSchema) | Get toll rates for date range |
| wsdot-toll-rates | toll-trip-rates | fetchTripRatesByVersion | useTripRatesByVersion | /getTripRatesByVersionAsJson?Version={Version} | tripRatesByVersionInputSchema | tollTripsRatesSchema | Get toll rates for specific version |
| wsdot-toll-rates | toll-trip-version | fetchTollTripVersion | useTollTripVersion | /getTollTripVersionAsJson | tollTripVersionInputSchema | tollTripVersionSchema | Get current toll trip version |
| wsdot-traffic-flow | flow-data | fetchTrafficFlowById | useTrafficFlowById | /getTrafficFlowAsJson?FlowDataID={FlowDataID} | trafficFlowByIdInputSchema | flowDataSchema | Get specific traffic flow data |
| wsdot-traffic-flow | flow-data | fetchTrafficFlows | useTrafficFlows | /getTrafficFlowsAsJson | trafficFlowsInputSchema | z.array(flowDataSchema) | Get all traffic flow data |
| wsdot-travel-times | travel-time-routes | fetchTravelTimeById | useTravelTimeById | /getTravelTimeAsJson?TravelTimeID={TravelTimeID} | travelTimeByIdInputSchema | travelTimeRouteSchema | Get specific travel time by ID |
| wsdot-travel-times | travel-time-routes | fetchTravelTimes | useTravelTimes | /getTravelTimesAsJson | travelTimesInputSchema | z.array(travelTimeRouteSchema) | Get all travel times |
| wsdot-weather-information | weather-info | fetchCurrentWeatherForStations | useCurrentWeatherForStations | /GetCurrentWeatherForStationsAsJson?StationList={StationList} | currentWeatherForStationsInputSchema | z.array(weatherInfoSchema) | Get current weather for specific stations |
| wsdot-weather-information | weather-info | fetchWeatherInformation | useWeatherInformation | /GetCurrentWeatherInformationAsJson | weatherInformationInputSchema | z.array(weatherInfoSchema) | Get all weather information |
| wsdot-weather-information | weather-info | fetchWeatherInformationByStationId | useWeatherInformationByStationId | /GetCurrentWeatherInformationByStationIDAsJson?StationID={StationID} | weatherInformationByStationIdInputSchema | weatherInfoSchema | Get weather information for specific station |
| wsdot-weather-information | weather-info | searchWeatherInformation | useSearchWeatherInformation | /SearchWeatherInformationAsJson?StationID={StationID}&SearchStartTime={SearchStartTime}&SearchEndTime={SearchEndTime} | searchWeatherInformationInputSchema | z.array(weatherInfoSchema) | Search weather information by criteria |
| wsdot-weather-readings | weather-readings | fetchWeatherReadings | useWeatherReadings | /Scanweb | weatherReadingsInputSchema | z.array(weatherReadingSchema) | Get all weather readings |
| wsdot-weather-readings | surface-measurements | fetchSurfaceMeasurements | useSurfaceMeasurements | /Scanweb/SurfaceMeasurements | surfaceMeasurementsInputSchema | z.array(surfaceMeasurementSchema) | Get surface measurements |
| wsdot-weather-readings | sub-surface-measurements | fetchSubSurfaceMeasurements | useSubSurfaceMeasurements | /Scanweb/SubSurfaceMeasurements | subSurfaceMeasurementsInputSchema | z.array(subsurfaceMeasurementSchema) | Get subsurface measurements |
| wsdot-weather-stations | weather-stations | fetchWeatherStations | useWeatherStations | /GetCurrentStationsAsJson | weatherStationsInputSchema | z.array(weatherStationSchema) | Get all weather stations |
| wsf-fares | cache-flush-date-fares | fetchCacheFlushDateFares | useCacheFlushDateFares | /cacheflushdate | cacheFlushDateInputSchema | cacheFlushDateOutputSchema | Get fare cache flush date |
| wsf-fares | fare-line-items | fetchFareLineItemsBasic | useFareLineItemsBasic | /fareLineItemsBasic/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip} | fareLineItemsBasicInputSchema | z.array(lineItemSchema) | Get basic fare line items |
| wsf-fares | fare-line-items | fetchFareLineItemsByTripDateAndTerminals | useFareLineItemsByTripDateAndTerminals | /fareLineItems/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip} | fareLineItemsByTripDateAndTerminalsInputSchema | z.array(lineItemSchema) | Get fare line items with full details |
| wsf-fares | fare-line-items | fetchFareLineItemsVerbose | useFareLineItemsVerbose | /fareLineItemsVerbose/{TripDate} | fareLineItemsVerboseInputSchema | lineItemVerboseSchema | Get verbose fare line items for a date |
| wsf-fares | fare-totals | fetchFareTotalsByTripDateAndRoute | useFareTotalsByTripDateAndRoute | /fareTotals/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}/{FareLineItemID}/{Quantity} | fareTotalsByTripDateAndRouteInputSchema | z.array(fareTotalSchema) | Calculate fare totals for trip |
| wsf-fares | terminal-combo | fetchTerminalComboFares | useTerminalComboFares | /terminalCombo/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID} | terminalComboInputSchema | terminalComboFaresSchema | Get terminal combo fares |
| wsf-fares | terminal-combo | fetchTerminalComboFaresVerbose | useTerminalComboFaresVerbose | /terminalComboVerbose/{TripDate} | terminalComboFaresVerboseInputSchema | z.array(terminalComboFaresVerboseSchema) | Get verbose terminal combo fares |
| wsf-fares | terminals | fetchTerminalFares | useTerminalFares | /terminals/{TripDate} | terminalsInputSchema | terminalListSchema | Get all terminal fares for a date |
| wsf-fares | terminals | fetchTerminalMatesFares | useTerminalMatesFares | /terminalMates/{TripDate}/{TerminalID} | terminalMatesInputSchema | terminalListSchema | Get terminal mates for a date |
| wsf-fares | valid-date-range | fetchFaresValidDateRange | useFaresValidDateRange | /validdaterange | faresValidDateRangeInputSchema | validDateRangeSchema | Get valid fare date range |
| wsf-schedule | active-seasons | fetchActiveSeasons | useActiveSeasons | /activeseasons | activeSeasonsInputSchema | z.array(scheduleBaseSchema) | Get active schedule seasons |
| wsf-schedule | cache-flush-date-schedule | fetchCacheFlushDateSchedule | useCacheFlushDateSchedule | /cacheflushdate | cacheFlushDateInputSchema | cacheFlushDateOutputSchema | Get schedule cache flush date |
| wsf-schedule | route-details | fetchRouteDetailsByTripDate | useRouteDetailsByTripDate | /routedetails/{TripDate} | routeDetailsByTripDateInputSchema | z.array(routeDetailSchema) | Get route details for a date |
| wsf-schedule | route-details | fetchRouteDetailsByTripDateAndRouteId | useRouteDetailsByTripDateAndRouteId | /routedetails/{TripDate}/{RouteID} | routeDetailsByTripDateAndRouteIdInputSchema | routeDetailSchema | Get route details for a date and route |
| wsf-schedule | route-details | fetchRouteDetailsByTripDateAndTerminals | useRouteDetailsByTripDateAndTerminals | /routedetails/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID} | routeDetailsByTripDateAndTerminalsInputSchema | z.array(routeDetailSchema) | Get route details for a date and terminals |
| wsf-schedule | routes | fetchRoutesByTripDate | useRoutesByTripDate | /routes/{TripDate} | routesByTripDateInputSchema | z.array(routeSchema) | Get routes for a date |
| wsf-schedule | routes | fetchRoutesByTripDateAndTerminals | useRoutesByTripDateAndTerminals | /routes/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID} | routesByTripDateAndTerminalsInputSchema | z.array(routeSchema) | Get routes for a date and terminals |
| wsf-schedule | sailings | fetchAllSailingsBySchedRouteID | useAllSailingsBySchedRouteID | /allsailings/{SchedRouteID} | allSailingsBySchedRouteIDInputSchema | z.array(sailingSchema) | Get all sailings for a scheduled route |
| wsf-schedule | sailings | fetchSailingsByRouteID | useSailingsByRouteID | /sailings/{SchedRouteID} | sailingsByRouteIDInputSchema | z.array(sailingSchema) | Get sailings for a route |
| wsf-schedule | schedule-alerts | fetchScheduleAlerts | useScheduleAlerts | /alerts | scheduleAlertsInputSchema | z.array(alertDetailSchema) | Get schedule alerts |
| wsf-schedule | schedule-terminal-mates | fetchTerminalMatesSchedule | useTerminalMatesSchedule | /terminalmates/{TripDate}/{TerminalID} | terminalMatesInputSchema | terminalListSchema | Get terminal mates for a date |
| wsf-schedule | schedule-terminals | fetchTerminals | useTerminals | /terminals/{TripDate} | terminalsInputSchema | z.array(terminalSchema) | Get all terminals for a date |
| wsf-schedule | schedule-terminals | fetchTerminalsAndMates | useTerminalsAndMates | /terminalsandmates/{TripDate} | terminalsAndMatesInputSchema | z.array(terminalMateSchema) | Get terminals and mates for a date |
| wsf-schedule | schedule-terminals | fetchTerminalsAndMatesByRoute | useTerminalsAndMatesByRoute | /terminalsandmatesbyroute/{TripDate}/{RouteID} | terminalsAndMatesByRouteInputSchema | z.array(terminalMateSchema) | Get terminals and mates for a date and route |
| wsf-schedule | schedule-today | fetchScheduleTodayByRoute | useScheduleTodayByRoute | /scheduletoday/{RouteID}/{OnlyRemainingTimes} | scheduleSchema | Get today's schedule for a route |
| wsf-schedule | schedule-today | fetchScheduleTodayByTerminals | useScheduleTodayByTerminals | /scheduletoday/{DepartingTerminalID}/{ArrivingTerminalID}/{OnlyRemainingTimes} | scheduleSchema | Get today's schedule for terminals |
| wsf-schedule | schedule-valid-date-range | fetchScheduleValidDateRange | useScheduleValidDateRange | /validdaterange | scheduleValidDateRangeInputSchema | validDateRangeSchema | Get valid schedule date range |
| wsf-schedule | scheduled-routes | fetchScheduledRoutes | useScheduledRoutes | /schedroutes | scheduledRoutesInputSchema | z.array(schedRouteSchema) | Get all scheduled routes |
| wsf-schedule | scheduled-routes | fetchScheduledRoutesById | useScheduledRoutesById | /schedroutes/{ScheduleID} | scheduledRoutesByIdInputSchema | z.array(schedRouteSchema) | Get scheduled routes by ID |
| wsf-schedule | schedules | fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds | useScheduleByTripDateAndDepartingTerminalIdAndTerminalIds | /schedule/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID} | scheduleByTripDateAndTerminals | scheduleSchema | Get schedule for a date and terminals |
| wsf-schedule | schedules | fetchScheduleByTripDateAndRouteId | useScheduleByTripDateAndRouteId | /schedule/{TripDate}/{RouteID} | scheduleByTripDateAndRouteIdInputSchema | scheduleSchema | Get schedule for a date and route |
| wsf-schedule | service-disruptions | fetchRoutesHavingServiceDisruptionsByTripDate | useRoutesHavingServiceDisruptionsByTripDate | /routeshavingservicedisruptions/{TripDate} | routesHavingServiceDisruptionsByTripDateInputSchema | z.array(serviceDisruptionSchema) | Get routes with service disruptions |
| wsf-schedule | time-adjustments | fetchTimeAdjustments | useTimeAdjustments | /timeadj | timeAdjustmentsInputSchema | z.array(timeAdjustmentSchema) | Get all time adjustments |
| wsf-schedule | time-adjustments | fetchTimeAdjustmentsByRoute | useTimeAdjustmentsByRoute | /timeadjbyroute/{RouteID} | timeAdjustmentsByRouteInputSchema | z.array(timeAdjustmentSchema) | Get time adjustments for a route |
| wsf-schedule | time-adjustments | fetchTimeAdjustmentsBySchedRoute | useTimeAdjustmentsBySchedRoute | /timeadjbyschedroute/{SchedRouteID} | timeAdjustmentsBySchedRouteInputSchema | z.array(timeAdjustmentSchema) | Get time adjustments for a scheduled route |
| wsf-terminals | cache-flush-date-terminals | fetchCacheFlushDateTerminals | useCacheFlushDateTerminals | /cacheflushdate | cacheFlushDateInputSchema | cacheFlushDateOutputSchema | Get terminal cache flush date |
| wsf-terminals | terminal-basics | fetchTerminalBasics | useTerminalBasics | /terminalBasics | terminalBasicsInputSchema | z.array(terminalBasicSchema) | Get all terminal basics |
| wsf-terminals | terminal-basics | fetchTerminalBasicsByTerminalId | useTerminalBasicsByTerminalId | /terminalBasics/{TerminalID} | terminalBasicsByIdInputSchema | terminalBasicSchema | Get terminal basics for a specific terminal |
| wsf-terminals | terminal-bulletins | fetchTerminalBulletins | useTerminalBulletins | /terminalBulletins | terminalBulletinsInputSchema | z.array(terminalBulletinSchema) | Get all terminal bulletins |
| wsf-terminals | terminal-bulletins | fetchTerminalBulletinsByTerminalId | useTerminalBulletinsByTerminalId | /terminalBulletins/{TerminalID} | terminalBulletinsByIdInputSchema | terminalBulletinSchema | Get terminal bulletins for a specific terminal |
| wsf-terminals | terminal-locations | fetchTerminalLocations | useTerminalLocations | /terminalLocations | terminalLocationsInputSchema | z.array(terminalLocationSchema) | Get all terminal locations |
| wsf-terminals | terminal-locations | fetchTerminalLocationsByTerminalId | useTerminalLocationsByTerminalId | /terminalLocations/{TerminalID} | terminalLocationsByIdInputSchema | terminalLocationSchema | Get terminal location for a specific terminal |
| wsf-terminals | terminal-sailing-space | fetchTerminalSailingSpace | useTerminalSailingSpace | /terminalSailingSpace | terminalSailingSpaceInputSchema | z.array(terminalSailingSpaceSchema) | Get terminal sailing space information |
| wsf-terminals | terminal-sailing-space | fetchTerminalSailingSpaceByTerminalId | useTerminalSailingSpaceByTerminalId | /terminalSailingSpace/{TerminalID} | terminalSailingSpaceByIdInputSchema | terminalSailingSpaceSchema | Get sailing space for a specific terminal |
| wsf-terminals | terminal-transports | fetchTerminalTransports | useTerminalTransports | /terminalTransports | terminalTransportsInputSchema | z.array(terminalTransportSchema) | Get all terminal transports |
| wsf-terminals | terminal-transports | fetchTerminalTransportsByTerminalId | useTerminalTransportsByTerminalId | /terminalTransports/{TerminalID} | terminalTransportsByIdInputSchema | terminalTransportSchema | Get terminal transports for a specific terminal |
| wsf-terminals | terminal-verbose | fetchTerminalVerbose | useTerminalVerbose | /terminalVerbose | terminalVerboseInputSchema | z.array(terminalVerboseSchema) | Get all terminal information in verbose format |
| wsf-terminals | terminal-verbose | fetchTerminalVerboseByTerminalId | useTerminalVerboseByTerminalId | /terminalVerbose/{TerminalID} | terminalVerboseByIdInputSchema | terminalVerboseSchema | Get verbose terminal information for a specific terminal |
| wsf-terminals | terminal-wait-times | fetchTerminalWaitTimes | useTerminalWaitTimes | /terminalWaitTimes | terminalWaitTimesInputSchema | z.array(terminalWaitTimeSchema) | Get all terminal wait times |
| wsf-terminals | terminal-wait-times | fetchTerminalWaitTimesByTerminalId | useTerminalWaitTimesByTerminalId | /terminalWaitTimes/{TerminalID} | terminalWaitTimesByIdInputSchema | terminalWaitTimeSchema | Get wait times for a specific terminal |
| wsf-vessels | cache-flush-date-vessels | fetchCacheFlushDateVessels | useCacheFlushDateVessels | /cacheflushdate | cacheFlushDateInputSchema | cacheFlushDateOutputSchema | Get vessel cache flush date |
| wsf-vessels | vessel-accommodations | fetchVesselAccommodations | useVesselAccommodations | /vesselAccommodations | vesselAccommodationsInputSchema | z.array(vesselAccommodationSchema) | Get all vessel accommodations |
| wsf-vessels | vessel-accommodations | fetchVesselAccommodationsByVesselId | useVesselAccommodationsByVesselId | /vesselAccommodations/{VesselID} | vesselAccommodationsByIdInputSchema | vesselAccommodationSchema | Get accommodations for a specific vessel |
| wsf-vessels | vessel-basics | fetchVesselBasics | useVesselBasics | /vesselBasics | vesselBasicsInputSchema | z.array(vesselBasicSchema) | Get all vessel basics |
| wsf-vessels | vessel-basics | fetchVesselBasicsByVesselId | useVesselBasicsByVesselId | /vesselBasics/{VesselID} | vesselBasicsByIdInputSchema | vesselBasicSchema | Get vessel basics for a specific vessel |
| wsf-vessels | vessel-histories | fetchVesselHistories | useVesselHistories | /vesselHistory | vesselHistoriesInputSchema | z.array(vesselHistorySchema) | Get all vessel histories |
| wsf-vessels | vessel-histories | fetchVesselHistoriesByVesselNameAndDateRange | useVesselHistoriesByVesselNameAndDateRange | /vesselHistory/{VesselName}/{DateStart}/{DateEnd} | vesselHistoriesByVesselNameAndDateRangeInputSchema | z.array(vesselHistorySchema) | Get vessel history for a specific vessel and date range |
| wsf-vessels | vessel-locations | fetchVesselLocations | useVesselLocations | /vesselLocations | vesselLocationsInputSchema | z.array(vesselLocationSchema) | Get all vessel locations |
| wsf-vessels | vessel-locations | fetchVesselLocationsByVesselId | useVesselLocationsByVesselId | /vesselLocations/{VesselID} | vesselLocationsByIdInputSchema | vesselLocationSchema | Get location for a specific vessel |
| wsf-vessels | vessel-stats | fetchVesselStats | useVesselStats | /vesselStats | vesselStatsInputSchema | z.array(vesselStatSchema) | Get all vessel statistics |
| wsf-vessels | vessel-stats | fetchVesselStatsByVesselId | useVesselStatsByVesselId | /vesselStats/{VesselID} | vesselStatsByIdInputSchema | vesselStatSchema | Get statistics for a specific vessel |
| wsf-vessels | vessel-verbose | fetchVesselsVerbose | useVesselsVerbose | /vesselVerbose | vesselVerboseInputSchema | z.array(vesselVerboseSchema) | Get all vessel information in verbose format |
| wsf-vessels | vessel-verbose | fetchVesselsVerboseByVesselId | useVesselsVerboseByVesselId | /vesselVerbose/{VesselID} | vesselVerboseByIdInputSchema | vesselVerboseSchema | Get verbose vessel information for a specific vessel |

## Common Parameter Patterns

### Vessel-Specific Parameters
```javascript
// Get location for a specific vessel
const vessel = await fetchVesselLocationsByVesselId({
  params: { VesselID: 18 }, // Vessel ID is required
  fetchMode: 'native',
  validate: true
});

// Get vessel history for a date range
const history = await fetchVesselHistoriesByVesselNameAndDateRange({
  params: { 
    VesselName: 'Tacoma',
    DateStart: '2024-01-01',
    DateEnd: '2024-01-31'
  },
  fetchMode: 'native',
  validate: false
});
```

### Schedule-Specific Parameters
```javascript
// Get schedule for a specific route and date
const schedule = await fetchScheduleByTripDateAndRouteId({
  params: {
    TripDate: '2024-12-25',
    RouteID: 3 // Seattle-Bremerton route
  },
  fetchMode: 'native',
  validate: true
});

// Get today's remaining sailings
const sailings = await fetchScheduleTodayByTerminals({
  params: {
    DepartingTerminalID: 3, // Seattle
    ArrivingTerminalID: 7, // Bremerton
    OnlyRemainingTimes: true
  },
  fetchMode: 'native',
  validate: false
});
```

### Weather-Specific Parameters
```javascript
// Get weather for a specific station
const weather = await fetchWeatherInformationByStationId({
  params: { StationID: 1909 }, // Snoqualmie Pass weather station
  fetchMode: 'native',
  validate: true
});

// Search weather information for a date range
const searchResults = await fetchWeatherInformation({
  params: {
    StationID: 1909,
    SearchStartTime: '2024-01-01T00:00:00',
    SearchEndTime: '2024-01-02T00:00:00'
  },
  fetchMode: 'native',
  validate: false
});
```

## Usage Examples

### Real-time Ferry Tracking
```javascript
import { useVesselLocations } from 'ws-dottie/wsf-vessels';

function FerryTracker() {
  const { data: vessels, isLoading } = useVesselLocations({
    fetchMode: 'native',
    validate: false // Faster for real-time data
  });
  
  if (isLoading) return <div>Loading ferry locations...</div>;
  
  return (
    <div>
      <h2>Active Ferries: {vessels?.length || 0}</h2>
      {vessels?.map(vessel => (
        <div key={vessel.VesselID}>
          <h3>{vessel.VesselName}</h3>
          <p>Location: {vessel.Latitude}, {vessel.Longitude}</p>
          <p>Speed: {vessel.Speed} knots</p>
        </div>
      ))}
    </div>
  );
}
```

### Trip Planning with Fares
```javascript
import { useFareLineItemsByTripDateAndTerminals } from 'ws-dottie/wsf-fares';

function TripPlanner() {
  const [trip, setTrip] = useState({
    departing: 3, // Seattle
    arriving: 7, // Bremerton
    date: new Date()
  });
  
  const { data: fares } = useFareLineItemsByTripDateAndTerminals({
    params: {
      TripDate: trip.date.toISOString().split('T')[0],
      DepartingTerminalID: trip.departing,
      ArrivingTerminalID: trip.arriving,
      RoundTrip: false
    },
    fetchMode: 'native',
    validate: true // Ensure accurate pricing
  });
  
  return (
    <div>
      <h2>Trip from Seattle to Bremerton</h2>
      <p>Date: {trip.date.toLocaleDateString()}</p>
      <p>Available fares: {fares?.length || 0}</p>
      {fares?.map(fare => (
        <div key={fare.FareLineItemID}>
          <p>{fare.FareItemName}: ${fare.FareAmount}</p>
        </div>
      ))}
    </div>
  );
}
```

This comprehensive reference provides all available endpoints with their parameters, schemas, and usage examples to help developers quickly find the right API for their needs.
