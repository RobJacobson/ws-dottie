# Bruno API Client PRD

## Overview

This PRD outlines the implementation of a Bruno API client for the WS-DOTTIE project, providing a user-friendly interface to access 16 Washington State transportation APIs with 90+ endpoints. The Bruno client will allow users to easily test and explore the APIs without writing code.

## Goals

- Create a comprehensive Bruno collection for all 16 WS-DOTTIE APIs
- Provide easy-to-use templates with sample parameters for testing
- Ensure secure handling of API authentication
- Follow the existing project structure and patterns
- Eliminate the need for subfolders by grouping endpoints by resource

## Structure

### Folder Structure

```
bruno/
├── environments/
│   └── ws-dottie-env.bru
├── wsdot-border-crossings/
│   └── border-crossing-data.bru
├── wsdot-bridge-clearances/
│   └── bridge-clearances.bru
├── wsdot-commercial-vehicle-restrictions/
│   └── cv-restriction-data.bru
├── wsdot-highway-alerts/
│   ├── alerts.bru
│   ├── areas.bru
│   └── event-categories.bru
├── wsdot-highway-cameras/
│   └── cameras.bru
├── wsdot-mountain-pass-conditions/
│   └── pass-conditions.bru
├── wsdot-toll-rates/
│   ├── toll-rates.bru
│   ├── toll-trip-info.bru
│   ├── toll-trip-rates.bru
│   └── toll-trip-version.bru
├── wsdot-traffic-flow/
│   └── traffic-flow.bru
├── wsdot-travel-times/
│   └── travel-time-routes.bru
├── wsdot-weather-information/
│   └── weather-info.bru
├── wsdot-weather-readings/
│   ├── sub-surface-measurements.bru
│   ├── surface-measurements.bru
│   └── weather-readings.bru
├── wsdot-weather-stations/
│   └── weather-stations.bru
├── wsf-fares/
│   ├── cache-flush-date.bru
│   ├── fare-line-items.bru
│   ├── fare-totals.bru
│   ├── terminal-combo.bru
│   ├── terminals.bru
│   └── valid-date-range.bru
├── wsf-schedule/
│   ├── route-details.bru
│   ├── routes.bru
│   └── service-disruptions.bru
├── wsf-terminals/
│   ├── terminal-basics.bru
│   ├── terminal-locations.bru
│   ├── terminal-sailing-space.bru
│   ├── terminal-wait-times.bru
│   ├── terminal-bulletins.bru
│   ├── terminal-transports.bru
│   └── terminal-verbose.bru
└── wsf-vessels/
    ├── cache-flush-date.bru
    ├── vessel-accommodations.bru
    ├── vessel-basics.bru
    ├── vessel-histories.bru
    ├── vessel-locations.bru
    ├── vessel-stats.bru
    └── vessel-verbose.bru
```

### Environment Variables

#### ws-dottie-env.bru

```env
# Base URLs for each API
wsdot_border_crossings_base_url=https://wsdot.wa.gov/Traffic/api/BorderCrossings/BorderCrossingsREST.svc
wsdot_bridge_clearances_base_url=https://www.wsdot.wa.gov/traffic/api/bridges/clearancerest.svc
wsdot_commercial_vehicle_restrictions_base_url=https://www.wsdot.wa.gov/traffic/api/cvrestrictions/cvrestrictionsrest.svc
wsdot_highway_alerts_base_url=https://www.wsdot.wa.gov/traffic/api/highwayalerts/highwayalertsrest.svc
wsdot_highway_cameras_base_url=https://www.wsdot.wa.gov/traffic/api/highwaycameras/highwaycamerasrest.svc
wsdot_mountain_pass_conditions_base_url=https://www.wsdot.wa.gov/traffic/api/mountainpassconditions/mountainpassconditionsrest.svc
wsdot_toll_rates_base_url=https://www.wsdot.wa.gov/traffic/api/tollrates/tollratesrest.svc
wsdot_traffic_flow_base_url=https://www.wsdot.wa.gov/traffic/api/trafficflow/trafficflowrest.svc
wsdot_travel_times_base_url=https://www.wsdot.wa.gov/traffic/api/traveltimes/traveltimesrest.svc
wsdot_weather_information_base_url=https://www.wsdot.wa.gov/traffic/api/weatherinformation/weatherinformationrest.svc
wsdot_weather_readings_base_url=https://www.wsdot.wa.gov/traffic/api/weatherreadings/weatherreadingsrest.svc
wsdot_weather_stations_base_url=https://www.wsdot.wa.gov/traffic/api/weatherstations/weatherstationsrest.svc
wsf_fares_base_url=https://www.wsdot.wa.gov/ferries/api/fares/rest
wsf_schedule_base_url=https://www.wsdot.wa.gov/ferries/api/schedule/rest
wsf_terminals_base_url=https://www.wsdot.wa.gov/ferries/api/terminals/rest
wsf_vessels_base_url=https://www.wsdot.wa.gov/ferries/api/vessels/rest

# Common parameters with template values
access_code={{access_code}}
departing_terminal_id=7
arriving_terminal_id=3
vessel_id=18
terminal_id=1
route=005
trip_date=2025-01-01
alert_id=468632
region_id=9
map_area=Seattle
state_route=405
pass_condition_id=12
starting_milepost=10
ending_milepost=20
search_time_start=2025-01-01
search_time_end=2025-01-31
sched_route_id=2327
date_start=2025-01-01
date_end=2025-01-31
vessel_name=Cathlamet
flow_data_id=2482
travel_time_id=1
station_id=1909
camera_id=9818

# Authentication
api_access_token=$WSDOT_ACCESS_TOKEN
```

## Implementation Details

### 1. Scaffolding the folder structure

