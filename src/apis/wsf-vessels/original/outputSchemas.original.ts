import { z } from "zod";
import { zWsdotDate } from "@/apis/shared";

/**
 * VesselClass schema
 *
 * Similar vessels in the fleet are grouped into the same class.
 */
export const vesselClassSchema = z
  .object({
    /** Unique identifier for a vessel class. */
    ClassID: z.number().int().describe("Unique identifier for a vessel class."),
    /** Identifies this vessel class as a unique WSF subject. */
    ClassSubjectID: z
      .number()
      .int()
      .describe("Identifies this vessel class as a unique WSF subject."),
    /** The name of the vessel class. */
    ClassName: z.string().nullable().describe("The name of the vessel class."),
    /**
     * A preferred sort order (sort-ascending with respect to other vessel classes).
     */
    SortSeq: z
      .number()
      .int()
      .nullable()
      .describe(
        "A preferred sort order (sort-ascending with respect to other vessel classes)."
      ),
    /**
     * A URL that points to a detailed drawing of the vessel class.
     */
    DrawingImg: z
      .string()
      .nullable()
      .describe("A URL that points to a detailed drawing of the vessel class."),
    /**
     * A URL that points to a small drawing of the vessel class.
     */
    SilhouetteImg: z
      .string()
      .nullable()
      .describe("A URL that points to a small drawing of the vessel class."),
    /**
     * The name of this vessel class, formatted for the public.
     */
    PublicDisplayName: z
      .string()
      .nullable()
      .describe("The name of this vessel class, formatted for the public."),
  })
  .describe(
    "Similar vessels in the fleet are grouped into the same class. This object describes the class associated with this vessel."
  );

export type VesselClass = z.infer<typeof vesselClassSchema>;

/**
 * Base vessel schema containing common vessel fields
 */
export const vesselBaseSchema = z.object({
  /** Unique identifier for a vessel. */
  VesselID: z.number().int().describe("Unique identifier for a vessel."),
  /** Identifies this vessel as a unique WSF subject. */
  VesselSubjectID: z
    .number()
    .int()
    .describe("Identifies this vessel as a unique WSF subject."),
  /** The name of the vessel. */
  VesselName: z.string().nullable().describe("The name of the vessel."),
  /** The vessel's abbreviation. */
  VesselAbbrev: z.string().nullable().describe("The vessel's abbreviation."),
  Class: vesselClassSchema.nullable(),
});

export type VesselBase = z.infer<typeof vesselBaseSchema>;

/**
 * VesselBasic schema
 *
 * Contains the most basic / brief information pertaining to vessels.
 */
export const vesselBasicSchema = vesselBaseSchema.extend({
  /**
   * Indicates the operational status of the vessel. 1 for In Service, 2 for Maintenance and 3 for Out of Service. (1 = InService, 2 = Maintenance, 3 = OutOfService).
   */
  Status: z
    .union([z.literal(1), z.literal(2), z.literal(3)])
    .nullable()
    .describe(
      "Indicates the operational status of the vessel. 1 for In Service, 2 for Maintenance and 3 for Out of Service. (1 = InService, 2 = Maintenance, 3 = OutOfService)."
    ),
  /**
   * Indicates whether or not the vessel is owned by WSF.
   */
  OwnedByWSF: z
    .boolean()
    .describe("Indicates whether or not the vessel is owned by WSF."),
});

export type VesselBasic = z.infer<typeof vesselBasicSchema>;

/**
 * VesselAccommodations schema
 *
 * Provides details regarding vessel accommodations (bathrooms, galley, elevator, etc).
 */
