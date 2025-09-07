import { z } from "zod";
import { roadwayLocationSchema } from "@/schemas/shared/roadwayLocation.zod";
import { zWsdotDate } from "@/shared/tanstack/validation";

/**
 * CVRestriction schema
 *
 * Represents a Commercial Vehicle Restriction.
 */
export const commercialVehiclesRestrictionSchema = z
  .object({
    /** State Route identifier */
    StateRouteID: z.string().nullable().describe("State Route identifier"),
    /** State abbreviation */
    State: z.string().nullable().describe("State abbreviation"),
    /** Restriction width in inches */
    RestrictionWidthInInches: z
      .number()
      .int()
      .positive()
      .nullable()
      .describe("Restriction width in inches"),
    /** Restriction height in inches */
    RestrictionHeightInInches: z
      .number()
      .int()
      .positive()
      .nullable()
      .describe("Restriction height in inches"),
    /** Restriction length in inches */
    RestrictionLengthInInches: z
      .number()
      .int()
      .positive()
      .nullable()
      .describe("Restriction length in inches"),
    /** Restriction weight in pounds */
    RestrictionWeightInPounds: z
      .number()
      .int()
      .positive()
      .nullable()
      .describe("Restriction weight in pounds"),
    /** Indicates if a detour is available */
    IsDetourAvailable: z
      .boolean()
      .describe("Indicates if a detour is available"),
    /** Indicates whether the restriction is permanent */
    IsPermanentRestriction: z
      .boolean()
      .describe("Indicates whether the restriction is permanent"),
    /** Indicates if exceptions are allowed */
    IsExceptionsAllowed: z
      .boolean()
      .describe("Indicates if exceptions are allowed"),
    /** Indicates if this is a warning */
    IsWarning: z.boolean().describe("Indicates if this is a warning"),
    /** Date when the restriction was first posted */
    DatePosted: zWsdotDate().describe(
      "Date when the restriction was first posted"
    ),
    /** Date when the restriction comes into effect */
    DateEffective: zWsdotDate().describe(
      "Date when the restriction comes into effect"
    ),
    /** Date when the restriction is no longer in force */
    DateExpires: zWsdotDate().describe(
      "Date when the restriction is no longer in force"
    ),
    /** Name of the location */
    LocationName: z.string().nullable().describe("Name of the location"),
    /** Description of the location */
    LocationDescription: z.string().nullable().describe("Description of the location"),
    /** Comment about the restriction */
    RestrictionComment: z.string().nullable().describe("Comment about the restriction"),
    /** Latitude of location of bridge */
    Latitude: z.number().describe("Latitude of location of bridge"),
    /** Longitude of location of bridge */
    Longitude: z.number().describe("Longitude of location of bridge"),
    /** WSDOT Identifier for bridge */
    BridgeNumber: z.string().nullable().describe("WSDOT Identifier for bridge"),
    /** Maximum gross vehicle weight in pounds */
    MaximumGrossVehicleWeightInPounds: z
      .number()
      .int()
      .positive()
      .nullable()
      .describe("Maximum gross vehicle weight in pounds"),
    /** Name of the bridge */
    BridgeName: z.string().nullable().describe("Name of the bridge"),
    /** BL Max Axle weight */
    BLMaxAxle: z
      .number()
      .int()
      .positive()
      .nullable()
      .describe("BL Max Axle weight"),
    /** CL8 Max Axle weight */
    CL8MaxAxle: z
      .number()
      .int()
      .positive()
      .nullable()
      .describe("CL8 Max Axle weight"),
    /** SA Max Axle weight */
    SAMaxAxle: z
      .number()
      .int()
      .positive()
      .nullable()
      .describe("SA Max Axle weight"),
    /** Start location for the restriction on the roadway */
    StartRoadwayLocation: roadwayLocationSchema
      .nullable()
      .describe(
        "Start location for the restriction on the roadway"
      ),
    /** End location for the restriction on the roadway */
    EndRoadwayLocation: roadwayLocationSchema
      .nullable()
      .describe(
        "End location for the restriction on the roadway"
      ),
  })
  .describe("Represents a Commercial Vehicle Restriction.");

/**
 * CVRestrictions schema
 *
 * Coverage Area: Statewide. Provides list of restrictions for commercial vehicles.
 */
export const commercialVehiclesRestrictionsSchema = z
  .array(commercialVehiclesRestrictionSchema)
  .describe(
    "Coverage Area: Statewide. Provides list of restrictions for commercial vehicles."
  );

/** CVRestriction type */
export type CommercialVehiclesRestriction = z.infer<
  typeof commercialVehiclesRestrictionSchema
>;

/** CVRestrictions type */
export type CommercialVehiclesRestrictions = z.infer<
  typeof commercialVehiclesRestrictionsSchema
>;
