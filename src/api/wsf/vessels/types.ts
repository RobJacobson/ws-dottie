// Shared types for WSF Vessels API

/**
 * Vessel information from WSF Vessels API
 * Based on /vesselbasics endpoint
 */
export type Vessel = {
  VesselID: number;
  VesselName: string;
  Abbrev: string;
  VesselClass: string;
  InService: boolean;
  Active: boolean;
  YearBuilt: number;
  Displacement: number;
  Length: number;
  Breadth: number;
  Draft: number;
  CarCapacity: number;
  PassengerCapacity: number;
  MaxPassengers: number;
  MaxVehicles: number;
  MaxGrossTonnage: number;
  Horsepower: number;
  MaxSpeed: number;
  HomeTerminalID: number;
  HomeTerminalName: string;
};

/**
 * Vessel accommodations from WSF Vessels API
 * Based on /vesselaccommodations endpoint
 */
export type VesselAccommodation = {
  VesselID: number;
  AccommodationID: number;
  AccommodationName: string;
  AccommodationDescription: string;
  IsActive: boolean;
};

/**
 * Vessel statistics from WSF Vessels API
 * Based on /vesselstats endpoint
 */
export type VesselStats = {
  VesselID: number;
  StatID: number;
  StatName: string;
  StatValue: string;
  StatUnit: string;
  IsActive: boolean;
};

/**
 * Vessel location from WSF Vessels API
 * Based on /vessellocations endpoint
 * Note: Data preserves PascalCase keys from WSF API
 */
export type VesselLocation = {
  VesselID: number;
  VesselName: string;
  Longitude: number;
  Latitude: number;
  Heading: number;
  Speed: number;
  InService: boolean;
  AtDock: boolean;
  DepartingTerminalID: number;
  DepartingTerminalName: string;
  ArrivingTerminalID: number;
  ArrivingTerminalName: string;
  TimeStamp: Date;
  ScheduledDeparture: Date;
  EstimatedArrival: Date;
  LeftDock?: Date;
  ETA?: Date;
  OpRouteAbbrev?: string[];
  VesselPositionNum?: number;
  SortSeq?: number;
  ManagedBy?: number; // 1 for WSF, 2 for KCM
};

/**
 * Vessel verbose information from WSF Vessels API
 * Based on /vesselverbose endpoint
 * Note: Data preserves PascalCase keys from WSF API
 */
export type VesselVerbose = {
  VesselID: number;
  VesselName: string;
  VesselAbbrev: string;
  Class: {
    ClassID: number;
    ClassName: string;
    PublicDisplayName: string;
  };
  Status: number;
  OwnedByWSF: boolean;
  YearBuilt: number;
  Displacement: number;
  Length: string;
  Beam: string;
  Draft: string;
  SpeedInKnots: number;
  EngineCount: number;
  Horsepower: number;
  MaxPassengerCount: number;
  RegDeckSpace: number;
  TallDeckSpace: number;
  Tonnage: number;
  PropulsionInfo: string;
  ADAAccessible: boolean;
  Elevator: boolean;
  CarDeckRestroom: boolean;
  MainCabinGalley: boolean;
  MainCabinRestroom: boolean;
  PublicWifi: boolean;
  ADAInfo: string;
  VesselNameDesc: string;
  VesselHistory: string;
  CityBuilt: string;
  YearRebuilt?: number;
};

/**
 * Vessels cache flush date response
 */
export type VesselsCacheFlushDate = {
  LastUpdated: Date;
  Source: string;
};