Create the main `bruno/` directory with subdirectories for each of the 16 APIs. Each API directory will contain `.bru` files for each resource group.

### 2. Creating resource-based `.bru` files

Each `.bru` file will contain all endpoints for a specific resource, organized as separate requests within the file.

### 3. Example: wsdot-highway-alerts/alerts.bru

```bru
http {
  method: GET
  url: "{{wsdot_highway_alerts_base_url}}/getAlertsAsJson"
  auth {
    type: query
    params {
      AccessCode: "{{api_access_token}}"
    }
  }
}

description: "Returns all current highway alerts."

---

http {
  method: GET
  url: "{{wsdot_highway_alerts_base_url}}/getAlertAsJson"
  auth {
    type: query
    params {
      AccessCode: "{{api_access_token}}"
      AlertID: "{{alert_id}}"
    }
  }
}

description: "Returns a specific highway alert by its unique identifier."

---

http {
  method: GET
  url: "{{wsdot_highway_alerts_base_url}}/getAlertsByRegionIDAsJson"
  auth {
    type: query
    params {
      AccessCode: "{{api_access_token}}"
      RegionID: "{{region_id}}"
    }
  }
}

description: "Returns all highway alerts for a specific WSDOT region."

---

http {
  method: GET
  url: "{{wsdot_highway_alerts_base_url}}/getAlertsByMapAreaAsJson"
  auth {
    type: query
    params {
      AccessCode: "{{api_access_token}}"
      MapArea: "{{map_area}}"
    }
  }
}

description: "Returns highway alerts for a specific map area."

---

http {
  method: GET
  url: "{{wsdot_highway_alerts_base_url}}/searchAlertsAsJson"
  auth {
    type: query
    params {
      AccessCode: "{{api_access_token}}"
      StateRoute: "{{state_route}}"
      StartingMilepost: "{{starting_milepost}}"
      EndingMilepost: "{{ending_milepost}}"
      SearchTimeStart: "{{search_time_start}}"
      SearchTimeEnd: "{{search_time_end}}"
    }
  }
}

description: "Search for highway alerts using multiple criteria."
```

### 4. Example: wsdot-bridge-clearances/bridge-clearances.bru

```bru
http {
  method: GET
  url: "{{wsdot_bridge_clearances_base_url}}/getClearancesAsJson"
  auth {
    type: query
    params {
      AccessCode: "{{api_access_token}}"
    }
  }
}

description: "Returns bridge clearance data for all bridges."

---

http {
  method: GET
  url: "{{wsdot_bridge_clearances_base_url}}/getClearancesAsJson"
  auth {
    type: query
    params {
      AccessCode: "{{api_access_token}}"
      Route: "{{route}}"
    }
  }
}

description: "Returns bridge clearance data filtered by state route."
```

### 5. Example: wsf-vessels/vessel-locations.bru

```bru
http {
  method: GET
  url: "{{wsf_vessels_base_url}}/vesselLocations"
  auth {
    type: query
    params {
      api_access_code: "{{api_access_token}}"
    }
  }
}

description: "Returns a list of VesselLocation data for all vesselLocations."

---

http {
  method: GET
  url: "{{wsf_vessels_base_url}}/vesselLocations/{{vessel_id}}"
  auth {
    type: query
    params {
      api_access_code: "{{api_access_token}}"
    }
  }
}

description: "Returns VesselLocation data for the vessellocation with the given identifier."
```

## Security Considerations

1. API keys will be stored as environment variables and referenced using the `$WSDOT_ACCESS_TOKEN` pattern
2. No actual API keys will be stored in the Bruno files
3. Users will need to set up their own environment with their personal API key
4. The template will include placeholder values that users can customize

## Authentication

All API requests will use query parameter authentication as required by the WSDOT/WSF APIs:
- Parameter name: `AccessCode` or `api_access_code` (depending on the specific API)
- Value: `{{api_access_token}}` which references the environment variable

## Sample Parameters

All endpoints will include appropriate sample parameters using consistent template values:
- Numeric IDs: 7, 18, 2482, etc.
- Text values: "005", "Seattle", "405", etc.
- Date values: "2025-01-01", "2025-01-31", etc.

## Implementation Tasks

The implementation will follow this structured to-do list to ensure systematic completion:

1. Analyze the WS-DOTTIE project structure
2. Understand how the APIs are organized
3. Create a comprehensive PRD for the Bruno API client
4. Decompose the PRD into concrete individual tasks
5. Create the main bruno directory structure
6. Create the environments directory and template file
7. Create individual API directories
8. Create resource-based .bru files for wsdot-border-crossings
9. Create resource-based .bru files for wsdot-bridge-clearances
10. Create resource-based .bru files for wsdot-commercial-vehicle-restrictions
11. Create resource-based .bru files for wsdot-highway-alerts
12. Create resource-based .bru files for wsdot-highway-cameras
13. Create resource-based .bru files for wsdot-mountain-pass-conditions
14. Create resource-based .bru files for wsdot-toll-rates
15. Create resource-based .bru files for wsdot-traffic-flow
16. Create resource-based .bru files for wsdot-travel-times
17. Create resource-based .bru files for wsdot-weather-information
18. Create resource-based .bru files for wsdot-weather-readings
19. Create resource-based .bru files for wsdot-weather-stations
20. Create resource-based .bru files for wsf-fares
21. Create resource-based .bru files for wsf-schedule
22. Create resource-based .bru files for wsf-terminals
23. Create resource-based .bru files for wsf-vessels
24. Test sample endpoints to ensure they work correctly
25. Document the completed Bruno API client structure

## Benefits

- Users can easily explore and test all WS-DOTTIE APIs
- No need to write code to test API endpoints
- Consistent parameter templates make testing easier
- Secure handling of API keys
- Organized by resource rather than by individual endpoint