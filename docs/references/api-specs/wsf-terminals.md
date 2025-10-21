# WSF Terminals API

**Source:** [WSDOT Ferries API Documentation](https://www.wsdot.wa.gov/ferries/api/terminals/documentation/rest.html)

**Base URL:** `https://www.wsdot.wa.gov/ferries/api/terminals/rest`

## Table of Contents

- [API Access Code](#api-access-code)
- [/cacheflushdate](#cacheflushdate)
- [/terminalbasics](#terminalbasics)
- [/terminalbasics/{TerminalID}](#terminalbasicsterminalid)
- [/terminalbulletins](#terminalbulletins)
- [/terminalbulletins/{TerminalID}](#terminalbulletinsterminalid)
- [/terminallocations](#terminallocations)
- [/terminallocations/{TerminalID}](#terminallocationsterminalid)
- [/terminalsailingspace](#terminalsailingspace)
- [/terminalsailingspace/{TerminalID}](#terminalsailingspaceterminalid)
- [/terminaltransports](#terminaltransports)
- [/terminaltransports/{TerminalID}](#terminaltransportsterminalid)
- [/terminalverbose](#terminalverbose)
- [/terminalverbose/{TerminalID}](#terminalverboseterminalid)
- [/terminalwaittimes](#terminalwaittimes)
- [/terminalwaittimes/{TerminalID}](#terminalwaittimesterminalid)


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

- `/terminalbasics`
- `/terminalbasics/{TerminalID}`
- `/terminalbulletins`
- `/terminalbulletins/{TerminalID}`
- `/terminallocations`
- `/terminallocations/{TerminalID}`
- `/terminaltransports`
- `/terminaltransports/{TerminalID}`
- `/terminalverbose`
- `/terminalverbose/{TerminalID}`
- `/terminalwaittimes`
- `/terminalwaittimes/{TerminalID}`

### Model

| Field | Type | Description |
|-------|------|-------------|
| `CacheFlushDate` | `date` (optional) | If present, notes the date that certain service data was last changed (see description). |



---

## /terminalbasics

### Endpoints

```http
GET /terminalbasics?apiaccesscode={APIAccessCode}
GET /terminalbasics/{TerminalID}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation retrieves the most basic / brief information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `TerminalID` | `integer` | Unique identifier for a terminal. |
| `TerminalSubjectID` | `integer` | Identifies this terminal as a unique WSF subject. |
| `RegionID` | `integer` | Identifies the geographical region where the terminal is located. |
| `TerminalName` | `string` | The name of the terminal. |
| `TerminalAbbrev` | `string` | The terminal's abbreviation. |
| `SortSeq` | `integer` | A preferred sort order (sort-ascending with respect to other terminals). |
| `OverheadPassengerLoading` | `boolean` | Indicates whether or not overhead passenger loading is available. |
| `Elevator` | `boolean` | Indicates whether or not the terminal has an elevator. |
| `WaitingRoom` | `boolean` | Indicates whether or not the terminal has a waiting room. |
| `FoodService` | `boolean` | Indicates whether or not the terminal offers food service. |
| `Restroom` | `boolean` | Indicates whether or not the terminal has one or more restrooms. |



---

## /terminalbulletins

### Endpoints

```http
GET /terminalbulletins?apiaccesscode={APIAccessCode}
GET /terminalbulletins/{TerminalID}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation retrieves alerts and bulletins associated with terminals. Each terminal may have zero or more bulletins assigned to it. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `TerminalID` | `integer` | Unique identifier for a terminal. |
| `TerminalSubjectID` | `integer` | Identifies this terminal as a unique WSF subject. |
| `RegionID` | `integer` | Identifies the geographical region where the terminal is located. |
| `TerminalName` | `string` | The name of the terminal. |
| `TerminalAbbrev` | `string` | The terminal's abbreviation. |
| `SortSeq` | `integer` | A preferred sort order (sort-ascending with respect to other terminals). |
| `Bulletins` | `array` | The bulletins / alerts associated with this terminal. |
| `Bulletins[].BulletinTitle` | `string` | The title of the bulletin. |
| `Bulletins[].BulletinText` | `string` | The content of the bulletin. |
| `Bulletins[].BulletinSortSeq` | `integer` | A preferred sort order (sort-ascending with respect to other bulletins in this array). |
| `Bulletins[].BulletinLastUpdated` | `date` (optional) | The date that this bulletin was last updated. |
| `Bulletins[].BulletinLastUpdatedSortable` | `string` (optional) | Legacy string representation of BulletinLastUpdated. |


---

## /terminallocations

### Endpoints

```http
GET /terminallocations?apiaccesscode={APIAccessCode}
GET /terminallocations/{TerminalID}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation retrieves detailed location information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `TerminalID` | `integer` | Unique identifier for a terminal. |
| `TerminalSubjectID` | `integer` | Identifies this terminal as a unique WSF subject. |
| `RegionID` | `integer` | Identifies the geographical region where the terminal is located. |
| `TerminalName` | `string` | The name of the terminal. |
| `TerminalAbbrev` | `string` | The terminal's abbreviation. |
| `SortSeq` | `integer` | A preferred sort order (sort-ascending with respect to other terminals). |
| `Latitude` | `double` (optional) | The latitude of the terminal. |
| `Longitude` | `double` (optional) | The longitude of the terminal. |
| `AddressLineOne` | `string` (optional) | The first line of the terminal's address. |
| `AddressLineTwo` | `string` (optional) | The second line of the terminal's address. |
| `City` | `string` (optional) | The city where the terminal is located. |
| `State` | `string` (optional) | The state where the terminal is located. |
| `ZipCode` | `string` (optional) | The terminal's zip code. |
| `Country` | `string` (optional) | The country where the terminal is located. |
| `MapLink` | `string` (optional) | A URL to a page that displays the terminal on a GIS map. |
| `Directions` | `string` (optional) | Instructions detailing how to drive to the terminal. |
| `DispGISZoomLoc` | `array` | Where this terminal should appear on a GIS map (at various zoom levels). |
| `DispGISZoomLoc[].ZoomLevel` | `integer` | The GIS zoom level. |
| `DispGISZoomLoc[].Latitude` | `double` (optional) | The terminal's latitude for this GIS zoom level. |
| `DispGISZoomLoc[].Longitude` | `double` (optional) | The terminal's longitude for this GIS zoom level. |



---

## /terminalsailingspace

### Endpoints

```http
GET /terminalsailingspace?apiaccesscode={APIAccessCode}
GET /terminalsailingspace/{TerminalID}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation reflects terminal condition data (the number of drive-up and reservation spaces available for select departures). A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

**⚠️ Important:** This data changes very frequently (potentially every 5 seconds). Please do not cache results in your application for an extended period of time.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `TerminalID` | `integer` | Unique identifier for a terminal. |
| `TerminalSubjectID` | `integer` | Identifies this terminal as a unique WSF subject. |
| `RegionID` | `integer` | Identifies the geographical region where the terminal is located. |
| `TerminalName` | `string` | The name of the terminal. |
| `TerminalAbbrev` | `string` | The terminal's abbreviation. |
| `SortSeq` | `integer` | A preferred sort order (sort-ascending with respect to other terminals). |
| `DepartingSpaces` | `array` | The most recent departures leaving this terminal. |
| `DepartingSpaces[].Departure` | `date` | The date and time of the departure. |
| `DepartingSpaces[].IsCancelled` | `boolean` | Indicates whether or not the departure is cancelled. |
| `DepartingSpaces[].VesselID` | `integer` | Unique identifier for the vessel making this departure. |
| `DepartingSpaces[].VesselName` | `string` | The name of the vessel making this departure. |
| `DepartingSpaces[].MaxSpaceCount` | `integer` | The maximum space available on the vessel making this departure. |
| `DepartingSpaces[].SpaceForArrivalTerminals` | `array` | The available space for one or more destinations. |
| `DepartingSpaces[].SpaceForArrivalTerminals[].TerminalID` | `integer` | Unique identifier for the next closest arrival terminal. |
| `DepartingSpaces[].SpaceForArrivalTerminals[].TerminalName` | `string` | The name of the arrival terminal. |
| `DepartingSpaces[].SpaceForArrivalTerminals[].VesselID` | `integer` | Unique identifier for the vessel making this departure. |
| `DepartingSpaces[].SpaceForArrivalTerminals[].VesselName` | `string` | The name of the vessel making this departure. |
| `DepartingSpaces[].SpaceForArrivalTerminals[].DisplayReservableSpace` | `boolean` | Indicates whether or not reservable space should be displayed. |
| `DepartingSpaces[].SpaceForArrivalTerminals[].ReservableSpaceCount` | `integer` (optional) | The remaining reservable space available on the vessel. |
| `DepartingSpaces[].SpaceForArrivalTerminals[].ReservableSpaceHexColor` | `string` (optional) | A Hex color representing the ReservableSpaceCount. |
| `DepartingSpaces[].SpaceForArrivalTerminals[].DisplayDriveUpSpace` | `boolean` | Indicates whether or not drive-up space should be displayed. |
| `DepartingSpaces[].SpaceForArrivalTerminals[].DriveUpSpaceCount` | `integer` (optional) | The remaining drive-up space available on the vessel. |
| `DepartingSpaces[].SpaceForArrivalTerminals[].DriveUpSpaceHexColor` | `string` (optional) | A Hex color representing DriveUpSpaceCount. |
| `DepartingSpaces[].SpaceForArrivalTerminals[].MaxSpaceCount` | `integer` | The maximum space available on the vessel making this departure. |
| `DepartingSpaces[].SpaceForArrivalTerminals[].ArrivalTerminalIDs` | `array` | An array of integers representing all arrival terminals associated with this set of counts. |
| `IsNoFareCollected` | `boolean` (optional) | True if this terminal isn't capable of collecting fares. |
| `NoFareCollectedMsg` | `string` (optional) | An optional message detailing how inability to collect fares could affect terminal conditions data. |



---

## /terminaltransports

### Endpoints

```http
GET /terminaltransports?apiaccesscode={APIAccessCode}
GET /terminaltransports/{TerminalID}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation provides helpful information for terminal commuters (including parking notes, vehicle-specific tips, etc). A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `TerminalID` | `integer` | Unique identifier for a terminal. |
| `TerminalSubjectID` | `integer` | Identifies this terminal as a unique WSF subject. |
| `RegionID` | `integer` | Identifies the geographical region where the terminal is located. |
| `TerminalName` | `string` | The name of the terminal. |
| `TerminalAbbrev` | `string` | The terminal's abbreviation. |
| `SortSeq` | `integer` | A preferred sort order (sort-ascending with respect to other terminals). |
| `ParkingInfo` | `string` (optional) | Parking information for this terminal. |
| `ParkingShuttleInfo` | `string` (optional) | Information about parking-related shuttles that service this terminal. |
| `AirportInfo` | `string` (optional) | Tips for commuting to this terminal from the airport. |
| `AirportShuttleInfo` | `string` (optional) | Information about parking shuttles that go between the airport and this terminal. |
| `MotorcycleInfo` | `string` (optional) | Information for travelers who plan on taking a motorcycle to this terminal. |
| `TruckInfo` | `string` (optional) | Information for travelers who plan on taking a truck to this terminal. |
| `BikeInfo` | `string` (optional) | Information for travelers who plan on taking their bicycle to this terminal. |
| `TrainInfo` | `string` (optional) | Information about trains that service this terminal. |
| `TaxiInfo` | `string` (optional) | Information about taxis that service this terminal. |
| `HovInfo` | `string` (optional) | Tips for carpool/vanpools commuting to this terminal. |
| `TransitLinks` | `array` | Links to transit agencies that service this terminal. |
| `TransitLinks[].LinkURL` | `string` | The URL of the transit link. |
| `TransitLinks[].LinkName` | `string` | The name of the transit agency. |
| `TransitLinks[].SortSeq` | `integer` (optional) | A preferred sort order (sort-ascending with respect to other transit links in this array). |



---

## /terminalverbose

### Endpoints

```http
GET /terminalverbose?apiaccesscode={APIAccessCode}
GET /terminalverbose/{TerminalID}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation retrieves highly detailed information pertaining to terminals. It should be used if you need to reduce the "chattiness" of your application and don't mind receiving a larger payload of data. The results include and expand on what's already available through the following operations:

- `/terminalbasics`
- `/terminalbasics/{TerminalID}`
- `/terminalbulletins`
- `/terminalbulletins/{TerminalID}`
- `/terminallocations`
- `/terminallocations/{TerminalID}`
- `/terminaltransports`
- `/terminaltransports/{TerminalID}`
- `/terminalwaittimes`
- `/terminalwaittimes/{TerminalID}`

TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

*Note: This endpoint returns a comprehensive model that includes all fields from the other terminal endpoints. See individual endpoint documentation for specific field descriptions.*
    RealtimeIntroMsg (string, optional): An optional intro message for terminal conditions data that pertains to terminals capable of collecting fares.



---

## /terminalwaittimes

### Endpoints

```http
GET /terminalwaittimes?apiaccesscode={APIAccessCode}
GET /terminalwaittimes/{TerminalID}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation retrieves tips and wait time conditions for both vehicles and walk-on passengers. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `TerminalID` | `integer` | Unique identifier for a terminal. |
| `TerminalSubjectID` | `integer` | Identifies this terminal as a unique WSF subject. |
| `RegionID` | `integer` | Identifies the geographical region where the terminal is located. |
| `TerminalName` | `string` | The name of the terminal. |
| `TerminalAbbrev` | `string` | The terminal's abbreviation. |
| `SortSeq` | `integer` | A preferred sort order (sort-ascending with respect to other terminals). |
| `WaitTimes` | `array` | The wait times associated with this terminal. |
| `WaitTimes[].RouteID` | `integer` (optional) | Unique identifier for the route associated with this wait time. |
| `WaitTimes[].RouteName` | `string` (optional) | The name of the route associated with this wait time. |
| `WaitTimes[].WaitTimeNotes` | `string` | Notes detailing wait time conditions along with tips for vehicles and passengers. |
| `WaitTimes[].WaitTimeLastUpdated` | `date` (optional) | The date this wait time information was last updated. |
| `WaitTimes[].WaitTimeIVRNotes` | `string` | Notes detailing wait time conditions (tailored for text to speech systems). |
