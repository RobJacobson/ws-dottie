/**
 * @fileoverview Configuration for execution strategies
 *
 * This module contains configuration constants used by the execution strategies,
 * particularly for JSONP handling where certain endpoints are known to return
 * arrays instead of objects. This configuration helps ensure proper data type
 * handling across different API endpoints.
 */

/**
 * Set of endpoints that should return arrays
 *
 * Used to determine how to handle empty responses in JSONP. Some APIs return
 * empty objects {} when they should return empty arrays []. This causes Zod
 * validation to fail with "Expected array, received object". The issue only
 * appears with JSONP because native fetch handles empty responses differently.
 */
export const ARRAY_ENDPOINTS = [
  // WSF Schedule API endpoints
  "/timeadjbyroute/",
  "/timeadjbyschedroute/",
  "/alternativeformats/",
  "/schedroutes",
  "/routes",
  "/sailings",
  "/allsailings",
  "/terminals",
  "/terminalsandmates",
  "/alerts",
  "/timeadjustments",
  "/activeseasons",

  // WSDOT API endpoints
  "/BorderCrossings",
  "/BridgeClearances",
  "/CommercialVehicleRestrictions",
  "/HighwayAlerts",
  "/HighwayCameras",
  "/MountainPasses",
  "/TollRates",
  "/TrafficFlow",
  "/TravelTimes",
  "/WeatherInformation",
  "/WeatherInformationExtended",
  "/WeatherStations",
] as const;

/**
 * Determines if an endpoint should return an array based on the URL
 *
 * This is a simple O(n) string matching operation on a small, fixed set of endpoints.
 * The performance impact is negligible given the small number of endpoints.
 *
 * @param url - The API endpoint URL to check
 * @returns true if the endpoint should return an array, false otherwise
 */
export const shouldReturnArray = (url: string): boolean => {
  return ARRAY_ENDPOINTS.some((endpoint) => url.includes(endpoint));
};
