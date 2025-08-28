import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import {
  zLatitude,
  zLongitude,
  zNullableNumber,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";
import { createUseQueryWsdot, tanstackQueryOptions } from "@/shared/tanstack";

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

/**
 * MountainPassConditions type - represents an array of mountain pass condition objects
 */
export type MountainPassConditions = z.infer<
  typeof mountainPassConditionArraySchema
>;

// ============================================================================
// TanStack Query Hooks (singular first, then array)
// ============================================================================

export const useMountainPassConditionById = createUseQueryWsdot({
  queryFn: getMountainPassConditionById,
  queryKeyPrefix: [
    "wsdot",
    "mountain-pass-conditions",
    "getMountainPassConditionById",
  ],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
});

export const useMountainPassConditions = createUseQueryWsdot({
  queryFn: getMountainPassConditions,
  queryKeyPrefix: [
    "wsdot",
    "mountain-pass-conditions",
    "getMountainPassConditions",
  ],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
});
