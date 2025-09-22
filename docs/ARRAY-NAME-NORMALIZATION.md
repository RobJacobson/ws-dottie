# Array Name Normalization

This document outlines the standardization of array naming conventions across all API schemas in the ws-dottie project.

## Standardization Rules

### 1. Array Schema Naming Convention
- **Schema Pattern**: `[entity]ListSchema` (camelCase)
- **Type Pattern**: `[Entity]List` (PascalCase)
- **Examples**:
  - `alertsListSchema` → `AlertList`
  - `camerasListSchema` → `CameraList`
  - `vesselsListSchema` → `VesselList`

### 2. Naming Convention Standards
- **Schemas**: Always use camelCase (e.g., `userDataSchema`, `alertsListSchema`)
- **Types**: Always use PascalCase (e.g., `UserData`, `AlertsList`)
- **Consistency**: This convention applies to ALL schemas and types, not just lists

### 3. Inline Array Replacement
- Replace all inline `z.array(entitySchema)` with named list schemas
- Export both schema and type for each list
- Remove any unnamed inline array types

### 4. "ArrayOf..." Pattern Replacement
- Convert `arrayOf[Entity]Schema` → `[entity]ListSchema`
- Convert `ArrayOf[Entity]` → `[Entity]List`
- Examples:
  - `arrayOfAlertSchema` → `alertsListSchema`
  - `ArrayOfAlert` → `AlertList`

### 5. "[Entity]s" Pattern Replacement
- Convert `[entity]sSchema` → `[entity]ListSchema`
- Convert `[Entity]s` → `[Entity]List`
- Examples:
  - `weatherStationsSchema` → `weatherStationsListSchema`
  - `WeatherStations` → `WeatherStationsList`

## Implementation Checklist

Process APIs in alphabetical order. For each API, complete all tasks before moving to the next.

### WSF APIs

#### [x] wsf-fares
- [x] Convert `arrayOfTerminalResponseSchema` → `terminalResponsesListSchema`
- [x] Convert `ArrayOfTerminalResponse` → `TerminalResponseList`
- [x] Convert `arrayOfTerminalComboVerboseResponseSchema` → `terminalComboVerboseResponsesListSchema`
- [x] Convert `ArrayOfTerminalComboVerboseResponse` → `TerminalComboVerboseResponseList`
- [x] Convert `arrayOfLineItemResponseSchema` → `lineItemResponsesListSchema`
- [x] Convert `ArrayOfLineItemResponse` → `LineItemResponseList`
- [x] Convert `arrayOfArrayOfLineItemResponseSchema` → `lineItemResponsesListListSchema`
- [x] Convert `ArrayOfArrayOfLineItemResponse` → `LineItemResponseListList`
- [x] Convert `arrayOfLineItemXrefSchema` → `lineItemXrefsListSchema`
- [x] Convert `ArrayOfLineItemXref` → `LineItemXrefList`
- [x] Convert `arrayOfFareTotalResponseSchema` → `fareTotalResponsesListSchema`
- [x] Convert `ArrayOfFareTotalResponse` → `FareTotalResponseList`

#### [x] wsf-schedule
- [x] Create `schedulesListSchema` for inline `z.array(baseScheduleSchema)`
- [x] Create `ScheduleList` type
- [x] Create `routesListSchema` for inline `z.array(baseRouteSchema)`
- [x] Create `RouteList` type
- [x] Create `terminalsListSchema` for inline `z.array(terminalSchema)`
- [x] Create `TerminalList` type
- [x] Create `terminalMatesListSchema` for inline `z.array(terminalMateSchema)`
- [x] Create `TerminalMateList` type
- [x] Create `serviceDisruptionsListSchema` for inline `z.array(serviceDisruptionSchema)`
- [x] Create `ServiceDisruptionList` type
- [x] Create `alertsListSchema` for inline `z.array(alertSchema)`
- [x] Create `AlertList` type
- [x] Create `contingencyAdjsListSchema` for inline `z.array(contingencyAdjSchema)`
- [x] Create `ContingencyAdjList` type
- [x] Create `schedRoutesListSchema` for inline `z.array(schedRouteSchema)`
- [x] Create `SchedRouteList` type
- [x] Create `activeDateRangesListSchema` for inline `z.array(activeDateRangeSchema)`
- [x] Create `ActiveDateRangeList` type
- [x] Create `annotationsListSchema` for inline `z.array(annotationSchema)`
- [x] Create `AnnotationList` type
- [x] Create `terminalTimesListSchema` for inline `z.array(terminalTimeSchema)`
- [x] Create `TerminalTimeList` type
- [x] Create `journeysListSchema` for inline `z.array(journeySchema)`
- [x] Create `JourneyList` type
- [x] Create `sailingsListSchema` for inline `z.array(sailingSchema)`
- [x] Create `SailingList` type
- [x] Create `timeAdjustmentsListSchema` for inline `z.array(timeAdjustmentSchema)`
- [x] Create `TimeAdjustmentList` type
- [x] Create `terminalCombosListSchema` for inline `z.array(terminalComboSchema)`
- [x] Create `TerminalComboList` type
- [x] Create `alertDetailsListSchema` for inline `z.array(alertDetailSchema)`
- [x] Create `AlertDetailList` type

