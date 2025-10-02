# WSF Schedule API

**Source:** [WSDOT Ferries API Documentation](https://www.wsdot.wa.gov/ferries/api/schedule/documentation/rest.html)

**Base URL:** `https://www.wsdot.wa.gov/ferries/api/schedule/rest`

## Table of Contents

- [API Access Code](#api-access-code)
- [/cacheflushdate](#cacheflushdate)
- [/validdaterange](#validdaterange)
- [/terminals](#terminals)
- [/terminalsandmates](#terminalsandmates)
- [/terminalsandmatesbyroute](#terminalsandmatesbyroute)
- [/terminalmates](#terminalmates)
- [/routes](#routes)
- [/routeshavingservicedisruptions](#routeshavingservicedisruptions)
- [/routedetails](#routedetails)
- [/activeseasons](#activeseasons)
- [/schedroutes](#schedroutes)
- [/sailings](#sailings)
- [/allsailings](#allsailings)
- [/timeadj](#timeadj)
- [/timeadjbyroute](#timeadjbyroute)
- [/timeadjbyschedroute](#timeadjbyschedroute)
- [/schedule](#schedule)
- [/scheduletoday](#scheduletoday)
- [/alerts](#alerts)

[See also and [sailingResponseSchema](https://www.wsdot.wa.gov/ferries/api/schedule/rest/help/operations/GetSchedSailingsBySchedRoute) [timeAdjustmentResponse schema](https://www.wsdot.wa.gov/ferries/api/schedule/rest/help/operations/GetTimeAdjByRoute)]


## API Access Code

Most of the REST operations require that an API Access Code be passed as part of the URL string. In order to get a valid API Access Code, please register your email address with the WSDOT Traveler API.

---

## /cacheflushdate

### Endpoints

```http
GET /cacheflushdate
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

Some of the retrieval operations in this service return data that changes infrequently. As a result, you may wish to cache it in your application. Use the `/cacheflushdate` operation to poll for changes. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service.

The following operations return data that changes infrequently and can be cached in the manner described above:

- `/validdaterange`
- `/terminals`
- `/terminalsandmates`
- `/terminalsandmatesbyroute`
- `/terminalmates`
- `/routes`
- `/routeshavingservicedisruptions`
- `/routedetails`
- `/activeseasons`
- `/schedroutes`
- `/sailings`
- `/allsailings`
- `/timeadj`
- `/timeadjbyroute`
- `/timeadjbyschedroute`
- `/schedule`
- `/scheduletoday`
- `/alerts`

### Model

| Field | Type | Description |
|-------|------|-------------|
| `CacheFlushDate` | `date` (optional) | If present, notes the date that certain service data was last changed (see description). |



---

## /validdaterange

### Endpoints

```http
GET /validdaterange?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation retrieves a date range for which schedule data is currently published & available. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `DateFrom` | `date` | Schedule information is available from this trip date onward. |
| `DateThru` | `date` | Schedule information is not available after this trip date. |

---

## /terminals/{TripDate}

### Endpoints

```http
GET /terminals/{TripDate}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation retrieves valid departing terminals for a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). A valid API Access Code from the WSDOT Traveler API must also be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `TerminalID` | `integer` | Unique identifier for a terminal. |
| `Description` | `string` | The name of the terminal. |



---

## /terminalsandmates/{TripDate}

### Endpoints

```http
GET /terminalsandmates/{TripDate}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation retrieves all valid departing and arriving terminal combinations for a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). A valid API Access Code from the WSDOT Traveler API must also be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `DepartingTerminalID` | `integer` | Unique identifier for the departing terminal. |
| `DepartingDescription` | `string` | The name of the departing terminal. |
| `ArrivingTerminalID` | `integer` | Unique identifier for the arriving terminal. |
| `ArrivingDescription` | `string` | The name of the arriving terminal. |

---

## /terminalsandmatesbyroute/{TripDate}/{RouteID}

### Endpoints

```http
GET /terminalsandmatesbyroute/{TripDate}/{RouteID}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation provides valid departing and arriving terminal combinations for a given trip date and route. Valid routes may be found by using `/routes`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). A valid API Access Code from the WSDOT Traveler API must also be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `DepartingTerminalID` | `integer` | Unique identifier for the departing terminal. |
| `DepartingDescription` | `string` | The name of the departing terminal. |
| `ArrivingTerminalID` | `integer` | Unique identifier for the arriving terminal. |
| `ArrivingDescription` | `string` | The name of the arriving terminal. |

---

## /terminalmates/{TripDate}/{TerminalID}

### Endpoints

```http
GET /terminalmates/{TripDate}/{TerminalID}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation provides arriving terminals for a given departing terminal and trip date. A valid departing terminal may be found by using `/terminals`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). A valid API Access Code from the WSDOT Traveler API must also be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `TerminalID` | `integer` | Unique identifier for a terminal. |
| `Description` | `string` | The name of the terminal. |



---

## /routes

### Endpoints

```http
GET /routes/{TripDate}?apiaccesscode={APIAccessCode}
GET /routes/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation retrieves the most basic / brief information pertaining to routes. If only a trip date is included in the URL string, all routes available for that date of travel are returned. If a trip date, departing terminal and arriving terminal are included then routes in the resultset are filtered to match accordingly. Valid departing and arriving terminals may be found using `/terminalsandmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `RouteID` | `integer` | Unique identifier for a route. |
| `RouteAbbrev` | `string` | The route's abbreviation. |
| `Description` | `string` | The full name of the route. |
| `RegionID` | `integer` | Unique identifier that identifies the region associated with the route. |
| `ServiceDisruptions` | `array` | Service disruption alerts that are currently affecting the route. |
| `ServiceDisruptions[].BulletinID` | `integer` | Unique identifier for the alert. |
| `ServiceDisruptions[].BulletinFlag` | `boolean` | A flag that, when true, indicates the alert is also being used as a bulletin. |
| `ServiceDisruptions[].PublishDate` | `date` (optional) | The date the alert was published. |
| `ServiceDisruptions[].DisruptionDescription` | `string` | The service disruption text associated with the alert. |



---

## /routeshavingservicedisruptions/{TripDate}

### Endpoints

```http
GET /routeshavingservicedisruptions/{TripDate}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation retrieves the most basic / brief information for routes currently associated with service disruptions. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `RouteID` | `integer` | Unique identifier for a route. |
| `RouteAbbrev` | `string` | The route's abbreviation. |
| `Description` | `string` | The full name of the route. |
| `RegionID` | `integer` | Unique identifier that identifies the region associated with the route. |
| `ServiceDisruptions` | `array` | Service disruption alerts that are currently affecting the route. |
| `ServiceDisruptions[].BulletinID` | `integer` | Unique identifier for the alert. |
| `ServiceDisruptions[].BulletinFlag` | `boolean` | A flag that, when true, indicates the alert is also being used as a bulletin. |
| `ServiceDisruptions[].PublishDate` | `date` (optional) | The date the alert was published. |
| `ServiceDisruptions[].DisruptionDescription` | `string` | The service disruption text associated with the alert. |



---

## /routedetails

### Endpoints

```http
GET /routedetails/{TripDate}?apiaccesscode={APIAccessCode}
GET /routedetails/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}?apiaccesscode={APIAccessCode}
GET /routedetails/{TripDate}/{RouteID}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation retrieves highly detailed information pertaining to routes. If only a trip date is included in the URL string, all routes available for that date of travel are returned. If a trip date, departing terminal and arriving terminal are included then routes in the resultset are filtered to match accordingly. Along the same lines, including only a trip date and route will filter the resultset to a single route. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `RouteID` | `integer` | Unique identifier for a route. |
| `RouteAbbrev` | `string` | The route's abbreviation. |
| `Description` | `string` | The full name of the route. |
| `RegionID` | `integer` | Unique identifier that identifies the region associated with the route. |
| `VesselWatchID` | `integer` | Unique identifier used to group routes for VesselWatch. |
| `ReservationFlag` | `boolean` | Indicates whether or not the route is reservable. |
| `InternationalFlag` | `boolean` | Indicates whether or not the route operates outside the US. |
| `PassengerOnlyFlag` | `boolean` | If this flag is true, then the route does not service vehicles. |
| `CrossingTime` | `string` (optional) | An estimated crossing time (in minutes) associated with the route. This value will likely be absent for multi-destination routes. |
| `AdaNotes` | `string` (optional) | ADA information associated with the route. |
| `GeneralRouteNotes` | `string` (optional) | Miscellaneous information associated with the route. |
| `SeasonalRouteNotes` | `string` (optional) | Route notes specific to the season that the trip date is associated with. |
| `Alerts` | `array` | Alerts associated with the route. |
| `Alerts[].BulletinID` | `integer` | Unique identifier for the alert. |
| `Alerts[].BulletinFlag` | `boolean` | A flag that, when true, indicates the alert is also being used as a bulletin. |
| `Alerts[].CommunicationFlag` | `boolean` | A flag that, when true, indicates the alert is also being used as a communications announcement. |
| `Alerts[].PublishDate` | `date` (optional) | The date the alert was published. |
| `Alerts[].AlertDescription` | `string` (optional) | The alert text, tailored as a brief route announcement. |
| `Alerts[].DisruptionDescription` | `string` (optional) | If present, indicates service disruption text associated with the alert. |
| `Alerts[].AlertFullTitle` | `string` | The title of the alert. |
| `Alerts[].AlertFullText` | `string` | The full text of the alert. |
| `Alerts[].IVRText` | `string` (optional) | The alert text, tailored for text to speech systems. |



---

## /activeseasons

### Endpoints

```http
GET /activeseasons?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation retrieves a summary of active seasons. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `ScheduleID` | `integer` | Unique identifier for a season. |
| `ScheduleName` | `string` | The name of the season. |
| `ScheduleSeason` | `enum/integer` | Indicates a quarterly identifier. 0 for Spring, 1 for Summer, 2 for Fall and 3 for Winter. |
| `SchedulePDFUrl` | `string` | A URL to the season in PDF format. |
| `ScheduleStart` | `date` | A trip date that represents the start of the season. If the consumer needs specifics about time, they can translate this trip date value to 3:00am. For example, if a ScheduleStart of 2014-06-15 is returned, this would indicate the season starts precisely on 2014-06-15 at 3:00am. |
| `ScheduleEnd` | `date` | A trip date that represents the end of the season. If the consumer needs specifics about time, they can translate this trip date value to the next calendar date at 2:59am. For example, if a ScheduleEnd of 2014-09-20 is returned, this would indicate the season ends precisely on 2014-09-21 at 2:59am. |



---

## /schedroutes

### Endpoints

```http
GET /schedroutes?apiaccesscode={APIAccessCode}
GET /schedroutes/{ScheduleID}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation provides a listing of routes that are active for a season. For example, "Anacortes / Sidney B.C." may be a valid route, but if it's not scheduled to run during Winter 2014, it won't be returned as part of the Winter 2014 scheduled routes resultset. Results will include all known scheduled routes spanning current and upcoming seasons or, alternatively, results can be filtered to only include scheduled routes for a specific season (when the season is specified with a ScheduleID value). Seasons may be determined using `/activeseasons`. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `ScheduleID` | `integer` | Unique identifier for a season. |
| `SchedRouteID` | `integer` | Unique identifier for a scheduled route. |
| `ContingencyOnly` | `boolean` | If true, see additions in the ContingencyAdj array for the periods of time this scheduled route is active. If false, this scheduled route operates the majority of the season (yet could still be replaced by contingencies specified in the ContingencyAdj array). |
| `RouteID` | `integer` | Unique identifier for the underlying route. |
| `RouteAbbrev` | `string` | The underlying route's abbreviation. |
| `Description` | `string` | The full name of the scheduled route. |
| `SeasonalRouteNotes` | `string` (optional) | Notes for this scheduled route. |
| `RegionID` | `integer` | Unique identifier that identifies the region associated with the underlying route. |
| `ServiceDisruptions` | `array` | Service disruption alerts that are currently affecting the scheduled route. |
| `ServiceDisruptions[].BulletinID` | `integer` | Unique identifier for the alert. |
| `ServiceDisruptions[].BulletinFlag` | `boolean` | A flag that, when true, indicates the alert is also being used as a bulletin. |
| `ServiceDisruptions[].PublishDate` | `date` (optional) | The date the alert was published. |
| `ServiceDisruptions[].DisruptionDescription` | `string` | The service disruption text associated with the alert. |
| `ContingencyAdj` | `array` | Defines periods of service for contingency routes (scheduled routes marked as ContingencyOnly). For non-contingency routes (scheduled routes where ContingencyOnly is false) it might define date ranges where the scheduled route is not in service. |
| `ContingencyAdj[].DateFrom` | `date` | The precise date and time that the contingency adjustment starts. |
| `ContingencyAdj[].DateThru` | `date` | The precise date and time that the contingency adjustment ends. |
| `ContingencyAdj[].EventID` | `integer` (optional) | Unique identifier for an event. |
| `ContingencyAdj[].EventDescription` | `string` (optional) | Describes what prompted this contingency adjustment. |
| `ContingencyAdj[].AdjType` | `enum/integer` | Indicates whether this adjustment represents a cancellation or addition in service. 1 for Addition, 2 for Cancellation. |
| `ContingencyAdj[].ReplacedBySchedRouteID` | `integer` (optional) | If this is a non-contingency route that's being cancelled (scheduled route where ContingencyOnly is false and the AdjType is 2) then this value reflects the unique identifier of the contingency scheduled route that's replacing it. |



---

## /sailings/{SchedRouteID}

### Endpoints

```http
GET /sailings/{SchedRouteID}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation provides sailings for a particular scheduled route. Sailings are departure times organized by direction of travel (eastbound / westbound), days of operation groups (daily, weekday, weekend, etc) and, in some cases, date ranges (eg. Early Fall / Late Fall). Sailings largely mimic the groupings of departures found on the printed PDF version of the schedule. Scheduled routes may be determined using `/schedroutes`. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `ScheduleID` | `integer` | Unique identifier for a season. |
| `SchedRouteID` | `integer` | Unique identifier for a scheduled route. |
| `RouteID` | `integer` | Unique identifier for the underlying route. |
| `SailingID` | `integer` | Unique identifier for a sailing. |
| `SailingDescription` | `string` | A title that describes the sailing (eg. Leave Port Townsend). |
| `SailingNotes` | `string` (optional) | Informational text that might be associated with the sailing. |
| `DisplayColNum` | `integer` | A suggested number of columns to use when rendering departures to a desktop webpage. |
| `SailingDir` | `enum/integer` | Indicates the direction of travel. 1 for Westbound, 2 for Eastbound. |
| `DayOpDescription` | `string` | A days of operation grouping for the sailing (eg. "Daily"). |
| `DayOpUseForHoliday` | `boolean` | A flag that indicates whether or not the sailing should apply for holidays. |
| `ActiveDateRanges` | `array` | A collection of date ranges detailing when this sailing is active. |
| `ActiveDateRanges[].DateFrom` | `date` | A trip date that represents the start of the active sailing date range. If the consumer needs specifics about time, they can translate this trip date value to 3:00am. For example, if a DateFrom of 2014-06-15 is returned, this would indicate the active date range starts precisely on 2014-06-15 at 3:00am. |
| `ActiveDateRanges[].DateThru` | `date` | A trip date that represents the end of the active sailing date range. If the consumer needs specifics about time, they can translate this trip date value to the next calendar date at 2:59am. For example, if a DateThru of 2014-09-20 is returned, this would indicate the active date range ends precisely on 2014-09-21 at 2:59am. |
| `ActiveDateRanges[].EventID` | `integer` (optional) | Unique identifier for an event. |
| `ActiveDateRanges[].EventDescription` | `string` (optional) | Explaination (if necessary) of this sailing date range. |
| `Journs` | `array` | A single vessel that stops at one or more terminals making a full trip in the direction described by the sailing. |
| `Journs[].JourneyID` | `integer` | Unique identifier for a journey. |
| `Journs[].ReservationInd` | `boolean` | Indicates whether or not the journey contains reservable departures. |
| `Journs[].InternationalInd` | `boolean` | Indicates whether or not the journey travels outside the US. |
| `Journs[].InterislandInd` | `boolean` | If true, this indicates that the journey operates primarily between islands and a single mainland. |
| `Journs[].VesselID` | `integer` | Unique identifier for the vessel that's planned to service this journey. |
| `Journs[].VesselName` | `string` | The name of the vessel that's planned to service this journey. |
| `Journs[].VesselHandicapAccessible` | `boolean` | A flag that indicates whether or not the vessel that's planned to service this journey is ADA accessible. |
| `Journs[].VesselPositionNum` | `integer` | A number that represents a single vessel that services all of the stops in the journey. |
| `Journs[].TerminalTimes` | `array` | One or more terminal departures or arrivals made by the same vessel. |
| `Journs[].TerminalTimes[].JourneyTerminalID` | `integer` | Unique identifier for a terminal time. |
| `Journs[].TerminalTimes[].TerminalID` | `integer` | Unique identifier for a terminal. |
| `Journs[].TerminalTimes[].TerminalDescription` | `string` | The full name of the terminal. |
| `Journs[].TerminalTimes[].TerminalBriefDescription` | `string` | A brief / shortened name for the terminal. |
| `Journs[].TerminalTimes[].Time` | `date` (optional) | The time of the departure / arrival. If the journey does not stop at this terminal no value will be present. |
| `Journs[].TerminalTimes[].DepArrIndicator` | `enum/integer` (optional) | Indicates whether this stop represents a departure or an arrival. 1 for Departure, 2 for Arrival. If the journey does not stop at this terminal no value will be present. |
| `Journs[].TerminalTimes[].IsNA` | `boolean` | If true indicates that the journey does not interact with this terminal. |
| `Journs[].TerminalTimes[].Annotations` | `array` | Informational attributes associated with the terminal time. |
| `Journs[].TerminalTimes[].Annotations[].AnnotationID` | `integer` | Unique identifier for an annotation. |
| `Journs[].TerminalTimes[].Annotations[].AnnotationText` | `string` | The descriptive content of the annotation. |
| `Journs[].TerminalTimes[].Annotations[].AnnotationIVRText` | `string` | The descriptive content of the annotation formatted for IVR. |
| `Journs[].TerminalTimes[].Annotations[].AdjustedCrossingTime` | `integer` (optional) | Adjusted crossing time in minutes. Present when the annotation requires an override of the CrossingTime value found in route details. |
| `Journs[].TerminalTimes[].Annotations[].AnnotationImg` | `string` | A URL to an image that can be used to graphically represent this annotation. |
| `Journs[].TerminalTimes[].Annotations[].TypeDescription` | `string` | A logical grouping for the annotation (Day Type, Informational, etc). |
| `Journs[].TerminalTimes[].Annotations[].SortSeq` | `integer` | A preferred sort order (sort-ascending with respect to other annotations). |



---

## /allsailings/{SchedRouteID}/{Y}

### Endpoints

```http
GET /allsailings/{SchedRouteID}/{Y}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation provides all sailings for a particular scheduled route. Sailings are departure times organized by direction of travel (eastbound / westbound), days of operation groups (daily, weekday, weekend, etc) and, in some cases, date ranges (eg. Early Fall / Late Fall). Sailings largely mimic the groupings of departures found on the printed PDF version of the schedule. Scheduled routes may be determined using `/schedroutes`. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

*Note: This endpoint returns the same model structure as `/sailings/{SchedRouteID}` - see that endpoint for the complete model definition.*



---

## /timeadj

### Endpoints

```http
GET /timeadj?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation provides a listing of all additions and cancellations that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `ScheduleID` | `integer` | Unique identifier for a season. |
| `SchedRouteID` | `integer` | Unique identifier for a scheduled route. |
| `RouteID` | `integer` | Unique identifier for the underlying route. |
| `RouteDescription` | `string` | The full name of the route. |
| `RouteSortSeq` | `integer` | A preferred sort order (sort-ascending with respect to other routes). |
| `SailingID` | `integer` | Unique identifier for a sailing. |
| `SailingDescription` | `string` | A title that describes the sailing (eg. Leave Port Townsend). |
| `ActiveSailingDateRange` | `array` | A collection of date ranges detailing when this sailing is active. |
| `ActiveSailingDateRange[].DateFrom` | `date` | A trip date that represents the start of the active sailing date range. If the consumer needs specifics about time, they can translate this trip date value to 3:00am. For example, if a DateFrom of 2014-06-15 is returned, this would indicate the active date range starts precisely on 2014-06-15 at 3:00am. |
| `ActiveSailingDateRange[].DateThru` | `date` | A trip date that represents the end of the active sailing date range. If the consumer needs specifics about time, they can translate this trip date value to the next calendar date at 2:59am. For example, if a DateThru of 2014-09-20 is returned, this would indicate the active date range ends precisely on 2014-09-21 at 2:59am. |
| `ActiveSailingDateRange[].EventID` | `integer` (optional) | Unique identifier for an event. |
| `ActiveSailingDateRange[].EventDescription` | `string` (optional) | Explaination (if necessary) of this sailing date range. |
| `SailingDir` | `enum/integer` | Indicates the direction of travel. 1 for Westbound, 2 for Eastbound. |
| `JourneyID` | `integer` | Unique identifier for a journey. |
| `VesselID` | `integer` | Unique identifier for the vessel that's planned to service this journey. |
| `VesselName` | `string` | The name of the vessel that's planned to service this journey. |
| `VesselHandicapAccessible` | `boolean` | A flag that indicates whether or not the vessel that's planned to service this journey is ADA accessible. |
| `VesselPositionNum` | `integer` | A number that represents a single vessel that services all of the stops in the journey. |
| `JourneyTerminalID` | `integer` | Unique identifier for a terminal time. |
| `TerminalID` | `integer` | Unique identifier for a terminal. |
| `TerminalDescription` | `string` | The full name of the terminal. |
| `TerminalBriefDescription` | `string` | A brief / shortened name for the terminal. |
| `TimeToAdj` | `date` | The departure / arrival time that is either being added or cancelled. |
| `AdjDateFrom` | `date` | The starting trip date when the adjustment should be applied. |
| `AdjDateThru` | `date` | The ending trip date when the adjustment should be applied. If same as AdjDateFrom then the adjustment should only be applied to a single date. |
| `TidalAdj` | `boolean` | Indicates whether or not the adjustment is a result of tidal conditions. |
| `EventID` | `integer` (optional) | Unique identifier for an event. |
| `EventDescription` | `string` (optional) | Explaination (if necessary) of this adjustment. |
| `DepArrIndicator` | `enum/integer` | Indicates whether this stop represents a departure or an arrival. 1 for Departure, 2 for Arrival. |
| `AdjType` | `enum/integer` | Indicates whether this adjustment represents a cancellation or addition in service. 1 for Addition, 2 for Cancellation. |
| `Annotations` | `array` | Informational attributes associated with the departure / arrival time. |
| `Annotations[].AnnotationID` | `integer` | Unique identifier for an annotation. |
| `Annotations[].AnnotationText` | `string` | The descriptive content of the annotation. |
| `Annotations[].AnnotationIVRText` | `string` | The descriptive content of the annotation formatted for IVR. |
| `Annotations[].AdjustedCrossingTime` | `integer` (optional) | Adjusted crossing time in minutes. Present when the annotation requires an override of the CrossingTime value found in route details. |
| `Annotations[].AnnotationImg` | `string` | A URL to an image that can be used to graphically represent this annotation. |
| `Annotations[].TypeDescription` | `string` | A logical grouping for the annotation (Day Type, Informational, etc). |
| `Annotations[].SortSeq` | `integer` | A preferred sort order (sort-ascending with respect to other annotations). |



---

## /timeadjbyroute/{RouteID}

### Endpoints

```http
GET /timeadjbyroute/{RouteID}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation provides a listing of all additions and cancellations for a route that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). A valid route may be determined using `/routes`. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

*Note: This endpoint returns the same model structure as `/timeadj` - see that endpoint for the complete model definition.*



GET /timeadjbyschedroute/{SchedRouteID}?apiaccesscode={APIAccessCode}

Valid Accept Headers

application/json text/xml

Description

This operation provides a listing of all additions and cancellations for a scheduled route that deviate on specific dates from the scheduled times found in the /sailings resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). A valid scheduled route may be determined using /schedroutes. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using /cacheflushdate to coordinate the caching of this data in your application.

Model

    ScheduleID (integer): Unique identifier for a season.
    SchedRouteID (integer): Unique identifier for a scheduled route.
    RouteID (integer): Unique identifier for the underlying route.
    RouteDescription (string): The full name of the route.
    RouteSortSeq (integer): A preferred sort order (sort-ascending with respect to other routes).
    SailingID (integer): Unique identifier for a sailing.
    SailingDescription (string): A title that describes the sailing (eg. Leave Port Townsend).
    ActiveSailingDateRange (array): A collection of date ranges detailing when this sailing is active.
        DateFrom (date): A trip date that represents the start of the active sailing date range. If the consumer needs specifics about time, they can translate this trip date value to 3:00am. For example, if a DateFrom of 2014-06-15 is returned, this would indicate the active date range starts precisely on 2014-06-15 at 3:00am.
        DateThru (date): A trip date that represents the end of the active sailing date range. If the consumer needs specifics about time, they can translate this trip date value to the next calendar date at 2:59am. For example, if a DateThru of 2014-09-20 is returned, this would indicate the active date range ends precisely on 2014-09-21 at 2:59am.
        EventID (integer, optional): Unique identifier for an event.
        EventDescription (string, optional): Explaination (if necessary) of this sailing date range.
    SailingDir (enum / integer): Indicates the direction of travel. 1 for Westbound, 2 for Eastbound.
    JourneyID (integer): Unique identifier for a journey.
    VesselID (integer): Unique identifier for the vessel that's planned to service this journey.
    VesselName (string): The name of the vessel that's planned to service this journey.
    VesselHandicapAccessible (bool): A flag that indicates whether or not the vessel that's planned to service this journey is ADA accessible.
    VesselPositionNum (integer): A number that represents a single vessel that services all of the stops in the journey.
    JourneyTerminalID (integer): Unique identifier for a terminal time.
    TerminalID (integer): Unique identifier for a terminal.
    TerminalDescription (string): The full name of the terminal.
    TerminalBriefDescription (string): A brief / shortened name for the terminal.
    TimeToAdj (date): The departure / arrival time that is either being added or cancelled.
    AdjDateFrom (date): The starting trip date when the adjustment should be applied.
    AdjDateThru (date): The ending trip date when the adjustment should be applied. If same as AdjDateFrom then the adjustment should only be applied to a single date.
    TidalAdj (bool): Indicates whether or not the adjustment is a result of tidal conditions.
    EventID (integer, optional): Unique identifier for an event.
    EventDescription (string, optional): Explaination (if necessary) of this adjustment.
    DepArrIndicator (enum / integer): Indicates whether this stop represents a departure or an arrival. 1 for Departure, 2 for Arrival.
    AdjType (enum / integer): Indicates whether this adjustment represents a cancellation or addition in service. 1 for Addition, 2 for Cancellation.
    Annotations (array): Informational attributes associated with the departure / arrival time.
        AnnotationID (integer): Unique identifier for an annotation.
        AnnotationText (string): The descriptive content of the annotation.
        AnnotationIVRText (string): The descriptive content of the annotation formatted for IVR.
        AdjustedCrossingTime (integer, optional): Adjusted crossing time in minutes. Present when the annotation requires an override of the CrossingTime value found in route details.
        AnnotationImg (string): A URL to an image that can be used to graphically represent this annotation.
        TypeDescription (string): A logical grouping for the annotation (Day Type, Informational, etc).
        SortSeq (integer): A preferred sort order (sort-ascending with respect to other annotations).



GET /schedule/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}?apiaccesscode={APIAccessCode}
GET /schedule/{TripDate}/{RouteID}?apiaccesscode={APIAccessCode}

Valid Accept Headers

application/json text/xml

Description

This operation provides departure times for either a trip date and route or a trip date and terminal combination. The resultset accounts for all contingencies, sailing date ranges and time adjustments. Valid departing and arriving terminals may be found using /terminalsandmates while valid routes may be found using /routes. Similarly, a valid trip date may be determined using /validdaterange. Please format the trip date input as 'YYYY-MM-DD' (eg. '2014-04-01' for a trip date occurring on April 1, 2014). A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using /cacheflushdate to coordinate the caching of this data in your application.

Model

    ScheduleID (integer): Unique identifier for a season.
    ScheduleName (string): The name of the season.
    ScheduleSeason (enum / integer): Indicates a quarterly identifier. 0 for Spring, 1 for Summer, 2 for Fall and 3 for Winter.
    SchedulePDFUrl (string): A URL to the season in PDF format.
    ScheduleStart (date): A trip date that represents the start of the season. If the consumer needs specifics about time, they can translate this trip date value to 3:00am. For example, if a ScheduleStart of 2014-06-15 is returned, this would indicate the season starts precisely on 2014-06-15 at 3:00am.
    ScheduleEnd (date): A trip date that represents the end of the season. If the consumer needs specifics about time, they can translate this trip date value to the next calendar date at 2:59am. For example, if a ScheduleEnd of 2014-09-20 is returned, this would indicate the season ends precisely on 2014-09-21 at 2:59am.
    AllRoutes (array): An array of RouteID integers representing all the routes accounted for in this resultset.
    TerminalCombos (array): A grouping of departure and arrival terminal pairs.
        DepartingTerminalID (integer): Unique identifier for the departing terminal.
        DepartingTerminalName (string): The name of the departing terminal.
        ArrivingTerminalID (integer): Unique identifier for the arriving terminal.
        ArrivingTerminalName (string): The name of the arriving terminal.
        SailingNotes (string): Informational text that might be associated with the underlying sailing.
        Annotations (array): An array of annotation strings assigned to one or more items in the Times array.
        Times (array): Scheduled departure details, including departure times.
            DepartingTime (date): The date and time of the departure.
            ArrivingTime (date, optional): The date and time of the arrival.
            LoadingRule (enum / integer): Indicates which category of travelers are supported by this departure. 1 for Passenger, 2 for Vehicle and 3 for Both.
            VesselID (integer): Unique identifier for the vessel that's planned to service this departure.
            VesselName (string): The name of the vessel that's planned to service this departure.
            VesselHandicapAccessible (bool): A flag that indicates whether or not the vessel that's planned to service this departure is ADA accessible.
            VesselPositionNum (integer): A number that represents a single vessel that services all of the stops in the journey.
            Routes (array): An array of RouteID integers representing the routes serviced by this departure. Will be either equal to or a subset of AllRoutes.
            AnnotationIndexes (array): An array of index integers indicating the elements in the Annotations array that apply to this departure.
        AnnotationsIVR (array): An array of annotation strings assigned to one or more items in the Times array formatted for IVR.



GET /scheduletoday/{DepartingTerminalID}/{ArrivingTerminalID}/ {OnlyRemainingTimes}?apiaccesscode={APIAccessCode}
GET /scheduletoday/{RouteID}/{OnlyRemainingTimes}?apiaccesscode={APIAccessCode}

Valid Accept Headers

application/json text/xml

Description

This operation provides today's departure times for either a terminal combination or a route. Valid departing and arriving terminals may be found using /terminalsandmates while valid routes may be found using /routes. For the OnlyRemainingTimes value, please indicate 'true' if departure times prior to now should not be included in the resultset and 'false' if they should be included in the resultset. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using /cacheflushdate to coordinate the caching of this data in your application.

Model

    ScheduleID (integer): Unique identifier for a season.
    ScheduleName (string): The name of the season.
    ScheduleSeason (enum / integer): Indicates a quarterly identifier. 0 for Spring, 1 for Summer, 2 for Fall and 3 for Winter.
    SchedulePDFUrl (string): A URL to the season in PDF format.
    ScheduleStart (date): A trip date that represents the start of the season. If the consumer needs specifics about time, they can translate this trip date value to 3:00am. For example, if a ScheduleStart of 2014-06-15 is returned, this would indicate the season starts precisely on 2014-06-15 at 3:00am.
    ScheduleEnd (date): A trip date that represents the end of the season. If the consumer needs specifics about time, they can translate this trip date value to the next calendar date at 2:59am. For example, if a ScheduleEnd of 2014-09-20 is returned, this would indicate the season ends precisely on 2014-09-21 at 2:59am.
    AllRoutes (array): An array of RouteID integers representing all the routes accounted for in this resultset.
    TerminalCombos (array): A grouping of departure and arrival terminal pairs.
        DepartingTerminalID (integer): Unique identifier for the departing terminal.
        DepartingTerminalName (string): The name of the departing terminal.
        ArrivingTerminalID (integer): Unique identifier for the arriving terminal.
        ArrivingTerminalName (string): The name of the arriving terminal.
        SailingNotes (string): Informational text that might be associated with the underlying sailing.
        Annotations (array): An array of annotation strings assigned to one or more items in the Times array.
        Times (array): Scheduled departure details, including departure times.
            DepartingTime (date): The date and time of the departure.
            ArrivingTime (date, optional): The date and time of the arrival.
            LoadingRule (enum / integer): Indicates which category of travelers are supported by this departure. 1 for Passenger, 2 for Vehicle and 3 for Both.
            VesselID (integer): Unique identifier for the vessel that's planned to service this departure.
            VesselName (string): The name of the vessel that's planned to service this departure.
            VesselHandicapAccessible (bool): A flag that indicates whether or not the vessel that's planned to service this departure is ADA accessible.
            VesselPositionNum (integer): A number that represents a single vessel that services all of the stops in the journey.
            Routes (array): An array of RouteID integers representing the routes serviced by this departure. Will be either equal to or a subset of AllRoutes.
            AnnotationIndexes (array): An array of index integers indicating the elements in the Annotations array that apply to this departure.
        AnnotationsIVR (array): An array of annotation strings assigned to one or more items in the Times array formatted for IVR.



GET /timeadjbyschedroute/{SchedRouteID}?apiaccesscode={APIAccessCode}

Valid Accept Headers

application/json text/xml

Description

This operation provides a listing of all additions and cancellations for a scheduled route that deviate on specific dates from the scheduled times found in the /sailings resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). A valid scheduled route may be determined using /schedroutes. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using /cacheflushdate to coordinate the caching of this data in your application.

Model

    ScheduleID (integer): Unique identifier for a season.
    SchedRouteID (integer): Unique identifier for a scheduled route.
    RouteID (integer): Unique identifier for the underlying route.
    RouteDescription (string): The full name of the route.
    RouteSortSeq (integer): A preferred sort order (sort-ascending with respect to other routes).
    SailingID (integer): Unique identifier for a sailing.
    SailingDescription (string): A title that describes the sailing (eg. Leave Port Townsend).
    ActiveSailingDateRange (array): A collection of date ranges detailing when this sailing is active.
        DateFrom (date): A trip date that represents the start of the active sailing date range. If the consumer needs specifics about time, they can translate this trip date value to 3:00am. For example, if a DateFrom of 2014-06-15 is returned, this would indicate the active date range starts precisely on 2014-06-15 at 3:00am.
        DateThru (date): A trip date that represents the end of the active sailing date range. If the consumer needs specifics about time, they can translate this trip date value to the next calendar date at 2:59am. For example, if a DateThru of 2014-09-20 is returned, this would indicate the active date range ends precisely on 2014-09-21 at 2:59am.
        EventID (integer, optional): Unique identifier for an event.
        EventDescription (string, optional): Explaination (if necessary) of this sailing date range.
    SailingDir (enum / integer): Indicates the direction of travel. 1 for Westbound, 2 for Eastbound.
    JourneyID (integer): Unique identifier for a journey.
    VesselID (integer): Unique identifier for the vessel that's planned to service this journey.
    VesselName (string): The name of the vessel that's planned to service this journey.
    VesselHandicapAccessible (bool): A flag that indicates whether or not the vessel that's planned to service this journey is ADA accessible.
    VesselPositionNum (integer): A number that represents a single vessel that services all of the stops in the journey.
    JourneyTerminalID (integer): Unique identifier for a terminal time.
    TerminalID (integer): Unique identifier for a terminal.
    TerminalDescription (string): The full name of the terminal.
    TerminalBriefDescription (string): A brief / shortened name for the terminal.
    TimeToAdj (date): The departure / arrival time that is either being added or cancelled.
    AdjDateFrom (date): The starting trip date when the adjustment should be applied.
    AdjDateThru (date): The ending trip date when the adjustment should be applied. If same as AdjDateFrom then the adjustment should only be applied to a single date.
    TidalAdj (bool): Indicates whether or not the adjustment is a result of tidal conditions.
    EventID (integer, optional): Unique identifier for an event.
    EventDescription (string, optional): Explaination (if necessary) of this adjustment.
    DepArrIndicator (enum / integer): Indicates whether this stop represents a departure or an arrival. 1 for Departure, 2 for Arrival.
    AdjType (enum / integer): Indicates whether this adjustment represents a cancellation or addition in service. 1 for Addition, 2 for Cancellation.
    Annotations (array): Informational attributes associated with the departure / arrival time.
        AnnotationID (integer): Unique identifier for an annotation.
        AnnotationText (string): The descriptive content of the annotation.
        AnnotationIVRText (string): The descriptive content of the annotation formatted for IVR.
        AdjustedCrossingTime (integer, optional): Adjusted crossing time in minutes. Present when the annotation requires an override of the CrossingTime value found in route details.
        AnnotationImg (string): A URL to an image that can be used to graphically represent this annotation.
        TypeDescription (string): A logical grouping for the annotation (Day Type, Informational, etc).
        SortSeq (integer): A preferred sort order (sort-ascending with respect to other annotations).



GET /schedule/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}?apiaccesscode={APIAccessCode}
GET /schedule/{TripDate}/{RouteID}?apiaccesscode={APIAccessCode}

Valid Accept Headers

application/json text/xml

Description

This operation provides departure times for either a trip date and route or a trip date and terminal combination. The resultset accounts for all contingencies, sailing date ranges and time adjustments. Valid departing and arriving terminals may be found using /terminalsandmates while valid routes may be found using /routes. Similarly, a valid trip date may be determined using /validdaterange. Please format the trip date input as 'YYYY-MM-DD' (eg. '2014-04-01' for a trip date occurring on April 1, 2014). A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using /cacheflushdate to coordinate the caching of this data in your application.

Model

    ScheduleID (integer): Unique identifier for a season.
    ScheduleName (string): The name of the season.
    ScheduleSeason (enum / integer): Indicates a quarterly identifier. 0 for Spring, 1 for Summer, 2 for Fall and 3 for Winter.
    SchedulePDFUrl (string): A URL to the season in PDF format.
    ScheduleStart (date): A trip date that represents the start of the season. If the consumer needs specifics about time, they can translate this trip date value to 3:00am. For example, if a ScheduleStart of 2014-06-15 is returned, this would indicate the season starts precisely on 2014-06-15 at 3:00am.
    ScheduleEnd (date): A trip date that represents the end of the season. If the consumer needs specifics about time, they can translate this trip date value to the next calendar date at 2:59am. For example, if a ScheduleEnd of 2014-09-20 is returned, this would indicate the season ends precisely on 2014-09-21 at 2:59am.
    AllRoutes (array): An array of RouteID integers representing all the routes accounted for in this resultset.
    TerminalCombos (array): A grouping of departure and arrival terminal pairs.
        DepartingTerminalID (integer): Unique identifier for the departing terminal.
        DepartingTerminalName (string): The name of the departing terminal.
        ArrivingTerminalID (integer): Unique identifier for the arriving terminal.
        ArrivingTerminalName (string): The name of the arriving terminal.
        SailingNotes (string): Informational text that might be associated with the underlying sailing.
        Annotations (array): An array of annotation strings assigned to one or more items in the Times array.
        Times (array): Scheduled departure details, including departure times.
            DepartingTime (date): The date and time of the departure.
            ArrivingTime (date, optional): The date and time of the arrival.
            LoadingRule (enum / integer): Indicates which category of travelers are supported by this departure. 1 for Passenger, 2 for Vehicle and 3 for Both.
            VesselID (integer): Unique identifier for the vessel that's planned to service this departure.
            VesselName (string): The name of the vessel that's planned to service this departure.
            VesselHandicapAccessible (bool): A flag that indicates whether or not the vessel that's planned to service this departure is ADA accessible.
            VesselPositionNum (integer): A number that represents a single vessel that services all of the stops in the journey.
            Routes (array): An array of RouteID integers representing the routes serviced by this departure. Will be either equal to or a subset of AllRoutes.
            AnnotationIndexes (array): An array of index integers indicating the elements in the Annotations array that apply to this departure.
        AnnotationsIVR (array): An array of annotation strings assigned to one or more items in the Times array formatted for IVR.



GET /scheduletoday/{DepartingTerminalID}/{ArrivingTerminalID}/ {OnlyRemainingTimes}?apiaccesscode={APIAccessCode}
GET /scheduletoday/{RouteID}/{OnlyRemainingTimes}?apiaccesscode={APIAccessCode}

Valid Accept Headers

application/json text/xml

Description

This operation provides today's departure times for either a terminal combination or a route. Valid departing and arriving terminals may be found using /terminalsandmates while valid routes may be found using /routes. For the OnlyRemainingTimes value, please indicate 'true' if departure times prior to now should not be included in the resultset and 'false' if they should be included in the resultset. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using /cacheflushdate to coordinate the caching of this data in your application.

Model

    ScheduleID (integer): Unique identifier for a season.
    ScheduleName (string): The name of the season.
    ScheduleSeason (enum / integer): Indicates a quarterly identifier. 0 for Spring, 1 for Summer, 2 for Fall and 3 for Winter.
    SchedulePDFUrl (string): A URL to the season in PDF format.
    ScheduleStart (date): A trip date that represents the start of the season. If the consumer needs specifics about time, they can translate this trip date value to 3:00am. For example, if a ScheduleStart of 2014-06-15 is returned, this would indicate the season starts precisely on 2014-06-15 at 3:00am.
    ScheduleEnd (date): A trip date that represents the end of the season. If the consumer needs specifics about time, they can translate this trip date value to the next calendar date at 2:59am. For example, if a ScheduleEnd of 2014-09-20 is returned, this would indicate the season ends precisely on 2014-09-21 at 2:59am.
    AllRoutes (array): An array of RouteID integers representing all the routes accounted for in this resultset.
    TerminalCombos (array): A grouping of departure and arrival terminal pairs.
        DepartingTerminalID (integer): Unique identifier for the departing terminal.
        DepartingTerminalName (string): The name of the departing terminal.
        ArrivingTerminalID (integer): Unique identifier for the arriving terminal.
        ArrivingTerminalName (string): The name of the arriving terminal.
        SailingNotes (string): Informational text that might be associated with the underlying sailing.
        Annotations (array): An array of annotation strings assigned to one or more items in the Times array.
        Times (array): Scheduled departure details, including departure times.
            DepartingTime (date): The date and time of the departure.
            ArrivingTime (date, optional): The date and time of the arrival.
            LoadingRule (enum / integer): Indicates which category of travelers are supported by this departure. 1 for Passenger, 2 for Vehicle and 3 for Both.
            VesselID (integer): Unique identifier for the vessel that's planned to service this departure.
            VesselName (string): The name of the vessel that's planned to service this departure.
            VesselHandicapAccessible (bool): A flag that indicates whether or not the vessel that's planned to service this departure is ADA accessible.
            VesselPositionNum (integer): A number that represents a single vessel that services all of the stops in the journey.
            Routes (array): An array of RouteID integers representing the routes serviced by this departure. Will be either equal to or a subset of AllRoutes.
            AnnotationIndexes (array): An array of index integers indicating the elements in the Annotations array that apply to this departure.
        AnnotationsIVR (array): An array of annotation strings assigned to one or more items in the Times array formatted for IVR.



GET /alerts?apiaccesscode={APIAccessCode}

Valid Accept Headers

application/json text/xml

Description

This operation provides alert information tailored for routes, bulletins, service disruptions, etc. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using /cacheflushdate to coordinate the caching of this data in your application.

Model

    BulletinID (integer): Unique identifier for the alert.
    BulletinFlag (bool): A flag that, when true, indicates the alert includes text tailored as a bulletin.
    BulletinText (string, optional): The alert text, tailored as a bulletin.
    CommunicationFlag (bool): A flag that, when true, indicates the alert includes text tailored as a communications announcement.
    CommunicationText (string, optional): The alert text, tailored as a communications announcement.
    RouteAlertFlag (bool): A flag that, when true, indicates the alert includes text tailored as a route announcement.
    RouteAlertText (string, optional): The alert text, tailored as a route announcement.
    HomepageAlertText (string, optional): The alert text, tailored for a landing page.
    PublishDate (date, optional): The date the alert was published.
    DisruptionDescription (string, optional): If present, indicates service disruption text associated with the alert.
    AllRoutesFlag (bool): A flag that, when true, indicates that the alert affects all routes.
    SortSeq (integer): A preferred sort order (sort-ascending with respect to other alerts).
    AlertTypeID (integer): Unique identifier for the type or category that the alert belongs to.
    AlertType (string): A type / category that the alert belongs to (eg. "General Information").
    AlertFullTitle (string): The title of the alert.
    AffectedRouteIDs (array): An array of integers that represent the unique identifiers of routes affected by the alert.
    IVRText (string, optional): The alert text, tailored for text to speech systems.
