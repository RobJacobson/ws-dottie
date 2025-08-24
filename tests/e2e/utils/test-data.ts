/**
 * Shared test data for WSDOT and WSF APIs
 *
 * This file contains valid test data that can be used across multiple endpoints.
 * The data is organized by API module and includes both valid and invalid test cases.
 */

// ============================================================================
// WSDOT TEST DATA
// ============================================================================

export const wsdotTestData = {
  // Highway Cameras
  highwayCameras: {
    validCameraIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    invalidCameraIds: [-1, 0, 999999, NaN],
    validRegions: [
      "Olympic",
      "Northwest",
      "North Central",
      "Northeast",
      "Southwest",
      "South Central",
      "Southeast",
    ],
  },

  // Highway Alerts
  highwayAlerts: {
    validRegionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    invalidRegionIds: [-1, 0, 999999],
    validEventCategories: [
      "Construction",
      "Incident",
      "Weather",
      "Special Event",
    ],
    validMapAreas: ["Seattle", "Tacoma", "Spokane", "Olympia"],
  },

  // Traffic Flow
  trafficFlow: {
    validFlowIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    invalidFlowIds: [-1, 0, 999999],
  },

  // Travel Times
  travelTimes: {
    validTravelTimeIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    invalidTravelTimeIds: [-1, 0, 999999],
  },

  // Toll Rates
  tollRates: {
    validTripIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    invalidTripIds: [-1, 0, 999999],
    validDates: [
      new Date("2024-01-15"),
      new Date("2024-06-15"),
      new Date("2024-12-15"),
    ],
    invalidDates: [
      new Date("2020-01-01"), // Too far in past
      new Date("2030-01-01"), // Too far in future
    ],
  },

  // Weather Information
  weatherInformation: {
    validStationIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    invalidStationIds: [-1, 0, 999999],
    validSearchTerms: ["Seattle", "Tacoma", "Spokane", "Olympia"],
  },

  // Bridge Clearances
  bridgeClearances: {
    validBridgeIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    invalidBridgeIds: [-1, 0, 999999],
    validRouteIds: ["005", "090", "405", "520", "167", "18", "20", "101"], // Valid WSDOT route IDs
    invalidRouteIds: ["", "invalid", "999", "000", "abc"],
  },

  // Mountain Pass Conditions
  mountainPassConditions: {
    validPassIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    invalidPassIds: [-1, 0, 999999],
  },

  // Commercial Vehicle Restrictions
  commercialVehicleRestrictions: {
    validRestrictionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    invalidRestrictionIds: [-1, 0, 999999],
  },

  // Border Crossings
  borderCrossings: {
    validCrossingIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    invalidCrossingIds: [-1, 0, 999999],
  },

  // Weather Stations
  weatherStations: {
    validStationIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    invalidStationIds: [-1, 0, 999999],
  },
};

// ============================================================================
// WSF TEST DATA
// ============================================================================

export const wsfTestData = {
  // Vessels
  vessels: {
    validVesselIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    invalidVesselIds: [-1, 0, 999999],
    validVesselNames: ["Wenatchee", "Tacoma", "Puyallup", "Spokane"],
    validDates: [
      new Date("2024-01-15"),
      new Date("2024-06-15"),
      new Date("2024-12-15"),
    ],
    invalidDates: [
      new Date("2020-01-01"), // Too far in past
      new Date("2030-01-01"), // Too far in future
    ],
  },

  // Terminals
  terminals: {
    validTerminalIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    invalidTerminalIds: [-1, 0, 999999],
    validTerminalNames: ["Seattle", "Bainbridge", "Bremerton", "Fauntleroy"],
  },

  // Schedule
  schedule: {
    validRouteIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    invalidRouteIds: [-1, 0, 999999],
    validSeasonIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    invalidSeasonIds: [-1, 0, 999999],
    validTripDates: [
      new Date("2024-01-15"),
      new Date("2024-06-15"),
      new Date("2024-12-15"),
    ],
    invalidTripDates: [
      new Date("2020-01-01"), // Too far in past
      new Date("2030-01-01"), // Too far in future
    ],
    validTerminalCombos: [
      { departingTerminalId: 1, arrivingTerminalId: 2 },
      { departingTerminalId: 2, arrivingTerminalId: 1 },
      { departingTerminalId: 3, arrivingTerminalId: 4 },
    ],
  },

  // Fares
  fares: {
    validTerminalIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    invalidTerminalIds: [-1, 0, 999999],
    validFareDates: [
      new Date("2024-01-15"),
      new Date("2024-06-15"),
      new Date("2024-12-15"),
    ],
    invalidFareDates: [
      new Date("2020-01-01"), // Too far in past
      new Date("2030-01-01"), // Too far in future
    ],
    validPassengerTypes: ["Adult", "Child", "Senior", "Disabled"],
  },
};

// ============================================================================
// COMMON TEST DATA
// ============================================================================

export const commonTestData = {
  // Date ranges for testing
  dates: {
    current: new Date(),
    past: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    future: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    farPast: new Date("2020-01-01"),
    farFuture: new Date("2030-01-01"),
    invalid: new Date("invalid"),
  },

  // Common invalid values
  invalidValues: {
    negativeNumbers: [-1, -10, -100, -1000],
    zero: [0],
    largeNumbers: [999999, 1000000, Number.MAX_SAFE_INTEGER],
    invalidStrings: ["", "invalid", "null", "undefined"],
    invalidTypes: [null, undefined, NaN, Infinity, -Infinity],
    invalidObjects: [{}, [], { invalid: "data" }],
  },

  // Performance thresholds
  performance: {
    fastThreshold: 1000, // 1 second
    mediumThreshold: 5000, // 5 seconds
    slowThreshold: 10000, // 10 seconds
    verySlowThreshold: 30000, // 30 seconds
  },

  // Rate limiting
  rateLimiting: {
    delayBetweenRequests: 100, // 100ms
    maxConcurrentRequests: 5,
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
  },
};

// ============================================================================
// TEST DATA HELPERS
// ============================================================================

/**
 * Get a random item from an array
 */
export const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Get multiple random items from an array
 */
export const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, array.length));
};

/**
 * Create a date that's a certain number of days from now
 */
export const createDateFromNow = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

/**
 * Create a date that's a certain number of days ago
 */
export const createDateFromPast = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

/**
 * Validate that a test data item exists
 */
export const validateTestData = <T>(data: T, context: string): T => {
  if (data === undefined || data === null) {
    throw new Error(`Test data not found for context: ${context}`);
  }
  return data;
};

/**
 * Get test data for a specific API module and endpoint
 */
export const getTestData = (
  module: "wsdot" | "wsf",
  endpoint: string,
  dataType: string
): unknown => {
  const moduleData = module === "wsdot" ? wsdotTestData : wsfTestData;
  const endpointData = moduleData[endpoint as keyof typeof moduleData];

  if (!endpointData) {
    throw new Error(`No test data found for ${module}.${endpoint}`);
  }

  const data = endpointData[dataType as keyof typeof endpointData];
  return validateTestData(data, `${module}.${endpoint}.${dataType}`);
};
