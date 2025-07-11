# WSDOT API Client Library Extraction Plan

## Overview

This plan outlines the extraction of the Washington State Department of Transportation (WSDOT) API code from `ferryjoy-client-new` into a standalone, reusable library called `wsdot-api-client`. The library will follow WSDOT's exact API structure and provide comprehensive coverage of all Traveler Information APIs.

## Library Structure (Following WSDOT API Organization)

### Repository: `wsdot-api-client`

```
wsdot-api-client/
├── src/
│   ├── api/
│   │   ├── borderCrossings/
│   │   │   ├── api.ts
│   │   │   ├── converter.ts
│   │   │   ├── hook.ts
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   ├── bridgeClearances/
│   │   │   ├── api.ts
│   │   │   ├── converter.ts
│   │   │   ├── hook.ts
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   ├── commercialVehicleRestrictions/
│   │   │   ├── api.ts
│   │   │   ├── converter.ts
│   │   │   ├── hook.ts
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   ├── highwayAlerts/
│   │   │   ├── api.ts
│   │   │   ├── converter.ts
│   │   │   ├── hook.ts
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   ├── highwayCameras/
│   │   │   ├── api.ts
│   │   │   ├── converter.ts
│   │   │   ├── hook.ts
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   ├── mountainPassConditions/
│   │   │   ├── api.ts
│   │   │   ├── converter.ts
│   │   │   ├── hook.ts
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   ├── tollRates/
│   │   │   ├── api.ts
│   │   │   ├── converter.ts
│   │   │   ├── hook.ts
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   ├── trafficFlow/
│   │   │   ├── api.ts
│   │   │   ├── converter.ts
│   │   │   ├── hook.ts
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   ├── travelTimes/
│   │   │   ├── api.ts
│   │   │   ├── converter.ts
│   │   │   ├── hook.ts
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   ├── weatherInformation/
│   │   │   ├── api.ts
│   │   │   ├── converter.ts
│   │   │   ├── hook.ts
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   ├── weatherStations/
│   │   │   ├── api.ts
│   │   │   ├── converter.ts
│   │   │   ├── hook.ts
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   ├── weatherInformationExtended/
│   │   │   ├── api.ts
│   │   │   ├── converter.ts
│   │   │   ├── hook.ts
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   ├── wsf/
│   │   │   ├── fares/
│   │   │   │   ├── api.ts
│   │   │   │   ├── converter.ts
│   │   │   │   ├── hook.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── types.ts
│   │   │   ├── schedule/
│   │   │   │   ├── api.ts
│   │   │   │   ├── converter.ts
│   │   │   │   ├── hook.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── types.ts
│   │   │   ├── terminals/
│   │   │   │   ├── api.ts
│   │   │   │   ├── converter.ts
│   │   │   │   ├── hook.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── types.ts
│   │   │   └── vessels/
│   │   │       ├── api.ts
│   │   │       ├── converter.ts
│   │   │       ├── hook.ts
│   │   │       ├── index.ts
│   │   │       └── types.ts
│   │   └── index.ts
│   ├── shared/
│   │   ├── caching/
│   │   │   ├── CacheProvider.tsx
│   │   │   ├── config.ts
│   │   │   ├── invalidation.ts
│   │   │   └── persistence.ts
│   │   ├── fetching/
│   │   │   ├── config.ts
│   │   │   ├── dateUtils.ts
│   │   │   ├── fetch.ts
│   │   │   ├── fetchInternal.ts
│   │   │   └── utils.ts
│   │   └── index.ts
│   ├── types/
│   │   ├── borderCrossings.ts
│   │   ├── bridgeClearances.ts
│   │   ├── commercialVehicleRestrictions.ts
│   │   ├── highwayAlerts.ts
│   │   ├── highwayCameras.ts
│   │   ├── mountainPassConditions.ts
│   │   ├── tollRates.ts
│   │   ├── trafficFlow.ts
│   │   ├── travelTimes.ts
│   │   ├── weatherInformation.ts
│   │   ├── weatherStations.ts
│   │   ├── weatherInformationExtended.ts
│   │   ├── wsf.ts
│   │   └── index.ts
│   ├── hooks/
│   │   ├── index.ts
│   │   └── useWsdClient.ts
│   └── index.ts
├── tests/
│   ├── unit/
│   │   ├── api/
│   │   │   ├── borderCrossings/
│   │   │   ├── bridgeClearances/
│   │   │   ├── commercialVehicleRestrictions/
│   │   │   ├── highwayAlerts/
│   │   │   ├── highwayCameras/
│   │   │   ├── mountainPassConditions/
│   │   │   ├── tollRates/
│   │   │   ├── trafficFlow/
│   │   │   ├── travelTimes/
│   │   │   ├── weatherInformation/
│   │   │   ├── weatherStations/
│   │   │   ├── weatherInformationExtended/
│   │   │   └── wsf/
│   │   ├── converters/
│   │   ├── utils/
│   │   └── hooks/
│   ├── integration/
│   │   ├── borderCrossings/
│   │   ├── bridgeClearances/
│   │   ├── commercialVehicleRestrictions/
│   │   ├── highwayAlerts/
│   │   ├── highwayCameras/
│   │   ├── mountainPassConditions/
│   │   ├── tollRates/
│   │   ├── trafficFlow/
│   │   ├── travelTimes/
│   │   ├── weatherInformation/
│   │   ├── weatherStations/
│   │   ├── weatherInformationExtended/
│   │   └── wsf/
│   └── setup.ts
├── examples/
│   ├── react-native/
│   ├── react-web/
│   └── vanilla-js/
├── docs/
│   ├── API.md
│   ├── HOOKS.md
│   ├── TYPES.md
│   ├── EXAMPLES.md
│   └── MIGRATION.md
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── vitest.integration.config.ts
├── README.md
├── CHANGELOG.md
└── LICENSE
```

