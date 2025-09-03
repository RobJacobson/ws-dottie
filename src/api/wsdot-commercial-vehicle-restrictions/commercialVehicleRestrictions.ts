import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import {
  zLatitude,
  zLongitude,
  zNullableNumber,
  zNullableString,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";

// TanStack factory hooks removed in favor of queryOptions
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_DAY,
  TWO_DAYS,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

// ============================================================================
// API Functions
// ============================================================================

const ENDPOINT =
  "/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsAsJson";

const ENDPOINT_WITH_ID =
  "/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsWithIdAsJson";

export const getCommercialVehicleRestrictionsWithId = async (
  params: GetCommercialVehicleRestrictionsWithIdParams = {}
): Promise<CommercialVehicleRestrictionsWithId> => {
  return zodFetch(
    ENDPOINT_WITH_ID,
    {
      input: getCommercialVehicleRestrictionsWithIdParamsSchema,
      output: commercialVehicleRestrictionWithIdArraySchema,
    },
    params
  );
};

export const getCommercialVehicleRestrictions = async (
  params: GetCommercialVehicleRestrictionsParams = {}
): Promise<CommercialVehicleRestrictions> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getCommercialVehicleRestrictionsParamsSchema,
      output: commercialVehicleRestrictionArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
// ============================================================================

export const getCommercialVehicleRestrictionsWithIdParamsSchema = z.object({});

export type GetCommercialVehicleRestrictionsWithIdParams = z.infer<
  typeof getCommercialVehicleRestrictionsWithIdParamsSchema
>;

export const getCommercialVehicleRestrictionsParamsSchema = z.object({});

export type GetCommercialVehicleRestrictionsParams = z.infer<
  typeof getCommercialVehicleRestrictionsParamsSchema
>;

// ============================================================================
// Output Schemas & Types
// ============================================================================

export const commercialVehicleRestrictionRoadwayLocationSchema = z.object({
  Description: zNullableString(),
  Direction: zNullableString(),
  Latitude: zLatitude(),
  Longitude: zLongitude(),
  MilePost: z.number(),
  RoadName: z.string(),
});

export const commercialVehicleRestrictionSchema = z.object({
  BLMaxAxle: zNullableNumber(),
  BridgeName: z.string(),
  BridgeNumber: z.string(),
  CL8MaxAxle: zNullableNumber(),
  DateEffective: zWsdotDate(),
  DateExpires: zWsdotDate(),
  DatePosted: zWsdotDate(),
  EndRoadwayLocation: commercialVehicleRestrictionRoadwayLocationSchema,
  IsDetourAvailable: z.boolean(),
  IsExceptionsAllowed: z.boolean(),
  IsPermanentRestriction: z.boolean(),
  IsWarning: z.boolean(),
  LocationDescription: z.string(),
  LocationName: z.string(),
  RestrictionComment: z.string(),
  RestrictionType: z.number(),
  State: z.string(),
  StateRouteID: z.string(),
  VehicleType: z.string(),
});

export const commercialVehicleRestrictionWithIdSchema =
  commercialVehicleRestrictionSchema.extend({
    UniqueID: z.string(),
  });

export const commercialVehicleRestrictionArraySchema = z.array(
  commercialVehicleRestrictionSchema
);

export const commercialVehicleRestrictionWithIdArraySchema = z.array(
  commercialVehicleRestrictionWithIdSchema
);

export type CommercialVehicleRestrictionRoadwayLocation = z.infer<
  typeof commercialVehicleRestrictionRoadwayLocationSchema
>;

export type CommercialVehicleRestriction = z.infer<
  typeof commercialVehicleRestrictionSchema
>;

export type CommercialVehicleRestrictionWithId = z.infer<
  typeof commercialVehicleRestrictionWithIdSchema
>;

export type CommercialVehicleRestrictions = z.infer<
  typeof commercialVehicleRestrictionArraySchema
>;

export type CommercialVehicleRestrictionsWithId = z.infer<
  typeof commercialVehicleRestrictionWithIdArraySchema
>;

// ============================================================================
// TanStack Query Options (new pattern)
// ============================================================================

export const commercialVehicleRestrictionsWithIdOptions = () =>
  queryOptions({
    queryKey: [
      "wsdot",
      "commercial-vehicle-restrictions",
      "getCommercialVehicleRestrictionsWithId",
    ],
    queryFn: () => getCommercialVehicleRestrictionsWithId({}),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const commercialVehicleRestrictionsOptions = () =>
  queryOptions({
    queryKey: [
      "wsdot",
      "commercial-vehicle-restrictions",
      "getCommercialVehicleRestrictions",
    ],
    queryFn: () => getCommercialVehicleRestrictions({}),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
