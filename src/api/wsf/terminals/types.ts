// WSF Terminals API types
// Documentation: https://www.wsdot.wa.gov/ferries/api/terminals/documentation/rest.html

/**
 * Terminal basics from WSF Terminals API
 * Based on /terminalbasics endpoint
 */
export type TerminalBasics = {
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
export type TerminalBulletin = {
  terminalId: number;
  bulletinId: number;
  bulletinTitle: string;
  bulletinMessage: string;
  bulletinDate: Date;
  isActive: boolean;
};

/**
 * Terminal locations from WSF Terminals API
 * Based on /terminallocations endpoint
 */
export type TerminalLocation = {
  terminalId: number;
  terminalName: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  county: string;
  gisZoomLocation: {
    latitude: number;
    longitude: number;
    zoomLevel: number;
  };
  isActive: boolean;
};

/**
 * Terminal sailing space from WSF Terminals API
 * Based on /terminalsailingspace endpoint
 */
export type TerminalSailingSpace = {
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
export type TerminalTransport = {
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
export type TerminalWaitTime = {
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
export type TerminalVerbose = {
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

/**
 * Terminals cache flush date response
 */
export type TerminalsCacheFlushDate = {
  lastUpdated: Date;
  source: string;
};
