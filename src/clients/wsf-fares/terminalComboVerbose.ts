import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { terminalComboVerboseItemSchema } from "@/schemas/wsf-fares";

// ============================================================================
// Input Schemas & Types
//
// getTerminalComboVerboseParamsSchema
// GetTerminalComboVerboseParams
// ============================================================================

export const getTerminalComboVerboseParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetTerminalComboVerboseParams = z.infer<
  typeof getTerminalComboVerboseParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// terminalComboVerboseItemSchema (imported from terminalComboVerbose.zod)
// TerminalComboVerboseItem (imported from terminalComboVerbose.zod)
// ============================================================================

export const terminalComboVerboseArraySchema = z.array(
  terminalComboVerboseItemSchema
);
export type TerminalComboVerbose = z.infer<
  typeof terminalComboVerboseArraySchema
>;

// ============================================================================
// API Functions
//
// getTerminalComboVerbose (verbose terminal combinations for fares)
// ============================================================================

const ENDPOINT = "/ferries/api/fares/rest/terminalcomboverbose/{tripDate}";

export const getTerminalComboVerbose = zodFetch<
  GetTerminalComboVerboseParams,
  TerminalComboVerbose
>(
  ENDPOINT,
  getTerminalComboVerboseParamsSchema,
  terminalComboVerboseArraySchema
);

// ============================================================================
// TanStack Query Hooks
//
// useTerminalComboVerbose
// ============================================================================

export const terminalComboVerboseOptions = createQueryOptions({
  apiFunction: getTerminalComboVerbose,
  queryKey: ["wsf", "fares", "terminalcomboverbose", "getTerminalComboVerbose"],
  cacheStrategy: "DAILY_STATIC",
});
