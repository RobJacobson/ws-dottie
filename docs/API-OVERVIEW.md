# WS-Dottie API Overview

> **Your comprehensive guide to Washington State transportation data**

WS-Dottie provides easy access to real-time transportation data from Washington State Department of Transportation (WSDOT) and Washington State Ferries (WSF) APIs. This overview helps you quickly identify which APIs meet your needs and understand their capabilities.

## Quick Start

```typescript
import { WsdotHighwayAlerts, WsfVessels } from 'ws-dottie';
import { config } from 'ws-dottie/shared/config';

// Set your WSDOT API key (can also be set in .env file)
config.setApiKey('your-wsdot-access-code');

// Get real-time highway alerts
const alerts = await WsdotHighwayAlerts.getHighwayAlerts();

// Get live vessel locations
const vessels = await WsfVessels.getVesselLocations();
```

## API Summary Table

| API | Category | Real-time | Update Frequency | Key Use Cases | Endpoints |
|-----|----------|-----------|------------------|---------------|-----------|
| **WSDOT Border Crossings** | Traffic | ✅ | 5-15 min | Travel planning, border apps | 2 |
| **WSDOT Highway Alerts** | Traffic | ✅ | Real-time | Navigation, traffic apps | 3 |
| **WSDOT Traffic Flow** | Traffic | ✅ | Real-time | Traffic monitoring, routing | 2 |
| **WSDOT Travel Times** | Traffic | ✅ | 15-30 min | Route planning, ETA | 2 |
| **WSDOT Highway Cameras** | Traffic | ✅ | Static | Visual traffic monitoring | 3 |
| **WSDOT Toll Rates** | Traffic | ✅ | Real-time | Toll planning, pricing | 3 |
| **WSDOT Weather Information** | Weather | ✅ | 15 min | Weather apps, conditions | 3 |
| **WSDOT Weather Extended** | Weather | ✅ | 15 min | Detailed weather data | 1 |
| **WSDOT Weather Stations** | Weather | ✅ | Static | Station locations | 1 |
| **WSDOT Mountain Passes** | Weather | ✅ | 15-30 min | Pass conditions, restrictions | 2 |
| **WSDOT Bridge Clearances** | Infrastructure | ✅ | Daily | Height restrictions | 1 |
| **WSDOT Commercial Vehicle** | Infrastructure | ✅ | Weekly | Weight limits, restrictions | 2 |
| **WSF Vessels** | Ferries | ✅ | 5 sec | Ferry tracking, maritime apps | 13 |
| **WSF Terminals** | Ferries | ✅ | 5 min | Terminal status, wait times | 11 |
| **WSF Schedule** | Ferries | ✅ | Daily | Sailing schedules, routes | 25+ |
| **WSF Fares** | Ferries | ✅ | Static | Pricing, fare information | 8 |

## Use Case Mapping

### 🚗 **Traffic & Navigation**
- **Highway Alerts** - Real-time incidents, construction, and closures
- **Traffic Flow** - Current speeds, congestion, and flow data
- **Travel Times** - Route planning, ETA calculations, and delays
- **Highway Cameras** - Visual traffic monitoring and conditions
- **Toll Rates** - Current toll pricing and trip planning
- **Border Crossings** - Wait times and border conditions

### 🚢 **Ferry & Maritime**
- **WSF Vessels** - Real-time vessel tracking and positions
- **WSF Terminals** - Terminal status, wait times, and space availability
- **WSF Schedule** - Sailing schedules, routes, and service information
- **WSF Fares** - Pricing, fare calculations, and terminal combinations

### 🌤️ **Weather & Conditions**
- **Weather Information** - Current weather data from monitoring stations
- **Weather Extended** - Detailed weather with surface/subsurface measurements
- **Weather Stations** - Station locations and metadata
- **Mountain Pass Conditions** - Pass status, restrictions, and road conditions

### 🚛 **Infrastructure & Commercial**
- **Bridge Clearances** - Height restrictions and clearance data
- **Commercial Vehicle Restrictions** - Weight limits, bridge restrictions, and regulations

## Data Update Frequencies

| Frequency | APIs | Use Cases |
|-----------|------|-----------|
| **Real-time (5-15 sec)** | WSF Vessels | Live tracking, real-time apps |
| **Frequent (1-5 min)** | Highway Alerts, Traffic Flow, WSF Terminals | Navigation, traffic apps |
| **Regular (15-60 min)** | Weather, Travel Times, Mountain Passes | Planning, monitoring |
| **Daily** | Vessel Basics, Terminals, Schedule | Reference data, configuration |
| **Weekly** | Vessel Specs, Restrictions, Bridge Clearances | Static data, documentation |

