import { z } from "zod";
import { zWsdotDate } from "@/apis/shared";

/**
 * VesselClass schema
 *
 * Similar vessels in the fleet are grouped into the same class.
 */
export const vesselClassSchema = z
  .object({
    ClassID: z.number().int().describe("Unique identifier for a vessel class."),
    ClassSubjectID: z
      .number()
      .int()
      .describe("Identifies this vessel class as a unique WSF subject."),
    ClassName: z.string().nullable().describe("The name of the vessel class."),
    SortSeq: z
      .number()
      .int()
      .nullable()
      .describe(
        "A preferred sort order (sort-ascending with respect to other vessel classes)."
      ),
    DrawingImg: z
      .string()
      .nullable()
      .describe("A URL that points to a detailed drawing of the vessel class."),
    SilhouetteImg: z
      .string()
      .nullable()
      .describe("A URL that points to a small drawing of the vessel class."),
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
 * VesselBasicDetails schema
 *
 * Contains the most basic / brief information pertaining to vessels.
 */
export const vesselBasicDetailsSchema = z
  .object({
    VesselID: z.number().int().describe("Unique identifier for a vessel."),
    VesselSubjectID: z
      .number()
      .int()
      .describe("Identifies this vessel as a unique WSF subject."),
    VesselName: z.string().nullable().describe("The name of the vessel."),
    VesselAbbrev: z.string().nullable().describe("The vessel's abbreviation."),
    Class: vesselClassSchema.nullable(),
    Status: z
      .union([z.literal(1), z.literal(2), z.literal(3)])
      .nullable()
      .describe(
        "Indicates the operational status of the vessel. 1 for In Service, 2 for Maintenance and 3 for Out of Service. (1 = InService, 2 = Maintenance, 3 = OutOfService)"
      ),
    OwnedByWSF: z
      .boolean()
      .describe("Indicates whether or not the vessel is owned by WSF."),
  })
  .describe(
    "Contains the most basic / brief information pertaining to vessels."
  );

export type VesselBasicDetails = z.infer<typeof vesselBasicDetailsSchema>;

/**
 * VesselAccommodations schema
 *
 * Provides details regarding vessel accommodations (bathrooms, galley, elevator, etc).
 */
export const vesselAccommodationsSchema = z
  .object({
    VesselID: z.number().int().describe("Unique identifier for a vessel."),
    VesselSubjectID: z
      .number()
      .int()
      .describe("Identifies this vessel as a unique WSF subject."),
    VesselName: z.string().describe("The name of the vessel."),
    VesselAbbrev: z.string().describe("The vessel's abbreviation."),
    Class: vesselClassSchema,
    CarDeckRestroom: z
      .boolean()
      .describe(
        "Indicates whether or not the vessel has an ADA restroom on the car deck."
      ),
    CarDeckShelter: z
      .boolean()
      .describe(
        "Indicates whether or not the vessel has an ADA shelter on the car deck."
      ),
    Elevator: z
      .boolean()
      .describe("Indicates whether or not the vessel has an elevator."),
    ADAAccessible: z
      .boolean()
      .describe("Indicates whether or not the vessel is ADA accessible."),
    MainCabinGalley: z
      .boolean()
      .describe(
        "Indicates whether or not the vessel has a galley in the main cabin."
      ),
    MainCabinRestroom: z
      .boolean()
      .describe(
        "Indicates whether or not the vessel has a restroom in the main cabin."
      ),
    PublicWifi: z
      .boolean()
      .describe("Indicates whether or not Wifi is available on the vessel."),
    ADAInfo: z
      .string()
      .nullable()
      .describe("Additional ADA notes concerning this vessel."),
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
export const vesselStatsSchema = z
  .object({
    VesselID: z.number().int().describe("Unique identifier for a vessel."),
    VesselSubjectID: z
      .number()
      .int()
      .describe("Identifies this vessel as a unique WSF subject."),
    VesselName: z.string().describe("The name of the vessel."),
    VesselAbbrev: z.string().describe("The vessel's abbreviation."),
    Class: vesselClassSchema,
    VesselNameDesc: z
      .string()
      .describe(
        "The definition or significance behind the name of the vessel."
      ),
    VesselHistory: z.string().nullable().describe("The history of the vessel."),
    Beam: z
      .string()
      .describe("The length of the vessel's beam in feet / inches."),
    CityBuilt: z.string().describe("The location where the vessel was built."),
    SpeedInKnots: z
      .number()
      .int()
      .nullable()
      .describe("The speed of the vessel."),
    Draft: z.string().describe("The draft of the vessel in feet / inches."),
    EngineCount: z
      .number()
      .int()
      .nullable()
      .describe("The total count of engines aboard the vessel."),
    Horsepower: z
      .number()
      .int()
      .nullable()
      .describe("The horsepower of the vessel."),
    Length: z.string().describe("The length of the vessel in feet / inches."),
    MaxPassengerCount: z
      .number()
      .int()
      .nullable()
      .describe("The max passenger count aboard the vessel."),
    PassengerOnly: z
      .boolean()
      .describe(
        "Indicates whether or not this vessel supports vehicles (true for passenger only, false for vehicles and passengers)."
      ),
    FastFerry: z
      .boolean()
      .describe(
        "Indicates whether or not this vessel is considered a fast ferry."
      ),
    PropulsionInfo: z
      .string()
      .describe("The type of engine used in this vessel."),
    TallDeckClearance: z
      .number()
      .int()
      .nullable()
      .describe("The auto deck clearance (in inches) aboard the vessel."),
    RegDeckSpace: z
      .number()
      .int()
      .nullable()
      .describe("The max number of vehicles (includes TallDeckSpace)."),
    TallDeckSpace: z
      .number()
      .int()
      .nullable()
      .describe(
        "The total number of tall deck spaces associated with this vessel."
      ),
    Tonnage: z.number().int().nullable().describe("The tonnage of the vessel."),
    Displacement: z
      .number()
      .int()
      .nullable()
      .describe("The displacement (weight in long tons) of the vessel."),
    YearBuilt: z
      .number()
      .int()
      .nullable()
      .describe("The year the vessel was built."),
    YearRebuilt: z
      .number()
      .int()
      .nullable()
      .describe("The year the vessel was rebuilt."),
    VesselDrawingImg: z
      .string()
      .nullable()
      .describe(
        "A URL that points to a detailed drawing of the vessel. If not available, the DrawingImg from the vessel class may be used."
      ),
    SolasCertified: z
      .boolean()
      .describe(
        "Indicates whether or not the vessel is certified for international travel."
      ),
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
    VesselID: z.number().int().describe("Unique identifier for a vessel."),
    VesselName: z.string().describe("The name of the vessel."),
    Mmsi: z
      .number()
      .int()
      .nullable()
      .describe("The vessel's Maritime Mobile Service Identity."),
    DepartingTerminalID: z
      .number()
      .int()
      .describe(
        "Unique identifier pertaining to the terminal where this vessel is docked or was last docked."
      ),
    DepartingTerminalName: z
      .string()
      .describe(
        "The name of the terminal where this vessel is docked or was last docked."
      ),
    DepartingTerminalAbbrev: z
      .string()
      .describe(
        "The abbreviated terminal name where this vessel is docked or was last docked."
      ),
    ArrivingTerminalID: z
      .number()
      .int()
      .nullable()
      .describe(
        "Unique identifier pertaining to the terminal that represents the vessel's next destination. Might not be present if the next scheduled destination is still being determined."
      ),
    ArrivingTerminalName: z
      .string()
      .nullable()
      .describe(
        "The name of the terminal that represents the vessel's next destination. Might not be present if the next scheduled destination is still being determined."
      ),
    ArrivingTerminalAbbrev: z
      .string()
      .nullable()
      .describe(
        "The abbreviated terminal name that represent's the vessel's next destination. Might not be present if the next scheduled destination is still being determined."
      ),
    Latitude: z.number().describe("The latitude of the vessel."),
    Longitude: z.number().describe("The longitude of the vessel."),
    Speed: z.number().describe("The speed of the vessel (in Knots)."),
    Heading: z.number().describe("The heading of the vessel (in degrees)."),
    InService: z
      .boolean()
      .describe("Indicates whether or not the vessel is in service."),
    AtDock: z
      .boolean()
      .describe("Indicates whether or not the vessel is docked."),
    LeftDock: zWsdotDate()
      .nullable()
      .describe(
        "The date and time that the vessel last left the dock. This value is not present when docked."
      ),
    Eta: zWsdotDate()
      .nullable()
      .describe(
        "The estimated date and time that the vessel will arrive at its destination. This value is not present when docked."
      ),
    EtaBasis: z
      .string()
      .nullable()
      .describe(
        "A brief description summarizing how the Eta is being calculated. This value is not present when docked."
      ),
    ScheduledDeparture: zWsdotDate()
      .nullable()
      .describe(
        "The date and time when this vessel was or is scheduled to leave its departing terminal. Might not be present if the next scheduled destination is still being determined."
      ),
    OpRouteAbbrev: z
      .array(z.string())
      .describe(
        "An array of strings that contain 0 or more abbreviated route names currently being serviced by this vessel."
      ),
    VesselPositionNum: z
      .number()
      .int()
      .nullable()
      .describe(
        "For a given route, the number used to identify the scheduled departures being serviced by this vessel. Not present if vessel is not in service."
      ),
    SortSeq: z
      .number()
      .int()
      .describe(
        "A preferred sort order (sort-ascending with respect to other vessels)."
      ),
    ManagedBy: z
      .union([z.literal(1), z.literal(2)])
      .describe(
        "Indicates who manages this vessel. 1 for WSF, 2 for KCM. (1 = WSF, 2 = KCM)"
      ),
    TimeStamp: zWsdotDate().describe(
      "The date and time when this vessel location was last updated."
    ),
  })
  .describe("Provides vessel locations and associated ETA data.");

export type VesselLocations = z.infer<typeof vesselLocationsSchema>;

/**
 * VesselVerboseDetails schema
 *
 * Contains highly detailed information pertaining to vessels, combining data from
 * basic details, accommodations, and stats endpoints.
 */
export const vesselVerboseDetailsSchema = z
  .object({
    VesselID: z.number().int().describe("Unique identifier for a vessel."),
    VesselSubjectID: z
      .number()
      .int()
      .describe("Identifies this vessel as a unique WSF subject."),
    VesselName: z.string().describe("The name of the vessel."),
    VesselAbbrev: z.string().describe("The vessel's abbreviation."),
    Class: vesselClassSchema,
    Status: z
      .union([z.literal(1), z.literal(2), z.literal(3)])
      .nullable()
      .describe(
        "Indicates the operational status of the vessel. 1 for In Service, 2 for Maintenance and 3 for Out of Service. (1 = InService, 2 = Maintenance, 3 = OutOfService)"
      ),
    OwnedByWSF: z
      .boolean()
      .describe("Indicates whether or not the vessel is owned by WSF."),
    CarDeckRestroom: z
      .boolean()
      .describe(
        "Indicates whether or not the vessel has an ADA restroom on the car deck."
      ),
    CarDeckShelter: z
      .boolean()
      .describe(
        "Indicates whether or not the vessel has an ADA shelter on the car deck."
      ),
    Elevator: z
      .boolean()
      .describe("Indicates whether or not the vessel has an elevator."),
    ADAAccessible: z
      .boolean()
      .describe("Indicates whether or not the vessel is ADA accessible."),
    MainCabinGalley: z
      .boolean()
      .describe(
        "Indicates whether or not the vessel has a galley in the main cabin."
      ),
    MainCabinRestroom: z
      .boolean()
      .describe(
        "Indicates whether or not the vessel has a restroom in the main cabin."
      ),
    PublicWifi: z
      .boolean()
      .describe("Indicates whether or not Wifi is available on the vessel."),
    ADAInfo: z
      .string()
      .nullable()
      .describe("Additional ADA notes concerning this vessel."),
    AdditionalInfo: z
      .string()
      .nullable()
      .describe("Additional miscellaneous notes concerning this vessel."),
    VesselNameDesc: z
      .string()
      .describe(
        "The definition or significance behind the name of the vessel."
      ),
    VesselHistory: z.string().nullable().describe("The history of the vessel."),
    Beam: z
      .string()
      .describe("The length of the vessel's beam in feet / inches."),
    CityBuilt: z.string().describe("The location where the vessel was built."),
    SpeedInKnots: z
      .number()
      .int()
      .nullable()
      .describe("The speed of the vessel."),
    Draft: z.string().describe("The draft of the vessel in feet / inches."),
    EngineCount: z
      .number()
      .int()
      .nullable()
      .describe("The total count of engines aboard the vessel."),
    Horsepower: z
      .number()
      .int()
      .nullable()
      .describe("The horsepower of the vessel."),
    Length: z.string().describe("The length of the vessel in feet / inches."),
    MaxPassengerCount: z
      .number()
      .int()
      .nullable()
      .describe("The max passenger count aboard the vessel."),
    PassengerOnly: z
      .boolean()
      .describe(
        "Indicates whether or not this vessel supports vehicles (true for passenger only, false for vehicles and passengers)."
      ),
    FastFerry: z
      .boolean()
      .describe(
        "Indicates whether or not this vessel is considered a fast ferry."
      ),
    PropulsionInfo: z
      .string()
      .describe("The type of engine used in this vessel."),
    TallDeckClearance: z
      .number()
      .int()
      .nullable()
      .describe("The auto deck clearance (in inches) aboard the vessel."),
    RegDeckSpace: z
      .number()
      .int()
      .nullable()
      .describe("The max number of vehicles (includes TallDeckSpace)."),
    TallDeckSpace: z
      .number()
      .int()
      .nullable()
      .describe(
        "The total number of tall deck spaces associated with this vessel."
      ),
    Tonnage: z.number().int().nullable().describe("The tonnage of the vessel."),
    Displacement: z
      .number()
      .int()
      .nullable()
      .describe("The displacement (weight in long tons) of the vessel."),
    YearBuilt: z
      .number()
      .int()
      .nullable()
      .describe("The year the vessel was built."),
    YearRebuilt: z
      .number()
      .int()
      .nullable()
      .describe("The year the vessel was rebuilt."),
    VesselDrawingImg: z
      .string()
      .nullable()
      .describe(
        "A URL that points to a detailed drawing of the vessel. If not available, the DrawingImg from the vessel class may be used."
      ),
    SolasCertified: z
      .boolean()
      .describe(
        "Indicates whether or not the vessel is certified for international travel."
      ),
    MaxPassengerCountForInternational: z
      .number()
      .int()
      .nullable()
      .describe(
        "The max passenger count aboard the vessel for international travel."
      ),
  })
  .describe(
    "Contains highly detailed information pertaining to vessels, combining data from basic details, accommodations, and stats endpoints."
  );

export type VesselVerboseDetails = z.infer<typeof vesselVerboseDetailsSchema>;

/**
 * CacheFlushDate schema
 *
 * Provides the cache flush date for coordinating data caching.
 */
export const cacheFlushDateSchema = z
  .object({
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
    VesselId: z.number().int().describe("Unique identifier for a vessel."),
    Vessel: z.string().nullable().describe("The name of the vessel."),
    Departing: z.string().nullable().describe("The departing terminal name."),
    Arriving: z.string().nullable().describe("The arriving terminal name."),
    ScheduledDepart: zWsdotDate()
      .nullable()
      .describe("The scheduled departure time."),
    ActualDepart: zWsdotDate()
      .nullable()
      .describe("The actual departure time."),
    EstArrival: zWsdotDate().nullable().describe("The estimated arrival time."),
    Date: zWsdotDate().nullable().describe("The date of the voyage."),
  })
  .describe(
    "Contains vessel history information including departure and arrival details."
  );

export type VesselHistoryResponse = z.infer<typeof vesselHistoryResponseSchema>;

/**
 * VesselBasicDetailsArray schema
 *
 * Array of vessel basic details for endpoints that return multiple vessels.
 */
export const vesselBasicDetailsArraySchema = z
  .array(vesselBasicDetailsSchema)
  .describe("Array of vessel basic details.");

export type VesselBasicDetailsArray = z.infer<
  typeof vesselBasicDetailsArraySchema
>;

/**
 * VesselAccommodationsArray schema
 *
 * Array of vessel accommodations for endpoints that return multiple vessels.
 */
export const vesselAccommodationsArraySchema = z
  .array(vesselAccommodationsSchema)
  .describe("Array of vessel accommodations.");

export type VesselAccommodationsArray = z.infer<
  typeof vesselAccommodationsArraySchema
>;

/**
 * VesselStatsArray schema
 *
 * Array of vessel statistics for endpoints that return multiple vessels.
 */
export const vesselStatsArraySchema = z
  .array(vesselStatsSchema)
  .describe("Array of vessel statistics.");

export type VesselStatsArray = z.infer<typeof vesselStatsArraySchema>;

/**
 * VesselLocationsArray schema
 *
 * Array of vessel locations for endpoints that return multiple vessels.
 */
export const vesselLocationsArraySchema = z
  .array(vesselLocationsSchema)
  .describe("Array of vessel locations.");

export type VesselLocationsArray = z.infer<typeof vesselLocationsArraySchema>;

/**
 * VesselVerboseDetailsArray schema
 *
 * Array of vessel verbose details for endpoints that return multiple vessels.
 */
export const vesselVerboseDetailsArraySchema = z
  .array(vesselVerboseDetailsSchema)
  .describe("Array of vessel verbose details.");

export type VesselVerboseDetailsArray = z.infer<
  typeof vesselVerboseDetailsArraySchema
>;

/**
 * VesselHistoryResponseArray schema
 *
 * Array of vessel history responses for endpoints that return multiple vessels.
 */
export const vesselHistoryResponseArraySchema = z
  .array(vesselHistoryResponseSchema)
  .describe("Array of vessel history responses.");

export type VesselHistoryResponseArray = z.infer<
  typeof vesselHistoryResponseArraySchema
>;
