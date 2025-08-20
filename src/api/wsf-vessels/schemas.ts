import { z } from "zod";

import {
  zFlexibleDate,
  zNullableNumber,
  zNullableString,
  zPositiveInteger,
} from "@/shared/validation";

const zDate = () => z.date();
const zNullableDate = () => z.date().nullable();

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
  .catchall(z.unknown());

export const vesselBasicSchema = z
  .object({
    VesselID: z.number(),
    VesselSubjectID: z.number(),
    VesselName: z.string(),
    VesselAbbrev: z.string(),
    Class: vesselClassSchema,
    Status: z.number(),
    OwnedByWSF: z.boolean(),
  })
  .catchall(z.unknown());

export const vesselAccommodationSchema = z
  .object({
    VesselID: z.number(),
    VesselSubjectID: z.number(),
    VesselName: z.string(),
    VesselAbbrev: z.string(),
    Class: vesselClassSchema,
    CarDeckRestroom: z.boolean(),
    CarDeckShelter: z.boolean(),
    Elevator: z.boolean(),
    ADAAccessible: z.boolean(),
    MainCabinGalley: z.boolean(),
    MainCabinRestroom: z.boolean(),
    PublicWifi: z.boolean(),
    ADAInfo: z.string(),
    AdditionalInfo: zNullableString(),
  })
  .catchall(z.unknown());

export const vesselStatsSchema = z
  .object({
    VesselID: z.number(),
    VesselSubjectID: z.number(),
    VesselName: z.string(),
    VesselAbbrev: z.string(),
    Class: vesselClassSchema,
    VesselNameDesc: z.string(),
    VesselHistory: zNullableString(),
    Beam: z.string(),
    CityBuilt: z.string(),
    SpeedInKnots: z.number(),
    Draft: z.string(),
    EngineCount: z.number(),
    Horsepower: z.number(),
    Length: z.string(),
    MaxPassengerCount: z.number(),
    PassengerOnly: z.boolean(),
    FastFerry: z.boolean(),
    PropulsionInfo: z.string(),
    TallDeckClearance: z.number(),
    RegDeckSpace: z.number(),
    TallDeckSpace: z.number(),
    Tonnage: z.number(),
    Displacement: z.number(),
    YearBuilt: z.number(),
    YearRebuilt: zNullableNumber(),
    VesselDrawingImg: zNullableString(),
    SolasCertified: z.boolean(),
    MaxPassengerCountForInternational: zNullableNumber(),
  })
  .catchall(z.unknown());

export const vesselHistorySchema = z
  .object({
    VesselId: z.number(),
    Vessel: z.string(),
    Departing: zNullableString(),
    Arriving: zNullableString(),
    ScheduledDepart: zNullableDate(),
    ActualDepart: zNullableDate(),
    EstArrival: zNullableDate(),
    Date: zNullableDate(),
  })
  .catchall(z.unknown());

export const vesselLocationSchema = z
  .object({
    VesselID: z.number(),
    VesselName: z.string(),
    Mmsi: z.number(),
    DepartingTerminalID: z.number(),
    DepartingTerminalName: z.string(),
    DepartingTerminalAbbrev: z.string(),
    ArrivingTerminalID: zNullableNumber(),
    ArrivingTerminalName: zNullableString(),
    ArrivingTerminalAbbrev: zNullableString(),
    Latitude: z.number(),
    Longitude: z.number(),
    Speed: z.number(),
    Heading: z.number(),
    InService: z.boolean(),
    AtDock: z.boolean(),
    LeftDock: zNullableDate(),
    Eta: zNullableDate(),
    EtaBasis: zNullableString(),
    ScheduledDeparture: zNullableDate(),
    OpRouteAbbrev: z.array(z.string()),
    VesselPositionNum: zNullableNumber(),
    SortSeq: z.number(),
    ManagedBy: z.number(),
    TimeStamp: zDate(),
  })
  .catchall(z.unknown());

export const vesselVerboseSchema = z
  .object({
    VesselID: z.number(),
    VesselName: z.string(),
    VesselAbbrev: z.string(),
    Class: vesselClassSchema,
    Status: z.number(),
    OwnedByWSF: z.boolean(),
    YearBuilt: z.number(),
    Displacement: z.number(),
    Length: z.string(),
    Beam: z.string(),
    Draft: z.string(),
    SpeedInKnots: z.number(),
    EngineCount: z.number(),
    Horsepower: z.number(),
    MaxPassengerCount: z.number(),
    RegDeckSpace: z.number(),
    TallDeckSpace: z.number(),
    Tonnage: z.number(),
    PropulsionInfo: z.string(),
    ADAAccessible: z.boolean(),
    Elevator: z.boolean(),
    CarDeckRestroom: z.boolean(),
    MainCabinGalley: z.boolean(),
    MainCabinRestroom: z.boolean(),
    PublicWifi: z.boolean(),
    ADAInfo: z.string(),
    VesselNameDesc: z.string(),
    VesselHistory: zNullableString(),
    CityBuilt: z.string(),
    YearRebuilt: zNullableNumber(),
  })
  .catchall(z.unknown());

