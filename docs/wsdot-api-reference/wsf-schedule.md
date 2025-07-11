# WSF Schedule API

## Overview

The WSF Schedule API provides comprehensive ferry schedule information for Washington State Ferries, including sailing schedules, route details, service alerts, and seasonal information. This API supports trip planning, schedule lookups, and real-time service updates for all ferry routes.

**Language Support**: Works with both JavaScript and TypeScript. 

**⚠️ IMPORTANT: Date Field Conversion** - All date fields in API responses are automatically converted from .NET date strings to JavaScript Date objects by the client library's `transformWsfData` function. This includes:
- WSF `/Date(timestamp)/` format
- ISO datetime format (`YYYY-MM-DDTHH:mm:ss`)
- YYYY-MM-DD format
- MM/DD/YYYY format
- MM/DD/YYYY HH:MM:SS AM/PM format

**All date fields in the TypeScript types below are JavaScript Date objects, not strings.**

**Base URL**: `https://wsdot.wa.gov/ferries/api/schedule/rest`

**Official Documentation**: [WSF Schedule API](http://www.wsdot.wa.gov/ferries/api/schedule/documentation/)

## Endpoint Index

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `cacheflushdate` | GET | API cache flush date | None |
| `validdaterange` | GET | Valid date range for schedule data | `apiaccesscode` |
| `activeseasons` | GET | Active schedule seasons | `apiaccesscode` |
| `schedroutes` | GET | All scheduled routes | `apiaccesscode` |
| `schedroutes/{ScheduleID}` | GET | Routes for specific season | `ScheduleID`, `apiaccesscode` |
| `terminals/{TripDate}` | GET | **Minimal terminal objects** for date | `TripDate`, `apiaccesscode` |
| `terminalsandmates/{TripDate}` | GET | All terminal combinations for date | `TripDate`, `apiaccesscode` |
| `terminalsandmatesbyroute/{TripDate}/{RouteID}` | GET | Terminal combinations for route | `TripDate`, `RouteID`, `apiaccesscode` |
| `terminalmates/{TripDate}/{TerminalID}` | GET | Arriving terminals for departing terminal | `TripDate`, `TerminalID`, `apiaccesscode` |
| `routes/{TripDate}` | GET | Routes available for a date | `TripDate`, `apiaccesscode` |
| `routes/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}` | GET | Routes between terminals | `TripDate`, `DepartingTerminalID`, `ArrivingTerminalID`, `apiaccesscode` |
| `routeshavingservicedisruptions/{TripDate}` | GET | Routes with service disruptions | `TripDate`, `apiaccesscode` |
| `routedetails/{TripDate}` | GET | All route details for a date | `TripDate`, `apiaccesscode` |
| `routedetails/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}` | GET | Route details between terminals | `TripDate`, `DepartingTerminalID`, `ArrivingTerminalID`, `apiaccesscode` |
| `routedetails/{TripDate}/{RouteID}` | GET | **Single detailed route object** for specific route | `TripDate`, `RouteID`, `apiaccesscode` |
| `sailings/{SchedRouteID}` | GET | Sailings for a scheduled route | `SchedRouteID`, `apiaccesscode` |
| `allsailings/{SchedRouteID}` | GET | All sailings including contingency | `SchedRouteID`, `apiaccesscode` |
| `schedule/{TripDate}/{RouteID}` | GET | Schedule for specific route and date | `TripDate`, `RouteID`, `apiaccesscode` |
| `schedule/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}` | GET | Schedule between terminals | `TripDate`, `DepartingTerminalID`, `ArrivingTerminalID`, `apiaccesscode` |
| `scheduletoday/{RouteID}/{OnlyRemainingTimes}` | GET | Today's schedule for route | `RouteID`, `OnlyRemainingTimes` (path), `apiaccesscode` |
| `scheduletoday/{DepartingTerminalID}/{ArrivingTerminalID}/{OnlyRemainingTimes}` | GET | Today's schedule between terminals | `DepartingTerminalID`, `ArrivingTerminalID`, `OnlyRemainingTimes` (path), `apiaccesscode` |
| `timeadj` | GET | All time adjustments | `apiaccesscode` |
| `timeadjbyroute/{RouteID}` | GET | Time adjustments for route | `RouteID`, `apiaccesscode` |
| `timeadjbyschedroute/{SchedRouteID}` | GET | Time adjustments for scheduled route | `SchedRouteID`, `apiaccesscode` |
| `alerts` | GET | Service alerts and disruptions | `apiaccesscode` |
| `alternativeformats/{SubjectName}` | GET | Alternative format data | `SubjectName`, `apiaccesscode` |

## Quick Start

### Get Cache Flush Date

```bash
curl "https://wsdot.wa.gov/ferries/api/schedule/rest/cacheflushdate"
```

### Get Valid Date Range

```bash
curl "https://wsdot.wa.gov/ferries/api/schedule/rest/validdaterange?apiaccesscode=$WSDOT_ACCESS_CODE"
```

### Get Active Seasons

```bash
curl "https://wsdot.wa.gov/ferries/api/schedule/rest/activeseasons?apiaccesscode=$WSDOT_ACCESS_CODE"
```

### Get All Scheduled Routes

```bash
curl "https://wsdot.wa.gov/ferries/api/schedule/rest/schedroutes?apiaccesscode=$WSDOT_ACCESS_CODE"
```

### Get Terminals for a Date

```bash
curl "https://wsdot.wa.gov/ferries/api/schedule/rest/terminals/2025-07-10?apiaccesscode=$WSDOT_ACCESS_CODE"
```

### Get Terminal Combinations for a Date

```bash
curl "https://wsdot.wa.gov/ferries/api/schedule/rest/terminalsandmates/2025-07-10?apiaccesscode=$WSDOT_ACCESS_CODE"
```

### Get Routes for a Date

```bash
curl "https://wsdot.wa.gov/ferries/api/schedule/rest/routes/2025-07-10?apiaccesscode=$WSDOT_ACCESS_CODE"
```

### Get Sailings for a Route

```bash
curl "https://wsdot.wa.gov/ferries/api/schedule/rest/sailings/2327?apiaccesscode=$WSDOT_ACCESS_CODE"
```

### Get Schedule for Today

```bash
curl "https://wsdot.wa.gov/ferries/api/schedule/rest/scheduletoday/9/false?apiaccesscode=$WSDOT_ACCESS_CODE"
```

### Get Time Adjustments

```bash
curl "https://wsdot.wa.gov/ferries/api/schedule/rest/timeadj?apiaccesscode=$WSDOT_ACCESS_CODE"
```

### Get Service Alerts

```bash
curl "https://wsdot.wa.gov/ferries/api/schedule/rest/alerts?apiaccesscode=$WSDOT_ACCESS_CODE"
```

### Get Alternative Formats

```bash
curl "https://wsdot.wa.gov/ferries/api/schedule/rest/alternativeformats/schedules?apiaccesscode=$WSDOT_ACCESS_CODE"
```

## Update Frequency

- **Schedule data**: Updates when new seasons are posted
- **Cache flush**: Daily at midnight
- **Service alerts**: Real-time updates
- **Route details**: Updates with schedule changes
- **Time adjustments**: Updates as needed for operational changes
- **Valid date range**: Updates when new seasons are available

## Common Use Cases

- **Trip planning**: Get sailing schedules for route planning
- **Schedule lookups**: Find departure and arrival times
- **Service alerts**: Monitor disruptions and cancellations
- **Seasonal schedules**: Access different schedules by season
- **Terminal discovery**: Find valid terminal combinations
- **Real-time updates**: Get today's schedule with remaining times
- **Time adjustments**: Account for operational timing changes
- **Mobile applications**: Provide schedule information to passengers

## Data Notes

- **⚠️ Date Fields**: All date fields in API responses are automatically converted from .NET date strings to JavaScript Date objects by the client library's `transformWsfData` function. **All date fields in the types below are JavaScript Date objects, not strings.**
- **/terminals and related endpoints** return minimal objects: `{ TerminalID: number, Description: string }`.
- **/timeadj endpoints** return a complex object with all date fields as JS Date objects, and `TimeToAdj` is a `Date`, not a number. Annotations use the `Annotation` type structure.
- **/alternativeformats endpoint** returns objects with fields: `AltID`, `AltTitle`, `AltUrl`, `AltDesc`, `FileType`, `Status`, `SortSeq`, `FromDate`, `ThruDate`, `ModifiedDate`, `ModifiedBy`, etc. All date fields are automatically converted to JavaScript Date objects.
- **/routedetails/{TripDate}/{RouteID}** returns a single detailed route object, not an array, with more fields than the basic route type.

## TypeScript/JavaScript Types (Actual Runtime Types)

**⚠️ IMPORTANT**: All date fields below are JavaScript Date objects, automatically converted from .NET date strings by the client library.

```typescript
// Minimal terminal object (from /terminals, /terminalmates, etc)
export type ScheduleTerminal = {
  TerminalID: number;
  Description: string;
};

// Terminal combination (from /terminalsandmates, /terminalsandmatesbyroute)
export type ScheduleTerminalCombo = {
  DepartingTerminalID: number;
  DepartingDescription: string;
  ArrivingTerminalID: number;
  ArrivingDescription: string;
};

// Annotation information (from /timeadj, sailing data structures)
export type Annotation = {
  AnnotationID: number;
  AnnotationText: string;
  AnnotationIVRText: string;
  AdjustedCrossingTime: number | null;
  AnnotationImg: string;
  TypeDescription: string;
  SortSeq: number;
};

// Time adjustment (from /timeadj, /timeadjbyroute, /timeadjbyschedroute)
export type TimeAdjustment = {
  ScheduleID: number;
  SchedRouteID: number;
  RouteID: number;
  RouteDescription: string;
  RouteSortSeq: number;
  SailingID: number;
  SailingDescription: string;
  ActiveSailingDateRange: {
    DateFrom: Date; // JavaScript Date object
    DateThru: Date; // JavaScript Date object
    EventID: number | null;
    EventDescription: string | null;
  };
  SailingDir: number;
  JourneyID: number;
  VesselID: number;
  VesselName: string;
  VesselHandicapAccessible: boolean;
  VesselPositionNum: number;
  TerminalID: number;
  TerminalDescription: string;
  TerminalBriefDescription: string;
  JourneyTerminalID: number;
  DepArrIndicator: number;
  AdjDateFrom: Date; // JavaScript Date object
  AdjDateThru: Date; // JavaScript Date object
  AdjType: number;
  TidalAdj: boolean;
  TimeToAdj: Date; // JavaScript Date object (time adjustment)
  Annotations: Annotation[];
  EventID: number | null;
  EventDescription: string | null;
};

// Alternative format (from /alternativeformats)
export type AlternativeFormat = {
  AltID: number;
  SubjectID: number;
  SubjectName: string;
  AltTitle: string;
  AltUrl: string;
  AltDesc: string;
  FileType: string;
  Status: string;
  SortSeq: number;
  FromDate: Date | null; // Automatically converted from MM/DD/YYYY format or null if empty string
  ThruDate: Date | null; // Automatically converted from MM/DD/YYYY format or null if empty string
  ModifiedDate: Date | null; // Automatically converted from MM/DD/YYYY HH:MM:SS AM/PM format or null if empty string
  ModifiedBy: string;
};

// Route details (from /routedetails/{TripDate}/{RouteID})
export type RouteDetails = {
  RouteID: number;
  RouteAbbrev: string;
  Description: string;
  RegionID: number;
  CrossingTime: number;
  ReservationFlag: boolean;
  PassengerOnlyFlag: boolean;
  InternationalFlag: boolean;
  VesselWatchID: number;
  GeneralRouteNotes: string;
  SeasonalRouteNotes: string;
  AdaNotes: string;
  Alerts: any[];
};

// All other types (routes, schedules, sailings, etc) use Date for all date fields.
```

## Example API Responses (with Date objects)

**⚠️ IMPORTANT**: All date fields in these examples are JavaScript Date objects, automatically converted from .NET date strings by the client library.

```typescript
// Example: /terminals/2025-07-10
[
  { TerminalID: 1, Description: "Anacortes" },
  { TerminalID: 3, Description: "Lopez Island" }
]

// Example: /timeadj
[
  {
    ScheduleID: 192,
    SchedRouteID: 2326,
    RouteID: 8,
    RouteDescription: "Port Townsend / Coupeville",
    RouteSortSeq: 30,
    SailingID: 7819,
    SailingDescription: "Leave Port Townsend - Summer",
    ActiveSailingDateRange: {
      DateFrom: new Date("2025-07-10T00:00:00-07:00"), // JavaScript Date object
      DateThru: new Date("2025-10-20T00:00:00-07:00"), // JavaScript Date object
      EventID: null,
      EventDescription: null
    },
    SailingDir: 1,
    JourneyID: 166864,
    VesselID: 52,
    VesselName: "Kennewick",
    VesselHandicapAccessible: true,
    VesselPositionNum: 1,
    TerminalID: 10,
    TerminalDescription: "Friday Harbor",
    TerminalBriefDescription: "Friday Harbor",
    JourneyTerminalID: 224498,
    DepArrIndicator: 1,
    AdjDateFrom: new Date("2025-07-10T00:00:00-07:00"), // JavaScript Date object
    AdjDateThru: new Date("2025-07-10T00:00:00-07:00"), // JavaScript Date object
    AdjType: 2,
    TidalAdj: true,
    TimeToAdj: new Date("1900-01-01T00:00:00-08:00"), // JavaScript Date object (time adjustment)
    Annotations: [
      {
        AnnotationID: 123,
        AnnotationText: "Tidal adjustment",
        AnnotationIVRText: "Tidal adjustment in effect",
        AdjustedCrossingTime: 15,
        AnnotationImg: "tidal.png",
        TypeDescription: "Tidal",
        SortSeq: 1
      }
    ],
    EventID: null,
    EventDescription: null
  }
]

// Example: /alternativeformats/schedules
[
  {
    AltID: 5,
    SubjectID: 3,
    SubjectName: "Schedules",
    AltTitle: "Cellular / PDA Schedule",
    AltUrl: "https://www.wsdot.com/ferries/schedule/Small/default.aspx",
    AltDesc: "WSF Small Schedule",
    FileType: "pda",
    Status: "Active",
    SortSeq: 30,
    FromDate: null, // Date object (null if empty string)
    ThruDate: null, // Date object (null if empty string)
    ModifiedDate: new Date("2020-01-07T12:10:06-08:00"), // Date object
    ModifiedBy: "TranD"
  }
]

// Example: /routedetails/2025-07-10/1
{
  RouteID: 1,
  RouteAbbrev: "ana-sj",
  Description: "Anacortes / San Juan Islands",
  RegionID: 1,
  CrossingTime: 90,
  ReservationFlag: true,
  PassengerOnlyFlag: false,
  InternationalFlag: false,
  VesselWatchID: 123,
  GeneralRouteNotes: "...",
  SeasonalRouteNotes: "...",
  AdaNotes: "...",
  Alerts: []
}
```

## Troubleshooting

- **Date Field Issues**: If you see a type mismatch in your code or tests, check whether the field is a Date object (not a string). All date fields are automatically converted from .NET date strings to JavaScript Date objects by the `transformWsfData` function.
- **Field Name Issues**: Ensure field names match the actual API response (PascalCase is preserved).
- **Alternative Format Dates**: All date fields in `AlternativeFormat` are automatically converted to JavaScript Date objects, with null values for empty strings.
- For all schedule API endpoints, always refer to the actual runtime types above for validation and type definitions.

## Best Practices

- Always check the actual API response and the runtime type in your client before writing validation or type definitions.
- Use the provided types above as the source of truth for your code and tests.
- If the API changes, update your types and validation accordingly. 