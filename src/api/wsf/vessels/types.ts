// Shared types for WSF Vessels API

/**
 * Vessel class information from WSF Vessels API
 * Based on Class object in /vesselbasics endpoint
 */
export type VesselClass = {
  ClassID: number;
  ClassSubjectID: number;
  ClassName: string;
  SortSeq: number;
  DrawingImg: string;
  SilhouetteImg: string;
  PublicDisplayName: string;
};

/**
 * Vessel basic information from WSF Vessels API
 * Based on /vesselbasics endpoint
 */
export type VesselBasic = {
  VesselID: number;
  VesselSubjectID: number;
  VesselName: string;
  VesselAbbrev: string;
  Class: VesselClass;
  Status: number;
  OwnedByWSF: boolean;
};

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
 * Note: This matches the specification exactly with accommodation details
 */
export type VesselAccommodation = {
  VesselID: number;
  VesselSubjectID: number;
  VesselName: string;
  VesselAbbrev: string;
  Class: VesselClass;
  CarDeckRestroom: boolean;
  CarDeckShelter: boolean;
  Elevator: boolean;
  ADAAccessible: boolean;
  MainCabinGalley: boolean;
  MainCabinRestroom: boolean;
  PublicWifi: boolean;
  ADAInfo: string;
  AdditionalInfo: string;
};

/**
 * Vessel statistics from WSF Vessels API
 * Based on /vesselstats endpoint
 * Note: This is a placeholder as the specification doesn't detail the exact structure
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
 * Vessel history from WSF Vessels API
 * Based on /vesselhistory endpoint
 * Note: This is a placeholder as the specification doesn't detail the exact structure
 */
export type VesselHistory = {
  VesselID: number;
  VesselName: string;
  HistoryDate: Date;
  HistoryDescription: string;
  HistoryType: string;
  IsActive: boolean;
};

/**
 * Vessel location from WSF Vessels API
 * Based on /vessellocations endpoint
 * Note: Data preserves PascalCase keys from WSF API and matches specification exactly
 */
export type VesselLocation = {
  VesselID: number;
  VesselName: string;
  Mmsi: number;
  DepartingTerminalID: number;
  DepartingTerminalName: string;
  DepartingTerminalAbbrev: string;
  ArrivingTerminalID: number;
  ArrivingTerminalName: string;
  ArrivingTerminalAbbrev: string;
  Latitude: number;
  Longitude: number;
  Speed: number;
  Heading: number;
  InService: boolean;
  AtDock: boolean;
  LeftDock: string | null; // "/Date(timestamp-timezone)/" format
  Eta: string | null; // "/Date(timestamp-timezone)/" format
  EtaBasis: string | null;
  ScheduledDeparture: string; // "/Date(timestamp-timezone)/" format
  OpRouteAbbrev: string[];
  VesselPositionNum: number;
  SortSeq: number;
  ManagedBy: number;
  TimeStamp: string; // "/Date(timestamp-timezone)/" format
  VesselWatchShutID: number;
  VesselWatchShutMsg: string;
  VesselWatchShutFlag: string;
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