## API Endpoints Mapping

### **WSDOT Traveler Information APIs** (Following Official Structure)

| API Category | Folder Name | REST Endpoint | Priority | Update Frequency |
|-------------|-------------|---------------|----------|------------------|
| Border Crossings | `borderCrossings` | `/BorderCrossings/BorderCrossingsREST.svc` | Medium | Real-time |
| Bridge Clearances | `bridgeClearances` | `/Bridges/ClearanceREST.svc` | Low | Static |
| Commercial Vehicle Restrictions | `commercialVehicleRestrictions` | `/CVRestrictions/CVRestrictionsREST.svc` | Low | Static |
| Highway Alerts | `highwayAlerts` | `/HighwayAlerts/HighwayAlertsREST.svc` | High | Real-time |
| Highway Cameras | `highwayCameras` | `/HighwayCameras/HighwayCamerasREST.svc` | High | Real-time |
| Mountain Pass Conditions | `mountainPassConditions` | `/MountainPassConditions/MountainPassConditionsREST.svc` | High | Real-time |
| Toll Rates | `tollRates` | `/TollRates/TollRatesREST.svc` | Medium | Static |
| Traffic Flow | `trafficFlow` | `/TrafficFlow/TrafficFlowREST.svc` | High | Real-time |
| Travel Times | `travelTimes` | `/TravelTimes/TravelTimesREST.svc` | High | Real-time |
| Weather Information | `weatherInformation` | `/WeatherInformation/WeatherInformationREST.svc` | Medium | Real-time |
| Weather Stations | `weatherStations` | `/WeatherStations/WeatherStationsREST.svc` | Medium | Real-time |
| More Weather Information | `weatherInformationExtended` | `/api/Scanweb` | Low | Real-time |

### **WSF APIs** (Existing Structure)

| API Category | Folder Name | REST Endpoint | Priority | Update Frequency |
|-------------|-------------|---------------|----------|------------------|
| WSF Fares | `wsf/fares` | `/ferries/api/fares/rest/` | Medium | Static |
| WSF Schedule | `wsf/schedule` | `/ferries/api/schedule/rest/` | High | Daily |
| WSF Terminals | `wsf/terminals` | `/ferries/api/terminals/rest/` | High | Weekly |
| WSF Vessels | `wsf/vessels` | `/ferries/api/vessels/rest/` | High | Real-time |

## Package Configuration

### `package.json`