## API Endpoint Details

### WSDOT Border Crossings API
| Endpoint | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `GetBorderCrossingsAsJson` | Get all border crossing wait times | `AccessCode` | `BorderCrossingData[]` |
| `GetBorderCrossingAsJson` | Get specific border crossing by ID | `AccessCode`, `BorderCrossingID` | `BorderCrossingData` |

### WSDOT Highway Alerts API
| Endpoint | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `GetAlertsAsJson` | Get all highway alerts | `AccessCode` | `HighwayAlert[]` |
| `GetAlertAsJson` | Get specific alert by ID | `AccessCode`, `AlertID` | `HighwayAlert` |
| `GetAlertsByMapAreaAsJson` | Get alerts filtered by map area | `AccessCode`, `MapArea` | `HighwayAlert[]` |

### WSDOT Traffic Flow API
| Endpoint | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `GetTrafficFlowsAsJson` | Get all traffic flow data | `AccessCode` | `TrafficFlow[]` |
| `GetTrafficFlowAsJson` | Get specific traffic flow by ID | `AccessCode`, `FlowDataID` | `TrafficFlow` |

### WSDOT Travel Times API
| Endpoint | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `GetTravelTimesAsJson` | Get all travel times | `AccessCode` | `TravelTimeRoute[]` |
| `GetTravelTimeAsJson` | Get specific travel time by ID | `AccessCode`, `TravelTimeID` | `TravelTimeRoute` |

### WSDOT Highway Cameras API
| Endpoint | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `GetCamerasAsJson` | Get all highway cameras | `AccessCode` | `Camera[]` |
| `GetCameraAsJson` | Get specific camera by ID | `AccessCode`, `CameraID` | `Camera` |
| `SearchCamerasAsJson` | Search cameras with filters | `AccessCode`, `StateRoute`, `Region`, etc. | `Camera[]` |

### WSDOT Toll Rates API
| Endpoint | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `GetTollRatesAsJson` | Get all current toll rates | `AccessCode` | `TollRate[]` |
| `GetTollTripInfoAsJson` | Get toll trip information with geometry | `AccessCode` | `TollTripInfo[]` |
| `GetTollTripRatesAsJson` | Get toll trip rates with messages | `AccessCode` | `TollTripRates` |

### WSDOT Weather Information API
| Endpoint | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `GetCurrentWeatherInformationAsJson` | Get all weather information | `AccessCode` | `WeatherInfo[]` |
| `GetCurrentWeatherInformationByStationIDAsJson` | Get weather for specific station | `AccessCode`, `StationID` | `WeatherInfo` |
| `GetCurrentWeatherForStationsAsJson` | Get weather for multiple stations | `AccessCode`, `StationList` | `WeatherInfo[]` |

### WSDOT Weather Information Extended API
| Endpoint | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `[Root endpoint]` | Get extended weather with surface/subsurface data | `AccessCode` | `WeatherReading[]` |

### WSDOT Weather Stations API
| Endpoint | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `GetCurrentStationsAsJson` | Get all weather stations | `AccessCode` | `WeatherStationData[]` |

### WSDOT Mountain Pass Conditions API
| Endpoint | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `GetMountainPassConditionsAsJson` | Get all mountain pass conditions | `AccessCode` | `MountainPassCondition[]` |
| `GetMountainPassConditionAsJson` | Get specific pass condition by ID | `AccessCode`, `PassConditionID` | `MountainPassCondition` |

### WSDOT Bridge Clearances API
| Endpoint | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `GetClearancesAsJson` | Get bridge clearances for route | `AccessCode`, `Route` | `BridgeDataGIS[]` |

### WSDOT Commercial Vehicle Restrictions API
| Endpoint | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `GetCommercialVehicleRestrictionsAsJson` | Get all commercial vehicle restrictions | `AccessCode` | `CommercialVehicleRestriction[]` |
| `GetCommercialVehicleRestrictionsWithIdAsJson` | Get restrictions with unique IDs | `AccessCode` | `CommercialVehicleRestrictionWithId[]` |

