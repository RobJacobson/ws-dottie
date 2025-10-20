# WS-DOTTIE Bruno API Client

This Bruno collection provides a comprehensive set of API requests for accessing Washington State Department of Transportation (WSDOT) and Washington State Ferries (WSF) APIs. The collection is organized by API service with resource-based grouping for easy navigation and testing.

## Overview

The WS-DOTTIE Bruno API Client includes requests for 16 different transportation APIs with over 90 endpoints. Each API directory contains `.bru` files organized by resource, making it easy to test specific functionality.

## Authentication

Most WSDOT and WSF APIs require an access code for authentication. To use these requests:

1. Obtain an API access token from WSDOT/WSF
2. Set the `api_access_token` environment variable in Bruno
3. The token will be automatically included in requests that require authentication

## Environment Variables

The collection uses environment variables for base URLs and common parameters:

- `{{api_access_token}}` - Your WSDOT/WSF API access token
- `{{wsdot_*_base_url}}` - Base URLs for WSDOT APIs
- `{{wsf_*_base_url}}` - Base URLs for WSF APIs
- Various parameter templates (e.g., `{{terminal_id}}`, `{{vessel_id}}`, etc.)

## API Directories

The collection is organized into the following directories:

### WSDOT APIs
- `wsdot-border-crossings` - Border crossing wait times
- `wsdot-bridge-clearances` - Bridge vertical clearances
- `wsdot-commercial-vehicle-restrictions` - Commercial vehicle restrictions
- `wsdot-highway-alerts` - Highway alerts and conditions
- `wsdot-highway-cameras` - Traffic camera images and information
- `wsdot-mountain-pass-conditions` - Mountain pass conditions
- `wsdot-toll-rates` - Toll rates and trip information
- `wsdot-traffic-flow` - Traffic flow data from sensors
- `wsdot-travel-times` - Travel times for routes
- `wsdot-weather-information` - Weather information from stations
- `wsdot-weather-readings` - Detailed weather sensor data
- `wsdot-weather-stations` - Weather station locations

### WSF APIs
- `wsf-fares` - Ferry fare information
- `wsf-schedule` - Ferry schedules and routes
- `wsf-terminals` - Terminal information and conditions
- `wsf-vessels` - Vessel information and tracking

## Usage

1. Install [Bruno](https://www.usebruno.com/)
2. Clone or download this collection
3. Open the collection in Bruno
4. Create a new environment or edit the existing one
5. Set your `api_access_token` environment variable
6. Browse the requests and execute them as needed

## Contributing

This collection is maintained as part of the WS-DOTTIE project. For issues or contributions, please refer to the main project repository.

## License

This collection is provided under the MIT License. See LICENSE file for details.