Based on my analysis of the schemas, actual API responses, and WSDOT documentation, here are the semantic and practical differences between these three endpoints:

## 🎯 **getTollTripRates** ✅ (Working - Recommended)

**Purpose:** Current real-time toll rates and status messages for all toll trips

**Data Structure:**
```json
{
  "LastUpdated": "2025-09-22T17:39:32.000Z",
  "Version": 358270,
  "Trips": [
    {
      "TripName": "405tp02752",
      "Toll": 0,
      "Message": "CLOSED",
      "MessageUpdateTime": "2025-09-22T17:39:32.000Z"
    },
    {
      "TripName": "405tp02526", 
      "Toll": 0,
      "Message": "HOV ONLY",
      "MessageUpdateTime": "2025-09-22T17:39:31.000Z"
    }
  ]
}
```

**What it represents:**
- **Current operational status** of toll facilities
- **Real-time pricing** (in cents) for each toll trip
- **Status messages** like "CLOSED", "HOV ONLY", "$1.00", etc.
- **Version tracking** for cache management

**Use cases:**
- Driver navigation apps showing current toll costs
- Real-time traffic management systems
- Trip planning applications

---

## ❌ **getTollRates** (Broken - Database Issue)

**Purpose:** Detailed toll rate information with geographic and infrastructure data

**Expected Data Structure:**
```json
{
  "TripName": "405tp02752",
  "CurrentToll": 100, // in cents
  "CurrentMessage": "HOV ONLY",
  "StateRoute": "405",
  "TravelDirection": "N",
  "StartMilepost": 25.26,
  "StartLocationName": "NE 124th St",
  "StartLatitude": 47.71554562,
  "StartLongitude": -122.18545726,
  "EndMilepost": 27.52,
  "EndLocationName": "NE 145th St",
  "EndLatitude": 47.73348912,
  "EndLongitude": -122.18012345,
  "TimeUpdated": "2025-09-22T17:39:32.000Z"
}
```

**What it represents:**
- **Detailed geographic information** for each toll segment
- **Infrastructure metadata** (mileposts, coordinates, route info)
- **Sign display information** (messages shown on toll signs)
- **Complete toll corridor definitions**

**Use cases:**
- Mapping applications needing precise toll corridor boundaries
- Transportation planning and analysis
- Toll infrastructure management systems

**Why it's broken:** WSDOT API has a database issue accessing the `InventoryDirection` field in the `TollLocations` table.

---

## ❌ **getTollTripInfo** (Broken - Database Issue)

**Purpose:** Static metadata and geographic geometry for toll corridors

**Expected Data Structure:**
```json
{
  "TripName": "405tp02752",
  "StartLocationName": "NE 124th St",
  "StartMilepost": 25.26,
  "StartLatitude": 47.71554562,
  "StartLongitude": -122.18545726,
  "EndLocationName": "NE 145th St", 
  "EndMilepost": 27.52,
  "EndLatitude": 47.73348912,
  "EndLongitude": -122.18012345,
  "TravelDirection": "N",
  "Geometry": "{ \"type\": \"LineString\", \"coordinates\": [[-122.18545726, 47.71554562], [-122.18012345, 47.73348912]] }",
  "ModifiedDate": "2025-09-22T17:39:32.000Z"
}
```

**What it represents:**
- **Static infrastructure data** (unchanging corridor definitions)
- **Geographic boundaries** and **route geometry** for mapping
- **Trip corridor metadata** (names, directions, locations)
- **WGS84 LineString geometry** for GIS applications

**Use cases:**
- Geographic information systems (GIS)
- Digital mapping applications
- Transportation infrastructure planning
- Route visualization tools

---

## 📊 **Key Differences Summary**

| Aspect | getTollTripRates | getTollRates | getTollTripInfo |
|--------|------------------|--------------|-----------------|
| **Data Type** | Dynamic/Real-time | Dynamic with geo | Static/Infrastructure |
| **Primary Use** | Current pricing | Detailed corridor info | Geographic mapping |
| **Update Frequency** | Real-time | Real-time | Static (rarely changes) |
| **Geographic Data** | ❌ No coordinates | ✅ Full coordinates | ✅ Full coordinates + geometry |
| **Status Messages** | ✅ Current status | ✅ Sign messages | ❌ No messages |
| **Version Tracking** | ✅ Yes | ❌ No | ❌ No |
| **Current Status** | ✅ Working | ❌ Broken (DB issue) | ❌ Broken (DB issue) |

