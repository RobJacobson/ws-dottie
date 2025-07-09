// Shared types for WSF Vessels API

/**
 * Vessel information from WSF Vessels API
 * Based on /vesselbasics endpoint
 */
export type Vessel = {
  vesselId: number;
  vesselName: string;
  abbrev: string;
  vesselClass: string;
  inService: boolean;
  active: boolean;
  yearBuilt: number;
  displacement: number;
  length: number;
  breadth: number;
  draft: number;
  carCapacity: number;
  passengerCapacity: number;
  maxPassengers: number;
  maxVehicles: number;
  maxGrossTonnage: number;
  horsepower: number;
  maxSpeed: number;
  homeTerminalId: number;
  homeTerminalName: string;
};

/**
 * Vessel accommodations from WSF Vessels API
 * Based on /vesselaccommodations endpoint
 */
export type VesselAccommodation = {
  vesselId: number;
  accommodationId: number;
  accommodationName: string;
  accommodationDescription: string;
  isActive: boolean;
};

/**
 * Vessel statistics from WSF Vessels API
 * Based on /vesselstats endpoint
 */
export type VesselStats = {
  vesselId: number;
  statId: number;
  statName: string;
  statValue: string;
  statUnit: string;
  isActive: boolean;
};

/**
 * Vessel location from WSF Vessels API
 * Based on /vessellocations endpoint
 */
export type VesselLocation = {
  vesselID: number;
  vesselName: string;
  longitude: number;
  latitude: number;
  heading: number;
  speed: number;
  inService: boolean;
  atDock: boolean;
  departingTerminalId: number;
  departingTerminalName: string;
  arrivingTerminalId: number;
  arrivingTerminalName: string;
  scheduledDeparture: Date;
  estimatedArrival: Date;
  lastUpdated: Date;
  leftDock?: Date;
  eta?: Date;
  opRouteAbbrev?: string[];
  vesselPositionNum?: number;
  sortSeq?: number;
  managedBy?: number; // 1 for WSF, 2 for KCM
  timestamp?: Date;
};

/**
 * Vessel verbose information from WSF Vessels API
 * Based on /vesselverbose endpoint
 */
export type VesselVerbose = {
  vesselId: number;
  vesselName: string;
  abbrev: string;
  vesselClass: string;
  inService: boolean;
  active: boolean;
  yearBuilt: number;
  displacement: number;
  length: number;
  breadth: number;
  draft: number;
  carCapacity: number;
  passengerCapacity: number;
  maxPassengers: number;
  maxVehicles: number;
  maxGrossTonnage: number;
  horsepower: number;
  maxSpeed: number;
  homeTerminalId: number;
  homeTerminalName: string;
  accommodations: VesselAccommodation[];
  stats: VesselStats[];
  location: VesselLocation;
};

/**
 * Vessels cache flush date response
 */
export type VesselsCacheFlushDate = {
  lastUpdated: Date;
  source: string;
};
