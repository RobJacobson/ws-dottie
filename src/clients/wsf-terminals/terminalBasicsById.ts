import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  terminalBasicsSchema,
  type TerminalBasics,
} from "@/schemas/wsf-terminals";

// ============================================================================
// Input Schema & Types
//
// getTerminalBasicsByTerminalIdParamsSchema
// GetTerminalBasicsByTerminalIdParams
// ============================================================================

export const getTerminalBasicsByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export type GetTerminalBasicsByTerminalIdParams = z.infer<
  typeof getTerminalBasicsByTerminalIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// terminalBasicsSchema (imported from terminalBasics.zod)
// TerminalBasics (imported from terminalBasics.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getTerminalBasicsByTerminalId (singular item)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminalbasics/{terminalId}";

export const getTerminalBasicsByTerminalId = zodFetch<
  GetTerminalBasicsByTerminalIdParams,
  TerminalBasics
>(
  ENDPOINT_BY_ID,
  getTerminalBasicsByTerminalIdParamsSchema,
  terminalBasicsSchema
);

// ============================================================================
// TanStack Query Hooks
//
// useFaresTerminalBasicsByFaresTerminalId (singular item)
// ============================================================================

export const terminalBasicsByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getTerminalBasicsByTerminalId,
  queryKey: ["wsf", "terminals", "basics", "getTerminalBasicsByTerminalId"],
  cacheStrategy: "DAILY_STATIC",
});
