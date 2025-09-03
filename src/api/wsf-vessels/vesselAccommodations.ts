import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import {
  zNullableString,
  zPositiveInteger,
} from "@/shared/fetching/validation/schemas";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_DAY,
  TWO_DAYS,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

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

export const getVesselAccommodations = async (
  params: GetVesselAccommodationsParams = {}
): Promise<VesselAccommodations> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      output: vesselAccommodationArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getVesselAccommodationsParamsSchema
// GetVesselAccommodationsParams
// getVesselAccommodationsByIdParamsSchema
// GetVesselAccommodationsByIdParams
// ============================================================================

export const getVesselAccommodationsParamsSchema = z.object({});

export type GetVesselAccommodationsParams = z.infer<
  typeof getVesselAccommodationsParamsSchema
>;

export const getVesselAccommodationsByIdParamsSchema = z.object({
  vesselId: zPositiveInteger("vessel"),
});

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

export const vesselAccommodationSchema = z.object({
  VesselID: z.number(),
  VesselSubjectID: z.number(),
  VesselName: z.string(),
  VesselAbbrev: z.string(),
  Class: vesselClassSchema,
  CarDeckRestroom: z.boolean(),
  CarDeckShelter: z.boolean(),
  Elevator: z.boolean(),
  ADAAccessible: z.boolean(),
  MainCabinGalley: z.boolean(),
  MainCabinRestroom: z.boolean(),
  PublicWifi: z.boolean(),
  ADAInfo: z.string(),
  AdditionalInfo: zNullableString(),
});

export type VesselAccommodation = z.infer<typeof vesselAccommodationSchema>;

export const vesselAccommodationArraySchema = z.array(
  vesselAccommodationSchema
);

/**
 * VesselAccommodations type - represents an array of vessel accommodation objects
 */
export type VesselAccommodations = z.infer<
  typeof vesselAccommodationArraySchema
>;

// ============================================================================
// TanStack Query Options
// ============================================================================

export const vesselAccommodationsByIdOptions = (
  params: GetVesselAccommodationsByIdParams
) =>
  queryOptions({
    queryKey: [
      "wsf",
      "vessels",
      "accommodations",
      "getVesselAccommodationsById",
      params,
    ],
    queryFn: () => getVesselAccommodationsById(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const vesselAccommodationsOptions = () =>
  queryOptions({
    queryKey: ["wsf", "vessels", "accommodations", "getVesselAccommodations"],
    queryFn: () => getVesselAccommodations({}),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