### WSF Vessels API
| Endpoint | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `/vesselbasics` | Get all vessel basics | None | `VesselBasic[]` |
| `/vesselbasics/{VesselID}` | Get specific vessel basics | `vesselId` | `VesselBasic` |
| `/vessellocations` | Get all vessel locations | None | `VesselLocation[]` |
| `/vessellocations/{VesselID}` | Get specific vessel location | `vesselId` | `VesselLocation` |
| `/vesselverbose` | Get all vessel verbose data | None | `VesselVerbose[]` |
| `/vesselverbose/{VesselID}` | Get specific vessel verbose | `vesselId` | `VesselVerbose` |
| `/vesselaccommodations` | Get all vessel accommodations | None | `VesselAccommodation[]` |
| `/vesselaccommodations/{VesselID}` | Get specific vessel accommodations | `vesselId` | `VesselAccommodation` |
| `/vesselstats` | Get all vessel statistics | None | `VesselStats[]` |
| `/vesselstats/{VesselID}` | Get specific vessel statistics | `vesselId` | `VesselStats` |
| `/vesselhistory` | Get all vessel history | None | `VesselHistory[]` |
| `/vesselhistory/{VesselName}/{StartDate}/{EndDate}` | Get vessel history by name and date range | `vesselName`, `dateStart`, `dateEnd` | `VesselHistory[]` |
| `/cacheflushdate` | Get cache flush date | None | `VesselsCacheFlushDate` |

### WSF Terminals API
| Endpoint | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `/terminalbasics` | Get all terminal basics | None | `TerminalBasics[]` |
| `/terminalbasics/{TerminalID}` | Get specific terminal basics | `terminalId` | `TerminalBasics` |
| `/terminallocations` | Get all terminal locations | None | `TerminalLocation[]` |
| `/terminallocations/{TerminalID}` | Get specific terminal location | `terminalId` | `TerminalLocation` |
| `/terminalsailingspace` | Get all terminal sailing space | None | `TerminalSailingSpace[]` |
| `/terminalsailingspace/{TerminalID}` | Get specific terminal sailing space | `terminalId` | `TerminalSailingSpace` |
| `/terminalwaittimes` | Get all terminal wait times | None | `TerminalWaitTimes[]` |
| `/terminalwaittimes/{TerminalID}` | Get specific terminal wait times | `terminalId` | `TerminalWaitTimes` |
| `/terminalverbose` | Get all terminal verbose data | None | `TerminalVerbose[]` |
| `/terminalverbose/{TerminalID}` | Get specific terminal verbose | `terminalId` | `TerminalVerbose` |
| `/cacheflushdate` | Get cache flush date | None | `TerminalsCacheFlushDate` |

### WSF Schedule API
| Endpoint | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `/cacheflushdate` | Get cache flush date | None | `Date` |
| `/validdaterange` | Get valid date range | None | `ValidDateRange` |
| `/terminals/{tripDate}` | Get terminals for date | `tripDate` | `ScheduleTerminal[]` |
| `/terminalsandmates/{tripDate}` | Get terminal combinations | `tripDate` | `ScheduleTerminalCombo[]` |
| `/terminalsandmatesbyroute/{tripDate}/{routeId}` | Get terminal combinations by route | `tripDate`, `routeId` | `ScheduleTerminalCombo[]` |
| `/terminalmates/{tripDate}/{terminalId}` | Get terminal mates | `tripDate`, `terminalId` | `ScheduleTerminal[]` |
| `/routes/{tripDate}` | Get routes for date | `tripDate` | `Route[]` |
| `/routes/{tripDate}/{departingTerminalId}/{arrivingTerminalId}` | Get routes between terminals | `tripDate`, `departingTerminalId`, `arrivingTerminalId` | `Route[]` |
| `/routeshavingservicedisruptions/{tripDate}` | Get routes with disruptions | `tripDate` | `Route[]` |
| `/routedetails/{tripDate}` | Get detailed route information | `tripDate` | `Route[]` |
| `/routedetails/{tripDate}/{departingTerminalId}/{arrivingTerminalId}` | Get detailed routes between terminals | `tripDate`, `departingTerminalId`, `arrivingTerminalId` | `Route[]` |
| `/routedetails/{tripDate}/{routeId}` | Get detailed route by ID | `tripDate`, `routeId` | `RouteDetails` |
| `/activeseasons` | Get active seasons | None | `ActiveSeason[]` |
| `/scheduledroutes` | Get scheduled routes | None | `ScheduledRoute[]` |
| `/scheduledroutes/{scheduleId}` | Get scheduled routes by season | `scheduleId` | `ScheduledRoute[]` |
| `/sailings/{schedRouteId}` | Get sailings for route | `schedRouteId` | `Sailing[]` |
| `/allsailings/{schedRouteId}` | Get all sailings for route | `schedRouteId` | `Sailing[]` |
| `/schedules/{tripDate}/{routeId}` | Get schedules for route | `tripDate`, `routeId` | `ScheduleResponse` |
| `/schedules/{tripDate}/{departingTerminalId}/{arrivingTerminalId}` | Get schedules between terminals | `tripDate`, `departingTerminalId`, `arrivingTerminalId` | `ScheduleResponse` |
| `/scheduletoday/{routeId}/{onlyRemainingTimes}` | Get today's schedule for route | `routeId`, `onlyRemainingTimes` | `ScheduleResponse` |
| `/scheduletoday/{departingTerminalId}/{arrivingTerminalId}/{onlyRemainingTimes}` | Get today's schedule between terminals | `departingTerminalId`, `arrivingTerminalId`, `onlyRemainingTimes` | `ScheduleResponse` |
| `/timeadjustments` | Get all time adjustments | None | `TimeAdjustment[]` |
| `/timeadjustments/{routeId}` | Get time adjustments for route | `routeId` | `TimeAdjustment[]` |
| `/timeadjustments/{schedRouteId}` | Get time adjustments for scheduled route | `schedRouteId` | `TimeAdjustment[]` |
| `/alerts` | Get service alerts | None | `Alert[]` |
| `/alternativeformats/{subjectName}` | Get alternative formats | `subjectName` | `AlternativeFormat` |

