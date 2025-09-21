import { z } from "zod";
import { zWsdotDate } from "@/apis/shared";
import { RoadwayLocationSchema } from "../shared/roadwayLocationSchema";

/**
 * Schema for CVRestrictionData - represents a Commercial Vehicle Restriction
 */
export const CVRestrictionDataSchema = z.object({
  BLMaxAxle: z
    .number()
    .nullable()
    .describe("Maximum axle weight for BL classification."),
  BridgeName: z.string().nullable().describe("Name of the bridge."),
  BridgeNumber: z.string().nullable().describe("WSDOT Identifier for bridge."),
  CL8MaxAxle: z
    .number()
    .nullable()
    .describe("Maximum axle weight for CL8 classification."),
  DateEffective: zWsdotDate().describe(
    "Date when the restriction comes into effect."
  ),
  DateExpires: zWsdotDate().describe(
    "Date when the restriction is no longer in force."
  ),
  DatePosted: zWsdotDate().describe(
    "Date when the restriction was first posted."
  ),
  EndRoadwayLocation: RoadwayLocationSchema.nullable().describe(
    "End location for the alert on the roadway."
  ),
  IsDetourAvailable: z
    .boolean()
    .describe("Indicates if a detour is available."),
  IsExceptionsAllowed: z
    .boolean()
    .describe("Indicates if exceptions are allowed."),
  IsPermanentRestriction: z
    .boolean()
    .describe("Indicates whether the restriction is permanent."),
  IsWarning: z
    .boolean()
    .describe("Indicates if this is a warning restriction."),
  Latitude: z.number().describe("Latitude of location of bridge."),
  LocationDescription: z
    .string()
    .nullable()
    .describe("Description of the location."),
  LocationName: z.string().nullable().describe("Name of the location."),
  Longitude: z.number().describe("Longitude of location of bridge."),
  MaximumGrossVehicleWeightInPounds: z
    .number()
    .nullable()
    .describe("Maximum gross vehicle weight in pounds."),
  RestrictionComment: z
    .string()
    .nullable()
    .describe("More details concerning the restriction."),
  RestrictionHeightInInches: z
    .number()
    .nullable()
    .describe("The maximum height for a load in inches."),
  RestrictionLengthInInches: z
    .number()
    .nullable()
    .describe("The maximum length for a load in inches."),
  RestrictionType: z
    .union([z.literal(0), z.literal(1)])
    .describe(
      "The type of restriction, bridge or road. (0 = BridgeRestriction, 1 = RoadRestriction)"
    ),
  RestrictionWeightInPounds: z
    .number()
    .nullable()
    .describe("The maximum weight for a load in pounds."),
  RestrictionWidthInInches: z
    .number()
    .nullable()
    .describe("The maximum width for a load in inches."),
  SAMaxAxle: z
    .number()
    .nullable()
    .describe("Maximum axle weight for SA classification."),
  StartRoadwayLocation: RoadwayLocationSchema.nullable().describe(
    "Start location for the alert on the roadway."
  ),
  State: z.string().nullable().describe("State where restriction is located."),
  StateRouteID: z
    .string()
    .nullable()
    .describe("State route restriction is located on."),
  TDMaxAxle: z
    .number()
    .nullable()
    .describe("Maximum axle weight for TD classification."),
  VehicleType: z
    .string()
    .nullable()
    .describe("Type of vehicle affected by the restriction."),
});

export type CVRestrictionData = z.infer<typeof CVRestrictionDataSchema>;

/**
 * Schema for CVRestrictionDataWithId - extends CVRestrictionData with a unique identifier
 */
export const CVRestrictionDataWithIdSchema = CVRestrictionDataSchema.extend({
  UniqueID: z
    .string()
    .nullable()
    .describe("Unique identifier for the restriction."),
});

export type CVRestrictionDataWithId = z.infer<
  typeof CVRestrictionDataWithIdSchema
>;

/**
 * Schema for array of CVRestrictionData
 */
export const ArrayOfCVRestrictionDataSchema = z.array(CVRestrictionDataSchema);

export type ArrayOfCVRestrictionData = z.infer<
  typeof ArrayOfCVRestrictionDataSchema
>;

/**
 * Schema for array of CVRestrictionDataWithId
 */
export const ArrayOfCVRestrictionDataWithIdSchema = z.array(
  CVRestrictionDataWithIdSchema
);

export type ArrayOfCVRestrictionDataWithId = z.infer<
  typeof ArrayOfCVRestrictionDataWithIdSchema
>;

// Re-export shared types
export type { RoadwayLocation } from "../shared/roadwayLocationSchema";
