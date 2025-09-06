import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  terminalVerboseSchema,
  type TerminalVerbose,
} from "@/schemas/wsf-terminals";

// ============================================================================
// Input Schemas & Types
//
// getTerminalVerboseByTerminalIdParamsSchema
// GetTerminalVerboseByTerminalIdParams
// ============================================================================

export const getTerminalVerboseByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export type GetTerminalVerboseByTerminalIdParams = z.infer<
  typeof getTerminalVerboseByTerminalIdParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// terminalVerboseSchema (imported from terminalVerbose.zod)
// TerminalVerbose (imported from terminalVerbose.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getTerminalVerboseByTerminalId (singular item)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminalverbose/{terminalId}";

export const getTerminalVerboseByTerminalId = zodFetch<
  GetTerminalVerboseByTerminalIdParams,
  TerminalVerbose
>(
  ENDPOINT_BY_ID,
  getTerminalVerboseByTerminalIdParamsSchema,
  terminalVerboseSchema
);

// ============================================================================
// TanStack Query Hooks
//
// useFaresTerminalVerboseByFaresTerminalId (singular item)
// ============================================================================

export const terminalVerboseByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getTerminalVerboseByTerminalId,
  queryKey: ["wsf", "terminals", "verbose", "getTerminalVerboseByTerminalId"],
  cacheStrategy: "DAILY_STATIC",
});
