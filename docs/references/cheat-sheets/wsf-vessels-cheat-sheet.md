# WSF Vessels API Cheat Sheet

This cheat sheet provides a quick reference for the WSF Vessels API endpoints and their return types.

## Vessel List

| VesselID | VesselName | VesselAbbrev | ClassName | Status |
|----------|------------|--------------|-----------|--------|
| 1 | Cathlamet | CAT | Issaquah 130 | 1 |
| 2 | Chelan | CHE | Issaquah 130 | 1 |
| 65 | Chetzemoka | CHZ | Kwa-di Tabil | 1 |
| 74 | Chimacum | CHM | Olympic | 1 |
| 15 | Issaquah | ISS | Issaquah 130 | 1 |
| 17 | Kaleetan | KAL | Super | 1 |
| 52 | Kennewick | KEN | Kwa-di Tabil | 1 |
| 18 | Kitsap | KIS | Issaquah 130 | 1 |
| 19 | Kittitas | KIT | Issaquah 130 | 1 |
| 25 | Puyallup | PUY | Jumbo Mark II | 1 |
| 66 | Salish | SAL | Kwa-di Tabil | 1 |
| 69 | Samish | SAM | Olympic | 1 |
| 28 | Sealth | SEA | Issaquah | 1 |
| 30 | Spokane | SPO | Jumbo | 1 |
| 75 | Suquamish | SUQ | Olympic | 2 |
| 32 | Tacoma | TAC | Jumbo Mark II | 1 |
| 33 | Tillikum | TIL | Evergreen State | 1 |
| 68 | Tokitae | TOK | Olympic | 1 |
| 36 | Walla Walla | WAL | Jumbo | 1 |
| 37 | Wenatchee | WEN | Jumbo Mark II | 1 |
| 38 | Yakima | YAK | Super | 1 |

## Return Types and Endpoints