#### [x] wsf-terminals
- [x] Create `terminalBasicDetailsArraySchema` → `terminalBasicDetailsListSchema`
- [x] Create `TerminalBasicDetailArray` → `TerminalBasicDetailList`
- [x] Create `terminalBulletinsArraySchema` → `terminalBulletinsListSchema`
- [x] Create `TerminalBulletinArray` → `TerminalBulletinList`
- [x] Create `terminalLocationsArraySchema` → `terminalLocationsListSchema`
- [x] Create `TerminalLocationArray` → `TerminalLocationList`
- [x] Create `terminalSailingSpacesArraySchema` → `terminalSailingSpacesListSchema`
- [x] Create `TerminalSailingSpaceArray` → `TerminalSailingSpaceList`
- [x] Create `terminalTransportationOptionsArraySchema` → `terminalTransportationOptionsListSchema`
- [x] Create `TerminalTransportationOptionArray` → `TerminalTransportationOptionList`
- [x] Create `terminalWaitTimesArraySchema` → `terminalWaitTimesListSchema`
- [x] Create `TerminalWaitTimeArray` → `TerminalWaitTimeList`
- [x] Create `terminalVerboseDetailsArraySchema` → `terminalVerboseDetailsListSchema`
- [x] Create `TerminalVerboseDetailArray` → `TerminalVerboseDetailList`
- [x] Create `bulletinsArraySchema` → `bulletinsListSchema`
- [x] Create `BulletinArray` → `BulletinList`
- [x] Create `dispGISZoomLocsArraySchema` → `dispGISZoomLocsListSchema`
- [x] Create `DispGISZoomLocArray` → `DispGISZoomLocList`
- [x] Create `spaceForArrivalTerminalsArraySchema` → `spaceForArrivalTerminalsListSchema`
- [x] Create `SpaceForArrivalTerminalArray` → `SpaceForArrivalTerminalList`
- [x] Create `departingSpacesArraySchema` → `departingSpacesListSchema`
- [x] Create `DepartingSpaceArray` → `DepartingSpaceList`
- [x] Create `transitLinksArraySchema` → `transitLinksListSchema`
- [x] Create `TransitLinkArray` → `TransitLinkList`
- [x] Create `waitTimesArraySchema` → `waitTimesListSchema`
- [x] Create `WaitTimeArray` → `WaitTimeList`

#### [x] wsf-vessels
- [x] Convert `vesselBasicDetailsArraySchema` → `vesselBasicDetailsListSchema`
- [x] Convert `VesselBasicDetailsArray` → `VesselBasicDetailsList`
- [x] Convert `vesselAccommodationsArraySchema` → `vesselAccommodationsListSchema`
- [x] Convert `VesselAccommodationsArray` → `VesselAccommodationsList`
- [x] Convert `vesselStatsArraySchema` → `vesselStatsListSchema`
- [x] Convert `VesselStatsArray` → `VesselStatsList`
- [x] Convert `vesselLocationsArraySchema` → `vesselLocationsListSchema`
- [x] Convert `VesselLocationsArray` → `VesselLocationsList`
- [x] Convert `vesselVerboseDetailsArraySchema` → `vesselVerboseDetailsListSchema`
- [x] Convert `VesselVerboseDetailsArray` → `VesselVerboseDetailsList`
- [x] Convert `vesselHistoryResponseArraySchema` → `vesselHistoryResponseListSchema`
- [x] Convert `VesselHistoryResponseArray` → `VesselHistoryResponseList`

### WSDOT APIs

#### [x] wsdot-border-crossings
- [x] Convert `arrayOfBorderCrossingDataSchema` → `borderCrossingDataListSchema`
- [x] Convert `ArrayOfBorderCrossingData` → `BorderCrossingDataList`

