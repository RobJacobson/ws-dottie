import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  vesselVerboseArraySchema as importedVesselVerboseArraySchema,
  type VesselVerboseArray as ImportedVesselVerboseArray,
} from "@/schemas/wsf-vessels";

// ============================================================================
// Input Schema & Types
//
// getVesselVerboseParamsSchema
// GetVesselVerboseParams
// ============================================================================

export const getVesselVerboseParamsSchema = z.object({});

export type GetVesselVerboseParams = z.infer<
  typeof getVesselVerboseParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselVerboseArraySchema (imported from vesselVerbose.zod)
// VesselVerboseArray (imported from vesselVerbose.zod)
// ============================================================================

// VesselVerbose and VesselVerboses types are exported from centralized schemas

// ============================================================================
// API Functions
//
// getVesselVerbose (array)
// ============================================================================

const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselverbose";

export const getVesselVerbose = zodFetch<
  GetVesselVerboseParams,
  ImportedVesselVerboseArray
>(ENDPOINT_ALL, getVesselVerboseParamsSchema, importedVesselVerboseArraySchema);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const vesselVerboseOptions = createQueryOptions({
  apiFunction: getVesselVerbose,
  queryKey: ["wsf", "vessels", "verbose", "getVesselVerbose"],
  cacheStrategy: "DAILY_STATIC",
});
