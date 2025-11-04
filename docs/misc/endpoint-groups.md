# API Endpoint Groups Summary

This table summarizes each endpoint group under `src/apis`, consolidating the information from the individual endpoints table.

| API Name | Endpoint Group Name | Refresh Frequency | Source |
|----------|-------------------|------------------|--------|
| wsdot-border-crossings | border-crossing-data | Every 5 minutes | Sample data shows Time field updating every 5 minutes |
| wsdot-bridge-clearances | bridge-clearances | Rarely (infrastructure changes) | Static infrastructure data, APILastUpdate shows infrequent changes |
| wsdot-commercial-vehicle-restrictions | cv-restriction-data | Infrequently (policy changes) | Static policy data with DatePosted fields from years ago |
| wsdot-commercial-vehicle-restrictions | cv-restriction-data-with-id | Infrequently (policy changes) | Static policy data with DatePosted fields from years ago |
| wsdot-highway-alerts | alerts | Event-driven | LastUpdatedTime field shows updates as events occur |
| wsdot-highway-alerts | areas | Rarely (static regions) | Static geographical data |
| wsdot-highway-alerts | event-categories | Rarely (static categories) | Static categorical data |
| wsdot-highway-cameras | cameras | Static locations, dynamic images | Static camera location data, images update frequently |
| wsdot-mountain-pass-conditions | pass-conditions | Daily or as conditions change | DateUpdated field shows periodic updates based on conditions |
| wsdot-toll-rates | toll-rates | Every few minutes | TimeUpdated field shows frequent updates (real-time tolling) |
| wsdot-toll-rates | toll-trip-info | Infrequently (route changes) | Static route information |
| wsdot-toll-rates | toll-trip-rates | Every few minutes | TimeUpdated field shows frequent updates (real-time tolling) |
| wsdot-toll-rates | toll-trip-version | Infrequently (system updates) | Static version information |
| wsdot-traffic-flow | flow-data | Every 2-5 minutes | Time field shows periodic updates with real-time flow data |
| wsdot-travel-times | travel-time-routes | Every 2-5 minutes | TimeUpdated field shows periodic updates with real-time travel times |
| wsdot-weather-information | weather-info | Every 30 minutes | ReadingTime field shows 30-minute intervals |
| wsdot-weather-readings | weather-readings | Every 30 minutes | ReadingTime field shows 30-minute intervals |
| wsdot-weather-readings | surface-measurements | Every 30 minutes | ReadingTime field shows 30-minute intervals |
| wsdot-weather-readings | sub-surface-measurements | Every 30 minutes | ReadingTime field shows 30-minute intervals |
| wsdot-weather-stations | weather-stations | Rarely (infrastructure changes) | Static station location data |
| wsf-fares | cache-flush-date | Daily | Cache flush dates show daily updates |
| wsf-fares | valid-date-range | Infrequently (policy changes) | Static date range information |
| wsf-fares | terminals | Rarely (infrastructure changes) | Static terminal data |
| wsf-fares | terminal-combo | Rarely (route changes) | Static terminal combination data |
| wsf-fares | fare-line-items | Daily or as needed | Dynamic pricing data that changes periodically |
| wsf-fares | fare-totals | Daily or as needed | Dynamic pricing data that changes periodically |
| wsf-schedule | active-seasons | Seasonally | Static season data that changes quarterly/yearly |
| wsf-schedule | schedule-cache-flush-date | Daily | Cache flush dates show daily updates |
| wsf-schedule | route-details | Infrequently (schedule changes) | Static route information that changes periodically |
| wsf-schedule | routes | Infrequently (schedule changes) | Static route information that changes periodically |
| wsf-schedule | sailings | Infrequently (schedule changes) | Static sailing schedules that change periodically |
| wsf-schedule | schedule-alerts | Event-driven | Alerts updated as service disruptions occur |
| wsf-schedule | scheduled-routes | Infrequently (schedule changes) | Static route information that changes periodically |
| wsf-schedule | schedules | Infrequently (schedule changes) | Static schedule information that changes periodically |
| wsf-schedule | schedule-today | Daily | Daily schedule information |
| wsf-schedule | service-disruptions | Event-driven | Updated as service disruptions occur |
| wsf-schedule | schedule-terminal-mates | Infrequently (policy changes) | Static terminal relationship data |
| wsf-schedule | schedule-terminals | Infrequently (infrastructure changes) | Static terminal data |
| wsf-schedule | time-adjustments | Infrequently (policy changes) | Static time adjustment data |
| wsf-schedule | schedule-valid-date-range | Infrequently (policy changes) | Static date range information |
| wsf-terminals | cache-flush-date | Daily | Cache flush dates show daily updates |
| wsf-terminals | terminal-basics | Rarely (infrastructure changes) | Static terminal information |
| wsf-terminals | terminal-bulletins | Event-driven | Updated as bulletins are posted |
| wsf-terminals | terminal-locations | Rarely (infrastructure changes) | Static location data |
| wsf-terminals | terminal-sailing-space | Every few minutes | Real-time sailing space availability |
| wsf-terminals | terminal-transports | Infrequently (schedule changes) | Static transport information |
| wsf-terminals | terminal-verbose | Rarely (infrastructure changes) | Static terminal information |
| wsf-terminals | terminal-wait-times | Every few minutes | Real-time wait time data |
| wsf-vessels | cache-flush-date | Daily | Cache flush dates show daily updates |
| wsf-vessels | vessel-accommodations | Rarely (fleet changes) | Static vessel accommodation data |
| wsf-vessels | vessel-basics | Rarely (fleet changes) | Static vessel information |
| wsf-vessels | vessel-histories | Rarely (historical records) | Static historical data |
| wsf-vessels | vessel-locations | Every few seconds | TimeStamp field shows real-time updates, documentation confirms "every 5 seconds" |
| wsf-vessels | vessel-stats | Rarely (fleet changes) | Static vessel specification data |
| wsf-vessels | vessel-verbose | Rarely (fleet changes) | Static comprehensive vessel data |