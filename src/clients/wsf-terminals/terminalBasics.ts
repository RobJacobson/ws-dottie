import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  terminalBasicsArraySchema,
  type TerminalBasicsArray,
} from "@/schemas/wsf-terminals";

// ============================================================================
// Input Schema & Types
//
// getTerminalBasicsParamsSchema
// GetTerminalBasicsParams
// ============================================================================

export const getTerminalBasicsParamsSchema = z.object({});

export type GetTerminalBasicsParams = z.infer<
  typeof getTerminalBasicsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// terminalBasicsArraySchema (imported from terminalBasics.zod)
// TerminalBasicsArray (imported from terminalBasics.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getTerminalBasics (array)
// ============================================================================

const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminalbasics";

export const getTerminalBasics = zodFetch<
  GetTerminalBasicsParams,
  TerminalBasicsArray
>(ENDPOINT_ALL, getTerminalBasicsParamsSchema, terminalBasicsArraySchema);

// ============================================================================
// TanStack Query Hooks
//
// useFaresTerminalBasics (array)
// ============================================================================

export const terminalBasicsOptions = createQueryOptions({
  apiFunction: getTerminalBasics,
  queryKey: ["wsf", "terminals", "basics", "getTerminalBasics"],
  cacheStrategy: "DAILY_STATIC",
});
