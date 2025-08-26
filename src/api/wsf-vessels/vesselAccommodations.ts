import type { UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import {
  zNullableString,
  zPositiveInteger,
} from "@/shared/fetching/validation/schemas";
import { createVesselIdDescription } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateVessels } from "./getCacheFlushDateVessels";
import { vesselClassSchema } from "./vesselBasics";

// ============================================================================
// API Functions
//
// getVesselAccommodationsById (singular item)
// getVesselAccommodations (array)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/vessels/rest/vesselaccommodations/{vesselId}";
const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselaccommodations";

export const getVesselAccommodationsById = async (
  params: GetVesselAccommodationsByIdParams
): Promise<VesselAccommodation> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getVesselAccommodationsByIdParamsSchema,
      output: vesselAccommodationSchema,
    },
    params
  );
};

export const getVesselAccommodations = async (): Promise<
  VesselAccommodation[]
> => {
  return zodFetch(ENDPOINT_ALL, {
    output: vesselAccommodationArraySchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// getVesselAccommodationsByIdParamsSchema
// GetVesselAccommodationsByIdParams
// ============================================================================

export const getVesselAccommodationsByIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(""),
  })
  .describe("");

export type GetVesselAccommodationsByIdParams = z.infer<
  typeof getVesselAccommodationsByIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselAccommodationSchema
// vesselAccommodationArraySchema
// VesselAccommodation
// ============================================================================

export const vesselAccommodationSchema = z
  .object({
    VesselID: z.number().describe(""),
    VesselSubjectID: z.number().describe(""),
    VesselName: z.string().describe(""),
    VesselAbbrev: z.string().describe(""),
    Class: vesselClassSchema.describe(""),
    CarDeckRestroom: z.boolean().describe(""),
    CarDeckShelter: z.boolean().describe(""),
    Elevator: z.boolean().describe(""),
    ADAAccessible: z.boolean().describe(""),
    MainCabinGalley: z.boolean().describe(""),
    MainCabinRestroom: z.boolean().describe(""),
    PublicWifi: z.boolean().describe(""),
    ADAInfo: z.string().describe(""),
    AdditionalInfo: zNullableString().describe(""),
  })
  .catchall(z.unknown())
  .describe("");

export const vesselAccommodationArraySchema = z
  .array(vesselAccommodationSchema)
  .describe("");

export type VesselAccommodation = z.infer<typeof vesselAccommodationSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useVesselAccommodationsById (singular item)
// useVesselAccommodations (array)
// ============================================================================

export const useVesselAccommodationsById = (
  params: { vesselId: number },
  options?: TanStackOptions<VesselAccommodation>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "accommodations", JSON.stringify(params)],
    queryFn: () => getVesselAccommodationsById(params),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
    params,
  });
};

export const useVesselAccommodations = (
  options?: TanStackOptions<VesselAccommodation[]>
): UseQueryResult<VesselAccommodation[], Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "accommodations"],
    queryFn: getVesselAccommodations,
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
