import { z } from "zod";
import { zWsdotDate } from "@/apis/shared";
import { roadwayLocationSchema } from "../shared/roadwayLocationSchema";

/**
 * Schema for CVRestrictionData - represents a Commercial Vehicle Restriction
 */
export const cVRestrictionDataSchema = z.object({
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
  EndRoadwayLocation: roadwayLocationSchema
    .nullable()
    .describe("End location for the alert on the roadway."),
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
  SAMaxAxle: z.number().nullable().describe(""),
  StartRoadwayLocation: roadwayLocationSchema
    .nullable()
    .describe("Start location for the alert on the roadway."),
  State: z.string().nullable().describe("State where restriction is located."),
  StateRouteID: z
    .string()
    .nullable()
    .describe("State route restriction is located on."),
  TDMaxAxle: z.number().nullable().describe(""),
  VehicleType: z.string().nullable().describe(""),
});

export type CVRestrictionData = z.infer<typeof cVRestrictionDataSchema>;

/**
 * Schema for list of CVRestrictionData
 */
export const cVRestrictionDataListSchema = z.array(cVRestrictionDataSchema);

export type CVRestrictionDataList = z.infer<
  typeof cVRestrictionDataListSchema
>;

/**
 * Schema for CVRestrictionDataWithId - extends CVRestrictionData with a unique identifier
 */
export const cVRestrictionDataWithIdSchema = cVRestrictionDataSchema.extend({
  UniqueID: z
    .string()
    .nullable()
    .describe("Unique identifier for the restriction."),
});

export type CVRestrictionDataWithId = z.infer<
  typeof cVRestrictionDataWithIdSchema
>;

/**
 * Schema for list of CVRestrictionDataWithId
 */
export const cVRestrictionDataWithIdListSchema = z.array(
  cVRestrictionDataWithIdSchema
);

export type CVRestrictionDataWithIdList = z.infer<
  typeof cVRestrictionDataWithIdListSchema
>;

// Re-export shared types
export type { RoadwayLocation } from "../shared/roadwayLocationSchema";
