# WSF Vessels API

**Source:** [WSDOT Ferries API Documentation](https://www.wsdot.wa.gov/ferries/api/vessels/documentation/rest.html)

**Base URL:** `https://www.wsdot.wa.gov/ferries/api/vessels/rest`

## Table of Contents

- [API Access Code](#api-access-code)
- [/cacheflushdate](#cacheflushdate)
- [/vesselbasics](#vesselbasics)
- [/vesselbasics/{VesselID}](#vesselbasicsvesselid)
- [/vesselaccommodations](#vesselaccommodations)
- [/vesselaccommodations/{VesselID}](#vesselaccommodationsvesselid)
- [/vesselstats](#vesselstats)
- [/vesselstats/{VesselID}](#vesselstatsvesselid)
- [/vessellocations](#vessellocations)
- [/vessellocations/{VesselID}](#vessellocationsvesselid)
- [/vesselverbose](#vesselverbose)
- [/vesselverbose/{VesselID}](#vesselverbosevesselid)

[Note: also see [this link](https://www.wsdot.wa.gov/ferries/api/vessels/rest/help/operations/GetVesselHistory) and [this link](https://www.wsdot.wa.gov/ferries/api/vessels/rest/help/operations/GetAllVessels) for the VesselHistory endpoint, which is not documented on the WSF API page above.]


## API Access Code

Most of the REST operations require that an API Access Code be passed as part of the URL string. In order to get a valid API Access Code, please register your email address with the WSDOT Traveler API.

---

## /vesselbasics

### Endpoints

```http
GET /vesselbasics?apiaccesscode={APIAccessCode}
GET /vesselbasics/{VesselID}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation retrieves the most basic / brief information pertaining to vessels. A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `VesselID` | `integer` | Unique identifier for a vessel. |
| `VesselSubjectID` | `integer` | Identifies this vessel as a unique WSF subject. |
| `VesselName` | `string` | The name of the vessel. |
| `VesselAbbrev` | `string` | The vessel's abbreviation. |
| `Class` | `complex` | Similar vessels in the fleet are grouped into the same class. This object describes the class associated with this vessel. |
| `Class.ClassID` | `integer` | Unique identifier for a vessel class. |
| `Class.ClassSubjectID` | `integer` | Identifies this vessel class as a unique WSF subject. |
| `Class.ClassName` | `string` | The name of the vessel class. |
| `Class.SortSeq` | `integer` (optional) | A preferred sort order (sort-ascending with respect to other vessel classes). |
| `Class.DrawingImg` | `string` | A URL that points to a detailed drawing of the vessel class. |
| `Class.SilhouetteImg` | `string` | A URL that points to a small drawing of the vessel class. |
| `Class.PublicDisplayName` | `string` | The name of this vessel class, formatted for the public. |
| `Status` | `enum/integer` (optional) | Indicates the operational status of the vessel. 1 for In Service, 2 for Maintenance and 3 for Out of Service. |
| `OwnedByWSF` | `boolean` | Indicates whether or not the vessel is owned by WSF. |



---

## /vesselaccommodations

### Endpoints

```http
GET /vesselaccommodations?apiaccesscode={APIAccessCode}
GET /vesselaccommodations/{VesselID}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation provides details regarding vessel accommodations (bathrooms, galley, elevator, etc). A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `VesselID` | `integer` | Unique identifier for a vessel. |
| `VesselSubjectID` | `integer` | Identifies this vessel as a unique WSF subject. |
| `VesselName` | `string` | The name of the vessel. |
| `VesselAbbrev` | `string` | The vessel's abbreviation. |
| `Class` | `complex` | Similar vessels in the fleet are grouped into the same class. This object describes the class associated with this vessel. |
| `Class.ClassID` | `integer` | Unique identifier for a vessel class. |
| `Class.ClassSubjectID` | `integer` | Identifies this vessel class as a unique WSF subject. |
| `Class.ClassName` | `string` | The name of the vessel class. |
| `Class.SortSeq` | `integer` (optional) | A preferred sort order (sort-ascending with respect to other vessel classes). |
| `Class.DrawingImg` | `string` | A URL that points to a detailed drawing of the vessel class. |
| `Class.SilhouetteImg` | `string` | A URL that points to a small drawing of the vessel class. |
| `Class.PublicDisplayName` | `string` | The name of this vessel class, formatted for the public. |
| `CarDeckRestroom` | `boolean` | Indicates whether or not the vessel has an ADA restroom on the car deck. |
| `CarDeckShelter` | `boolean` | Indicates whether or not the vessel has an ADA shelter on the car deck. |
| `Elevator` | `boolean` | Indicates whether or not the vessel has an elevator. |
| `ADAAccessible` | `boolean` | Indicates whether or not the vessel is ADA accessible. |
| `MainCabinGalley` | `boolean` | Indicates whether or not the vessel has a galley in the main cabin. |
| `MainCabinRestroom` | `boolean` | Indicates whether or not the vessel has a restroom in the main cabin. |
| `PublicWifi` | `boolean` | Indicates whether or not Wifi is available on the vessel. |
| `ADAInfo` | `string` (optional) | Additional ADA notes concerning this vessel. |
| `AdditionalInfo` | `string` (optional) | Additional miscellaneous notes concerning this vessel. |




---

## /vesselstats

### Endpoints

```http
GET /vesselstats?apiaccesscode={APIAccessCode}
GET /vesselstats/{VesselID}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation provides details regarding vessel specifications (engine count, length of vessel, year built, etc). A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `VesselID` | `integer` | Unique identifier for a vessel. |
| `VesselSubjectID` | `integer` | Identifies this vessel as a unique WSF subject. |
| `VesselName` | `string` | The name of the vessel. |
| `VesselAbbrev` | `string` | The vessel's abbreviation. |
| `Class` | `complex` | Similar vessels in the fleet are grouped into the same class. This object describes the class associated with this vessel. |
| `Class.ClassID` | `integer` | Unique identifier for a vessel class. |
| `Class.ClassSubjectID` | `integer` | Identifies this vessel class as a unique WSF subject. |
| `Class.ClassName` | `string` | The name of the vessel class. |
| `Class.SortSeq` | `integer` (optional) | A preferred sort order (sort-ascending with respect to other vessel classes). |
| `Class.DrawingImg` | `string` | A URL that points to a detailed drawing of the vessel class. |
| `Class.SilhouetteImg` | `string` | A URL that points to a small drawing of the vessel class. |
| `Class.PublicDisplayName` | `string` | The name of this vessel class, formatted for the public. |
| `VesselNameDesc` | `string` | The definition or significance behind the name of the vessel. |
| `VesselHistory` | `string` (optional) | The history of the vessel. |
| `Beam` | `string` | The length of the vessel's beam in feet / inches. |
| `CityBuilt` | `string` | The location where the vessel was built. |
| `SpeedInKnots` | `integer` (optional) | The speed of the vessel. |
| `Draft` | `string` | The draft of the vessel in feet / inches. |
| `EngineCount` | `integer` (optional) | The total count of engines aboard the vessel. |
| `Horsepower` | `integer` (optional) | The horsepower of the vessel. |
| `Length` | `string` | The length of the vessel in feet / inches. |
| `MaxPassengerCount` | `integer` (optional) | The max passenger count aboard the vessel. |
| `PassengerOnly` | `boolean` | Indicates whether or not this vessel supports vehicles (true for passenger only, false for vehicles and passengers). |
| `FastFerry` | `boolean` | Indicates whether or not this vessel is considered a fast ferry. |
| `PropulsionInfo` | `string` | The type of engine used in this vessel. |
| `TallDeckClearance` | `integer` (optional) | The auto deck clearance (in inches) aboard the vessel. |
| `RegDeckSpace` | `integer` (optional) | The max number of vehicles (includes TallDeckSpace). |
| `TallDeckSpace` | `integer` (optional) | The total number of tall deck spaces associated with this vessel. |
| `Tonnage` | `integer` (optional) | The tonnage of the vessel. |
| `Displacement` | `integer` (optional) | The displacement (weight in long tons) of the vessel. |
| `YearBuilt` | `integer` (optional) | The year the vessel was built. |
| `YearRebuilt` | `integer` (optional) | The year the vessel was rebuilt. |
| `VesselDrawingImg` | `string` (optional) | A URL that points to a detailed drawing of the vessel. If not available, the DrawingImg from the vessel class may be used. |
| `SolasCertified` | `boolean` | Indicates whether or not the vessel is certified for international travel. |
| `MaxPassengerCountForInternational` | `integer` (optional) | The max passenger count aboard the vessel for international travel. |



---

## /vessellocations

### Endpoints

```http
GET /vessellocations?apiaccesscode={APIAccessCode}
GET /vessellocations/{VesselID}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation provides vessel locations and associated ETA data. A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

**⚠️ Important:** This data changes very frequently (potentially every 5 seconds). Please do not cache results in your application for an extended period of time.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `VesselID` | `integer` | Unique identifier for a vessel. |
| `VesselName` | `string` | The name of the vessel. |
| `Mmsi` | `integer` (optional) | The vessel's Maritime Mobile Service Identity. |
| `DepartingTerminalID` | `integer` | Unique identifier pertaining to the terminal where this vessel is docked or was last docked. |
| `DepartingTerminalName` | `string` | The name of the terminal where this vessel is docked or was last docked. |
| `DepartingTerminalAbbrev` | `string` | The abbreviated terminal name where this vessel is docked or was last docked. |
| `ArrivingTerminalID` | `integer` (optional) | Unique identifier pertaining to the terminal that represents the vessel's next destination. Might not be present if the next scheduled destination is still being determined. |
| `ArrivingTerminalName` | `string` (optional) | The name of the terminal that represents the vessel's next destination. Might not be present if the next scheduled destination is still being determined. |
| `ArrivingTerminalAbbrev` | `string` (optional) | The abbreviated terminal name that represent's the vessel's next destination. Might not be present if the next scheduled destination is still being determined. |
| `Latitude` | `double` | The latitude of the vessel. |
| `Longitude` | `double` | The longitude of the vessel. |
| `Speed` | `double` | The speed of the vessel (in Knots). |
| `Heading` | `double` | The heading of the vessel (in degrees). |
| `InService` | `boolean` | Indicates whether or not the vessel is in service. |
| `AtDock` | `boolean` | Indicates whether or not the vessel is docked. |
| `LeftDock` | `date` (optional) | The date and time that the vessel last left the dock. This value is not present when docked. |
| `Eta` | `date` (optional) | The estimated date and time that the vessel will arrive at its destination. This value is not present when docked. |
| `EtaBasis` | `string` (optional) | A brief description summarizing how the Eta is being calculated. This value is not present when docked. |
| `ScheduledDeparture` | `date` (optional) | The date and time when this vessel was or is scheduled to leave its departing terminal. Might not be present if the next scheduled destination is still being determined. |
| `OpRouteAbbrev` | `array` | An array of strings that contain 0 or more abbreviated route names currently being serviced by this vessel. |
| `VesselPositionNum` | `integer` (optional) | For a given route, the number used to identify the scheduled departures being serviced by this vessel. Not present if vessel is not in service. |
| `SortSeq` | `integer` | A preferred sort order (sort-ascending with respect to other vessels). |
| `ManagedBy` | `enum/integer` | Indicates who manages this vessel. 1 for WSF, 2 for KCM. |
| `TimeStamp` | `date` | The date and time when this vessel location was last updated. |



---

## /vesselverbose

### Endpoints

```http
GET /vesselverbose?apiaccesscode={APIAccessCode}
GET /vesselverbose/{VesselID}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation retrieves highly detailed information pertaining to vessels. It should be used if you need to reduce the "chattiness" of your application and don't mind receiving a larger payload of data. The results include and expand on what's already available through the following operations:

- `/vesselbasics`
- `/vesselbasics/{VesselID}`
- `/vesselaccommodations`
- `/vesselaccommodations/{VesselID}`
- `/vesselstats`
- `/vesselstats/{VesselID}`

A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `VesselID` | `integer` | Unique identifier for a vessel. |
| `VesselSubjectID` | `integer` | Identifies this vessel as a unique WSF subject. |
| `VesselName` | `string` | The name of the vessel. |
| `VesselAbbrev` | `string` | The vessel's abbreviation. |
| `Class` | `complex` | Similar vessels in the fleet are grouped into the same class. This object describes the class associated with this vessel. |
| `Class.ClassID` | `integer` | Unique identifier for a vessel class. |
| `Class.ClassSubjectID` | `integer` | Identifies this vessel class as a unique WSF subject. |
| `Class.ClassName` | `string` | The name of the vessel class. |
| `Class.SortSeq` | `integer` (optional) | A preferred sort order (sort-ascending with respect to other vessel classes). |
| `Class.DrawingImg` | `string` | A URL that points to a detailed drawing of the vessel class. |
| `Class.SilhouetteImg` | `string` | A URL that points to a small drawing of the vessel class. |
| `Class.PublicDisplayName` | `string` | The name of this vessel class, formatted for the public. |
| `Status` | `enum/integer` (optional) | Indicates the operational status of the vessel. 1 for In Service, 2 for Maintenance and 3 for Out of Service. |
| `OwnedByWSF` | `boolean` | Indicates whether or not the vessel is owned by WSF. |
| `CarDeckRestroom` | `boolean` | Indicates whether or not the vessel has an ADA restroom on the car deck. |
| `CarDeckShelter` | `boolean` | Indicates whether or not the vessel has an ADA shelter on the car deck. |
| `Elevator` | `boolean` | Indicates whether or not the vessel has an elevator. |
| `ADAAccessible` | `boolean` | Indicates whether or not the vessel is ADA accessible. |
| `MainCabinGalley` | `boolean` | Indicates whether or not the vessel has a galley in the main cabin. |
| `MainCabinRestroom` | `boolean` | Indicates whether or not the vessel has a restroom in the main cabin. |
| `PublicWifi` | `boolean` | Indicates whether or not Wifi is available on the vessel. |
| `ADAInfo` | `string` (optional) | Additional ADA notes concerning this vessel. |
| `AdditionalInfo` | `string` (optional) | Additional miscellaneous notes concerning this vessel. |
| `VesselNameDesc` | `string` | The definition or significance behind the name of the vessel. |
| `VesselHistory` | `string` (optional) | The history of the vessel. |
| `Beam` | `string` | The length of the vessel's beam in feet / inches. |
| `CityBuilt` | `string` | The location where the vessel was built. |
| `SpeedInKnots` | `integer` (optional) | The speed of the vessel. |
| `Draft` | `string` | The draft of the vessel in feet / inches. |
| `EngineCount` | `integer` (optional) | The total count of engines aboard the vessel. |
| `Horsepower` | `integer` (optional) | The horsepower of the vessel. |
| `Length` | `string` | The length of the vessel in feet / inches. |
| `MaxPassengerCount` | `integer` (optional) | The max passenger count aboard the vessel. |
| `PassengerOnly` | `boolean` | Indicates whether or not this vessel supports vehicles (true for passenger only, false for vehicles and passengers). |
| `FastFerry` | `boolean` | Indicates whether or not this vessel is considered a fast ferry. |
| `PropulsionInfo` | `string` | The type of engine used in this vessel. |
| `TallDeckClearance` | `integer` (optional) | The auto deck clearance (in inches) aboard the vessel. |
| `RegDeckSpace` | `integer` (optional) | The max number of vehicles (includes TallDeckSpace). |
| `TallDeckSpace` | `integer` (optional) | The total number of tall deck spaces associated with this vessel. |
| `Tonnage` | `integer` (optional) | The tonnage of the vessel. |
| `Displacement` | `integer` (optional) | The displacement (weight in long tons) of the vessel. |
| `YearBuilt` | `integer` (optional) | The year the vessel was built. |
| `YearRebuilt` | `integer` (optional) | The year the vessel was rebuilt. |
| `VesselDrawingImg` | `string` (optional) | A URL that points to a detailed drawing of the vessel. If not available, the DrawingImg from the vessel class may be used. |
| `SolasCertified` | `boolean` | Indicates whether or not the vessel is certified for international travel. |
| `MaxPassengerCountForInternational` | `integer` (optional) | The max passenger count aboard the vessel for international travel. |

