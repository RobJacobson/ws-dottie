# WSDOT API Reference Documentation

## API Reference Table

| API | Category | Data Frequency | Documentation |
|-----|----------|----------------|---------------|
| Border Crossings | Traveler Information | Real-time (5 min) | [Details](border-crossings.md) |
| Bridge Clearances | Traveler Information | Static | [Details](bridge-clearances.md) |
| Commercial Vehicle Restrictions | Traveler Information | Static | [Details](commercial-vehicle-restrictions.md) |
| Highway Alerts | Traveler Information | Real-time (5 min) | [Details](highway-alerts.md) |
| Highway Cameras | Traveler Information | Real-time (5 min) | [Details](highway-cameras.md) |
| Mountain Pass Conditions | Traveler Information | Real-time (5 min) | [Details](mountain-pass-conditions.md) |
| Toll Rates | Traveler Information | Real-time (5 min) | [Details](toll-rates.md) |
| Traffic Flow | Traveler Information | Real-time (5 min) | [Details](traffic-flow.md) |
| Travel Times | Traveler Information | Real-time (5 min) | [Details](travel-times.md) |
| Weather Information | Traveler Information | Real-time (5 min) | [Details](weather-information.md) |
| Weather Information Extended | Traveler Information | Real-time (5 min) | [Details](weather-information-extended.md) |
| Weather Stations | Traveler Information | Real-time (5 min) | [Details](weather-stations.md) |
| WSF Fares | WSF | Static | [Details](wsf-fares.md) |
| WSF Schedule | WSF | Seasonal | [Details](wsf-schedule.md) |
| WSF Terminals | WSF | Real-time (5 min) | [Details](wsf-terminals.md) |
| WSF Vessels | WSF | Real-time (5 min) | [Details](wsf-vessels.md) |

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Environment Setup](#environment-setup)
- [Response Status Codes](#response-status-codes)
- [Error Handling](#error-handling)
- [JSONP Support](#jsonp-support)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

This comprehensive reference documents all available Washington State Department of Transportation (WSDOT) APIs, including both Traveler Information APIs and Washington State Ferries (WSF) APIs. Each API is documented with real data examples, TypeScript types, and clear usage instructions.

**✅ Implementation Status**: All 16 WSDOT APIs are now fully implemented in the `wsdot-api-client` library, including:
- **12 WSDOT Traveler Information APIs** - Complete with TypeScript types, React hooks, and comprehensive testing
- **4 WSF APIs** - Complete with full functionality and documentation

### API Categories

**WSDOT Traveler Information APIs (12 APIs)**
- Real-time traffic and travel data
- Weather and road condition information
- Highway alerts and camera feeds
- Border crossing and toll information

**WSF APIs (4 APIs)**
- Ferry schedules and vessel information
- Terminal data and fare information
- Real-time ferry status and alerts

## Authentication

All WSDOT APIs require authentication using an access code. The access code is shared between Traveler Information and WSF APIs, but parameter names differ:

### Traveler Information APIs
- **Parameter**: `AccessCode`
- **Example**: `?AccessCode=YOUR_ACCESS_CODE`

### WSF APIs
- **Parameter**: `apiaccesscode`
- **Example**: `?apiaccesscode=YOUR_ACCESS_CODE`

### Access Code Requirements
- Valid access code required for all protected endpoints
- Access codes are provided by WSDOT upon request
- Some endpoints (like cache flush dates) may not require authentication
- Invalid or missing access codes return 401 Unauthorized errors

## Environment Setup

### Setting Up Your Environment

1. **Get an Access Code**: Request access from WSDOT
2. **Set Environment Variable**: 
   ```bash
   export WSDOT_ACCESS_CODE="your-access-code-here"
   ```
3. **Test Your Setup**:
   ```bash
   curl "https://wsdot.wa.gov/traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson?AccessCode=$WSDOT_ACCESS_CODE"
   ```

### Environment Variable Usage

All cURL examples in this documentation use the `$WSDOT_ACCESS_CODE` environment variable:

```bash
# Traveler Information API example
curl "https://wsdot.wa.gov/traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson?AccessCode=$WSDOT_ACCESS_CODE"

# WSF API example
curl "https://wsdot.wa.gov/ferries/api/vessels/rest/vessels?apiaccesscode=$WSDOT_ACCESS_CODE"
```

## Response Status Codes

### Standard HTTP Status Codes

| Code | Description | Meaning |
|------|-------------|---------|
| 200 | OK | Request successful, data returned |
| 400 | Bad Request | Invalid parameters or request format |
| 401 | Unauthorized | Invalid or missing access code |
| 404 | Not Found | Endpoint or resource not found |
| 500 | Internal Server Error | Server error, retry later |

### Common Response Patterns

**Successful Response**
```json
{
  "data": [...],
  "timestamp": "2024-01-10T12:00:00Z"
}
```

**Error Response**
```json
{
  "Message": "Invalid access code provided",
  "ErrorCode": 401
}
```

**Empty Response**
```json
[]
```

## Error Handling

### Common Error Types

1. **Authentication Errors (401)**
   - Invalid access code
   - Missing access code
   - Expired access code

2. **Parameter Errors (400)**
   - Invalid date formats
   - Missing required parameters
   - Invalid terminal/route IDs

3. **Data Errors**
   - No data available for requested parameters
   - Date outside valid range
   - Invalid route combinations

### Error Response Structure

```typescript
type ErrorResponse = {
  Message: string;
  ErrorCode?: number;
  Details?: string;
};
```

### Best Practices for Error Handling

1. **Always check status codes** before processing response data
2. **Implement retry logic** for 500 errors with exponential backoff
3. **Validate parameters** before making API calls
4. **Cache successful responses** to reduce API load
5. **Log errors** for debugging and monitoring

## JSONP Support

### Available JSONP Endpoints

Most WSDOT Traveler Information APIs support JSONP for cross-origin requests:

**Standard JSON Endpoint**
```bash
curl "https://wsdot.wa.gov/traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson?AccessCode=$WSDOT_ACCESS_CODE"
```

**JSONP Endpoint**
```bash
curl "https://wsdot.wa.gov/traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJsonp?AccessCode=$WSDOT_ACCESS_CODE&callback=myCallback"
```

### JSONP Usage

```javascript
// Define callback function
function myCallback(data) {
  console.log('Received data:', data);
}

// Create script tag
const script = document.createElement('script');
script.src = 'https://wsdot.wa.gov/traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJsonp?AccessCode=YOUR_CODE&callback=myCallback';
document.head.appendChild(script);
```

### WSF APIs

WSF APIs do not support JSONP and return JSON data directly.

## Best Practices

### Performance Optimization

1. **Cache Responses**
   - Cache static data (terminals, routes) for 24 hours
   - Cache real-time data for 5-15 minutes
   - Use cache flush dates to determine when to refresh

2. **Rate Limiting**
   - No documented rate limits, but be respectful
   - Recommended: 1 request per 5 minutes for real-time data
   - Batch requests when possible

3. **Error Handling**
   - Implement exponential backoff for retries
   - Handle network timeouts gracefully
   - Provide fallback data when APIs are unavailable

### Data Processing

1. **Date Handling**
   - WSDOT APIs use .NET Date format (`/Date(timestamp)/`)
   - Convert to JavaScript Date objects for processing
   - Validate dates are within valid ranges

2. **Coordinate Systems**
   - All coordinates are in WGS84 (latitude/longitude)
   - Use appropriate mapping libraries for visualization

3. **HTML Content**
   - Some fields contain HTML (alerts, descriptions)
   - Parse HTML content appropriately for display
   - Sanitize HTML to prevent XSS attacks

### Development Workflow

1. **Always check official documentation first**
2. **Test with real API calls before implementation**
3. **Use environment variables for access codes**
4. **Implement comprehensive error handling**
5. **Monitor API availability and performance**



## Troubleshooting

### Common Issues and Solutions

#### Authentication Problems

**Issue**: 401 Unauthorized errors
**Solutions**:
- Verify access code is correct and active
- Check parameter name (`AccessCode` vs `apiaccesscode`)
- Ensure access code is properly URL-encoded

#### Data Availability

**Issue**: Empty responses or no data
**Solutions**:
- Check if date is within valid range
- Verify terminal/route IDs exist
- Check for service disruptions or maintenance

#### Performance Issues

**Issue**: Slow response times
**Solutions**:
- Implement caching for frequently accessed data
- Reduce request frequency
- Use appropriate endpoints (basic vs verbose)

#### Date Format Issues

**Issue**: Invalid date errors
**Solutions**:
- Use YYYY-MM-DD format for dates
- Ensure dates are within active seasons (for WSF APIs)
- Check for timezone considerations

### Getting Help

1. **Check Official Documentation**: Each API has links to official WSDOT documentation
2. **Test with cURL**: Use provided cURL examples to test endpoints
3. **Monitor Status**: Check for service alerts and maintenance notices
4. **Contact WSDOT**: Reach out to WSDOT for API access and support

### Support Resources

- **WSDOT Traveler Information**: [API Documentation](https://wsdot.wa.gov/traffic/api/)
- **WSF APIs**: [Ferry API Documentation](http://www.wsdot.wa.gov/ferries/api/)
- **General Support**: [WSDOT Contact](https://wsdot.wa.gov/contact)

---

*This documentation covers all 16 WSDOT APIs with real data examples, TypeScript types, and comprehensive usage instructions. Each API is documented individually with detailed endpoint information, and this index provides shared information and cross-references.* 