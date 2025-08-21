import { z } from "zod";

import {
  zNullableNumber,
  zNullableString,
  zWsdotDate,
  zWsdotNullableDate,
} from "@/shared/validation";

/**
 * WSF Vessels API Response Schemas
 *
 * This file contains all response/output schemas for the Washington State Ferries
 * Vessels API. These schemas validate and transform the data returned by the API
 * endpoints, ensuring type safety and consistent data structures.
 */

// ============================================================================
// UTILITY SCHEMAS
// ============================================================================

const zDate = () => zWsdotDate();
const zNullableDate = () => zWsdotNullableDate();

// ============================================================================
// VESSEL CLASS SCHEMA
// ============================================================================

export const vesselClassSchema = z
  .object({
    ClassID: z.number(),
    ClassSubjectID: z.number(),
    ClassName: z.string(),
    SortSeq: z.number(),
    DrawingImg: z.string(),
    SilhouetteImg: z.string(),
    PublicDisplayName: z.string(),
  })
  .catchall(z.unknown())
  .describe(
    "Vessel class information including class identifiers, name, and associated images. Used to categorize vessels by their type and specifications."
  );

// ============================================================================
// VESSEL BASIC SCHEMA
// ============================================================================

export const vesselBasicSchema = z
  .object({
    VesselID: z.number().describe("Unique vessel identifier in the WSF system"),
    VesselSubjectID: z
      .number()
      .describe("Internal subject identifier for the vessel"),
    VesselName: z
      .string()
      .describe(
        "Full vessel name including 'M/V' prefix (e.g., 'M/V Cathlamet')"
      ),
    VesselAbbrev: z
      .string()
      .describe("Abbreviated vessel name used in schedules and displays"),
    Class: vesselClassSchema,
    Status: z.number().describe("Operational status code for the vessel"),
    OwnedByWSF: z
      .boolean()
      .describe("Whether the vessel is owned by Washington State Ferries"),
  })
  .catchall(z.unknown())
  .describe(
    "Basic vessel information including name, abbreviation, class information, and operational status. This is the fundamental vessel data used across the WSF system."
  );

export const vesselBasicArraySchema = z
  .array(vesselBasicSchema)
  .describe(
    "Array of basic vessel information for all vessels in the WSF fleet"
  );

// ============================================================================
// VESSEL ACCOMMODATION SCHEMA
// ============================================================================

export const vesselAccommodationSchema = z
  .object({
    VesselID: z.number().describe("Unique vessel identifier in the WSF system"),
    VesselSubjectID: z
      .number()
      .describe("Internal subject identifier for the vessel"),
    VesselName: z.string().describe("Full vessel name including 'M/V' prefix"),
    VesselAbbrev: z.string().describe("Abbreviated vessel name"),
    Class: vesselClassSchema,
    CarDeckRestroom: z
      .boolean()
      .describe("Whether restroom facilities are available on the car deck"),
    CarDeckShelter: z
      .boolean()
      .describe("Whether covered shelter is available on the car deck"),
    Elevator: z
      .boolean()
      .describe("Whether elevator access is available between decks"),
    ADAAccessible: z
      .boolean()
      .describe("Whether the vessel meets ADA accessibility requirements"),
    MainCabinGalley: z
      .boolean()
      .describe("Whether food service/galley is available in the main cabin"),
    MainCabinRestroom: z
      .boolean()
      .describe("Whether restroom facilities are available in the main cabin"),
    PublicWifi: z
      .boolean()
      .describe("Whether public Wi-Fi is available on the vessel"),
    ADAInfo: z
      .string()
      .describe("Detailed information about ADA accessibility features"),
    AdditionalInfo: zNullableString().describe(
      "Additional accommodation information, if available"
    ),
  })
  .catchall(z.unknown())
  .describe(
    "Detailed accommodation information for a vessel including passenger amenities, accessibility features, and facility availability."
  );

export const vesselAccommodationArraySchema = z
  .array(vesselAccommodationSchema)
  .describe(
    "Array of accommodation information for all vessels in the WSF fleet"
  );

// ============================================================================
// VESSEL STATISTICS SCHEMA
// ============================================================================

