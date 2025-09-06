import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  vesselVerboseSchema as importedVesselVerboseSchema,
  vesselVerboseArraySchema as importedVesselVerboseArraySchema,
  type VesselVerbose as ImportedVesselVerbose,
  type VesselVerboseArray as ImportedVesselVerboseArray,
} from "@/schemas/wsf-vessels";

// ============================================================================
// Input Schema & Types
//
// getVesselVerboseParamsSchema
// GetVesselVerboseParams
// getVesselVerboseByIdParamsSchema
// GetVesselVerboseByIdParams
// ============================================================================

export const getVesselVerboseParamsSchema = z.object({});

export type GetVesselVerboseParams = z.infer<
  typeof getVesselVerboseParamsSchema
>;

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
// vesselVerboseArraySchema (imported from vesselVerbose.zod)
// VesselVerbose (imported from vesselVerbose.zod)
// ============================================================================

// VesselVerbose and VesselVerboses types are exported from centralized schemas

// ============================================================================
// API Functions
//
// getVesselVerboseById (singular item)
// getVesselVerbose (array)
// ============================================================================

const ENDPOINT_BY_ID = "/ferries/api/vessels/rest/vesselverbose/{vesselId}";
const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselverbose";

export const getVesselVerboseById = zodFetch<
  GetVesselVerboseByIdParams,
  ImportedVesselVerbose
>(
  ENDPOINT_BY_ID,
  getVesselVerboseByIdParamsSchema,
  importedVesselVerboseSchema
);

export const getVesselVerbose = zodFetch<
  GetVesselVerboseParams,
  ImportedVesselVerboseArray
>(ENDPOINT_ALL, getVesselVerboseParamsSchema, importedVesselVerboseArraySchema);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const vesselVerboseByIdOptions = createQueryOptions({
  apiFunction: getVesselVerboseById,
  queryKey: ["wsf", "vessels", "verbose", "getVesselVerboseById"],
  cacheStrategy: "DAILY_STATIC",
});

export const vesselVerboseOptions = createQueryOptions({
  apiFunction: getVesselVerbose,
  queryKey: ["wsf", "vessels", "verbose", "getVesselVerbose"],
  cacheStrategy: "DAILY_STATIC",
});
