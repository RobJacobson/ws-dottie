import { z } from "zod";
import { roadwayLocationSchema } from "@/schemas/shared/roadwayLocation.zod";
import { zWsdotDate } from "@/shared/tanstack/validation";

/**
 * CommercialVehicleRestriction schema
 *
 * Represents a Commercial Vehicle Restriction.
 */
export const commercialVehicleRestrictionSchema = z
  .object({
    /** BL Max Axle weight */
    BLMaxAxle: z.number().int().nullable().describe("BL Max Axle weight"),
    /** Name of the bridge */
    BridgeName: z.string().nullable().describe("Name of the bridge"),
    /** WSDOT Identifier for bridge */
    BridgeNumber: z.string().nullable().describe("WSDOT Identifier for bridge"),
    /** CL8 Max Axle weight */
    CL8MaxAxle: z.number().int().nullable().describe("CL8 Max Axle weight"),
    /** Date when the restriction comes into effect */
    DateEffective: zWsdotDate().describe(
      "Date when the restriction comes into effect"
    ),
    /** Date when the restriction is no longer in force */
    DateExpires: zWsdotDate().describe(
      "Date when the restriction is no longer in force"
    ),
    /** Date when the restriction was first posted */
    DatePosted: zWsdotDate().describe(
      "Date when the restriction was first posted"
    ),
    /** End location for the restriction on the roadway */
    EndRoadwayLocation: roadwayLocationSchema
      .nullable()
      .describe("End location for the restriction on the roadway"),
    /** Indicates if a detour is available */
    IsDetourAvailable: z
      .boolean()
      .describe("Indicates if a detour is available"),
    /** Indicates if exceptions are allowed */
    IsExceptionsAllowed: z
      .boolean()
      .describe("Indicates if exceptions are allowed"),
    /** Indicates whether the restriction is permanent */
    IsPermanentRestriction: z
      .boolean()
      .describe("Indicates whether the restriction is permanent"),
    /** Indicates if this is a warning */
    IsWarning: z.boolean().describe("Indicates if this is a warning"),
    /** Latitude of location of bridge */
    Latitude: z.number().describe("Latitude of location of bridge"),
    /** Description of the location */
    LocationDescription: z
      .string()
      .nullable()
      .describe("Description of the location"),
    /** Name of the location */
    LocationName: z.string().nullable().describe("Name of the location"),
    /** Longitude of location of bridge */
    Longitude: z.number().describe("Longitude of location of bridge"),
    /** Maximum gross vehicle weight in pounds */
    MaximumGrossVehicleWeightInPounds: z
      .number()
      .int()
      .nullable()
      .describe("Maximum gross vehicle weight in pounds"),
    /** Comment about the restriction */
    RestrictionComment: z
      .string()
      .nullable()
      .describe("Comment about the restriction"),
    /** Restriction height in inches */
    RestrictionHeightInInches: z
      .number()
      .int()
      .nullable()
      .describe("Restriction height in inches"),
    /** Restriction length in inches */
    RestrictionLengthInInches: z
      .number()
      .int()
      .nullable()
      .describe("Restriction length in inches"),
    /** Restriction type */
    RestrictionType: z
      .union([z.literal(0), z.literal(1)])
      .describe(
        "Restriction type (0 = BridgeRestriction, 1 = RoadRestriction)"
      ),
    /** Restriction weight in pounds */
    RestrictionWeightInPounds: z
      .number()
      .int()
      .nullable()
      .describe("Restriction weight in pounds"),
    /** Restriction width in inches */
    RestrictionWidthInInches: z
      .number()
      .int()
      .nullable()
      .describe("Restriction width in inches"),
    /** SA Max Axle weight */
    SAMaxAxle: z.number().int().nullable().describe("SA Max Axle weight"),
    /** Start location for the restriction on the roadway */
    StartRoadwayLocation: roadwayLocationSchema
      .nullable()
      .describe("Start location for the restriction on the roadway"),
    /** State abbreviation */
    State: z.string().nullable().describe("State abbreviation"),
    /** State Route identifier */
    StateRouteID: z.string().nullable().describe("State Route identifier"),
    /** TD Max Axle weight */
    TDMaxAxle: z.number().int().nullable().describe("TD Max Axle weight"),
    /** Vehicle type description */
    VehicleType: z.string().nullable().describe("Vehicle type description"),
  })
  .describe("Represents a Commercial Vehicle Restriction.");

/** CommercialVehicleRestriction type */
export type CommercialVehicleRestriction = z.infer<
  typeof commercialVehicleRestrictionSchema
>;

/**
 * Array of commercial vehicle restrictions.
 */
export const commercialVehicleRestrictionsSchema = z
  .array(commercialVehicleRestrictionSchema)
  .describe(
    "Coverage Area: Statewide. Provides list of restrictions for commercial vehicles."
  );

export type CommercialVehicleRestrictions = z.infer<
  typeof commercialVehicleRestrictionsSchema
>;
