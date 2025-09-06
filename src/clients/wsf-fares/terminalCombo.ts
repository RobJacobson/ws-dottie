import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  scheduleTerminalComboSchema,
  type TerminalCombo,
} from "@/schemas/wsf-fares";

// ============================================================================
// Input Schemas & Types
//
// getFaresTerminalComboParamsSchema
// GetFaresTerminalComboParams
// ============================================================================

export const getFaresTerminalComboParamsSchema = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
});

export type GetFaresTerminalComboParams = z.infer<
  typeof getFaresTerminalComboParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// scheduleTerminalComboSchema (imported from terminalCombo.zod)
// TerminalCombo (imported from terminalCombo.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getFaresTerminalCombo (terminal combination for fares)
// ============================================================================

const ENDPOINT =
  "/ferries/api/fares/rest/terminalcombo/{tripDate}/{departingTerminalId}/{arrivingTerminalId}";

export const getFaresTerminalCombo = zodFetch<
  GetFaresTerminalComboParams,
  TerminalCombo
>(ENDPOINT, getFaresTerminalComboParamsSchema, scheduleTerminalComboSchema);

// ============================================================================
// TanStack Query Hooks
//
// useFaresTerminalCombo
// ============================================================================

export const terminalComboOptions = createQueryOptions({
  apiFunction: getFaresTerminalCombo,
  queryKey: ["wsf", "fares", "terminalcombo", "getFaresTerminalCombo"],
  cacheStrategy: "DAILY_STATIC",
});
