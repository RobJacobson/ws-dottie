import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  vesselLocationsSchema,
  type VesselLocations,
} from "@/schemas/wsf-vessels";

// ============================================================================
// Input Schema & Types
//
// getVesselLocationsByVesselIdParamsSchema
// GetVesselLocationsByVesselIdParams
// ============================================================================

export const getVesselLocationsByVesselIdParamsSchema = z.object({
  vesselId: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

export type GetVesselLocationsByVesselIdParams = z.infer<
  typeof getVesselLocationsByVesselIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselLocationsSchema (imported from vesselLocations.zod)
// VesselLocations (imported from vesselLocations.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getVesselLocationsByVesselId (singular item)
// ============================================================================

const ENDPOINT_BY_ID = "/ferries/api/vessels/rest/vessellocations/{vesselId}";

export const getVesselLocationsByVesselId = zodFetch<
  GetVesselLocationsByVesselIdParams,
  VesselLocations
>(
  ENDPOINT_BY_ID,
  getVesselLocationsByVesselIdParamsSchema,
  vesselLocationsSchema
);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const vesselLocationsByVesselIdOptions = createQueryOptions({
  apiFunction: getVesselLocationsByVesselId,
  queryKey: ["wsf", "vessels", "locations", "getVesselLocationsByVesselId"],
  cacheStrategy: "REALTIME_UPDATES",
});
