import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  terminalBulletinsSchema,
  type TerminalBulletins,
} from "@/schemas/wsf-terminals";

// ============================================================================
// Input Schema & Types
// ============================================================================

export const getTerminalBulletinsByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export type GetTerminalBulletinsByTerminalIdParams = z.infer<
  typeof getTerminalBulletinsByTerminalIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
// ============================================================================

// ============================================================================
// API Function
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminalbulletins/{terminalId}";

export const getTerminalBulletinsByTerminalId = zodFetch<
  GetTerminalBulletinsByTerminalIdParams,
  TerminalBulletins
>(
  ENDPOINT_BY_ID,
  getTerminalBulletinsByTerminalIdParamsSchema,
  terminalBulletinsSchema
);

// ============================================================================
// TanStack Query Hooks
// ============================================================================

export const terminalBulletinsByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getTerminalBulletinsByTerminalId,
  queryKey: [
    "wsf",
    "terminals",
    "bulletins",
    "getTerminalBulletinsByTerminalId",
  ],
  cacheStrategy: "DAILY_STATIC",
});
