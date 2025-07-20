// WSDOT Traffic Flow API types
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___traffic_flow.html
// API Help: https://wsdot.wa.gov/traffic/api/TrafficFlow/TrafficFlowREST.svc/Help

/**
 * Flow station location information
 */
export type FlowStationLocation = {
  Description: string;
  Direction: string;
  Latitude: number;
  Longitude: number;
  MilePost: number;
  RoadName: string;
};

/**
 * Traffic flow data from WSDOT Traffic Flow API
 * Based on actual API response structure and FlowData class documentation
 */
export type TrafficFlow = {
  FlowDataID: number;
  FlowReadingValue: number;
  FlowStationLocation: FlowStationLocation;
  Region: string;
  StationName: string;
  Time: Date; // Converted from WSDOT date format "/Date(timestamp)/"
};

/**
 * Response types for traffic flow API
 */
export type TrafficFlowsResponse = TrafficFlow[];
