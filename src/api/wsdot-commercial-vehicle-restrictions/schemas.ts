import { z } from "zod";

import {
  zNullableNumber,
  zNullableString,
  zWsdotDate,
} from "@/shared/validation";

export const roadwayLocationSchema = z
  .object({
    Description: zNullableString(),
    Direction: zNullableString(),
    Latitude: z.number(),
    Longitude: z.number(),
    MilePost: z.number(),
    RoadName: z.string(),
  })
  .catchall(z.unknown());

export const commercialVehicleRestrictionSchema = z
  .object({
    BLMaxAxle: zNullableNumber(),
    BridgeName: z.string(),
    BridgeNumber: z.string(),
    CL8MaxAxle: zNullableNumber(),
    DateEffective: zWsdotDate(),
    DateExpires: zWsdotDate(),
    DatePosted: zWsdotDate(),
    EndRoadwayLocation: roadwayLocationSchema,
    IsDetourAvailable: z.boolean(),
    IsExceptionsAllowed: z.boolean(),
    IsPermanentRestriction: z.boolean(),
    IsWarning: z.boolean(),
    Latitude: z.number(),
    LocationDescription: z.string(),
    LocationName: z.string(),
    Longitude: z.number(),
    MaximumGrossVehicleWeightInPounds: zNullableNumber(),
    RestrictionComment: z.string(),
    RestrictionHeightInInches: zNullableNumber(),
    RestrictionLengthInInches: zNullableNumber(),
    RestrictionType: z.number(),
    RestrictionWeightInPounds: zNullableNumber(),
    RestrictionWidthInInches: zNullableNumber(),
    SAMaxAxle: zNullableNumber(),
    StartRoadwayLocation: roadwayLocationSchema,
    State: z.string(),
    StateRouteID: z.string(),
    TDMaxAxle: zNullableNumber(),
    VehicleType: z.string(),
  })
  .catchall(z.unknown());

export const commercialVehicleRestrictionWithIdSchema =
  commercialVehicleRestrictionSchema
    .extend({ UniqueID: z.string() })
    .catchall(z.unknown());

export const commercialVehicleRestrictionArraySchema = z.array(
  commercialVehicleRestrictionSchema
);
export const commercialVehicleRestrictionWithIdArraySchema = z.array(
  commercialVehicleRestrictionWithIdSchema
);

export type RoadwayLocation = z.infer<typeof roadwayLocationSchema>;
export type CommercialVehicleRestriction = z.infer<
  typeof commercialVehicleRestrictionSchema
>;
export type CommercialVehicleRestrictionWithId = z.infer<
  typeof commercialVehicleRestrictionWithIdSchema
>;