export const vesselAccommodationsSchema = vesselBaseSchema
  .extend({
    /**
     * Indicates whether or not the vessel has an ADA restroom on the car deck.
     */
    CarDeckRestroom: z
      .boolean()
      .describe(
        "Indicates whether or not the vessel has an ADA restroom on the car deck."
      ),
    /**
     * Indicates whether or not the vessel has an ADA shelter on the car deck.
     */
    CarDeckShelter: z
      .boolean()
      .describe(
        "Indicates whether or not the vessel has an ADA shelter on the car deck."
      ),
    /**
     * Indicates whether or not the vessel has an elevator.
     */
    Elevator: z
      .boolean()
      .describe("Indicates whether or not the vessel has an elevator."),
    /**
     * Indicates whether or not the vessel is ADA accessible.
     */
    ADAAccessible: z
      .boolean()
      .describe("Indicates whether or not the vessel is ADA accessible."),
    /**
     * Indicates whether or not the vessel has a galley in the main cabin.
     */
    MainCabinGalley: z
      .boolean()
      .describe(
        "Indicates whether or not the vessel has a galley in the main cabin."
      ),
    /**
     * Indicates whether or not the vessel has a restroom in the main cabin.
     */
    MainCabinRestroom: z
      .boolean()
      .describe(
        "Indicates whether or not the vessel has a restroom in the main cabin."
      ),
    /**
     * Indicates whether or not Wifi is available on the vessel.
     */
    PublicWifi: z
      .boolean()
      .describe("Indicates whether or not Wifi is available on the vessel."),
    /**
     * Additional ADA notes concerning this vessel.
     */
    ADAInfo: z
      .string()
      .nullable()
      .describe("Additional ADA notes concerning this vessel."),
    /**
     * Additional miscellaneous notes concerning this vessel.
     */
    AdditionalInfo: z
      .string()
      .nullable()
      .describe("Additional miscellaneous notes concerning this vessel."),
  })
  .describe(
    "Provides details regarding vessel accommodations (bathrooms, galley, elevator, etc)."
  );

export type VesselAccommodations = z.infer<typeof vesselAccommodationsSchema>;

/**
 * VesselStats schema
 *
 * Provides details regarding vessel specifications (engine count, length of vessel, year built, etc).
 */
export const vesselStatsSchema = vesselBaseSchema
  .extend({
    /**
     * The definition or significance behind the name of the vessel.
     */
    VesselNameDesc: z
      .string()
      .describe(
        "The definition or significance behind the name of the vessel."
      ),
    /** The history of the vessel. */
    VesselHistory: z.string().nullable().describe("The history of the vessel."),
    /**
     * The length of the vessel's beam in feet / inches.
     */
    Beam: z
      .string()
      .describe("The length of the vessel's beam in feet / inches."),
    /**
     * The location where the vessel was built.
     */
    CityBuilt: z.string().describe("The location where the vessel was built."),
    /** The speed of the vessel. */
    SpeedInKnots: z
      .number()
      .int()
      .nullable()
      .describe("The speed of the vessel."),
    /**
     * The draft of the vessel in feet / inches.
     */
    Draft: z.string().describe("The draft of the vessel in feet / inches."),
    /**
     * The total count of engines aboard the vessel.
     */
    EngineCount: z
      .number()
      .int()
      .nullable()
      .describe("The total count of engines aboard the vessel."),
    /** The horsepower of the vessel. */
    Horsepower: z
      .number()
      .int()
      .nullable()
      .describe("The horsepower of the vessel."),
    /**
     * The length of the vessel in feet / inches.
     */
    Length: z.string().describe("The length of the vessel in feet / inches."),
    /**
     * The max passenger count aboard the vessel.
     */
    MaxPassengerCount: z
      .number()
      .int()
      .nullable()
      .describe("The max passenger count aboard the vessel."),
    /**
     * Indicates whether or not this vessel supports vehicles (true for passenger only, false for vehicles and passengers).
     */
    PassengerOnly: z
      .boolean()
      .describe(
        "Indicates whether or not this vessel supports vehicles (true for passenger only, false for vehicles and passengers)."
      ),
    /**
     * Indicates whether or not this vessel is considered a fast ferry.
     */
    FastFerry: z
      .boolean()
      .describe(
        "Indicates whether or not this vessel is considered a fast ferry."
      ),
    /**
     * The type of engine used in this vessel.
     */
    PropulsionInfo: z
      .string()
      .describe("The type of engine used in this vessel."),
    /**
     * The auto deck clearance (in inches) aboard the vessel.
     */
    TallDeckClearance: z
      .number()
      .int()
      .nullable()
      .describe("The auto deck clearance (in inches) aboard the vessel."),
    /**
     * The max number of vehicles (includes TallDeckSpace).
     */
    RegDeckSpace: z
      .number()
      .int()
      .nullable()
      .describe("The max number of vehicles (includes TallDeckSpace)."),
    /**
     * The total number of tall deck spaces associated with this vessel.
     */
    TallDeckSpace: z
      .number()
      .int()
      .nullable()
      .describe(
        "The total number of tall deck spaces associated with this vessel."
      ),
    /** The tonnage of the vessel. */
    Tonnage: z.number().int().nullable().describe("The tonnage of the vessel."),
    /**
     * The displacement (weight in long tons) of the vessel.
     */
    Displacement: z
      .number()
      .int()
      .nullable()
      .describe("The displacement (weight in long tons) of the vessel."),
    /** The year the vessel was built. */
    YearBuilt: z
      .number()
      .int()
      .nullable()
      .describe("The year the vessel was built."),
    /** The year the vessel was rebuilt. */
    YearRebuilt: z
      .number()
      .int()
      .nullable()
      .describe("The year the vessel was rebuilt."),
    /**
     * A URL that points to a detailed drawing of the vessel. If not available, the DrawingImg from the vessel class may be used.
     */
    VesselDrawingImg: z
      .string()
      .nullable()
      .describe(
        "A URL that points to a detailed drawing of the vessel. If not available, the DrawingImg from the vessel class may be used."
      ),
    /**
     * Indicates whether or not the vessel is certified for international travel.
     */
    SolasCertified: z
      .boolean()
      .describe(
        "Indicates whether or not the vessel is certified for international travel."
      ),
    /**
     * The max passenger count aboard the vessel for international travel.
     */
    MaxPassengerCountForInternational: z
      .number()
      .int()
      .nullable()
      .describe(
        "The max passenger count aboard the vessel for international travel."
      ),
  })
  .describe(
    "Provides details regarding vessel specifications (engine count, length of vessel, year built, etc)."
  );