| Return Type | Endpoints | Example Reference | Notes |
|-------------|-----------|-------------------|-------|
| CacheFlushDate | `/cacheflushdate` | [Example 1](#cacheflushdate-example) | Returns the last time the cache was flushed for the API |
| VesselAccommodations | `/vesselAccommodations`<br/>`/vesselAccommodations/{VesselID}` | [Example 2](#vesselaccommodations-example) | Information about vessel accessibility and amenities |
| VesselBasics | `/vesselBasics`<br/>`/vesselBasics/{VesselID}` | [Example 3](#vesselbasics-example) | Basic vessel information including ID, name, class, and ownership status |
| VesselHistories | `/vesselHistory`<br/>`/vesselHistory/{VesselName}/{DateStart}/{DateEnd}` | [Example 4](#vesselhistories-example) | Historical vessel movement data with actual trip records |
| VesselLocations | `/vesselLocations`<br/>`/vesselLocations/{VesselID}` | [Example 5](#vessellocations-example) | Real-time vessel position and movement data |
| VesselStats | `/vesselStats`<br/>`/vesselStats/{VesselID}` | [Example 6](#vesselstats-example) | Detailed vessel specifications and statistics |
| VesselsVerbose | `/vesselVerbose`<br/>`/vesselVerbose/{VesselID}` | [Example 7](#vesselsverbose-example) | Complete vessel information combining accommodations, basics, and stats |

## Examples

### CacheFlushDate Example {#cacheflushdate-example}

```typescript
const data = await fetchDottie({
  endpoint: cacheFlushDate,
});
```

```json
"2025-10-03T03:59:33.383Z"
```

### VesselAccommodations Example {#vesselaccommodations-example}

```typescript
const data = await fetchDottie({
  endpoint: vesselAccommodationsById,
  params: { VesselID: 65 },
});
```

```json
{
  "VesselID": 65,
  "VesselSubjectID": 428,
  "VesselName": "Chetzemoka",
  "VesselAbbrev": "CHZ",
  "Class": {
    "ClassID": 162,
    "ClassSubjectID": 427,
    "ClassName": "Kwa-di Tabil",
    "SortSeq": 75,
    "DrawingImg": "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/13-kwaditabil.gif",
    "SilhouetteImg": "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/13-kwaditabil-silouette_sml.gif",
    "PublicDisplayName": "Kwa-di Tabil"
  },
  "CarDeckRestroom": false,
  "CarDeckShelter": false,
  "Elevator": true,
  "ADAAccessible": true,
  "MainCabinGalley": true,
  "MainCabinRestroom": true,
  "PublicWifi": false,
  "ADAInfo": "The M/V Chetzemoka has elevator access from the auto deck to all passenger deck levels. In the event of an elevator closure, a crew member can assist passengers with mobility disabilities to the passenger deck by way of a small freight elevator, though it is not ADA accessible. When you arrive at the terminal, notify the ticket seller if you need to park near the elevator. The main passenger deck has accessible restrooms, vending machines and a galley.\r\n",
  "AdditionalInfo": null
}
```

### VesselBasics Example {#vesselbasics-example}

```typescript
const data = await fetchDottie({
  endpoint: vesselBasicsById,
  params: { VesselID: 74 },
});
```

```json
{
  "VesselID": 74,
  "VesselSubjectID": 487,
  "VesselName": "Chimacum",
  "VesselAbbrev": "CHM",
  "Class": {
    "ClassID": 100,
    "ClassSubjectID": 319,
    "ClassName": "Olympic",
    "SortSeq": 35,
    "DrawingImg": "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/8-olympic-2014.gif",
    "SilhouetteImg": "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/3-issaquah-sillouette_sml.gif",
    "PublicDisplayName": "Olympic"
  },
  "Status": 1,
  "OwnedByWSF": true
}
```

### VesselHistories Example {#vesselhistories-example}

```typescript
const data = await fetchDottie({
  endpoint: vesselHistoriesByVesselAndDateRange,
  params: { 
    VesselName: "Tacoma",
    DateStart: "2025-09-01",
    DateEnd: "2025-10-01"
  },
});
```

```json
{
  "VesselId": 32,
  "Vessel": "Cathlamet",
  "Departing": "Vashon",
  "Arriving": "Fauntleroy",
  "ScheduledDepart": "2025-08-24T12:35:00.000Z",
  "ActualDepart": "2025-08-24T12:35:59.000Z",
  "EstArrival": "2025-08-24T12:49:58.000Z",
  "Date": "2025-08-24T12:35:00.000Z"
}
```

### VesselLocations Example {#vessellocations-example}

```typescript
const data = await fetchDottie({
  endpoint: vesselLocationsById,
  params: { VesselID: 18 },
});
```

```json
{
  "VesselID": 18,
  "VesselName": "Kitsap",
  "Mmsi": 366772980,
  "DepartingTerminalID": 14,
  "DepartingTerminalName": "Mukilteo",
  "DepartingTerminalAbbrev": "MUK",
  "ArrivingTerminalID": 5,
  "ArrivingTerminalName": "Clinton",
  "ArrivingTerminalAbbrev": "CLI",
  "Latitude": 47.950808,
  "Longitude": -122.297162,
  "Speed": 0,
  "Heading": 159,
  "InService": true,
  "AtDock": true,
  "LeftDock": null,
  "Eta": null,
  "EtaBasis": null,
  "ScheduledDeparture": "2025-10-04T02:05:00.000Z",
  "OpRouteAbbrev": [
    "muk-cl"
  ],
  "VesselPositionNum": 1,
  "SortSeq": 40,
  "ManagedBy": 1,
  "TimeStamp": "2025-10-04T02:01:13.000Z",
  "VesselWatchShutID": 6,
  "VesselWatchShutMsg": "Vessel temporarily out of service",
  "VesselWatchShutFlag": "0",
  "VesselWatchStatus": "0",
  "VesselWatchMsg": "WSF's VesselWatch page is currently not responding and is out of service. Thank you for your patience while we work to restore this page. "
}
```

### VesselStats Example {#vesselstats-example}

```typescript
const data = await fetchDottie({
  endpoint: vesselStatsById,
  params: { VesselID: 32 },
});
```

```json
{
  "VesselID": 32,
  "VesselSubjectID": 32,
  "VesselName": "Tacoma",
  "VesselAbbrev": "TAC",
  "Class": {
    "ClassID": 90,
    "ClassSubjectID": 318,
    "ClassName": "Jumbo Mark II",
    "SortSeq": 10,
    "DrawingImg": "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/0-mark2.gif",
    "SilhouetteImg": "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/0-mark2-sillouette_sml.gif",
    "PublicDisplayName": "Jumbo Mark II"
  },
  "VesselNameDesc": "From the Lushootseed word Tah-ho-mah (now Mt. Rainier), meaning \"snowy mountain.\" Tacoma  was first attributed to the mountain in an 1860s book, \"The Canoe and the Saddle\"  by Theodore Winthrop, a popular volume on the early Pacific Northwest. The city picked the name over Commencement City  when the railroad made its terminius there in the 1870s. \r\n",
  "VesselHistory": "Todd Shipyard Delivery Date: 15 August 1997\r\nKeel Laid Date: 16 October 1995",
  "Beam": "90'",
  "CityBuilt": "Seattle",
  "SpeedInKnots": 18,
  "Draft": "18' 6\"",
  "EngineCount": 4,
  "Horsepower": 16000,
  "Length": "460' 2\"",
  "MaxPassengerCount": 1791,
  "PassengerOnly": false,
  "FastFerry": false,
  "PropulsionInfo": "DIESEL-ELECTRIC (AC)",
  "TallDeckClearance": 186,
  "RegDeckSpace": 202,
  "TallDeckSpace": 68,
  "Tonnage": 4938,
  "Displacement": 6184,
  "YearBuilt": 1997,
  "YearRebuilt": null,
  "VesselDrawingImg": null,
  "SolasCertified": false,
  "MaxPassengerCountForInternational": null
}
```

### VesselsVerbose Example {#vesselsverbose-example}

```typescript
const data = await fetchDottie({
  endpoint: vesselsVerboseById,
  params: { VesselID: 68 },
});
```

```json
{
  "VesselID": 68,
  "VesselSubjectID": 462,
  "VesselName": "Tokitae",
  "VesselAbbrev": "TOK",
  "Class": {
    "ClassID": 100,
    "ClassSubjectID": 319,
    "ClassName": "Olympic",
    "SortSeq": 35,
    "DrawingImg": "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/8-olympic-2014.gif",
    "SilhouetteImg": "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/3-issaquah-sillouette_sml.gif",
    "PublicDisplayName": "Olympic"
  },
  "Status": 1,
  "OwnedByWSF": true,
  "CarDeckRestroom": false,
  "CarDeckShelter": true,
  "Elevator": true,
  "ADAAccessible": true,
  "MainCabinGalley": true,
  "MainCabinRestroom": true,
  "PublicWifi": false,
  "ADAInfo": "The M/V Tokitae has two ADA compliant elevators and wide staircases that provide access from both car decks to the passenger and sun decks. There are accessible restrooms on the main passenger deck and the sun deck. Notify ticket seller if you are traveling by car and need to park near an elevator. There are 12 wheelchair spaces available in the main passenger cabin. There is a galley, and vending and newspaper machines on the main passenger deck. This vessel is equipped with our visual paging system.",
  "AdditionalInfo": null,
  "VesselNameDesc": "Tokitae means \"nice day, pretty colors\" in Chinook jargon.",
  "VesselHistory": "Tokitae is the first of the 144-car, Olympic class ferries pressed into service in June of 2014. ",
  "Beam": "83' 6\"",
  "CityBuilt": "Seattle",
  "SpeedInKnots": 17,
  "Draft": "18'",
  "EngineCount": 2,
  "Horsepower": 6000,
  "Length": "362' 5\"",
  "MaxPassengerCount": 1500,
  "PassengerOnly": false,
  "FastFerry": false,
  "PropulsionInfo": "DIESEL",
  "TallDeckClearance": 192,
  "RegDeckSpace": 144,
  "TallDeckSpace": 34,
  "Tonnage": 3525,
  "Displacement": 5171,
  "YearBuilt": 2014,
  "YearRebuilt": null,
  "VesselDrawingImg": null,
  "SolasCertified": false,
  "MaxPassengerCountForInternational": null
}
```

## Cache Strategy

- **STATIC**: `CacheFlushDate`, `VesselAccommodations`, `VesselBasics`, `VesselHistories`, `VesselStats`, `VesselsVerbose`
- **REALTIME**: `VesselLocations`