export const vesselsCacheFlushDateSchema = zDate();

// Arrays
export const vesselBasicArraySchema = z.array(vesselBasicSchema);
export const vesselAccommodationArraySchema = z.array(
  vesselAccommodationSchema
);
export const vesselStatsArraySchema = z.array(vesselStatsSchema);
export const vesselHistoryArraySchema = z.array(vesselHistorySchema);
export const vesselLocationArraySchema = z.array(vesselLocationSchema);
export const vesselVerboseArraySchema = z.array(vesselVerboseSchema);

// ============================================================================
// INPUT PARAMETER SCHEMAS
// ============================================================================

// Parameter schemas for API functions with rich MCP descriptions

export const getVesselBasicsByIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(
      "The unique identifier for the vessel in the WSF system. Each vessel has a permanent ID number used across all API endpoints. For example, vessel ID 1 corresponds to M/V Cathlamet, ID 2 to M/V Chelan, etc. This ID can be found from the getVesselBasics() endpoint."
    ),
  })
  .describe(
    "Parameters for retrieving basic information about a specific vessel by its unique identifier"
  );

export const getVesselLocationsByVesselIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(
      "The unique identifier for the vessel whose location you want to track. This corresponds to the VesselID field from vessel basic information. Use this to get real-time GPS coordinates, speed, heading, and operational status for a specific ferry."
    ),
  })
  .describe(
    "Parameters for retrieving real-time location data for a specific vessel"
  );

export const getVesselAccommodationsByIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(
      "The unique identifier for the vessel whose accommodation details you want to retrieve. This will return information about passenger capacity, vehicle capacity, ADA accessibility, amenities like restrooms and Wi-Fi, and other accommodation features specific to that vessel."
    ),
  })
  .describe(
    "Parameters for retrieving detailed accommodation information for a specific vessel"
  );

export const getVesselStatsByIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(
      "The unique identifier for the vessel whose technical specifications and statistics you want to retrieve. This returns detailed information about the vessel's physical characteristics, capacity, engine specifications, and operational statistics."
    ),
  })
  .describe(
    "Parameters for retrieving comprehensive statistics and specifications for a specific vessel"
  );

export const getVesselVerboseByIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(
      "The unique identifier for the vessel whose complete detailed information you want to retrieve. This returns the most comprehensive dataset available, combining basic info, accommodations, statistics, and specifications in a single response."
    ),
  })
  .describe(
    "Parameters for retrieving complete verbose information for a specific vessel"
  );

export const getVesselHistoryByVesselAndDateRangeParamsSchema = z
  .object({
    vesselName: z
      .string()
      .min(1, "Vessel name cannot be empty")
      .describe(
        "The name of the vessel without the 'M/V' prefix (e.g., 'Cathlamet', 'Spokane', 'Walla Walla'). This should match the vessel name exactly as it appears in the WSF system. You can get valid vessel names from the getVesselBasics() endpoint using the VesselName field with the 'M/V ' prefix removed."
      ),
    dateStart: zFlexibleDate().describe(
      "The start date for the historical data range. Can be provided as a JavaScript Date object or ISO date string (YYYY-MM-DD). The API will return vessel operational history starting from this date. Note that historical data availability may be limited for dates too far in the past."
    ),
    dateEnd: zFlexibleDate().describe(
      "The end date for the historical data range. Can be provided as a JavaScript Date object or ISO date string (YYYY-MM-DD). Must be the same date or after the dateStart. The API will return vessel operational history up to and including this date."
    ),
  })
  .refine(
    (data) => {
      const start =
        data.dateStart instanceof Date
          ? data.dateStart
          : new Date(data.dateStart);
      const end =
        data.dateEnd instanceof Date ? data.dateEnd : new Date(data.dateEnd);
      return start <= end;
    },
    {
      message: "dateStart must be before or equal to dateEnd",
      path: ["dateEnd"],
    }
  )
  .describe(
    "Parameters for fetching historical operational data for a specific vessel within a date range. Useful for analyzing vessel routes, schedules, and operational patterns over time."
  );

