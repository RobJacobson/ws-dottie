// WSDOT Border Crossings API types
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___border_crossings.html
// API Help: https://wsdot.wa.gov/traffic/api/BorderCrossings/BorderCrossingsREST.svc/Help

/**
 * Roadway location information for border crossings
 * Based on actual API response structure
 */
export type BorderCrossingLocation = {
  Description: string;
  Direction: string | null;
  Latitude: number;
  Longitude: number;
  MilePost: number;
  RoadName: string;
} | null;

/**
 * Border crossing data from WSDOT Border Crossings API
 * Based on actual API response structure
 */
export type BorderCrossingData = {
  BorderCrossingLocation: BorderCrossingLocation;
  CrossingName: string;
  Time: Date; // WSDOT date format: "/Date(timestamp)/"
  WaitTime: number; // Wait time in minutes
};

/**
 * Response from GetBorderCrossingsAsJson endpoint
 * Returns an array of border crossing data
 */
export type BorderCrossingsResponse = BorderCrossingData[];