#### [x] wsdot-bridge-clearances
- [x] Convert `arrayOfBridgeDataGISSchema` → `bridgeDataGISListSchema`
- [x] Convert `ArrayOfBridgeDataGIS` → `BridgeDataGISList`

#### [x] wsdot-commercial-vehicle-restrictions
- [x] Convert `arrayOfCVRestrictionDataSchema` → `cVRestrictionDataListSchema`
- [x] Convert `ArrayOfCVRestrictionData` → `CVRestrictionDataList`
- [x] Convert `arrayOfCVRestrictionDataWithIdSchema` → `cVRestrictionDataWithIdListSchema`
- [x] Convert `ArrayOfCVRestrictionDataWithId` → `CVRestrictionDataWithIdList`

#### [x] wsdot-highway-alerts
- [x] Convert `arrayOfAlertSchema` → `alertsListSchema`
- [x] Convert `ArrayOfAlert` → `AlertList`
- [x] Convert `arrayOfAreaSchema` → `areasListSchema`
- [x] Convert `ArrayOfArea` → `AreaList`
- [x] Convert `arrayOfStringSchema` → `stringsListSchema`
- [x] Convert `ArrayOfString` → `StringList`

#### [x] wsdot-highway-cameras
- [x] Convert `arrayOfCameraSchema` → `camerasListSchema`
- [x] Convert `ArrayOfCamera` → `CameraList`

#### [x] wsdot-mountain-pass-conditions
- [x] Convert `MountainPassConditionsSchema` → `mountainPassConditionsListSchema`
- [x] Convert `MountainPassConditions` → `MountainPassConditionsList`

#### [x] wsdot-toll-rates
- [x] Convert `arrayOfTollRateSchema` → `tollRatesListSchema`
- [x] Convert `ArrayOfTollRate` → `TollRateList`
- [x] Convert `arrayOfTripRateSchema` → `tripRatesListSchema`
- [x] Convert `ArrayOfTripRate` → `TripRateList`
- [x] Convert `arrayOfTollTripsSchema` → `tollTripsListSchema`
- [x] Convert `ArrayOfTollTrips` → `TollTripsList`
- [x] Convert `arrayOfTollTripInfoSchema` → `tollTripInfoListSchema`
- [x] Convert `ArrayOfTollTripInfo` → `TollTripInfoList`

#### [x] wsdot-traffic-flow
- [x] Convert `arrayOfFlowDataSchema` → `flowDataListSchema`
- [x] Convert `ArrayOfFlowData` → `FlowDataList`

#### [x] wsdot-travel-times
- [x] Convert `arrayOfTravelTimeRouteSchema` → `travelTimeRoutesListSchema`
- [x] Convert `ArrayOfTravelTimeRoute` → `TravelTimeRouteList`

#### [x] wsdot-weather
- [x] Convert `weatherInformationSchema` → `weatherInformationListSchema`
- [x] Convert `WeatherInformation` → `WeatherInformationList`
- [x] Convert `weatherReadingsSchema` → `weatherReadingsListSchema`
- [x] Convert `WeatherReadings` → `WeatherReadingsList`
- [x] Convert `weatherStationsSchema` → `weatherStationsListSchema`
- [x] Convert `WeatherStations` → `WeatherStationsList`

## Implementation Notes

1. **Schema Naming**: Use camelCase for ALL schema names (`fooListSchema`, `userDataSchema`)
2. **Type Naming**: Use PascalCase for ALL type names (`FooList`, `UserData`)
3. **Consistency**: Ensure all list schemas follow the same pattern
4. **Exports**: Always export both schema and type for each list
5. **Documentation**: Update JSDoc comments to reflect new naming
6. **Validation**: Test that all changes maintain type safety and functionality

### Critical Naming Rules
- **Schemas**: camelCase (e.g., `vesselDataSchema`, `alertsListSchema`)
- **Types**: PascalCase (e.g., `VesselData`, `AlertsList`)
- **Never mix**: Don't use PascalCase for schemas or camelCase for types

## Benefits of This Standardization

- **Alphabetical Grouping**: List schemas will be grouped with their companion entity schemas
- **Consistency**: Uniform naming pattern across all APIs
- **Readability**: More intuitive naming convention
- **Maintainability**: Easier to find and manage related schemas
- **Type Safety**: Clear distinction between single entities and lists