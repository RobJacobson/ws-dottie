// WSDOT Toll Rates API types
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___tolling.html
// API Help: https://wsdot.wa.gov/traffic/api/TollRates/TollRatesREST.svc/Help

/**
 * Toll rate data from WSDOT Toll Rates API
 * Based on actual API response structure and TollRate class documentation
 */
export type TollRate = {
  CurrentMessage: string | null;
  CurrentToll: number;
  EndLatitude: number;
  EndLocationName: string;
  EndLongitude: number;
  EndMilepost: number;
  StartLatitude: number;
  StartLocationName: string;
  StartLongitude: number;
  StartMilepost: number;
  StateRoute: string;
  TimeUpdated: Date; // Converted from WSDOT date format "/Date(timestamp)/"
  TravelDirection: string;
  TripName: string;
};

/**
 * Toll trip information with geometry data
 */
export type TollTripInfo = {
  EndLatitude: number;
  EndLocationName: string;
  EndLongitude: number;
  EndMilepost: number;
  Geometry: string; // GeoJSON LineString geometry
  ModifiedDate: Date | null; // Converted from WSDOT date format "/Date(timestamp)/" or null if not available
  StartLatitude: number;
  StartLocationName: string;
  StartLongitude: number;
  StartMilepost: number;
  TravelDirection: string;
  TripName: string;
};

/**
 * Individual toll trip rate information
 */
export type TollTripRate = {
  Message: string;
  MessageUpdateTime: Date; // Converted from WSDOT date format "/Date(timestamp)/"
  Toll: number;
  TripName: string;
};

/**
 * Toll trip rates response structure
 */
export type TollTripRatesResponse = {
  LastUpdated: Date; // Converted from WSDOT date format "/Date(timestamp)/"
  Trips: TollTripRate[];
};
