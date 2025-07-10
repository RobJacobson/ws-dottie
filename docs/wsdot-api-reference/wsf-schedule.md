# WSF Schedule API

## Overview

The WSF Schedule API provides comprehensive ferry schedule information for Washington State Ferries, including sailing schedules, route details, service alerts, and seasonal information. This API supports trip planning, schedule lookups, and real-time service updates for all ferry routes.

**Base URL**: `https://wsdot.wa.gov/ferries/api/schedule/rest`

**Official Documentation**: [WSF Schedule API](http://www.wsdot.wa.gov/ferries/api/schedule/documentation/)

## Endpoint Index

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `cacheflushdate` | GET | API cache flush date | None |
| `activeseasons` | GET | Active schedule seasons | `apiaccesscode` |
| `schedroutes` | GET | All scheduled routes | `apiaccesscode` |
| `schedroutes/{ScheduleID}` | GET | Routes for specific season | `ScheduleID`, `apiaccesscode` |
| `routes/{TripDate}` | GET | Routes available for a date | `TripDate`, `apiaccesscode` |
| `routes/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}` | GET | Routes between terminals | `TripDate`, `DepartingTerminalID`, `ArrivingTerminalID`, `apiaccesscode` |
| `routeshavingservicedisruptions/{TripDate}` | GET | Routes with service disruptions | `TripDate`, `apiaccesscode` |
| `routedetails/{TripDate}` | GET | All route details for a date | `TripDate`, `apiaccesscode` |
| `routedetails/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}` | GET | Route details between terminals | `TripDate`, `DepartingTerminalID`, `ArrivingTerminalID`, `apiaccesscode` |
| `routedetails/{TripDate}/{RouteID}` | GET | Route details for specific route | `TripDate`, `RouteID`, `apiaccesscode` |
| `sailings/{SchedRouteID}` | GET | Sailings for a scheduled route | `SchedRouteID`, `apiaccesscode` |
| `allsailings/{SchedRouteID}` | GET | All sailings including contingency | `SchedRouteID`, `apiaccesscode` |
| `alerts` | GET | Service alerts and disruptions | `apiaccesscode` |
| `alternativeformats/{SubjectName}` | GET | Alternative format data | `SubjectName`, `apiaccesscode` |

## Quick Start

### Get Cache Flush Date

```bash
curl "https://wsdot.wa.gov/ferries/api/schedule/rest/cacheflushdate"
```

### Get Active Seasons

```bash
curl "https://wsdot.wa.gov/ferries/api/schedule/rest/activeseasons?apiaccesscode=$WSDOT_ACCESS_CODE"
```

### Get All Scheduled Routes

```bash
curl "https://wsdot.wa.gov/ferries/api/schedule/rest/schedroutes?apiaccesscode=$WSDOT_ACCESS_CODE"
```

### Get Routes for a Date

```bash
curl "https://wsdot.wa.gov/ferries/api/schedule/rest/routes/2025-07-10?apiaccesscode=$WSDOT_ACCESS_CODE"
```

### Get Sailings for a Route

```bash
curl "https://wsdot.wa.gov/ferries/api/schedule/rest/sailings/2327?apiaccesscode=$WSDOT_ACCESS_CODE"
```

### Get Service Alerts

```bash
curl "https://wsdot.wa.gov/ferries/api/schedule/rest/alerts?apiaccesscode=$WSDOT_ACCESS_CODE"
```

## Update Frequency

- **Schedule data**: Updates when new seasons are posted
- **Cache flush**: Daily at midnight
- **Service alerts**: Real-time updates
- **Route details**: Updates with schedule changes

## Common Use Cases

- **Trip planning**: Get sailing schedules for route planning
- **Schedule lookups**: Find departure and arrival times
- **Service alerts**: Monitor disruptions and cancellations
- **Seasonal schedules**: Access different schedules by season
- **Mobile applications**: Provide schedule information to passengers

## Data Notes

- All dates must be within active schedule seasons
- Times use .NET Date format (`/Date(timestamp)/`)
- Route IDs and SchedRouteIDs are numeric identifiers
- Some fields contain HTML content that needs parsing
- Service disruptions are real-time and may change frequently

## TypeScript Types

```typescript
// Cache flush date
type CacheFlushDate = string; // .NET Date format

// Active schedule season
type ActiveSeason = {
  ScheduleID: number;
  ScheduleName: string;
  ScheduleSeason: number;
  SchedulePDFUrl: string;
  ScheduleStart: string; // .NET Date format
  ScheduleEnd: string; // .NET Date format
};

// Scheduled route
type ScheduledRoute = {
  ScheduleID: number;
  SchedRouteID: number;
  ContingencyOnly: boolean;
  RouteID: number;
  RouteAbbrev: string;
  Description: string;
  SeasonalRouteNotes: string;
  RegionID: number;
  ServiceDisruptions: any[];
  ContingencyAdj: any[];
};

// Route information
type Route = {
  RouteID: number;
  RouteAbbrev: string;
  Description: string;
  RegionID: number;
  ServiceDisruptions: any[];
};

// Terminal time information
type TerminalTime = {
  JourneyTerminalID: number;
  TerminalID: number;
  TerminalDescription: string;
  TerminalBriefDescription: string;
  Time: string; // .NET Date format
  DepArrIndicator: number | null;
  IsNA: boolean;
  Annotations: any[];
};

// Journey information
type Journey = {
  JourneyID: number;
  ReservationInd: boolean;
  InternationalInd: boolean;
  InterislandInd: boolean;
  VesselID: number;
  VesselName: string;
  VesselHandicapAccessible: boolean;
  VesselPositionNum: number;
  TerminalTimes: TerminalTime[];
};

// Sailing information
type Sailing = {
  ScheduleID: number;
  SchedRouteID: number;
  RouteID: number;
  SailingID: number;
  SailingDescription: string;
  SailingNotes: string;
  DisplayColNum: number;
  SailingDir: number;
  DayOpDescription: string;
  DayOpUseForHoliday: boolean;
  ActiveDateRanges: Array<{
    DateFrom: string; // .NET Date format
    DateThru: string; // .NET Date format
    EventID: number | null;
    EventDescription: string | null;
  }>;
  Journs: Journey[];
};

// Service alert
type Alert = {
  BulletinID: number;
  BulletinFlag: boolean;
  BulletinText: string;
  CommunicationFlag: boolean;
  CommunicationText: string | null;
  RouteAlertFlag: boolean;
  RouteAlertText: string;
  HomepageAlertText: string;
  PublishDate: string; // .NET Date format
  DisruptionDescription: string | null;
  AllRoutesFlag: boolean;
  SortSeq: number;
  AlertTypeID: number;
  AlertType: string;
  AlertFullTitle: string;
  AffectedRouteIDs: number[];
  IVRText: string | null;
};
```

## Real API Data Examples

### Cache Flush Date

```json
"/Date(1752177763833-0700)/"
```

### Active Seasons

```json
[
  {
    "ScheduleID": 192,
    "ScheduleName": "Summer 2025",
    "ScheduleSeason": 1,
    "SchedulePDFUrl": "http://www.wsdot.wa.gov/ferries/pdf/2025Summer.pdf",
    "ScheduleStart": "/Date(1749970800000-0700)/",
    "ScheduleEnd": "/Date(1758351600000-0700)/"
  }
]
```

### Scheduled Routes

```json
[
  {
    "ScheduleID": 192,
    "SchedRouteID": 2327,
    "ContingencyOnly": false,
    "RouteID": 9,
    "RouteAbbrev": "ana-sj",
    "Description": "Anacortes / San Juan Islands",
    "SeasonalRouteNotes": " <ul style=\"font-size: 1em;\"><li>Reservations are recommended for all vehicles on this route.</li> <li>This route has a new schedule for Summer 2025. See the <a href=\"https://wsdot.wa.gov/construction-planning/search-studies/anacortes-san-juan-islands-schedule-update\">project page</a> for details on the process.</li> <li>The Anacortes-San Juan Islands route will operate a regular Friday schedule on Independence Day, and a Sunday schedule on Labor Day.</li></ul>",
    "RegionID": 1,
    "ServiceDisruptions": [],
    "ContingencyAdj": []
  },
  {
    "ScheduleID": 192,
    "SchedRouteID": 2326,
    "ContingencyOnly": false,
    "RouteID": 8,
    "RouteAbbrev": "pt-key",
    "Description": "Port Townsend / Coupeville",
    "SeasonalRouteNotes": "<ul style=\"font-size: 1em;\"><li>Reservations are recommended for all vehicles on this route.</li> <li>Extreme tidal conditions may interrupt service.</li> <li>The Port Townsend-Coupeville route will operate a holiday schedule on Independence Day and Labor Day.</li></ul>",
    "RegionID": 2,
    "ServiceDisruptions": [],
    "ContingencyAdj": []
  }
]
```

### Routes for a Date

```json
[
  {
    "RouteID": 9,
    "RouteAbbrev": "ana-sj",
    "Description": "Anacortes / San Juan Islands",
    "RegionID": 1,
    "ServiceDisruptions": []
  },
  {
    "RouteID": 6,
    "RouteAbbrev": "ed-king",
    "Description": "Edmonds / Kingston",
    "RegionID": 3,
    "ServiceDisruptions": []
  },
  {
    "RouteID": 13,
    "RouteAbbrev": "f-s",
    "Description": "Fauntleroy (West Seattle) / Southworth",
    "RegionID": 5,
    "ServiceDisruptions": []
  }
]
```

### Sailings for a Route

```json
[
  {
    "ScheduleID": 192,
    "SchedRouteID": 2327,
    "RouteID": 9,
    "SailingID": 7422,
    "SailingDescription": "Leave Westbound",
    "SailingNotes": "",
    "DisplayColNum": 0,
    "SailingDir": 1,
    "DayOpDescription": "Daily",
    "DayOpUseForHoliday": true,
    "ActiveDateRanges": [
      {
        "DateFrom": "/Date(1749970800000-0700)/",
        "DateThru": "/Date(1758351600000-0700)/",
        "EventID": null,
        "EventDescription": null
      }
    ],
    "Journs": [
      {
        "JourneyID": 158204,
        "ReservationInd": false,
        "InternationalInd": false,
        "InterislandInd": false,
        "VesselID": 69,
        "VesselName": "Samish",
        "VesselHandicapAccessible": true,
        "VesselPositionNum": 2,
        "TerminalTimes": [
          {
            "JourneyTerminalID": 224498,
            "TerminalID": 1,
            "TerminalDescription": "Anacortes",
            "TerminalBriefDescription": "Anacortes",
            "Time": "/Date(-2208945600000-0800)/",
            "DepArrIndicator": 1,
            "IsNA": false,
            "Annotations": []
          }
        ]
      }
    ]
  }
]
```

### Service Alerts

```json
[
  {
    "BulletinID": 106036,
    "BulletinFlag": true,
    "BulletinText": "<p>We are encouraging all reservation holders to arrive early for the 3:50 p.m. #2 Samish Friday Harbor departure, as space may be limited due to earlier route cancellations.</p>",
    "CommunicationFlag": false,
    "CommunicationText": null,
    "RouteAlertFlag": true,
    "RouteAlertText": "Ana/SJs- #2 Samish 350pm Friday Harbor Sailing/Please Res Holders Arrive Early. See bulletin.",
    "HomepageAlertText": "<p>We are encouraging all reservation holders to arrive early for the 3:50 p.m. #2 Samish Friday Harbor departure, as space may be limited due to earlier route cancellations.</p>",
    "PublishDate": "/Date(1752177747913-0700)/",
    "DisruptionDescription": null,
    "AllRoutesFlag": false,
    "SortSeq": 1,
    "AlertTypeID": 5,
    "AlertType": "All Alerts",
    "AlertFullTitle": "Ana/SJs- #2 Samish 350pm Friday Harbor Sailing/Please Res Holders Arrive Early",
    "AffectedRouteIDs": [9, 20, 21, 22, 23, 27, 28, 272],
    "IVRText": null
  }
]
```

## JSONP Support

This API does not support JSONP. All endpoints return JSON data directly.

## Troubleshooting

### Common Issues

1. **Invalid dates**: Dates must be within active schedule seasons
2. **Route IDs**: Use numeric IDs, not route abbreviations
3. **Time parsing**: .NET Date format requires special parsing
4. **HTML content**: Some fields contain HTML that needs parsing
5. **Access code**: Ensure valid access code is provided for protected endpoints

### Error Responses

- **400 Bad Request**: Invalid parameters (date, route ID, etc.)
- **401 Unauthorized**: Invalid or missing access code
- **404 Not Found**: Endpoint not found
- **500 Internal Server Error**: Server error, retry later

### Rate Limiting

- No documented rate limits
- Recommended: Cache responses for 1 hour
- Service alerts: Check every 15 minutes for updates

### Best Practices

1. **Check active seasons**: Always verify dates are within active seasons
2. **Cache responses**: Cache schedule data for 1 hour to reduce API calls
3. **Error handling**: Implement proper error handling for invalid dates
4. **HTML parsing**: Parse HTML content in bulletin and alert text
5. **Time conversion**: Convert .NET Date format to JavaScript Date objects
6. **Service alerts**: Monitor alerts for real-time service updates 