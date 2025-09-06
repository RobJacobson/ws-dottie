import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  terminalLocationSchema,
  type TerminalLocation,
} from "@/schemas/wsf-terminals";

// ============================================================================
// Input Schema & Types
// ============================================================================

export const getTerminalLocationsByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export type GetTerminalLocationsByTerminalIdParams = z.infer<
  typeof getTerminalLocationsByTerminalIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
// ============================================================================

// ============================================================================
// API Function
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminallocations/{terminalId}";

export const getTerminalLocationsByTerminalId = zodFetch<
  GetTerminalLocationsByTerminalIdParams,
  TerminalLocation
>(
  ENDPOINT_BY_ID,
  getTerminalLocationsByTerminalIdParamsSchema,
  terminalLocationSchema
);

// ============================================================================
// TanStack Query Hooks
// ============================================================================

export const terminalLocationsByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getTerminalLocationsByTerminalId,
  queryKey: [
    "wsf",
    "terminals",
    "locations",
    "getTerminalLocationsByTerminalId",
  ],
  cacheStrategy: "DAILY_STATIC",
});
