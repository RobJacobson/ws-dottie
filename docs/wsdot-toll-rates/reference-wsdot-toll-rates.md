# WSDOT Toll Rates API

## Overview

The WSDOT Toll Rates API provides real-time and historical toll rate information for Washington State's toll facilities, including the SR 520 Bridge, I-405 Express Toll Lanes, and other managed lanes. This API offers current toll rates, trip information, and historical data for toll planning and analysis.

**Base URL**: `https://wsdot.wa.gov/traffic/api/TollRates/TollRatesREST.svc`

**Official Documentation**: [WSDOT Toll Rates API](https://wsdot.wa.gov/traffic/api/TollRates/TollRatesREST.svc/Help)

## Endpoint Index

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `GetTollRatesAsJson` | GET | Current toll rates for all facilities | `AccessCode` |
| `GetTollTripInfoAsJson` | GET | Detailed trip information with geometry | `AccessCode` |
| `GetTollTripRatesAsJson` | GET | Current toll rates with messages | `AccessCode` |
| `GetTollTripVersionAsJson` | GET | API version and timestamp | `AccessCode` |
| `GetTripRatesByDateAsJson` | GET | Historical toll rates by date range | `AccessCode`, `fromDate`, `toDate` |

## Quick Start

### Get Current Toll Rates

```bash
curl "https://wsdot.wa.gov/traffic/api/TollRates/TollRatesREST.svc/GetTollRatesAsJson?AccessCode=$WSDOT_ACCESS_CODE"
```

### Get Trip Information

```bash
curl "https://wsdot.wa.gov/traffic/api/TollRates/TollRatesREST.svc/GetTollTripInfoAsJson?AccessCode=$WSDOT_ACCESS_CODE"
```

### Get Current Trip Rates

```bash
curl "https://wsdot.wa.gov/traffic/api/TollRates/TollRatesREST.svc/GetTollTripRatesAsJson?AccessCode=$WSDOT_ACCESS_CODE"
```

### Get API Version

```bash
curl "https://wsdot.wa.gov/traffic/api/TollRates/TollRatesREST.svc/GetTollTripVersionAsJson?AccessCode=$WSDOT_ACCESS_CODE"
```

### Get Historical Rates

```bash
curl "https://wsdot.wa.gov/traffic/api/TollRates/TollRatesREST.svc/GetTripRatesByDateAsJson?AccessCode=$WSDOT_ACCESS_CODE&fromDate=2024-01-01&toDate=2024-01-02"
```

## Update Frequency

- **Real-time data**: Updates every 5 minutes
- **Historical data**: Available for past 30 days
- **API version**: Updates when toll rates change

## Common Use Cases

- **Real-time toll planning**: Get current rates for route planning
- **Historical analysis**: Analyze toll rate patterns over time
- **Trip cost estimation**: Calculate toll costs for specific routes
- **Traffic management**: Monitor toll facility usage patterns
- **Mobile applications**: Provide toll information to drivers

## Data Notes

- All coordinates are in WGS84 (latitude/longitude)
- Toll amounts are in US dollars
- Time stamps use .NET Date format (`/Date(timestamp)/`)
- Geometry data is provided as GeoJSON LineString
- Trip names follow pattern: `{Route}tp{StartMilepost}`

## TypeScript Types

```typescript
// Current toll rate information
type TollRate = {
  CurrentMessage: string | null;
  CurrentToll: number;
  EndLatitude: number;
  EndLocationName: string;
  EndLongitude: number;
  EndMilepost: number;
  StartLatitude: number;
  StartLocationName: string;
  StartLongitude: number;
  StartMilepost: number;
  StateRoute: string;
  TimeUpdated: string;
  TravelDirection: string;
  TripName: string;
};

// Detailed trip information with geometry
type TollTripInfo = {
  EndLatitude: number;
  EndLocationName: string;
  EndLongitude: number;
  EndMilepost: number;
  Geometry: string; // GeoJSON LineString
  ModifiedDate: string;
  StartLatitude: number;
  StartLocationName: string;
  StartLongitude: number;
  StartMilepost: number;
  TravelDirection: string;
  TripName: string;
};

// Current trip rates with messages
type TollTripRate = {
  Message: string;
  MessageUpdateTime: string;
  Toll: number;
  TripName: string;
};

// Trip rates response wrapper
type TollTripRatesResponse = {
  LastUpdated: string;
  Trips: TollTripRate[];
};

// API version information
type TollTripVersion = {
  TimeStamp: string;
  Version: number;
};

// Historical rates (returns empty array for past dates)
type HistoricalTollRates = TollRate[];
```

## Real API Data Examples

### Current Toll Rates

```json
[
  {
    "CurrentMessage": null,
    "CurrentToll": 155,
    "EndLatitude": 47.587648851,
    "EndLocationName": "NB S Portal",
    "EndLongitude": -122.338771924,
    "EndMilepost": 30,
    "StartLatitude": 47.626665944,
    "StartLocationName": "SB S Portal",
    "StartLongitude": -122.343652437,
    "StartMilepost": 33,
    "StateRoute": "099",
    "TimeUpdated": "/Date(1752177630118-0700)/",
    "TravelDirection": "S",
    "TripName": "099tp03268"
  },
  {
    "CurrentMessage": null,
    "CurrentToll": 355,
    "EndLatitude": 47.626665944,
    "EndLocationName": "SB S Portal",
    "EndLongitude": -122.343652437,
    "EndMilepost": 33,
    "StartLatitude": 47.587648851,
    "StartLocationName": "NB S Portal",
    "StartLongitude": -122.338771924,
    "StartMilepost": 30,
    "StateRoute": "099",
    "TimeUpdated": "/Date(1752177630118-0700)/",
    "TravelDirection": "S",
    "TripName": "099tp03060"
  }
]
```

### Trip Information

```json
[
  {
    "EndLatitude": 47.716381918,
    "EndLocationName": "NE 124th St",
    "EndLongitude": -122.185944031,
    "EndMilepost": 20.76,
    "Geometry": "{ \"type\": \"LineString\", \"coordinates\": [[-122.18545726, 47.71554562], [-122.18464557, 47.71414898]] }",
    "ModifiedDate": "/Date(1667335491757-0700)/",
    "StartLatitude": 47.612867977,
    "StartLocationName": "NE 4th",
    "StartLongitude": -122.188449866,
    "StartMilepost": 13.51,
    "TravelDirection": "N",
    "TripName": "405tp01351"
  }
]
```

### Current Trip Rates

```json
{
  "LastUpdated": "/Date(1752177208000-0700)/",
  "Trips": [
    {
      "Message": "$1.00",
      "MessageUpdateTime": "/Date(1752177208000-0700)/",
      "Toll": 1,
      "TripName": "405tp02752"
    },
    {
      "Message": "$1.50",
      "MessageUpdateTime": "/Date(1752177210000-0700)/",
      "Toll": 1.5,
      "TripName": "405tp02067"
    }
  ]
}
```

### API Version

```json
{
  "TimeStamp": "/Date(1752177576000-0700)/",
  "Version": 335984
}
```

## JSONP Support

This API supports JSONP responses. Add a `callback` parameter to receive JSONP format:

```bash
curl "https://wsdot.wa.gov/traffic/api/TollRates/TollRatesREST.svc/GetTollRatesAsJsonp?AccessCode=$WSDOT_ACCESS_CODE&callback=myCallback"
```

## Troubleshooting

### Common Issues

1. **Empty historical data**: Historical endpoints may return empty arrays for past dates
2. **Geometry parsing**: Geometry field contains escaped JSON string that needs parsing
3. **Date format**: .NET Date format requires special parsing in JavaScript
4. **Access code**: Ensure valid access code is provided for all requests

### Error Responses

- **401 Unauthorized**: Invalid or missing access code
- **404 Not Found**: Endpoint not found
- **500 Internal Server Error**: Server error, retry later

### Rate Limiting

- No documented rate limits
- Recommended: 1 request per 5 minutes for real-time data
- Historical data: Use sparingly to avoid server load

### Best Practices

1. **Cache responses**: Cache toll rates for 5 minutes to reduce API calls
2. **Error handling**: Implement retry logic for failed requests
3. **Data validation**: Validate coordinates and toll amounts before use
4. **Geometry parsing**: Parse geometry field as JSON for mapping applications 