export type VesselStats = z.infer<typeof vesselStatsSchema>;

/**
 * VesselLocations schema
 *
 * Provides vessel locations and associated ETA data.
 */
export const vesselLocationsSchema = z
  .object({
    /** Unique identifier for a vessel. */
    VesselID: z.number().int().describe("Unique identifier for a vessel."),
    /** The name of the vessel. */
    VesselName: z.string().nullable().describe("The name of the vessel."),
    /**
     * The vessel's Maritime Mobile Service Identity.
     */
    Mmsi: z
      .number()
      .int()
      .nullable()
      .describe("The vessel's Maritime Mobile Service Identity."),
    /**
     * Unique identifier pertaining to the terminal where this vessel is docked or was last docked.
     */
    DepartingTerminalID: z
      .number()
      .int()
      .describe(
        "Unique identifier pertaining to the terminal where this vessel is docked or was last docked."
      ),
    /**
     * The name of the terminal where this vessel is docked or was last docked.
     */
    DepartingTerminalName: z
      .string()
      .nullable()
      .describe(
        "The name of the terminal where this vessel is docked or was last docked."
      ),
    /**
     * The abbreviated terminal name where this vessel is docked or was last docked.
     */
    DepartingTerminalAbbrev: z
      .string()
      .nullable()
      .describe(
        "The abbreviated terminal name where this vessel is docked or was last docked."
      ),
    /**
     * Unique identifier pertaining to the terminal that represents the vessel's next destination. Might not be present if the next scheduled destination is still being determined.
     */
    ArrivingTerminalID: z
      .number()
      .int()
      .nullable()
      .describe(
        "Unique identifier pertaining to the terminal that represents the vessel's next destination. Might not be present if the next scheduled destination is still being determined."
      ),
    /**
     * The name of the terminal that represents the vessel's next destination. Might not be present if the next scheduled destination is still being determined.
     */
    ArrivingTerminalName: z
      .string()
      .nullable()
      .describe(
        "The name of the terminal that represents the vessel's next destination. Might not be present if the next scheduled destination is still being determined."
      ),
    /**
     * The abbreviated terminal name that represent's the vessel's next destination. Might not be present if the next scheduled destination is still being determined.
     */
    ArrivingTerminalAbbrev: z
      .string()
      .nullable()
      .describe(
        "The abbreviated terminal name that represent's the vessel's next destination. Might not be present if the next scheduled destination is still being determined."
      ),
    /** The latitude of the vessel. */
    Latitude: z.number().describe("The latitude of the vessel."),
    /** The longitude of the vessel. */
    Longitude: z.number().describe("The longitude of the vessel."),
    /** The speed of the vessel (in Knots). */
    Speed: z.number().describe("The speed of the vessel (in Knots)."),
    /** The heading of the vessel (in degrees). */
    Heading: z.number().describe("The heading of the vessel (in degrees)."),
    /**
     * Indicates whether or not the vessel is in service.
     */
    InService: z
      .boolean()
      .describe("Indicates whether or not the vessel is in service."),
    /**
     * Indicates whether or not the vessel is docked.
     */
    AtDock: z
      .boolean()
      .describe("Indicates whether or not the vessel is docked."),
    /**
     * The date and time that the vessel last left the dock. This value is not present when docked.
     */
    LeftDock: zWsdotDate()
      .nullable()
      .describe(
        "The date and time that the vessel last left the dock. This value is not present when docked."
      ),
    /**
     * The estimated date and time that the vessel will arrive at its destination. This value is not present when docked.
     */
    Eta: zWsdotDate()
      .nullable()
      .describe(
        "The estimated date and time that the vessel will arrive at its destination. This value is not present when docked."
      ),
    /**
     * A brief description summarizing how the Eta is being calculated. This value is not present when docked.
     */
    EtaBasis: z
      .string()
      .nullable()
      .describe(
        "A brief description summarizing how the Eta is being calculated. This value is not present when docked."
      ),
    /**
     * The date and time when this vessel was or is scheduled to leave its departing terminal. Might not be present if the next scheduled destination is still being determined.
     */
    ScheduledDeparture: zWsdotDate()
      .nullable()
      .describe(
        "The date and time when this vessel was or is scheduled to leave its departing terminal. Might not be present if the next scheduled destination is still being determined."
      ),
    /**
     * An list of strings that contain 0 or more abbreviated route names currently being serviced by this vessel.
     */
    OpRouteAbbrev: z
      .array(z.string())
      .nullable()
      .describe(
        "An list of strings that contain 0 or more abbreviated route names currently being serviced by this vessel."
      ),
    /**
     * For a given route, the number used to identify the scheduled departures being serviced by this vessel. Not present if vessel is not in service.
     */
    VesselPositionNum: z
      .number()
      .int()
      .nullable()
      .describe(
        "For a given route, the number used to identify the scheduled departures being serviced by this vessel. Not present if vessel is not in service."
      ),
    /**
     * A preferred sort order (sort-ascending with respect to other vessels).
     */
    SortSeq: z
      .number()
      .int()
      .describe(
        "A preferred sort order (sort-ascending with respect to other vessels)."
      ),
    /**
     * Indicates who manages this vessel. 1 for WSF, 2 for KCM. (1 = WSF, 2 = KCM).
     */
    ManagedBy: z
      .union([z.literal(1), z.literal(2)])
      .describe(
        "Indicates who manages this vessel. 1 for WSF, 2 for KCM. (1 = WSF, 2 = KCM)."
      ),
    /**
     * The date and time when this vessel location was last updated.
     */
    TimeStamp: zWsdotDate().describe(
      "The date and time when this vessel location was last updated."
    ),
    /**
     * Vessel watch shutdown identifier.
     */
    VesselWatchShutID: z
      .number()
      .int()
      .describe("Vessel watch shutdown identifier."),
    /**
     * Vessel watch shutdown message.
     */
    VesselWatchShutMsg: z
      .string()
      .nullable()
      .describe("Vessel watch shutdown message."),
    /**
     * Vessel watch shutdown flag.
     */
    VesselWatchShutFlag: z
      .string()
      .nullable()
      .describe("Vessel watch shutdown flag."),
    /**
     * Vessel watch status.
     */
    VesselWatchStatus: z.string().nullable().describe("Vessel watch status."),
    /**
     * Vessel watch message.
     */
    VesselWatchMsg: z.string().nullable().describe("Vessel watch message."),
  })
  .describe("Provides vessel locations and associated ETA data.");

