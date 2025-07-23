// WSDOT Bridge Clearances API types
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_clearance.html
// API Help: https://wsdot.wa.gov/traffic/api/Bridges/ClearanceREST.svc/Help

/**
 * Bridge clearance data from WSDOT Bridge Clearances API
 * Based on actual API response structure
 */
export type BridgeDataGIS = {
  APILastUpdate: Date; // WSDOT date format: "/Date(timestamp)/"
  BridgeNumber: string;
  ControlEntityGuid: string;
  CrossingDescription: string;
  CrossingLocationId: number;
  CrossingRecordGuid: string;
  InventoryDirection: string | null;
  Latitude: number;
  LocationGuid: string;
  Longitude: number;
  RouteDate: Date; // WSDOT date format: "/Date(timestamp)/"
  SRMP: number;
  SRMPAheadBackIndicator: string | null;
  StateRouteID: string;
  StateStructureId: string;
  VerticalClearanceMaximumFeetInch: string;
  VerticalClearanceMaximumInches: number;
  VerticalClearanceMinimumFeetInch: string;
  VerticalClearanceMinimumInches: number;
};