**Practical Recommendation:**
- Use **`getTollTripRates`** as your primary endpoint for current toll information
- The other two endpoints provide valuable geographic and infrastructure data but are currently unavailable due to WSDOT API issues
- If you need the geographic data from the broken endpoints, you may need to wait for WSDOT to fix their database issues or find alternative data sources

---

[9 tools called]

## Summary of Semantic/Practical Differences Between WSDOT Toll Rate Endpoints

I've reviewed and updated the descriptions to clearly capture the semantic differences between each endpoint. Here's a comprehensive breakdown:

### 🏗️ **Endpoint Architecture Overview**

The WSDOT Toll Rates API consists of **6 endpoints** that serve different but related purposes:

1. **getTollRates** ❌ (Currently Broken)
2. **getTollTripInfo** ❌ (Currently Broken) 
3. **getTollTripRates** ✅ (Primary Working Endpoint)
4. **getTollTripVersion** ✅ (Version Tracking)
5. **getTripRatesByDate** ✅ (Historical Analysis)
6. **getTripRatesByVersion** ✅ (Version-Specific Retrieval)

### 🎯 **Key Semantic Differences**

#### **1. getTollRates** ❌ (Database Issues)
- **Purpose**: Comprehensive corridor definitions with precise geography
- **Data Type**: `ArrayOfTollRate` with detailed infrastructure data
- **Use Case**: Geographic mapping applications, corridor planning
- **Status**: Broken due to database access issues
- **Unique Features**: Includes precise coordinates, mileposts, route information

#### **2. getTollTripInfo** ❌ (Database Issues)
- **Purpose**: Static corridor infrastructure metadata with geometry
- **Data Type**: `ArrayOfTollTripInfo` with WGS84 LineString geometry
- **Use Case**: GIS applications, mapping software, infrastructure planning
- **Status**: Broken due to same database issues
- **Unique Features**: WGS84 geometry strings, rarely-changing infrastructure data

#### **3. getTollTripRates** ✅ (RECOMMENDED PRIMARY ENDPOINT)
- **Purpose**: Current real-time toll rates and operational status
- **Data Type**: `TollTripRates` with version tracking
- **Use Case**: Real-time pricing applications, current status monitoring
- **Status**: Working - this is your main endpoint for current pricing
- **Unique Features**: Real-time status messages, current version tracking

#### **4. getTollTripVersion** ✅ (Version Tracking)
- **Purpose**: Current version number for cache management
- **Data Type**: `TollTripVersion` (simple version object)
- **Use Case**: Cache invalidation, change detection
- **Status**: Working
- **Unique Features**: Simple version tracking, essential for caching strategies

#### **5. getTripRatesByDate** ✅ (Historical Analysis)
- **Purpose**: Historical toll rates for specified date ranges
- **Data Type**: `ArrayOfTollTripRates` for date intervals
- **Use Case**: Historical analysis, trend analysis, reporting
- **Status**: Working
- **Unique Features**: Date range queries, historical snapshots

#### **6. getTripRatesByVersion** ✅ (Version-Specific Retrieval)
- **Purpose**: Toll rates for specific version snapshots
- **Data Type**: `TollTripRates` for specific versions
- **Use Case**: Cache validation, historical point-in-time data
- **Status**: Working
- **Unique Features**: Version-specific snapshots, cache validation

### 🔄 **Data Flow & Relationships**

```
Current Status → getTollTripRates (primary)
     ↓
Version Tracking → getTollTripVersion
     ↓
Historical Data → getTripRatesByDate | getTripRatesByVersion
     ↓
Infrastructure → getTollRates | getTollTripInfo (currently broken)
```

### 💡 **Practical Usage Guidelines**

**For Current Pricing:**
```bash
# Primary endpoint for real-time toll rates
npm run dottie getTollTripRates
```

**For Version Management:**
```bash
# Get current version for caching
npm run dottie getTollTripVersion
```

**For Historical Analysis:**
```bash
# Get historical rates by date range
npm run dottie getTripRatesByDate '{"fromDate":"2025-09-01","toDate":"2025-09-30"}'
```

**For Version-Specific Data:**
```bash
# Get rates for specific version snapshot
npm run dottie getTripRatesByVersion '{"version": 358270}'
```

### ⚠️ **Important Notes**

- **getTollRates** and **getTollTripInfo** are currently broken due to WSDOT database issues
- **getTollTripRates** should be your primary endpoint for current pricing
- **getTollTripVersion** is essential for proper caching strategies
- The endpoints serve different purposes: real-time vs. historical vs. infrastructure data

This clarifies the semantic differences and provides clear guidance on which endpoint to use for different use cases.