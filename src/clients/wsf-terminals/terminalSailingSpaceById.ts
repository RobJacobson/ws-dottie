import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  terminalSailingSpaceSchema,
  type TerminalSailingSpace,
} from "@/schemas/wsf-terminals";

// ============================================================================
// Input Schemas & Types
//
// getTerminalSailingSpaceByTerminalIdParamsSchema
// GetTerminalSailingSpaceByTerminalIdParams
// ============================================================================

export const getTerminalSailingSpaceByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export type GetTerminalSailingSpaceByTerminalIdParams = z.infer<
  typeof getTerminalSailingSpaceByTerminalIdParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// terminalSailingSpaceSchema (imported from terminalSailingSpace.zod)
// TerminalSailingSpace (imported from terminalSailingSpace.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getTerminalSailingSpaceByTerminalId (singular item)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminalsailingspace/{terminalId}";

export const getTerminalSailingSpaceByTerminalId = zodFetch<
  GetTerminalSailingSpaceByTerminalIdParams,
  TerminalSailingSpace
>(
  ENDPOINT_BY_ID,
  getTerminalSailingSpaceByTerminalIdParamsSchema,
  terminalSailingSpaceSchema
);

// ============================================================================
// TanStack Query Hooks
//
// useFaresTerminalSailingSpaceByFaresTerminalId (singular item)
// ============================================================================

export const terminalSailingSpaceByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getTerminalSailingSpaceByTerminalId,
  queryKey: [
    "wsf",
    "terminals",
    "sailingSpace",
    "getTerminalSailingSpaceByTerminalId",
  ],
  cacheStrategy: "DAILY_STATIC",
});