export const getMultipleVesselHistoriesParamsSchema = z
  .object({
    vesselNames: z
      .array(z.string().min(1))
      .min(1, "At least one vessel name is required")
      .describe(
        "Array of vessel names without the 'M/V' prefix (e.g., ['Cathlamet', 'Spokane', 'Walla Walla']). Each name should match exactly as it appears in the WSF system. This allows fetching historical data for multiple vessels in a single operation, which is more efficient than individual calls."
      ),
    dateStart: zFlexibleDate().describe(
      "The start date for the historical data range for all specified vessels. All vessels will be queried for the same date range."
    ),
    dateEnd: zFlexibleDate().describe(
      "The end date for the historical data range for all specified vessels. Must be the same date or after dateStart."
    ),
    batchSize: z
      .number()
      .int()
      .positive()
      .max(20)
      .optional()
      .default(6)
      .describe(
        "Optional batch size for processing requests to avoid overwhelming the server. Default is 6 concurrent requests. Larger values may be faster but could hit rate limits. Smaller values are more conservative but slower."
      ),
  })
  .refine(
    (data) => {
      const start =
        data.dateStart instanceof Date
          ? data.dateStart
          : new Date(data.dateStart);
      const end =
        data.dateEnd instanceof Date ? data.dateEnd : new Date(data.dateEnd);
      return start <= end;
    },
    {
      message: "dateStart must be before or equal to dateEnd",
      path: ["dateEnd"],
    }
  )
  .describe(
    "Parameters for fetching historical operational data for multiple vessels within the same date range. Efficiently retrieves historical data for several vessels with automatic batching to respect server limits."
  );

export const getAllVesselHistoriesParamsSchema = z
  .object({
    dateStart: zFlexibleDate().describe(
      "The start date for the historical data range for all vessels in the WSF fleet. This will query all 21 active vessels for the specified date range."
    ),
    dateEnd: zFlexibleDate().describe(
      "The end date for the historical data range for all vessels. Must be the same date or after dateStart. Be cautious with large date ranges as this queries the entire fleet."
    ),
    batchSize: z
      .number()
      .int()
      .positive()
      .max(10)
      .optional()
      .default(6)
      .describe(
        "Optional batch size for processing requests. Default is 6 concurrent requests. Since this queries all 21 vessels, smaller batch sizes are recommended to avoid overwhelming the server."
      ),
  })
  .refine(
    (data) => {
      const start =
        data.dateStart instanceof Date
          ? data.dateStart
          : new Date(data.dateStart);
      const end =
        data.dateEnd instanceof Date ? data.dateEnd : new Date(data.dateEnd);
      return start <= end;
    },
    {
      message: "dateStart must be before or equal to dateEnd",
      path: ["dateEnd"],
    }
  )
  .describe(
    "Parameters for fetching historical operational data for all vessels in the Washington State Ferries fleet within a date range. This is a comprehensive query that retrieves data for all 21 active vessels, so use with caution for large date ranges."
  );

// Types
export type VesselAccommodation = z.infer<typeof vesselAccommodationSchema>;
export type VesselBasic = z.infer<typeof vesselBasicSchema>;
export type VesselClass = z.infer<typeof vesselClassSchema>;
export type VesselHistory = z.infer<typeof vesselHistorySchema>;
export type VesselLocation = z.infer<typeof vesselLocationSchema>;
export type VesselsCacheFlushDate = z.infer<typeof vesselsCacheFlushDateSchema>;
export type VesselStats = z.infer<typeof vesselStatsSchema>;
export type VesselVerbose = z.infer<typeof vesselVerboseSchema>;

// Parameter types
export type GetAllVesselHistoriesParams = z.infer<
  typeof getAllVesselHistoriesParamsSchema
>;
export type GetMultipleVesselHistoriesParams = z.infer<
  typeof getMultipleVesselHistoriesParamsSchema
>;
export type GetVesselAccommodationsByIdParams = z.infer<
  typeof getVesselAccommodationsByIdParamsSchema
>;
export type GetVesselBasicsByIdParams = z.infer<
  typeof getVesselBasicsByIdParamsSchema
>;
export type GetVesselHistoryByVesselAndDateRangeParams = z.infer<
  typeof getVesselHistoryByVesselAndDateRangeParamsSchema
>;
export type GetVesselLocationsByVesselIdParams = z.infer<
  typeof getVesselLocationsByVesselIdParamsSchema
>;
export type GetVesselStatsByIdParams = z.infer<
  typeof getVesselStatsByIdParamsSchema
>;
export type GetVesselVerboseByIdParams = z.infer<
  typeof getVesselVerboseByIdParamsSchema
>;
