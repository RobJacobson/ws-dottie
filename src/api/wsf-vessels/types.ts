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
 * Note: This endpoint returns detailed vessel specifications, not operational statistics
 * Based on official WSDOT API VesselStatResponse structure
 */
export type VesselStats = {
  VesselID: number;
  VesselSubjectID: number;
  VesselName: string;
  VesselAbbrev: string;
  Class: VesselClass;
  VesselNameDesc: string;
  VesselHistory: string;
  Beam: string;
  CityBuilt: string;
  SpeedInKnots: number;
  Draft: string;
  EngineCount: number;
  Horsepower: number;
  Length: string;
  MaxPassengerCount: number;
  PassengerOnly: boolean;
  FastFerry: boolean;
  PropulsionInfo: string;
  TallDeckClearance: number;
  RegDeckSpace: number;
  TallDeckSpace: number;
  Tonnage: number;
  Displacement: number;
  YearBuilt: number;
  YearRebuilt?: number;
  VesselDrawingImg: string;
  SolasCertified: boolean;
  MaxPassengerCountForInternational: number;
};

/**
 * Vessel history from WSF Vessels API
 * Based on /vesselhistory endpoint
 * Note: This matches the official WSF API specification exactly
 */
export type VesselHistory = {
  VesselId: number;
  Vessel: string;
  Departing: string;
  Arriving: string;
  ScheduledDepart: Date | null;
  ActualDepart: Date | null;
  EstArrival: Date | null;
  Date: Date | null;
};

/**
 * Vessel location from WSF Vessels API
 * Based on /vessellocations endpoint
 * Note: VesselWatch fields (VesselWatchShutID, VesselWatchShutMsg, VesselWatchShutFlag,
 * VesselWatchStatus, VesselWatchMsg) are automatically filtered out during JSON parsing
 * as they are unreliable and undocumented
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
  LeftDock: Date | null; // Automatically converted from "/Date(timestamp-timezone)/" format
  Eta: Date | null; // Automatically converted from "/Date(timestamp-timezone)/" format
  EtaBasis: string | null;
  ScheduledDeparture: Date; // Automatically converted from "/Date(timestamp-timezone)/" format
  OpRouteAbbrev: string[];
  VesselPositionNum: number;
  SortSeq: number;
  ManagedBy: number;
  TimeStamp: Date; // Automatically converted from "/Date(timestamp-timezone)/" format
};

/**
 * Vessel verbose information from WSF Vessels API
 * Based on /vesselverbose endpoint
 * Note: Data preserves PascalCase keys from WSF API and matches specification exactly
 */
export type VesselVerbose = {
  VesselID: number;
  VesselName: string;
  VesselAbbrev: string;
  Class: VesselClass;
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
 * Based on /cacheflushdate endpoint
 * Note: The API returns a date string in "/Date(timestamp-timezone)/" format
 * Returns a Date object (automatically converted from .NET Date format)
 */
export type VesselsCacheFlushDate = Date;
