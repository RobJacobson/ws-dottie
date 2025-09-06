import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  vesselVerboseSchema as importedVesselVerboseSchema,
  type VesselVerbose as ImportedVesselVerbose,
} from "@/schemas/wsf-vessels";

// ============================================================================
// Input Schema & Types
//
// getVesselVerboseByIdParamsSchema
// GetVesselVerboseByIdParams
// ============================================================================

export const getVesselVerboseByIdParamsSchema = z.object({
  vesselId: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

export type GetVesselVerboseByIdParams = z.infer<
  typeof getVesselVerboseByIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselVerboseSchema (imported from vesselVerbose.zod)
// VesselVerbose (imported from vesselVerbose.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getVesselVerboseById (singular item)
// ============================================================================

const ENDPOINT_BY_ID = "/ferries/api/vessels/rest/vesselverbose/{vesselId}";

export const getVesselVerboseById = zodFetch<
  GetVesselVerboseByIdParams,
  ImportedVesselVerbose
>(
  ENDPOINT_BY_ID,
  getVesselVerboseByIdParamsSchema,
  importedVesselVerboseSchema
);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const vesselVerboseByIdOptions = createQueryOptions({
  apiFunction: getVesselVerboseById,
  queryKey: ["wsf", "vessels", "verbose", "getVesselVerboseById"],
  cacheStrategy: "DAILY_STATIC",
});
