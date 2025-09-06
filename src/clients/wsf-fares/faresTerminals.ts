import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { faresTerminalSchema } from "@/schemas/wsf-fares";

// ============================================================================
// Input Schemas & Types
//
// getFaresTerminalsParamsSchema
// GetFaresTerminalsParams
// ============================================================================

export const getFaresTerminalsParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetFaresTerminalsParams = z.infer<
  typeof getFaresTerminalsParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// faresTerminalSchema (imported from faresTerminal.zod)
// FaresTerminal (imported from faresTerminal.zod)
// ============================================================================

export const faresTerminalsArraySchema = z.array(faresTerminalSchema);
export type FaresTerminals = z.infer<typeof faresTerminalsArraySchema>;

// ============================================================================
// API Functions
//
// getFaresTerminals (all terminals for fares on a date)
// ============================================================================

const ENDPOINT = "/ferries/api/fares/rest/terminals/{tripDate}";

export const getFaresTerminals = zodFetch<
  GetFaresTerminalsParams,
  FaresTerminals
>(ENDPOINT, getFaresTerminalsParamsSchema, faresTerminalsArraySchema);

// ============================================================================
// TanStack Query Hooks
//
// useFaresTerminals
// ============================================================================

export const terminalsOptions = createQueryOptions({
  apiFunction: getFaresTerminals,
  queryKey: ["wsf", "fares", "terminals", "getFaresTerminals"],
  cacheStrategy: "DAILY_STATIC",
});
