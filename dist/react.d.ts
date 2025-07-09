/**
 * Vessel accommodations from WSF Vessels API
 * Based on /vesselaccommodations endpoint
 */
type VesselAccommodation = {
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
type VesselStats = {
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
type VesselLocation = {
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
    managedBy?: number;
    timestamp?: Date;
};
/**
 * Vessel verbose information from WSF Vessels API
 * Based on /vesselverbose endpoint
 */
type VesselVerbose = {
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
 * Terminal basics from WSF Terminals API
 * Based on /terminalbasics endpoint
 */
type TerminalBasics = {
    terminalId: number;
    terminalName: string;
    terminalAbbrev: string;
    latitude: number;
    longitude: number;
    address: string;
    phone: string;
    hasWaitTime: boolean;
    hasSpaceAvailable: boolean;
    isActive: boolean;
};
/**
 * Terminal bulletins from WSF Terminals API
 * Based on /terminalbulletins endpoint
 */
type TerminalBulletin = {
    terminalId: number;
    bulletinId: number;
    bulletinTitle: string;
    bulletinMessage: string;
    bulletinDate: Date;
    isActive: boolean;
};
/**
 * Terminal sailing space from WSF Terminals API
 * Based on /terminalsailingspace endpoint
 */
type TerminalSailingSpace = {
    terminalId: number;
    terminalName: string;
    sailingId: number;
    departureTime: Date;
    driveUpSpaces: number;
    reservationSpaces: number;
    totalSpaces: number;
    isActive: boolean;
};
/**
 * Terminal transports from WSF Terminals API
 * Based on /terminaltransports endpoint
 */
type TerminalTransport = {
    terminalId: number;
    terminalName: string;
    transportId: number;
    transportType: string;
    transportName: string;
    transportDescription: string;
    transportNotes: string;
    isActive: boolean;
};
/**
 * Terminal wait times from WSF Terminals API
 * Based on /terminalwaittimes endpoint
 */
type TerminalWaitTime = {
    terminalId: number;
    terminalName: string;
    waitTimeId: number;
    waitTimeType: "vehicle" | "passenger";
    waitTimeMinutes: number;
    waitTimeDescription: string;
    lastUpdated: Date;
    isActive: boolean;
};
/**
 * Terminal verbose from WSF Terminals API
 * Based on /terminalverbose endpoint
 */
type TerminalVerbose = {
    terminalId: number;
    terminalName: string;
    terminalAbbrev: string;
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    county: string;
    phone: string;
    hasWaitTime: boolean;
    hasSpaceAvailable: boolean;
    gisZoomLocation: {
        latitude: number;
        longitude: number;
        zoomLevel: number;
    };
    transitLinks: TerminalTransport[];
    waitTimes: TerminalWaitTime[];
    bulletins: TerminalBulletin[];
    sailingSpaces: TerminalSailingSpace[];
    isActive: boolean;
};

export type { TerminalBasics, TerminalVerbose, VesselLocation, VesselVerbose };
