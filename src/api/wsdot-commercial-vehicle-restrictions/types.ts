// WSDOT Commercial Vehicle Restrictions API types
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_c_v_restrictions.html
// API Help: https://wsdot.wa.gov/traffic/api/CVRestrictions/CVRestrictionsREST.svc/Help

/**
 * Roadway location information for commercial vehicle restrictions
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
 * Commercial vehicle restriction data from WSDOT Commercial Vehicle Restrictions API
 * Based on actual API response structure
 */
export type CommercialVehicleRestriction = {
  BLMaxAxle: number | null; // B-Load maximum axle weight
  BridgeName: string;
  BridgeNumber: string;
  CL8MaxAxle: number | null; // CL-8 maximum axle weight
  DateEffective: Date; // WSDOT date format: "/Date(timestamp)/"
  DateExpires: Date; // WSDOT date format: "/Date(timestamp)/"
  DatePosted: Date; // WSDOT date format: "/Date(timestamp)/"
  EndRoadwayLocation: RoadwayLocation;
  IsDetourAvailable: boolean;
  IsExceptionsAllowed: boolean;
  IsPermanentRestriction: boolean;
  IsWarning: boolean;
  Latitude: number;
  LocationDescription: string;
  LocationName: string;
  Longitude: number;
  MaximumGrossVehicleWeightInPounds: number | null;
  RestrictionComment: string;
  RestrictionHeightInInches: number | null;
  RestrictionLengthInInches: number | null;
  RestrictionType: number;
  RestrictionWeightInPounds: number | null;
  RestrictionWidthInInches: number | null;
  SAMaxAxle: number | null; // Single axle maximum weight
  StartRoadwayLocation: RoadwayLocation;
  State: string;
  StateRouteID: string;
  TDMaxAxle: number | null; // Tandem axle maximum weight
  VehicleType: string;
};

/**
 * Commercial vehicle restriction data with unique ID
 */
export type CommercialVehicleRestrictionWithId =
  CommercialVehicleRestriction & {
    UniqueID: string;
  };
