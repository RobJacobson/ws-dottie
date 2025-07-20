// WSDOT Travel Times API types
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___travel_times.html
// API Help: https://wsdot.wa.gov/traffic/api/TravelTimes/TravelTimesREST.svc/Help

/**
 * Travel time route endpoint information
 */
export type TravelTimeEndpoint = {
  Description: string;
  Direction: string;
  Latitude: number;
  Longitude: number;
  MilePost: number;
  RoadName: string;
};

/**
 * Travel time route data from WSDOT Travel Times API
 * Based on actual API response structure and TravelTimeRoute class documentation
 */
export type TravelTimeRoute = {
  AverageTime: number;
  CurrentTime: number;
  Description: string;
  Distance: number;
  EndPoint: TravelTimeEndpoint;
  Name: string;
  StartPoint: TravelTimeEndpoint;
  TimeUpdated: Date; // Converted from WSDOT date format "/Date(timestamp)/"
  TravelTimeID: number;
};

/**
 * Response types for travel times API
 */
export type TravelTimesResponse = TravelTimeRoute[];
