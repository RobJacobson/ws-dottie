import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { terminalMateSchema } from "@/schemas/wsf-fares";

// ============================================================================
// Input Schemas & Types
//
// getFaresTerminalMatesParamsSchema
// GetFaresTerminalMatesParams
// ============================================================================

export const getFaresTerminalMatesParamsSchema = z.object({
  tripDate: z.date(),
  terminalId: z.number().int().positive(),
});

export type GetFaresTerminalMatesParams = z.infer<
  typeof getFaresTerminalMatesParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// terminalMateSchema (imported from terminalMates.zod)
// TerminalMate (imported from terminalMates.zod)
// ============================================================================

export const terminalMatesArraySchema = z.array(terminalMateSchema);
export type TerminalMates = z.infer<typeof terminalMatesArraySchema>;

// ============================================================================
// API Functions
//
// getFaresTerminalMates (terminal mates for fares)
// ============================================================================

const ENDPOINT =
  "/ferries/api/fares/rest/terminalmates/{tripDate}/{terminalId}";

export const getFaresTerminalMates = zodFetch<
  GetFaresTerminalMatesParams,
  TerminalMates
>(ENDPOINT, getFaresTerminalMatesParamsSchema, terminalMatesArraySchema);

// ============================================================================
// TanStack Query Hooks
//
// useFaresTerminalMates
// ============================================================================

export const terminalMatesOptions = createQueryOptions({
  apiFunction: getFaresTerminalMates,
  queryKey: ["wsf", "fares", "terminalmates", "getFaresTerminalMates"],
  cacheStrategy: "DAILY_STATIC",
});
