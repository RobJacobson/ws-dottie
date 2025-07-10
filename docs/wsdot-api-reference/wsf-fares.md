# WSF Fares API

## Overview

The WSF Fares API provides comprehensive fare information for Washington State Ferries, including current pricing, fare categories, terminal combinations, and fare calculations. This API supports fare planning, ticket pricing, and fare analysis for all ferry routes and passenger types.

**Base URL**: `https://wsdot.wa.gov/ferries/api/fares/rest`

**Official Documentation**: [WSF Fares API](http://www.wsdot.wa.gov/ferries/api/fares/documentation/)

## Endpoint Index

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `cacheflushdate` | GET | API cache flush date | None |
| `validdaterange` | GET | Valid date range for fare queries | `apiaccesscode` |
| `terminals/{TripDate}` | GET | All terminals available for a date | `TripDate`, `apiaccesscode` |
| `terminalmates/{TripDate}/{TerminalID}` | GET | Terminals that connect to a specific terminal | `TripDate`, `TerminalID`, `apiaccesscode` |
| `terminalcombo/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}` | GET | Terminal combination details | `TripDate`, `DepartingTerminalID`, `ArrivingTerminalID`, `apiaccesscode` |
| `farelineitems/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}` | GET | Fare line items for a route | `TripDate`, `DepartingTerminalID`, `ArrivingTerminalID`, `RoundTrip`, `apiaccesscode` |
| `farelineitemsbasic/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}` | GET | Basic fare line items | `TripDate`, `DepartingTerminalID`, `ArrivingTerminalID`, `RoundTrip`, `apiaccesscode` |
| `farelineitemsverbose/{TripDate}` | GET | Verbose fare line items for all routes | `TripDate`, `apiaccesscode` |
| `faretotals/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}/{FareLineItemID}/{Quantity}` | GET | Calculate fare totals | `TripDate`, `DepartingTerminalID`, `ArrivingTerminalID`, `RoundTrip`, `FareLineItemID`, `Quantity`, `apiaccesscode` |
| `terminalcomboverbose/{TripDate}` | GET | Verbose terminal combinations | `TripDate`, `apiaccesscode` |
| `alternativeformats/{SubjectName}` | GET | Alternative format data | `SubjectName`, `apiaccesscode` |

## Quick Start

### Get Cache Flush Date

```bash
curl "https://wsdot.wa.gov/ferries/api/fares/rest/cacheflushdate"
```

### Get Valid Date Range

```bash
curl "https://wsdot.wa.gov/ferries/api/fares/rest/validdaterange?apiaccesscode=$WSDOT_ACCESS_CODE"
```

### Get All Terminals

```bash
curl "https://wsdot.wa.gov/ferries/api/fares/rest/terminals/2025-07-10?apiaccesscode=$WSDOT_ACCESS_CODE"
```

### Get Terminal Mates

```bash
curl "https://wsdot.wa.gov/ferries/api/fares/rest/terminalmates/2025-07-10/1?apiaccesscode=$WSDOT_ACCESS_CODE"
```

### Get Terminal Combination

```bash
curl "https://wsdot.wa.gov/ferries/api/fares/rest/terminalcombo/2025-07-10/1/10?apiaccesscode=$WSDOT_ACCESS_CODE"
```

### Get Fare Line Items

```bash
curl "https://wsdot.wa.gov/ferries/api/fares/rest/farelineitems/2025-07-10/1/10/false?apiaccesscode=$WSDOT_ACCESS_CODE"
```

### Calculate Fare Totals

```bash
curl "https://wsdot.wa.gov/ferries/api/fares/rest/faretotals/2025-07-10/1/10/false/1/2?apiaccesscode=$WSDOT_ACCESS_CODE"
```

## Update Frequency

- **Fare data**: Updates when new tariff schedules are posted
- **Cache flush**: Daily at midnight
- **Valid dates**: Based on sailing season and tariff schedule
- **Terminal data**: Updates when routes change

## Common Use Cases

- **Fare calculation**: Calculate costs for specific routes and passenger types
- **Trip planning**: Get fare information for route planning
- **Ticket pricing**: Display current fares for ticket sales
- **Route analysis**: Compare fares between different routes
- **Mobile applications**: Provide fare information to passengers

## Data Notes

- All dates must be within the valid date range
- RoundTrip parameter accepts `true`/`false` strings
- Fare amounts are in US dollars
- Terminal IDs are numeric identifiers
- Some fare line items include HTML in descriptions
- DirectionIndependent indicates if fare applies to both directions

## TypeScript Types

```typescript
// Cache flush date
type CacheFlushDate = string; // .NET Date format

// Valid date range
type ValidDateRange = {
  DateFrom: string; // .NET Date format
  DateThru: string; // .NET Date format
};

// Terminal information
type Terminal = {
  TerminalID: number;
  Description: string;
};

// Terminal mates (connected terminals)
type TerminalMates = Terminal[];

// Terminal combination details
type TerminalCombo = {
  DepartingDescription: string;
  ArrivingDescription: string;
  CollectionDescription: string;
};

// Fare line item
type FareLineItem = {
  FareLineItemID: number;
  FareLineItem: string;
  Category: string;
  DirectionIndependent: boolean;
  Amount: number;
};

// Fare totals calculation
type FareTotal = {
  TotalType: number;
  Description: string;
  BriefDescription: string;
  Amount: number;
};

// Error message
type ErrorMessage = {
  Message: string;
};
```

## Real API Data Examples

### Cache Flush Date

```json
"/Date(1752119810900-0700)/"
```

### Valid Date Range

```json
{
  "DateFrom": "/Date(1752130800000-0700)/",
  "DateThru": "/Date(1758351600000-0700)/"
}
```

### All Terminals

```json
[
  {
    "TerminalID": 1,
    "Description": "Anacortes"
  },
  {
    "TerminalID": 3,
    "Description": "Bainbridge Island"
  },
  {
    "TerminalID": 4,
    "Description": "Bremerton"
  },
  {
    "TerminalID": 5,
    "Description": "Clinton"
  }
]
```

### Terminal Mates

```json
[
  {
    "TerminalID": 10,
    "Description": "Friday Harbor"
  },
  {
    "TerminalID": 13,
    "Description": "Lopez Island"
  },
  {
    "TerminalID": 15,
    "Description": "Orcas Island"
  },
  {
    "TerminalID": 18,
    "Description": "Shaw Island"
  }
]
```

### Terminal Combination

```json
{
  "DepartingDescription": "Anacortes",
  "ArrivingDescription": "Friday Harbor",
  "CollectionDescription": "Passenger and vehicle/driver fares are collected at Anacortes, while no fares are collected at Friday Harbor."
}
```

### Fare Line Items

```json
[
  {
    "FareLineItemID": 1,
    "FareLineItem": "Adult (age 19 - 64)",
    "Category": "Passenger",
    "DirectionIndependent": false,
    "Amount": 16.5
  },
  {
    "FareLineItemID": 2,
    "FareLineItem": "Senior (age 65 & over) / <a href=https://wsdot.wa.gov/ferries/rider-information/ada#Reduced%20fare%20passenger%20tickets target=\"_blank\" title=\"Disability\">Disability</a>",
    "Category": "Passenger",
    "DirectionIndependent": false,
    "Amount": 8.25
  },
  {
    "FareLineItemID": 3,
    "FareLineItem": "Youth (age 18 and under)",
    "Category": "Passenger",
    "DirectionIndependent": false,
    "Amount": 0
  },
  {
    "FareLineItemID": 168,
    "FareLineItem": "Vehicle Under 14' (less than 168\") & Driver",
    "Category": "Vehicle, Motorcycle, and Stowage Fares",
    "DirectionIndependent": false,
    "Amount": 64.35
  }
]
```

### Fare Totals

```json
[
  {
    "TotalType": 1,
    "Description": "Anacortes to Friday Harbor",
    "BriefDescription": "Depart",
    "Amount": 33
  },
  {
    "TotalType": 3,
    "Description": "Either",
    "BriefDescription": "Either",
    "Amount": 0
  },
  {
    "TotalType": 4,
    "Description": "Grand Total",
    "BriefDescription": "Total",
    "Amount": 33
  }
]
```

### Error Message (Invalid Date)

```json
{
  "Message": "The TripDate 1/10/2024 is not valid. A valid TripDate ranges from today's date through whichever comes first, the end of the most recently posted sailing season or the end of the most recently posted tariff schedule. Valid TripDate values currently currently span 7/10/2025 - 9/20/2025."
}
```

## JSONP Support

This API does not support JSONP. All endpoints return JSON data directly.

## Troubleshooting

### Common Issues

1. **Invalid dates**: Dates must be within the valid date range
2. **RoundTrip parameter**: Must be `true` or `false` string, not 0/1
3. **Terminal IDs**: Use numeric IDs, not terminal names
4. **Access code**: Ensure valid access code is provided for protected endpoints

### Error Responses

- **400 Bad Request**: Invalid parameters (date, terminal ID, etc.)
- **401 Unauthorized**: Invalid or missing access code
- **404 Not Found**: Endpoint not found
- **500 Internal Server Error**: Server error, retry later

### Rate Limiting

- No documented rate limits
- Recommended: Cache responses for 24 hours
- Cache flush date indicates when data was last updated

### Best Practices

1. **Check valid date range**: Always verify dates before making requests
2. **Cache responses**: Cache fare data for 24 hours to reduce API calls
3. **Error handling**: Implement proper error handling for invalid dates
4. **HTML parsing**: Some fare descriptions contain HTML that needs parsing
5. **Terminal validation**: Verify terminal IDs exist before fare calculations 