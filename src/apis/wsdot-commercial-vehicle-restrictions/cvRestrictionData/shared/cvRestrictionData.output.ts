import { roadwayLocationSchema, zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod";

export const cvRestrictionSchema = z
  .object({
    BLMaxAxle: z
      .number()
      .nullable()
      .describe(
        "Maximum axle weight for Bridge Legal classification in pounds."
      ),
    BridgeName: z
      .string()
      .nullable()
      .describe("Name of the bridge associated with the restriction."),
    BridgeNumber: z
      .string()
      .nullable()
      .describe(
        "WSDOT bridge identifier in format 'route/bridge' (e.g., '10/142')."
      ),
    CL8MaxAxle: z
      .number()
      .nullable()
      .describe("Maximum axle weight for CL-8 classification in pounds."),
    DateEffective: zDotnetDate().describe(
      "UTC datetime when the commercial vehicle restriction becomes effective."
    ),
    DateExpires: zDotnetDate().describe(
      "UTC datetime when the commercial vehicle restriction expires."
    ),
    DatePosted: zDotnetDate().describe(
      "UTC datetime when the commercial vehicle restriction was first posted."
    ),
    EndRoadwayLocation: roadwayLocationSchema
      .nullable()
      .describe("End location of the restriction along the roadway."),
    IsDetourAvailable: z
      .boolean()
      .describe(
        "True if a detour route is available around the restriction; otherwise false."
      ),
    IsExceptionsAllowed: z
      .boolean()
      .describe(
        "True if exceptions are permitted for the restriction; otherwise false."
      ),
    IsPermanentRestriction: z
      .boolean()
      .describe(
        "True if the restriction is permanent; otherwise false (temporary)."
      ),
    IsWarning: z
      .boolean()
      .describe(
        "True if the restriction is a warning rather than an enforceable limit; otherwise false."
      ),
    Latitude: z
      .number()
      .describe(
        "GPS latitude coordinate for the restriction location in decimal degrees."
      ),
    LocationDescription: z
      .string()
      .nullable()
      .describe("Human-readable description of the restriction location."),
    LocationName: z
      .string()
      .nullable()
      .describe("Name of the location where the restriction applies."),
    Longitude: z
      .number()
      .describe(
        "GPS longitude coordinate for the restriction location in decimal degrees."
      ),
    MaximumGrossVehicleWeightInPounds: z
      .number()
      .nullable()
      .describe("Maximum gross vehicle weight limit in pounds."),
    RestrictionComment: z
      .string()
      .nullable()
      .describe("Additional details and comments about the restriction."),
    RestrictionHeightInInches: z
      .number()
      .nullable()
      .describe("Maximum load height restriction in inches."),
    RestrictionLengthInInches: z
      .number()
      .nullable()
      .describe("Maximum load length restriction in inches."),
    RestrictionType: z
      .number()
      .describe(
        "Code indicating restriction type: 0 = BridgeRestriction, 1 = RoadRestriction."
      ),
    RestrictionWeightInPounds: z
      .number()
      .nullable()
      .describe("Maximum load weight restriction in pounds."),
    RestrictionWidthInInches: z
      .number()
      .nullable()
      .describe("Maximum load width restriction in inches."),
    SAMaxAxle: z
      .number()
      .nullable()
      .describe(
        "Maximum axle weight for Semi-Automatic classification in pounds."
      ),
    StartRoadwayLocation: roadwayLocationSchema
      .nullable()
      .describe("Start location of the restriction along the roadway."),
    State: z
      .string()
      .nullable()
      .describe(
        "State code where the commercial vehicle restriction is located."
      ),
    StateRouteID: z
      .string()
      .nullable()
      .describe("State route identifier where the restriction applies."),
    TDMaxAxle: z
      .number()
      .nullable()
      .describe(
        "Maximum axle weight for Tandem Drive classification in pounds."
      ),
    VehicleType: z
      .string()
      .nullable()
      .describe("Type of vehicle affected by the restriction."),
  })
  .describe(
    "Commercial vehicle restriction information including weight limits by classification, height/width/length restrictions, location data, effective dates, and restriction type for bridge and roadway restrictions statewide."
  );

export type CVRestriction = z.infer<typeof cvRestrictionSchema>;

// Re-export shared types
export type { RoadwayLocation } from "@/apis/shared";
