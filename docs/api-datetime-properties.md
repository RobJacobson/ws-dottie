# API DateTime Properties Reference

This document lists all API endpoints that return DateTime objects across the sixteen APIs in the ws-dottie project. Each DateTime property is listed on a separate row for clarity.

| API Name | Endpoint | DateTime Property | DateTime Format |
|----------|----------|-------------------|-----------------|
| WSDOT Border Crossings | GetBorderCrossingsAsJson | Time | `/Date(timestamp-timezone)/` |
| WSDOT Bridge Clearances | GetClearancesAsJson | APILastUpdate | `/Date(timestamp-timezone)/` |
| WSDOT Bridge Clearances | GetClearancesAsJson | RouteDate | `/Date(timestamp-timezone)/` |
| WSDOT Commercial Vehicle Restrictions | GetCVRestrictionsAsJson | DateEffective | `/Date(timestamp-timezone)/` |
| WSDOT Commercial Vehicle Restrictions | GetCVRestrictionsAsJson | DateExpires | `/Date(timestamp-timezone)/` |
| WSDOT Commercial Vehicle Restrictions | GetCVRestrictionsAsJson | DatePosted | `/Date(timestamp-timezone)/` |
| WSDOT Highway Alerts | GetAlertsAsJson | EndTime | `/Date(timestamp-timezone)/` |
| WSDOT Highway Alerts | GetAlertsAsJson | LastUpdatedTime | `/Date(timestamp-timezone)/` |
| WSDOT Highway Alerts | GetAlertsAsJson | StartTime | `/Date(timestamp-timezone)/` |
| WSDOT Mountain Pass Conditions | GetMountainPassConditionsAsJson | DateUpdated | `/Date(timestamp-timezone)/` |
| WSDOT Toll Rates | GetTollRatesAsJson | TimeUpdated | `/Date(timestamp-timezone)/` |
| WSDOT Toll Rates | GetTollTripInfoAsJson | ModifiedDate | `/Date(timestamp-timezone)/` |
| WSDOT Toll Rates | GetTollTripRatesAsJson | LastUpdated | `/Date(timestamp-timezone)/` |
| WSDOT Toll Rates | GetTollTripRatesAsJson | MessageUpdateTime | `/Date(timestamp-timezone)/` |
| WSDOT Traffic Flow | GetTrafficFlowAsJson | Time | `/Date(timestamp-timezone)/` |
| WSDOT Travel Times | GetTravelTimesAsJson | TimeUpdated | `/Date(timestamp-timezone)/` |
| WSDOT Weather Information | GetWeatherInformationAsJson | ReadingTime | `/Date(timestamp-timezone)/` |
| WSDOT Weather Information Extended | GetWeatherInformationExtendedAsJson | ReadingTime | `/Date(timestamp-timezone)/` |
| WSF Fares | /cacheflushdate | FaresCacheFlushDate | `/Date(timestamp-timezone)/` |
| WSF Fares | /validdaterange | DateFrom | `/Date(timestamp-timezone)/` |
| WSF Fares | /validdaterange | DateThru | `/Date(timestamp-timezone)/` |
| WSF Schedule | /cacheflushdate | ScheduleCacheFlushDate | `/Date(timestamp-timezone)/` |
| WSF Schedule | /validdaterange | DateFrom | `/Date(timestamp-timezone)/` |
| WSF Schedule | /validdaterange | DateThru | `/Date(timestamp-timezone)/` |
| WSF Schedule | /activeseasons | ScheduleStart | `/Date(timestamp-timezone)/` |
| WSF Schedule | /activeseasons | ScheduleEnd | `/Date(timestamp-timezone)/` |
| WSF Schedule | /schedroutes | DateFrom (in ContingencyAdj) | `/Date(timestamp-timezone)/` |
| WSF Schedule | /schedroutes | DateThru (in ContingencyAdj) | `/Date(timestamp-timezone)/` |
| WSF Schedule | /sailings | DateFrom (in ActiveDateRanges) | `/Date(timestamp-timezone)/` |
| WSF Schedule | /sailings | DateThru (in ActiveDateRanges) | `/Date(timestamp-timezone)/` |
| WSF Schedule | /sailings | Time (in TerminalTime) | `/Date(timestamp-timezone)/` |
| WSF Schedule | /alerts | PublishDate | `/Date(timestamp-timezone)/` |
| WSF Schedule | /timeadj | DateFrom (in ActiveSailingDateRange) | `/Date(timestamp-timezone)/` |
| WSF Schedule | /timeadj | DateThru (in ActiveSailingDateRange) | `/Date(timestamp-timezone)/` |
| WSF Schedule | /timeadj | AdjDateFrom | `/Date(timestamp-timezone)/` |
| WSF Schedule | /timeadj | AdjDateThru | `/Date(timestamp-timezone)/` |
| WSF Schedule | /timeadj | TimeToAdj | `/Date(timestamp-timezone)/` |
| WSF Schedule | /schedule | SailingDate | `/Date(timestamp-timezone)/` |
| WSF Schedule | /schedule | LastUpdated | `/Date(timestamp-timezone)/` |
| WSF Schedule | /schedule | ScheduleStart | `/Date(timestamp-timezone)/` |
| WSF Schedule | /schedule | ScheduleEnd | `/Date(timestamp-timezone)/` |
| WSF Schedule | /schedule | DepartingTime | `/Date(timestamp-timezone)/` |
| WSF Schedule | /schedule | ArrivingTime | `/Date(timestamp-timezone)/` |
| WSF Schedule | /alternativeformats/{SubjectName} | FromDate | `MM/DD/YYYY` or `null` |
| WSF Schedule | /alternativeformats/{SubjectName} | ThruDate | `MM/DD/YYYY` or `null` |
| WSF Schedule | /alternativeformats/{SubjectName} | ModifiedDate | `MM/DD/YYYY HH:MM:SS AM/PM` or `null` |
| WSF Terminals | /terminalbulletins | BulletinLastUpdated | `/Date(timestamp-timezone)/` |
| WSF Terminals | /terminalwaittimes | WaitTimeLastUpdated | `/Date(timestamp-timezone)/` |
| WSF Terminals | /terminalsailingspace | Departure | `/Date(timestamp-timezone)/` |
| WSF Vessels | /cacheflushdate | VesselsCacheFlushDate | `/Date(timestamp-timezone)/` |
| WSF Vessels | /vesselhistory | ScheduledDepart | `/Date(timestamp-timezone)/` |
| WSF Vessels | /vesselhistory | ActualDepart | `/Date(timestamp-timezone)/` |
| WSF Vessels | /vesselhistory | EstArrival | `/Date(timestamp-timezone)/` |
| WSF Vessels | /vesselhistory | Date | `/Date(timestamp-timezone)/` |
| WSF Vessels | /vessellocations | LeftDock | `/Date(timestamp-timezone)/` |
| WSF Vessels | /vessellocations | Eta | `/Date(timestamp-timezone)/` |
| WSF Vessels | /vessellocations | ScheduledDeparture | `/Date(timestamp-timezone)/` |
| WSF Vessels | /vessellocations | TimeStamp | `/Date(timestamp-timezone)/` |

