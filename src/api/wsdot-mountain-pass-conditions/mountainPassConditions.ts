import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import {
  zLatitude,
  zLongitude,
  zNullableNumber,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_DAY,
  TWO_DAYS,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

// ============================================================================
// API Functions
//
// getMountainPassConditionById (singular first)
// ============================================================================

const SINGLE_PASS_ENDPOINT =
  "/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionAsJon?PassConditionID={passConditionId}";

export const getMountainPassConditionById = async (
  params: GetMountainPassConditionByIdParams
): Promise<MountainPassCondition> => {
  return zodFetch(
    SINGLE_PASS_ENDPOINT,
    {
      input: getMountainPassConditionByIdParamsSchema,
      output: mountainPassConditionSchema,
    },
    params
  );
};

// ============================================================================
// getMountainPassConditions (array second)
// ============================================================================

const ALL_PASSES_ENDPOINT =
  "/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionsAsJson";

export const getMountainPassConditions = async (
  params: GetMountainPassConditionsParams = {}
): Promise<MountainPassConditions> => {
  return zodFetch(
    ALL_PASSES_ENDPOINT,
    {
      input: getMountainPassConditionsParamsSchema,
      output: mountainPassConditionArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types (singular first, then array)
// ============================================================================

export const getMountainPassConditionByIdParamsSchema = z.object({
  passConditionId: z.number().int().positive(),
});

export type GetMountainPassConditionByIdParams = z.infer<
  typeof getMountainPassConditionByIdParamsSchema
>;

export const getMountainPassConditionsParamsSchema = z.object({});

export type GetMountainPassConditionsParams = z.infer<
  typeof getMountainPassConditionsParamsSchema
>;

// ============================================================================
// Output Schemas & Types (shared schemas first, then array wrappers)
// ============================================================================

export const travelRestrictionSchema = z.object({
  TravelDirection: z.string().nullable(),
  RestrictionText: z.string().nullable(),
});

export const mountainPassConditionSchema = z.object({
  DateUpdated: zWsdotDate(),
  ElevationInFeet: z.number(),
  Latitude: zLatitude(),
  Longitude: zLongitude(),
  MountainPassId: z.number().int().positive(),
  MountainPassName: z.string().nullable(),
  RestrictionOne: travelRestrictionSchema.nullable(),
  RestrictionTwo: travelRestrictionSchema.nullable(),
  RoadCondition: z.string().nullable(),
  TemperatureInFahrenheit: zNullableNumber(),
  TravelAdvisoryActive: z.boolean(),
  WeatherCondition: z.string().nullable(),
});

export const mountainPassConditionArraySchema = z.array(
  mountainPassConditionSchema
);

export type TravelRestriction = z.infer<typeof travelRestrictionSchema>;

export type MountainPassCondition = z.infer<typeof mountainPassConditionSchema>;

export type MountainPassConditions = z.infer<
  typeof mountainPassConditionArraySchema
>;

// ============================================================================
// TanStack Query Options (singular first, then array)
// ============================================================================

export const mountainPassConditionByIdOptions = (
  params: GetMountainPassConditionByIdParams
) =>
  queryOptions({
    queryKey: [
      "wsdot",
      "mountain-pass-conditions",
      "getMountainPassConditionById",
      params,
    ],
    queryFn: () => getMountainPassConditionById(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const mountainPassConditionsOptions = () =>
  queryOptions({
    queryKey: [
      "wsdot",
      "mountain-pass-conditions",
      "getMountainPassConditions",
    ],
    queryFn: () => getMountainPassConditions({}),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
