import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  vesselAccommodationsSchema,
  type VesselAccommodations,
} from "@/schemas/wsf-vessels";

// ============================================================================
// Input Schema & Types
//
// getVesselAccommodationsByIdParamsSchema
// GetVesselAccommodationsByIdParams
// ============================================================================

export const getVesselAccommodationsByIdParamsSchema = z.object({
  vesselId: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

export type GetVesselAccommodationsByIdParams = z.infer<
  typeof getVesselAccommodationsByIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselAccommodationsSchema (imported from vesselAccommodations.zod)
// VesselAccommodations (imported from vesselAccommodations.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getVesselAccommodationsById (singular item)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/vessels/rest/vesselaccommodations/{vesselId}";

export const getVesselAccommodationsById = zodFetch<
  GetVesselAccommodationsByIdParams,
  VesselAccommodations
>(
  ENDPOINT_BY_ID,
  getVesselAccommodationsByIdParamsSchema,
  vesselAccommodationsSchema
);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const vesselAccommodationsByIdOptions = createQueryOptions({
  apiFunction: getVesselAccommodationsById,
  queryKey: ["wsf", "vessels", "accommodations", "getVesselAccommodationsById"],
  cacheStrategy: "DAILY_STATIC",
});