```json
{
  "name": "wsdot-api-client",
  "version": "1.0.0",
  "description": "Complete TypeScript client for WSDOT Traveler Information APIs",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./react": {
      "import": "./dist/react.mjs",
      "require": "./dist/react.js",
      "types": "./dist/react.d.ts"
    }
  },
  "files": [
    "dist",
    "README.md",
    "CHANGELOG.md"
  ],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "test": "vitest",
    "test:integration": "vitest --config vitest.integration.config.ts",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui",
    "lint": "biome check",
    "format": "biome format --write",
    "type-check": "tsc --noEmit",
    "prepublishOnly": "npm run build && npm run test"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-query": ">=3.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "@vitest/ui": "^1.0.0",
    "biome": "^1.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-query": "^3.0.0",
    "tsup": "^8.0.0",
    "typescript": "^5.0.0",
    "vitest": "^1.0.0"
  },
  "keywords": [
    "wsdot",
    "washington-state",
    "transportation",
    "api",
    "traffic",
    "weather",
    "ferries",
    "highway-cameras",
    "travel-times",
    "typescript",
    "react",
    "react-query"
  ],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/wsdot-api-client.git"
  }
}
```

## Entry Points

### `src/index.ts` - Core API exports
```typescript
// WSDOT Traveler Information APIs
export * from './api/borderCrossings';
export * from './api/bridgeClearances';
export * from './api/commercialVehicleRestrictions';
export * from './api/highwayAlerts';
export * from './api/highwayCameras';
export * from './api/mountainPassConditions';
export * from './api/tollRates';
export * from './api/trafficFlow';
export * from './api/travelTimes';
export * from './api/weatherInformation';
export * from './api/weatherStations';
export * from './api/weatherInformationExtended';

// WSF APIs
export * from './api/wsf/fares';
export * from './api/wsf/schedule';
export * from './api/wsf/terminals';
export * from './api/wsf/vessels';

// Shared utilities
export * from './shared/fetching';
export * from './shared/caching';
export * from './types';
```

### `src/react.ts` - React-specific exports
```typescript
// React hooks and providers
export * from './hooks';
export { CacheProvider } from './shared/caching';
```

## Migration Strategy (Revised: 2-3 Weeks)

### Phase 1: WSF Migration & Core Infrastructure (Week 1) - ✅ **COMPLETED**
1. **✅ Create library structure** following WSDOT API organization
2. **✅ Migrate existing WSF code** to new structure
3. **✅ Set up testing infrastructure** for all API categories
4. **✅ Create shared utilities** (fetching, caching, utils)
5. **✅ Achieve 100% unit test success** (331/331 tests passing)

### Phase 2: WSDOT APIs Implementation (Week 2) - 🔄 **IN PROGRESS**
1. **High Priority APIs** (Real-time data):
   - Highway Cameras
   - Traffic Flow
   - Travel Times
   - Highway Alerts
   - Mountain Pass Conditions

2. **Medium Priority APIs**:
   - Weather Information
   - Weather Stations
   - Toll Rates
   - Border Crossings

3. **Lower Priority APIs**:
   - Commercial Vehicle Restrictions
   - Bridge Clearances
   - Weather Information Extended

### Phase 3: Integration Testing & Publishing (Week 3) - 📋 **PLANNED**
1. **Comprehensive integration tests** for all endpoints
2. **Documentation and examples** for each API category
3. **Performance optimization** and caching validation
4. **NPM publishing** and ferryjoy-client integration

## Benefits of WSDOT Structure Alignment

### **1. Intuitive Organization**
- **Matches official documentation** exactly
- **Easy to find** specific API endpoints
- **Consistent naming** with WSDOT references

### **2. Maintainability**
- **Clear separation** of concerns
- **Scalable structure** for future APIs
- **Easy to update** when WSDOT adds new endpoints

### **3. Developer Experience**
- **Familiar structure** for WSDOT API users
- **Logical grouping** by data type
- **Consistent patterns** across all endpoints

### **4. Documentation Alignment**
- **Direct mapping** to WSDOT documentation
- **Easy reference** to official docs
- **Clear API boundaries**

## Implementation Priority

### **Week 1: Foundation**
- ✅ WSF APIs (existing, working code)
- ✅ Core infrastructure (fetching, caching, utils)
- ✅ Testing framework setup

### **Week 2: Real-time APIs**
- 🚀 Highway Cameras (high priority)
- 🚀 Traffic Flow (high priority)
- 🚀 Travel Times (high priority)
- 🚀 Highway Alerts (high priority)
- 🚀 Mountain Pass Conditions (high priority)

### **Week 3: Static APIs & Polish**
- 📊 Weather Information
- 📊 Toll Rates
- 📊 Border Crossings
- 📊 Integration testing
- 📊 Documentation & publishing

This structure perfectly aligns with WSDOT's official API organization while maintaining the existing WSF codebase and expanding to cover the complete Washington transportation ecosystem. 