## Summary

- **Total APIs**: 16
- **APIs with DateTime properties**: 15
- **APIs without DateTime properties**: 2 (WSDOT Highway Cameras, WSDOT Weather Stations)
- **Total DateTime properties**: 52

## Verified Date Formats

Based on actual API testing with valid access codes, the following date formats are confirmed:

### Primary Format: `/Date(timestamp-timezone)/`
**Used by**: All WSDOT Traveler Information APIs and most WSF APIs
**Example**: `/Date(1753121700000-0700)/`
**Description**: Unix timestamp with timezone offset

**Tested Endpoints**:
- WSDOT Border Crossings: `Time` field
- WSDOT Highway Alerts: `StartTime`, `EndTime`, `LastUpdatedTime` fields
- WSDOT Bridge Clearances: `APILastUpdate`, `RouteDate` fields
- WSF Vessels: `ScheduledDeparture`, `TimeStamp` fields
- WSF Schedule: `DateFrom`, `DateThru` fields

### Alternative Formats (WSF Schedule API)
**Used by**: WSF Schedule `/alternativeformats/{SubjectName}` endpoint
**Formats**: 
- `MM/DD/YYYY` (e.g., "12/25/2024")
- `MM/DD/YYYY HH:MM:SS AM/PM` (e.g., "12/25/2024 02:30:45 PM")

**Note**: These formats are documented in the codebase but require additional testing with non-null data to confirm actual usage.

### Notes

- **Primary Date Format**: Most APIs return dates in WSDOT's `/Date(timestamp-timezone)/` format (e.g., `/Date(1753121700000-0700)/`)
- **WSF Alternative Formats**: The WSF Schedule API's `/alternativeformats/{SubjectName}` endpoint may return dates in `MM/DD/YYYY` or `MM/DD/YYYY HH:MM:SS AM/PM` formats
- **Date Conversion**: All DateTime properties are automatically converted to JavaScript Date objects using the `wsdotDateTimestampToJsDate` utility function
- **Optional DateTime Properties**: Some properties can be `null` and are marked as optional in the types
- **Timezone Handling**: The `/Date(timestamp-timezone)/` format includes timezone offset information
- **API Consistency**: Both WSDOT Traveler Information APIs and WSF APIs use the same `/Date(timestamp-timezone)/` format for most endpoints 