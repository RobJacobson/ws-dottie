import { z } from "zod";
import { roadwayLocationSchema, zWsdotDate } from "@/apis/shared";

/**
 * Schema for CVRestrictionData - represents a Commercial Vehicle Restriction
 *
 * Represents a Commercial Vehicle Restriction.
 */
export const cVRestrictionDataSchema = z
  .object({
    /** Maximum axle weight for BL classification. */
    BLMaxAxle: z
      .number()
      .nullable()
      .describe("Maximum axle weight for BL classification."),
    /** Name of the bridge. */
    BridgeName: z.string().nullable().describe("Name of the bridge."),
    /** WSDOT Identifier for bridge. */
    BridgeNumber: z
      .string()
      .nullable()
      .describe("WSDOT Identifier for bridge."),
    /** Maximum axle weight for CL8 classification. */
    CL8MaxAxle: z
      .number()
      .nullable()
      .describe("Maximum axle weight for CL8 classification."),
    /** Date when the restriction comes into effect. */
    DateEffective: zWsdotDate().describe(
      "Date when the restriction comes into effect."
    ),
    /** Date when the restriction is no longer in force. */
    DateExpires: zWsdotDate().describe(
      "Date when the restriction is no longer in force."
    ),
    /** Date when the restriction was first posted. */
    DatePosted: zWsdotDate().describe(
      "Date when the restriction was first posted."
    ),
    /** End location for the alert on the roadway. */
    EndRoadwayLocation: roadwayLocationSchema
      .nullable()
      .describe("End location for the alert on the roadway."),
    /** Indicates if a detour is available. */
    IsDetourAvailable: z
      .boolean()
      .describe("Indicates if a detour is available."),
    /** Indicates if exceptions are allowed. */
    IsExceptionsAllowed: z
      .boolean()
      .describe("Indicates if exceptions are allowed."),
    /** Indicates whether the restriction is permanent. */
    IsPermanentRestriction: z
      .boolean()
      .describe("Indicates whether the restriction is permanent."),
    /** Indicates if this is a warning restriction. */
    IsWarning: z
      .boolean()
      .describe("Indicates if this is a warning restriction."),
    /** Latitude of location of bridge. */
    Latitude: z.number().describe("Latitude of location of bridge."),
    /** Description of the location. */
    LocationDescription: z
      .string()
      .nullable()
      .describe("Description of the location."),
    /** Name of the location. */
    LocationName: z.string().nullable().describe("Name of the location."),
    /** Longitude of location of bridge. */
    Longitude: z.number().describe("Longitude of location of bridge."),
    /** Maximum gross vehicle weight in pounds. */
    MaximumGrossVehicleWeightInPounds: z
      .number()
      .nullable()
      .describe("Maximum gross vehicle weight in pounds."),
    /** More details concerning the restriction. */
    RestrictionComment: z
      .string()
      .nullable()
      .describe("More details concerning the restriction."),
    /** The maximum height for a load in inches. */
    RestrictionHeightInInches: z
      .number()
      .nullable()
      .describe("The maximum height for a load in inches."),
    /** The maximum length for a load in inches. */
    RestrictionLengthInInches: z
      .number()
      .nullable()
      .describe("The maximum length for a load in inches."),
    /** The type of restriction, bridge or road. (0 = BridgeRestriction, 1 = RoadRestriction) */
    RestrictionType: z
      .union([z.literal(0), z.literal(1)])
      .describe(
        "The type of restriction, bridge or road. (0 = BridgeRestriction, 1 = RoadRestriction)"
      ),
    /** The maximum weight for a load in pounds. */
    RestrictionWeightInPounds: z
      .number()
      .nullable()
      .describe("The maximum weight for a load in pounds."),
    /** The maximum width for a load in inches. */
    RestrictionWidthInInches: z
      .number()
      .nullable()
      .describe("The maximum width for a load in inches."),
    /** Maximum axle weight for SA classification. */
    SAMaxAxle: z
      .number()
      .nullable()
      .describe("Maximum axle weight for SA classification."),
    /** Start location for the alert on the roadway. */
    StartRoadwayLocation: roadwayLocationSchema
      .nullable()
      .describe("Start location for the alert on the roadway."),
    /** State where restriction is located. */
    State: z
      .string()
      .nullable()
      .describe("State where restriction is located."),
    /** State route restriction is located on. */
    StateRouteID: z
      .string()
      .nullable()
      .describe("State route restriction is located on."),
    /** Maximum axle weight for TD classification. */
    TDMaxAxle: z
      .number()
      .nullable()
      .describe("Maximum axle weight for TD classification."),
    /** Type of vehicle affected by the restriction. */
    VehicleType: z
      .string()
      .nullable()
      .describe("Type of vehicle affected by the restriction."),
  })
  .describe("Represents a Commercial Vehicle Restriction.");

export type CVRestrictionData = z.infer<typeof cVRestrictionDataSchema>;

/**
 * Schema for list of CVRestrictionData
 *
 * Provides list of restrictions for commercial vehicles. Coverage Area: Statewide.
 */
export const cVRestrictionDataListSchema = z
  .array(cVRestrictionDataSchema)
  .describe(
    "Provides list of restrictions for commercial vehicles. Coverage Area: Statewide."
  );

export type CVRestrictionDataList = z.infer<typeof cVRestrictionDataListSchema>;

/**
 * Schema for CVRestrictionDataWithId - extends CVRestrictionData with a unique identifier
 *
 * Provides list of restrictions for commercial vehicles. Coverage Area: Statewide.
 */
export const cVRestrictionDataWithIdSchema = cVRestrictionDataSchema
  .extend({
    /** Unique identifier for the restriction. */
    UniqueID: z
      .string()
      .nullable()
      .describe("Unique identifier for the restriction."),
  })
  .describe(
    "Provides list of restrictions for commercial vehicles. Coverage Area: Statewide."
  );

export type CVRestrictionDataWithId = z.infer<
  typeof cVRestrictionDataWithIdSchema
>;

/**
 * Schema for list of CVRestrictionDataWithId
 *
 * Provides list of restrictions for commercial vehicles. Coverage Area: Statewide.
 */
export const cVRestrictionDataWithIdListSchema = z
  .array(cVRestrictionDataWithIdSchema)
  .describe(
    "Provides list of restrictions for commercial vehicles. Coverage Area: Statewide."
  );

export type CVRestrictionDataWithIdList = z.infer<
  typeof cVRestrictionDataWithIdListSchema
>;

// Re-export shared types
export type { RoadwayLocation } from "@/apis/shared";
