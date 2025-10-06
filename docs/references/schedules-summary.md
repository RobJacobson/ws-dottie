## Summary of Endpoint Testing Results

I have successfully tested all 25 endpoints in the `wsf-schedule` API using the `npx fetch-dottie wsf-schedule:[endpoint-name] --no-validation` format. Here's a comprehensive summary of the results:

### ✅ **All Endpoints Working Successfully**

All 25 endpoints executed successfully with their default parameters and returned valid data. Here's the breakdown:

#### **Basic Information Endpoints:**
1. **`activeSeasons`** - ✅ Returned 1 season (Fall 2025)
2. **`cacheFlushDate`** - ✅ Returned cache flush timestamp
3. **`scheduleValidDateRange`** - ✅ Returned valid date range (Oct 3 - Dec 27, 2025)

#### **Route Information Endpoints:**
4. **`routes`** - ✅ Returned 8 routes
5. **`scheduledRoutes`** - ✅ Returned 13 scheduled routes
6. **`scheduledRoutesBySeason`** - ✅ Returned 13 routes for season 193
7. **`routesByTerminals`** - ✅ Returned 1 route for terminals 1→10
8. **`routesHavingServiceDisruptions`** - ✅ Returned 0 routes with disruptions

#### **Route Details Endpoints:**
9. **`routeDetails`** - ✅ Returned detailed route info for route 1
10. **`routeDetailsByRoute`** - ✅ Returned detailed route info for route 1
11. **`routeDetailsByTerminals`** - ✅ Returned detailed route info for terminals 1→10

#### **Sailing Information Endpoints:**
12. **`allSailings`** - ✅ Returned 8 sailings for SchedRouteID 2401
13. **`sailings`** - ✅ Returned 8 sailings for route 1 on 2025-10-04

#### **Schedule Endpoints:**
14. **`scheduleByRoute`** - ✅ Returned full schedule for route 9
15. **`scheduleByTerminals`** - ✅ Returned schedule for terminals 1→10
16. **`scheduleTodayByRoute`** - ✅ Returned today's schedule for route 9 (large response)
17. **`scheduleTodayByTerminals`** - ✅ Returned today's schedule for terminals 1→10

#### **Terminal Information Endpoints:**
18. **`terminals`** - ✅ Returned 19 terminals
19. **`terminalMates`** - ✅ Returned 4 terminal mates for terminal 1
20. **`terminalsAndMates`** - ✅ Returned 38 terminal combinations
21. **`terminalsAndMatesByRoute`** - ✅ Returned 20 terminal combinations for route 9

#### **Alert and Adjustment Endpoints:**
22. **`scheduleAlerts`** - ✅ Returned 0 alerts
23. **`timeAdjustments`** - ✅ Returned 50 time adjustments (mostly for Port Townsend/Coupeville route)
24. **`timeAdjustmentsByRoute`** - ✅ Returned 0 adjustments for route 1
25. **`timeAdjustmentsBySchedRoute`** - ✅ Returned 0 adjustments for SchedRouteID 2401

### **Key Observations:**

1. **All endpoints are functional** - No 400 errors or failures
2. **Default parameters work correctly** - Each endpoint used its predefined sample parameters
3. **Data quality is good** - All responses contain valid, structured data
4. **Response times vary** - From ~1.6 seconds (simple endpoints) to ~21.3 seconds (complex queries)
5. **Data volume varies** - From 0.1kb (simple responses) to 39.9kb (time adjustments)
6. **Current season is Fall 2025** - All data reflects the current active schedule season

The systematic testing confirms that the `fetch-dottie` CLI is working correctly with all endpoints and their default parameters, providing reliable access to the WSDOT ferry schedule API.