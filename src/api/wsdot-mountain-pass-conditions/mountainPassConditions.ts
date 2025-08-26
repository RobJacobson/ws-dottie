import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import {
  zLatitude,
  zLongitude,
  zNullableNumber,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";

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
): Promise<MountainPassCondition[]> => {
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

export const getMountainPassConditionByIdParamsSchema = z
  .object({
    passConditionId: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetMountainPassConditionByIdParams = z.infer<
  typeof getMountainPassConditionByIdParamsSchema
>;

export const getMountainPassConditionsParamsSchema = z.object({}).describe("");

export type GetMountainPassConditionsParams = z.infer<
  typeof getMountainPassConditionsParamsSchema
>;

// ============================================================================
// Output Schemas & Types (shared schemas first, then array wrappers)
// ============================================================================

export const travelRestrictionSchema = z
  .object({
    TravelDirection: z.string().nullable().describe(""),

    RestrictionText: z.string().nullable().describe(""),
  })
  .catchall(z.unknown())
  .describe("");

export const mountainPassConditionSchema = z
  .object({
    DateUpdated: zWsdotDate().describe(""),

    ElevationInFeet: z.number().describe(""),

    Latitude: zLatitude().describe(""),

    Longitude: zLongitude().describe(""),

    MountainPassId: z.number().int().positive().describe(""),

    MountainPassName: z.string().nullable().describe(""),

    RestrictionOne: travelRestrictionSchema.nullable().describe(""),

    RestrictionTwo: travelRestrictionSchema.nullable().describe(""),

    RoadCondition: z.string().nullable().describe(""),

    TemperatureInFahrenheit: zNullableNumber().describe(""),

    TravelAdvisoryActive: z.boolean().describe(""),

    WeatherCondition: z.string().nullable().describe(""),
  })
  .catchall(z.unknown())
  .describe("");

export const mountainPassConditionArraySchema = z
  .array(mountainPassConditionSchema)
  .describe("");

export type TravelRestriction = z.infer<typeof travelRestrictionSchema>;

export type MountainPassCondition = z.infer<typeof mountainPassConditionSchema>;

// ============================================================================
// TanStack Query Hooks (singular first, then array)
// ============================================================================

export const useMountainPassConditionById = (
  params: GetMountainPassConditionByIdParams,
  options?: TanStackOptions<MountainPassCondition>
): UseQueryResult<MountainPassCondition, Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "mountain-pass-conditions",
      "getMountainPassConditionById",
      JSON.stringify(params),
    ],
    queryFn: () => getMountainPassConditionById(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

export const useMountainPassConditions = (
  params: GetMountainPassConditionsParams = {},
  options?: TanStackOptions<MountainPassCondition[]>
): UseQueryResult<MountainPassCondition[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "mountain-pass-conditions",
      "getMountainPassConditions",
      JSON.stringify(params),
    ],
    queryFn: () => getMountainPassConditions(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