export const vesselStatsSchema = z
  .object({
    VesselID: z.number().describe("Unique vessel identifier in the WSF system"),
    VesselSubjectID: z
      .number()
      .describe("Internal subject identifier for the vessel"),
    VesselName: z.string().describe("Full vessel name including 'M/V' prefix"),
    VesselAbbrev: z.string().describe("Abbreviated vessel name"),
    Class: vesselClassSchema,
    VesselNameDesc: z
      .string()
      .describe("Descriptive name or title for the vessel"),
    VesselHistory: zNullableString().describe(
      "Historical information about the vessel, if available"
    ),
    Beam: z.string().describe("Vessel beam (width) measurement"),
    CityBuilt: z.string().describe("City where the vessel was constructed"),
    SpeedInKnots: z
      .number()
      .describe("Maximum operating speed in nautical knots"),
    Draft: z
      .string()
      .describe("Vessel draft (depth below waterline) measurement"),
    EngineCount: z
      .number()
      .describe("Number of engines installed on the vessel"),
    Horsepower: z.number().describe("Total horsepower of all engines"),
    Length: z.string().describe("Overall length of the vessel"),
    MaxPassengerCount: z
      .number()
      .describe("Maximum passenger capacity under normal operations"),
    PassengerOnly: z
      .boolean()
      .describe("Whether this is a passenger-only vessel (no vehicles)"),
    FastFerry: z
      .boolean()
      .describe("Whether this is classified as a fast ferry"),
    PropulsionInfo: z
      .string()
      .describe("Details about the vessel's propulsion system"),
    TallDeckClearance: z
      .number()
      .describe("Clearance height for tall vehicles in feet"),
    RegDeckSpace: z
      .number()
      .describe("Regular deck space for standard vehicles"),
    TallDeckSpace: z
      .number()
      .describe("Tall deck space for oversized vehicles"),
    Tonnage: z.number().describe("Vessel tonnage measurement"),
    Displacement: z.number().describe("Vessel displacement in tons"),
    YearBuilt: z
      .number()
      .describe("Year the vessel was originally constructed"),
    YearRebuilt: zNullableNumber().describe(
      "Year the vessel was rebuilt or refurbished, if applicable"
    ),
    VesselDrawingImg: zNullableString().describe(
      "URL or path to vessel technical drawing image, if available"
    ),
    SolasCertified: z
      .boolean()
      .describe(
        "Whether the vessel is SOLAS (Safety of Life at Sea) certified"
      ),
    MaxPassengerCountForInternational: zNullableNumber().describe(
      "Maximum passenger capacity for international routes, if applicable"
    ),
  })
  .catchall(z.unknown())
  .describe(
    "Comprehensive technical statistics and specifications for a vessel including dimensions, capacity, propulsion, and certification details."
  );

export const vesselStatsArraySchema = z
  .array(vesselStatsSchema)
  .describe("Array of technical statistics for all vessels in the WSF fleet");

// ============================================================================
// VESSEL HISTORY SCHEMA
// ============================================================================

export const vesselHistorySchema = z
  .object({
    VesselId: z.number().describe("Unique vessel identifier in the WSF system"),
    Vessel: z.string().describe("Vessel name without 'M/V' prefix"),
    Departing: zNullableString().describe(
      "Name of departing terminal, if available"
    ),
    Arriving: zNullableString().describe(
      "Name of arriving terminal, if available"
    ),
    ScheduledDepart: zNullableDate().describe(
      "Scheduled departure time, if available"
    ),
    ActualDepart: zNullableDate().describe(
      "Actual departure time, if available"
    ),
    EstArrival: zNullableDate().describe(
      "Estimated arrival time, if available"
    ),
    Date: zNullableDate().describe(
      "Date of the historical record, if available"
    ),
  })
  .catchall(z.unknown())
  .describe(
    "Historical operational record for a vessel including departure/arrival information and timing data."
  );

export const vesselHistoryArraySchema = z
  .array(vesselHistorySchema)
  .describe("Array of historical operational records for vessels");

// ============================================================================
// VESSEL LOCATION SCHEMA
// ============================================================================