export type VesselLocations = z.infer<typeof vesselLocationsSchema>;

/**
 * VesselVerbose schema
 *
 * Contains highly detailed information pertaining to vessels, combining data from
 * basic details, accommodations, and stats endpoints.
 */
export const vesselVerboseSchema = vesselBasicSchema
  .and(vesselAccommodationsSchema)
  .and(vesselStatsSchema)
  .describe(
    "Contains highly detailed information pertaining to vessels, combining data from basic details, accommodations, and stats endpoints."
  );

export type VesselVerbose = z.infer<typeof vesselVerboseSchema>;

/**
 * CacheFlushDate schema
 *
 * Provides the cache flush date for coordinating data caching.
 */
export const cacheFlushDateSchema = z
  .object({
    /**
     * The date and time when the cache was last flushed.
     */
    CacheFlushDate: zWsdotDate().describe(
      "The date and time when the cache was last flushed."
    ),
  })
  .describe("Provides the cache flush date for coordinating data caching.");

export type CacheFlushDate = z.infer<typeof cacheFlushDateSchema>;

/**
 * VesselHistoryResponse schema
 *
 * Contains vessel history information including departure and arrival details.
 */
export const vesselHistoryResponseSchema = z
  .object({
    /** Unique identifier for a vessel. */
    VesselId: z.number().int().describe("Unique identifier for a vessel."),
    /** The name of the vessel. */
    Vessel: z.string().nullable().describe("The name of the vessel."),
    /** The departing terminal name. */
    Departing: z.string().nullable().describe("The departing terminal name."),
    /** The arriving terminal name. */
    Arriving: z.string().nullable().describe("The arriving terminal name."),
    /** The scheduled departure time. */
    ScheduledDepart: zWsdotDate()
      .nullable()
      .describe("The scheduled departure time."),
    /** The actual departure time. */
    ActualDepart: zWsdotDate()
      .nullable()
      .describe("The actual departure time."),
    /** The estimated arrival time. */
    EstArrival: zWsdotDate().nullable().describe("The estimated arrival time."),
    /** The date of the voyage. */
    Date: zWsdotDate().nullable().describe("The date of the voyage."),
  })
  .describe(
    "Contains vessel history information including departure and arrival details."
  );

