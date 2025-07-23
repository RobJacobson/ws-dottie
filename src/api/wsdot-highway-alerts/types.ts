// WSDOT Highway Alerts API types
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html
// API Help: https://wsdot.wa.gov/traffic/api/HighwayAlerts/HighwayAlertsREST.svc/Help

/**
 * Roadway location information for highway alerts
 */
export type RoadwayLocation = {
  Description: string | null;
  Direction: string | null;
  Latitude: number;
  Longitude: number;
  MilePost: number;
  RoadName: string;
};

/**
 * Highway alert data from WSDOT Highway Alerts API
 * Based on actual API response structure
 */
export type HighwayAlert = {
  AlertID: number;
  County: string | null;
  EndRoadwayLocation: RoadwayLocation;
  EndTime: Date | null; // Converted from WSDOT date format "/Date(timestamp)/"
  EventCategory: string;
  EventStatus: string;
  ExtendedDescription: string;
  HeadlineDescription: string;
  LastUpdatedTime: Date; // Converted from WSDOT date format "/Date(timestamp)/"
  Priority: string;
  Region: string;
  StartRoadwayLocation: RoadwayLocation;
  StartTime: Date; // Converted from WSDOT date format "/Date(timestamp)/"
};
