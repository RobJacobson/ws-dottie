# ws-dottie Bruno Collection

This Bruno collection contains API endpoints for Washington State transportation APIs, including WSDOT and WSF (Washington State Ferries) services.

## APIs Included

- WSDOT Border Crossings
- WSDOT Bridge Clearances
- WSDOT Commercial Vehicle Restrictions
- WSDOT Highway Alerts
- WSDOT Highway Cameras
- WSDOT Mountain Pass Conditions
- WSDOT Toll Rates
- WSDOT Traffic Flow
- WSDOT Travel Times
- WSDOT Weather Information
- WSDOT Weather Readings
- WSDOT Weather Stations
- WSF Fares
- WSF Schedule
- WSF Terminals
- WSF Vessels

## Environment

The `ws-dottie-env` environment holds values shared by every request: `WSDOT_ACCESS_TOKEN` and the `*_base_url` hosts.

Path and query samples (`trip_date`, `route_id`, `station_id`, and similar) live on each request as pre-request vars, so one request can use a different date or ID than another. Edit them in that request's Vars tab.