export type VesselHistoryResponse = z.infer<typeof vesselHistoryResponseSchema>;

/**
 * Vessel Basic Details List Schema
 *
 * List of vessel basic details for endpoints that return multiple vessels.
 */
export const vesselBasicDetailsListSchema = z
  .array(vesselBasicSchema)
  .describe("List of vessel basic details.");

export type VesselBasicDetailsList = z.infer<
  typeof vesselBasicDetailsListSchema
>;

/**
 * Vessel Accommodations List Schema
 *
 * List of vessel accommodations for endpoints that return multiple vessels.
 */
export const vesselAccommodationsListSchema = z
  .array(vesselAccommodationsSchema)
  .describe("List of vessel accommodations.");

export type VesselAccommodationsList = z.infer<
  typeof vesselAccommodationsListSchema
>;

/**
 * Vessel Stats List Schema
 *
 * List of vessel statistics for endpoints that return multiple vessels.
 */
export const vesselStatsListSchema = z
  .array(vesselStatsSchema)
  .describe("List of vessel statistics.");

export type VesselStatsList = z.infer<typeof vesselStatsListSchema>;

/**
 * Vessel Locations List Schema
 *
 * List of vessel locations for endpoints that return multiple vessels.
 */
export const vesselLocationsListSchema = z
  .array(vesselLocationsSchema)
  .describe("List of vessel locations.");

export type VesselLocationsList = z.infer<typeof vesselLocationsListSchema>;

/**
 * Vessel Verbose Details List Schema
 *
 * List of vessel verbose details for endpoints that return multiple vessels.
 */
export const vesselVerboseDetailsListSchema = z
  .array(vesselVerboseSchema)
  .describe("List of vessel verbose details.");

export type VesselVerboseDetailsList = z.infer<
  typeof vesselVerboseDetailsListSchema
>;

/**
 * Vessel History Response List Schema
 *
 * List of vessel history responses for endpoints that return multiple vessels.
 */
export const vesselHistoryResponseListSchema = z
  .array(vesselHistoryResponseSchema)
  .describe("List of vessel history responses.");

export type VesselHistoryResponseList = z.infer<
  typeof vesselHistoryResponseListSchema
>;
