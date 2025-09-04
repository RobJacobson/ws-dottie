/**
 * @module WSDOT — Mountain Pass Conditions API
 * @description Mountain pass conditions, advisories, and travel restrictions.
 *
 * Provides:
 * - Single pass condition by ID
 * - All current pass conditions
 *
 * Data includes:
 * - Pass identifiers, elevation, coordinates, road/weather conditions, dates (JS Date)
 *
 * @functions
 *   - getMountainPassConditions: Returns all pass conditions
 *   - getMountainPassConditionById: Returns a single pass condition by ID
 *
 * @input
 *   - getMountainPassConditions: {}
 *   - getMountainPassConditionById:
 *     - passConditionId: Pass condition identifier
 *
 * @output
 *   - getMountainPassConditions: MountainPassConditions
 *   - getMountainPassConditionById: MountainPassCondition
 *   - MountainPassCondition fields:
 *     - DateUpdated: Last update time (JS Date)
 *     - ElevationInFeet: Elevation in feet
 *     - Latitude: Latitude in decimal degrees
 *     - Longitude: Longitude in decimal degrees
 *     - MountainPassId: Pass identifier
 *     - MountainPassName: Pass name (nullable)
 *     - RestrictionOne: Restriction details (nullable)
 *     - RestrictionTwo: Restriction details (nullable)
 *     - RoadCondition: Road condition (nullable)
 *     - TemperatureInFahrenheit: Temperature (F, nullable)
 *     - TravelAdvisoryActive: Whether advisory is active
 *     - WeatherCondition: Weather condition (nullable)
 *   - TravelRestriction fields:
 *     - TravelDirection: Travel direction (nullable)
 *     - RestrictionText: Restriction text (nullable)
 *
 * @baseType
 *   - MountainPassCondition: Pass condition record
 *   - TravelRestriction: Travel restriction detail
 *
 * @cli
 *   - getMountainPassConditions: node dist/cli.mjs getMountainPassConditions
 *   - getMountainPassConditionById: node dist/cli.mjs getMountainPassConditionById '{"passConditionId": 1}'
 *
 * @exampleResponse
 * {
 *   "DateUpdated": "2025-08-22T14:11:37.433Z",
 *   "ElevationInFeet": 4102,
 *   "Latitude": 47.335298205,
 *   "Longitude": -120.581068216,
 *   "MountainPassId": 1,
 *   "MountainPassName": "Blewett Pass US 97",
 *   "RestrictionOne": {
 *     "TravelDirection": "Northbound",
 *     "RestrictionText": "No restrictions"
 *   },
 *   "RestrictionTwo": {
 *     "TravelDirection": "Southbound",
 *     "RestrictionText": "No restrictions"
 *   },
 *   "RoadCondition": "Seasonal weather reports have ended for this season. Traditionally weather is reported on this page from November 1 to April 1. Should adverse weather or other incidents occur that will impact travel, updates will be provided as information is available.",
 *   "TemperatureInFahrenheit": null,
 *   "TravelAdvisoryActive": true,
 *   "WeatherCondition": ""
 * }
 *
 * @see https://wsdot.wa.gov/traffic/api/Documentation/group___mountain_pass.html
 */
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

/** Fetches a single mountain pass condition by ID */
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

/** Fetches all mountain pass conditions */
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

/** Params schema for getMountainPassConditionById */
export const getMountainPassConditionByIdParamsSchema = z.object({
  /** Pass condition identifier */
  passConditionId: z.number().int().positive(),
});

/** GetMountainPassConditionByIdParams type */
export type GetMountainPassConditionByIdParams = z.infer<
  typeof getMountainPassConditionByIdParamsSchema
>;

/** Params schema for getMountainPassConditions (none) */
export const getMountainPassConditionsParamsSchema = z.object({});

/** GetMountainPassConditionsParams type */
export type GetMountainPassConditionsParams = z.infer<
  typeof getMountainPassConditionsParamsSchema
>;

// ============================================================================
// Output Schemas & Types (shared schemas first, then array wrappers)
// ============================================================================

/** Travel restriction schema */
export const travelRestrictionSchema = z.object({
  /** Travel direction (nullable) */
  TravelDirection: z.string().nullable(),
  /** Restriction text (nullable) */
  RestrictionText: z.string().nullable(),
});

/** Mountain pass condition item schema */
export const mountainPassConditionSchema = z.object({
  /** Last update time (JS Date) */
  DateUpdated: zWsdotDate(),
  /** Elevation in feet */
  ElevationInFeet: z.number(),
  /** Latitude in decimal degrees */
  Latitude: zLatitude(),
  /** Longitude in decimal degrees */
  Longitude: zLongitude(),
  /** Pass identifier */
  MountainPassId: z.number().int().positive(),
  /** Pass name (nullable) */
  MountainPassName: z.string().nullable(),
  /** Restriction one (nullable) */
  RestrictionOne: travelRestrictionSchema.nullable(),
  /** Restriction two (nullable) */
  RestrictionTwo: travelRestrictionSchema.nullable(),
  /** Road condition (nullable) */
  RoadCondition: z.string().nullable(),
  /** Temperature in Fahrenheit (nullable) */
  TemperatureInFahrenheit: zNullableNumber(),
  /** Whether advisory is active */
  TravelAdvisoryActive: z.boolean(),
  /** Weather condition (nullable) */
  WeatherCondition: z.string().nullable(),
});

/** Mountain pass conditions array schema */
export const mountainPassConditionArraySchema = z.array(
  mountainPassConditionSchema
);

/** TravelRestriction type */
export type TravelRestriction = z.infer<typeof travelRestrictionSchema>;

/** MountainPassCondition type */
export type MountainPassCondition = z.infer<typeof mountainPassConditionSchema>;

/** MountainPassConditions type */
export type MountainPassConditions = z.infer<
  typeof mountainPassConditionArraySchema
>;

// ============================================================================
// TanStack Query Options (singular first, then array)
// ============================================================================

/** Returns options for a single pass condition by ID; polls daily */
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

/** Returns options for all pass conditions; polls daily */
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