### WSF Fares API
| Endpoint | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `/cacheflushdate` | Get cache flush date | None | `Date` |
| `/validdaterange` | Get valid date range | None | `ValidDateRange` |
| `/terminals/{tripDate}` | Get terminals for date | `tripDate` | `FareTerminal[]` |
| `/terminalmates/{tripDate}/{terminalId}` | Get terminal mates | `tripDate`, `terminalId` | `FareTerminal[]` |
| `/terminalcombos/{tripDate}` | Get terminal combinations | `tripDate` | `TerminalCombo[]` |
| `/terminalcombosverbose/{tripDate}` | Get verbose terminal combinations | `tripDate` | `TerminalComboVerbose[]` |
| `/farelineitemsbasic/{tripDate}` | Get basic fare line items | `tripDate` | `FareLineItemBasic[]` |
| `/farelineitems/{tripDate}` | Get fare line items | `tripDate` | `FareLineItem[]` |
| `/farelineitemsverbose/{tripDate}` | Get verbose fare line items | `tripDate` | `FareLineItemVerbose[]` |

## Getting Started Examples

### Basic Traffic App
```typescript
import { WsdotHighwayAlerts, WsdotTrafficFlow } from 'ws-dottie';

// Get real-time traffic information
const alerts = await WsdotHighwayAlerts.getHighwayAlerts();
const flows = await WsdotTrafficFlow.getTrafficFlows();

console.log(`Found ${alerts.length} active alerts`);
console.log(`Monitoring ${flows.length} traffic flow points`);
```

### Ferry Tracking App
```typescript
import { WsfVessels, WsfTerminals } from 'ws-dottie';

// Get real-time ferry information
const vessels = await WsfVessels.getVesselLocations();
const terminals = await WsfTerminals.getTerminalWaitTimes();

console.log(`Tracking ${vessels.length} vessels`);
console.log(`Monitoring ${terminals.length} terminals`);
```

### Weather Monitoring App
```typescript
import { WsdotWeatherInformation, WsdotMountainPassConditions } from 'ws-dottie';

// Get weather and pass conditions
const weather = await WsdotWeatherInformation.getWeatherInformation();
const passes = await WsdotMountainPassConditions.getMountainPassConditions();

console.log(`Monitoring ${weather.length} weather stations`);
console.log(`Tracking ${passes.length} mountain passes`);
```

## Performance Considerations

### Caching Strategies
- **Real-time APIs** (5-15 second updates): Use `REALTIME_UPDATES`
- **Frequent APIs** (1-5 minute updates): Use `MINUTE_UPDATES`
- **Regular APIs** (15-60 minute updates): Use `HOURLY_UPDATES`
- **Static APIs** (daily/weekly updates): Use `DAILY_UPDATES` or `WEEKLY_UPDATES`

### Bundle Size Optimization
```typescript
// Import only what you need
import { WsdotHighwayAlerts } from 'ws-dottie/wsdot-highway-alerts';
import { WsfVessels } from 'ws-dottie/wsf-vessels';

// Instead of importing everything
// import * as WSdot from 'ws-dottie';
```

## Next Steps

- **For detailed API reference**: See individual API documents in the `docs/apis/` directory
- **For advanced patterns**: See [API Reference](API-REFERENCE.md)
- **For examples**: See [Examples](EXAMPLES.md)
- **For setup**: See [Getting Started](GETTING-STARTED.md)

## Support

- **Documentation**: [GitHub Repository](https://github.com/your-repo/ws-dottie)
- **Issues**: [GitHub Issues](https://github.com/your-repo/ws-dottie/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/ws-dottie/discussions) 