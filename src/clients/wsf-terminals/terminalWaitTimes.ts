import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  terminalWaitTimesArraySchema,
  type TerminalWaitTimesArray,
} from "@/schemas/wsf-terminals";

// ============================================================================
// Input Schemas & Types
//
// getTerminalWaitTimesParamsSchema
// GetTerminalWaitTimesParams
// ============================================================================

export const getTerminalWaitTimesParamsSchema = z.object({});

export type GetTerminalWaitTimesParams = z.infer<
  typeof getTerminalWaitTimesParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// terminalWaitTimesArraySchema (imported from terminalWaitTimes.zod)
// TerminalWaitTimesArray (imported from terminalWaitTimes.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getTerminalWaitTimes (array)
// ============================================================================

const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminalwaittimes";

export const getTerminalWaitTimes = zodFetch<
  GetTerminalWaitTimesParams,
  TerminalWaitTimesArray
>(ENDPOINT_ALL, getTerminalWaitTimesParamsSchema, terminalWaitTimesArraySchema);

// ============================================================================
// TanStack Query Hooks
//
// useFaresTerminalWaitTimes (array)
// ============================================================================

export const terminalWaitTimesOptions = createQueryOptions({
  apiFunction: getTerminalWaitTimes,
  queryKey: ["wsf", "terminals", "waitTimes", "getTerminalWaitTimes"],
  cacheStrategy: "DAILY_STATIC",
});
