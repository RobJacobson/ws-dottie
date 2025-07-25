import { z } from "zod";

// Base schemas for common patterns
export const dateSchema = z.union([
  z.date(),
  z.string().transform((val) => new Date(val)),
  z.number().transform((val) => new Date(val)),
]);

export const nullableStringSchema = z.string().nullable();
export const nullableNumberSchema = z.number().nullable();

// WSDOT Commercial Vehicle Restrictions schemas
export const roadwayLocationSchema = z.object({
  Description: nullableStringSchema,
  Direction: nullableStringSchema,
  Latitude: z.number(),
  Longitude: z.number(),
  MilePost: z.number(),
  RoadName: z.string(),
});

export const commercialVehicleRestrictionSchema = z.object({
  BLMaxAxle: nullableNumberSchema, // B-Load maximum axle weight
  BridgeName: z.string(),
  BridgeNumber: z.string(),
  CL8MaxAxle: nullableNumberSchema, // CL-8 maximum axle weight
  DateEffective: dateSchema,
  DateExpires: dateSchema,
  DatePosted: dateSchema,
  EndRoadwayLocation: roadwayLocationSchema,
  IsDetourAvailable: z.boolean(),
  IsExceptionsAllowed: z.boolean(),
  IsPermanentRestriction: z.boolean(),
  IsWarning: z.boolean(),
  Latitude: z.number(),
  LocationDescription: z.string(),
  LocationName: z.string(),
  Longitude: z.number(),
  MaximumGrossVehicleWeightInPounds: nullableNumberSchema,
  RestrictionComment: z.string(),
  RestrictionHeightInInches: nullableNumberSchema,
  RestrictionLengthInInches: nullableNumberSchema,
  RestrictionType: z.number(),
  RestrictionWeightInPounds: nullableNumberSchema,
  RestrictionWidthInInches: nullableNumberSchema,
  SAMaxAxle: nullableNumberSchema, // Single axle maximum weight
  StartRoadwayLocation: roadwayLocationSchema,
  State: z.string(),
  StateRouteID: z.string(),
  TDMaxAxle: nullableNumberSchema, // Tandem axle maximum weight
  VehicleType: z.string(),
});

export const commercialVehicleRestrictionWithIdSchema = commercialVehicleRestrictionSchema.extend({
  UniqueID: z.string(),
});

export const commercialVehicleRestrictionsArraySchema = z.array(commercialVehicleRestrictionSchema);
export const commercialVehicleRestrictionsWithIdArraySchema = z.array(commercialVehicleRestrictionWithIdSchema);

// Export all schemas
export const schemas = {
  roadwayLocation: roadwayLocationSchema,
  commercialVehicleRestriction: commercialVehicleRestrictionSchema,
  commercialVehicleRestrictionWithId: commercialVehicleRestrictionWithIdSchema,
  commercialVehicleRestrictionsArray: commercialVehicleRestrictionsArraySchema,
  commercialVehicleRestrictionsWithIdArray: commercialVehicleRestrictionsWithIdArraySchema,
} as const; 