export const vesselLocationSchema = z
  .object({
    VesselID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique vessel identifier assigned by Washington State Ferries. Each vessel in the WSF fleet has a permanent ID number used consistently across all API endpoints. For example, vessel ID 1 always corresponds to M/V Cathlamet. This ID can be used to correlate vessel data across different API calls like schedules, accommodations, and statistics."
      ),

    VesselName: z
      .string()
      .min(1)
      .describe(
        "Full official vessel name including the 'M/V' (Motor Vessel) prefix as used by Washington State Ferries. Examples include 'M/V Cathlamet', 'M/V Spokane', 'M/V Walla Walla'. This is the name displayed on schedules and used by passengers and crew to identify vessels."
      ),

    Mmsi: z
      .number()
      .describe(
        "Maritime Mobile Service Identity (MMSI) number - a unique 9-digit identifier used for radio communications and vessel tracking systems. This is the vessel's official maritime identifier used by coast guards and marine traffic systems worldwide."
      ),

    DepartingTerminalID: z
      .number()
      .describe(
        "Unique identifier for the terminal the vessel is departing from or has most recently departed from. This corresponds to terminal IDs used throughout the WSF system and can be cross-referenced with terminal information APIs."
      ),

    DepartingTerminalName: z
      .string()
      .describe(
        "Full name of the departing terminal (e.g., 'Seattle', 'Bainbridge Island', 'Anacortes'). This is the human-readable terminal name that passengers would recognize."
      ),

    DepartingTerminalAbbrev: z
      .string()
      .describe(
        "Abbreviated code for the departing terminal used in schedules and displays (e.g., 'SEA' for Seattle, 'BI' for Bainbridge Island). These abbreviations are consistent across WSF systems."
      ),

    ArrivingTerminalID: zNullableNumber().describe(
      "Unique identifier for the terminal the vessel is traveling to. May be null if the vessel is not currently in transit or if destination information is not available."
    ),

    ArrivingTerminalName: zNullableString().describe(
      "Full name of the destination terminal. May be null if the vessel is not currently in transit or if destination information is not available."
    ),

    ArrivingTerminalAbbrev: zNullableString().describe(
      "Abbreviated code for the destination terminal. May be null if the vessel is not currently in transit or if destination information is not available."
    ),

    Latitude: z
      .number()
      .min(-90)
      .max(90)
      .describe(
        "Current vessel latitude position in decimal degrees using the WGS84 coordinate system. Range is -90 to 90 degrees, where positive values are North and negative values are South. Puget Sound area typically ranges from approximately 47.0 to 48.8 degrees North. Updated in near real-time from vessel GPS systems."
      ),

    Longitude: z
      .number()
      .min(-180)
      .max(180)
      .describe(
        "Current vessel longitude position in decimal degrees using the WGS84 coordinate system. Range is -180 to 180 degrees, where negative values are West of the Prime Meridian. Puget Sound area typically ranges from approximately -123.3 to -122.2 degrees West. Updated in near real-time from vessel GPS systems."
      ),

    Speed: z
      .number()
      .min(0)
      .describe(
        "Current vessel speed over ground in nautical knots (1 knot = 1.15078 mph). Typical ferry speeds range from 0 knots when docked to about 18-20 knots during transit. A speed of 0 usually indicates the vessel is docked, while speeds above 15 knots typically indicate active transit between terminals."
      ),

    Heading: z
      .number()
      .min(0)
      .max(359)
      .describe(
        "Current vessel heading (direction of travel) in degrees from true North. 0 degrees is North, 90 degrees is East, 180 degrees is South, 270 degrees is West. This indicates the direction the vessel's bow is pointing, which may differ from the actual direction of travel due to currents and wind."
      ),

    InService: z
      .boolean()
      .describe(
        "Indicates whether the vessel is currently in active passenger service and following its scheduled route. True means the vessel is operating normally and available for passenger/vehicle transport. False may indicate the vessel is out of service for maintenance, emergency, or other operational reasons."
      ),

    AtDock: z
      .boolean()
      .describe(
        "Indicates whether the vessel is currently docked at a terminal and likely loading/unloading passengers and vehicles. True means the vessel is at a dock, False means it's in transit or anchored. This is useful for determining if passengers can currently board the vessel."
      ),

    LeftDock: zNullableDate().describe(
      "Timestamp when the vessel last left a dock/terminal. May be null if this information is not available or if the vessel has been docked for an extended period. All times are in Pacific Time Zone (PT/PDT)."
    ),

    Eta: zNullableDate().describe(
      "Estimated Time of Arrival at the destination terminal. May be null if the vessel is not currently in transit or if ETA information is not available. All times are in Pacific Time Zone (PT/PDT)."
    ),

    EtaBasis: zNullableString().describe(
      "Basis or method used to calculate the ETA (e.g., 'GPS', 'Schedule', 'Manual'). Provides context about how reliable the ETA estimate is. May be null if ETA is not available."
    ),

    ScheduledDeparture: zNullableDate().describe(
      "Next scheduled departure time from the current or destination terminal. May be null if schedule information is not available. All times are in Pacific Time Zone (PT/PDT)."
    ),

    OpRouteAbbrev: z
      .array(z.string())
      .describe(
        "Array of operational route abbreviations that this vessel serves (e.g., ['sea-bi', 'pt-key']). These codes identify the ferry routes and can be used to understand which terminals the vessel travels between."
      ),

    VesselPositionNum: zNullableNumber().describe(
      "Position number of the vessel in its current route or queue. May be null if position information is not available. Used for operational tracking and scheduling."
    ),

    SortSeq: z
      .number()
      .describe(
        "Sort sequence number used for ordering vessels in displays and reports. Helps maintain consistent vessel ordering across different systems and interfaces."
      ),

    ManagedBy: z
      .number()
      .describe(
        "Identifier for the management system or authority responsible for this vessel. Used for internal operational management and routing decisions."
      ),

    TimeStamp: zDate().describe(
      "Timestamp indicating when this location and status data was last updated by the WSF tracking system. Data is typically updated every 30 seconds to 2 minutes. All times are in Pacific Time Zone (PT/PDT). Use this to determine how current the vessel position data is."
    ),
  })
  .catchall(z.unknown())
  .describe(
    "Real-time vessel location, speed, heading, and operational status from the Washington State Ferries vessel tracking system. This data is updated approximately every 30 seconds to 2 minutes and provides the most current information about where ferries are located and their operational status. Essential for passenger apps, logistics planning, and real-time ferry tracking applications."
  );

