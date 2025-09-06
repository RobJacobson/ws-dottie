import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  terminalWaitTimesSchema,
  type TerminalWaitTimes,
} from "@/schemas/wsf-terminals";

// ============================================================================
// Input Schemas & Types
//
// getTerminalWaitTimesByTerminalIdParamsSchema
// GetTerminalWaitTimesByTerminalIdParams
// ============================================================================

export const getTerminalWaitTimesByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export type GetTerminalWaitTimesByTerminalIdParams = z.infer<
  typeof getTerminalWaitTimesByTerminalIdParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// terminalWaitTimesSchema (imported from terminalWaitTimes.zod)
// TerminalWaitTimes (imported from terminalWaitTimes.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getTerminalWaitTimesByTerminalId (singular item)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminalwaittimes/{terminalId}";

export const getTerminalWaitTimesByTerminalId = zodFetch<
  GetTerminalWaitTimesByTerminalIdParams,
  TerminalWaitTimes
>(
  ENDPOINT_BY_ID,
  getTerminalWaitTimesByTerminalIdParamsSchema,
  terminalWaitTimesSchema
);

// ============================================================================
// TanStack Query Hooks
//
// useFaresTerminalWaitTimesByFaresTerminalId (singular item)
// ============================================================================

export const terminalWaitTimesByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getTerminalWaitTimesByTerminalId,
  queryKey: [
    "wsf",
    "terminals",
    "waitTimes",
    "getTerminalWaitTimesByTerminalId",
  ],
  cacheStrategy: "DAILY_STATIC",
});
