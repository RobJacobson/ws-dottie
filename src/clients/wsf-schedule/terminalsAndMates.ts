import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  terminalsAndMatesSchema,
  type TerminalsAndMates,
} from "@/schemas/wsf-schedule";

// ============================================================================
// Input Schemas & Types
//
// getTerminalsAndMatesParamsSchema
// GetTerminalsAndMatesParams
// ============================================================================

export const getTerminalsAndMatesParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetTerminalsAndMatesParams = z.infer<
  typeof getTerminalsAndMatesParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// terminalsAndMatesSchema (imported from terminalsAndMates.zod)
// TerminalsAndMates (imported from terminalsAndMates.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getTerminalsAndMates (all terminal combinations for a date)
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/terminalsandmates/{tripDate}";

export const getTerminalsAndMates = zodFetch<
  GetTerminalsAndMatesParams,
  TerminalsAndMates
>(ENDPOINT, getTerminalsAndMatesParamsSchema, terminalsAndMatesSchema);

// ============================================================================
// TanStack Query Hooks
//
// useTerminalsAndMates
// ============================================================================

export const terminalsAndMatesOptions = createQueryOptions({
  apiFunction: getTerminalsAndMates,
  queryKey: ["wsf", "schedule", "terminalsandmates", "getTerminalsAndMates"],
  cacheStrategy: "DAILY_STATIC",
});