export const vesselLocationArraySchema = z
  .array(vesselLocationSchema)
  .describe(
    "Array of real-time location data for all active vessels in the WSF fleet"
  );

// ============================================================================
// VESSEL VERBOSE SCHEMA
// ============================================================================

export const vesselVerboseSchema = z
  .object({
    VesselID: z.number().describe("Unique vessel identifier in the WSF system"),
    VesselName: z.string().describe("Full vessel name including 'M/V' prefix"),
    VesselAbbrev: z.string().describe("Abbreviated vessel name"),
    Class: vesselClassSchema,
    Status: z.number().describe("Operational status code for the vessel"),
    OwnedByWSF: z
      .boolean()
      .describe("Whether the vessel is owned by Washington State Ferries"),
    YearBuilt: z
      .number()
      .describe("Year the vessel was originally constructed"),
    Displacement: z.number().describe("Vessel displacement in tons"),
    Length: z.string().describe("Overall length of the vessel"),
    Beam: z.string().describe("Vessel beam (width) measurement"),
    Draft: z
      .string()
      .describe("Vessel draft (depth below waterline) measurement"),
    SpeedInKnots: z
      .number()
      .describe("Maximum operating speed in nautical knots"),
    EngineCount: z
      .number()
      .describe("Number of engines installed on the vessel"),
    Horsepower: z.number().describe("Total horsepower of all engines"),
    MaxPassengerCount: z
      .number()
      .describe("Maximum passenger capacity under normal operations"),
    RegDeckSpace: z
      .number()
      .describe("Regular deck space for standard vehicles"),
    TallDeckSpace: z
      .number()
      .describe("Tall deck space for oversized vehicles"),
    Tonnage: z.number().describe("Vessel tonnage measurement"),
    PropulsionInfo: z
      .string()
      .describe("Details about the vessel's propulsion system"),
    ADAAccessible: z
      .boolean()
      .describe("Whether the vessel meets ADA accessibility requirements"),
    Elevator: z
      .boolean()
      .describe("Whether elevator access is available between decks"),
    CarDeckRestroom: z
      .boolean()
      .describe("Whether restroom facilities are available on the car deck"),
    MainCabinGalley: z
      .boolean()
      .describe("Whether food service/galley is available in the main cabin"),
    MainCabinRestroom: z
      .boolean()
      .describe("Whether restroom facilities are available in the main cabin"),
    PublicWifi: z
      .boolean()
      .describe("Whether public Wi-Fi is available on the vessel"),
    ADAInfo: z
      .string()
      .describe("Detailed information about ADA accessibility features"),
    VesselNameDesc: z
      .string()
      .describe("Descriptive name or title for the vessel"),
    VesselHistory: zNullableString().describe(
      "Historical information about the vessel, if available"
    ),
    CityBuilt: z.string().describe("City where the vessel was constructed"),
    YearRebuilt: zNullableNumber().describe(
      "Year the vessel was rebuilt or refurbished, if applicable"
    ),
  })
  .catchall(z.unknown())
  .describe(
    "Comprehensive vessel information combining basic details, technical specifications, accommodation features, and historical data. This is the most complete vessel dataset available, providing all information about a vessel in a single response."
  );

export const vesselVerboseArraySchema = z
  .array(vesselVerboseSchema)
  .describe(
    "Array of comprehensive vessel information for all vessels in the WSF fleet"
  );

// ============================================================================
// CACHE FLUSH DATE SCHEMA
// ============================================================================

export const vesselsCacheFlushDateSchema = zDate().describe(
  "Cache flush date indicating when the vessel data was last updated on the server. Used to determine data freshness and trigger cache invalidation when necessary."
);

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type VesselClass = z.infer<typeof vesselClassSchema>;
export type VesselBasic = z.infer<typeof vesselBasicSchema>;
export type VesselAccommodation = z.infer<typeof vesselAccommodationSchema>;
export type VesselStats = z.infer<typeof vesselStatsSchema>;
export type VesselHistory = z.infer<typeof vesselHistorySchema>;
export type VesselLocation = z.infer<typeof vesselLocationSchema>;
export type VesselVerbose = z.infer<typeof vesselVerboseSchema>;
export type VesselsCacheFlushDate = z.infer<typeof vesselsCacheFlushDateSchema>;
