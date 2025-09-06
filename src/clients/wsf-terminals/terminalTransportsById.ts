import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  terminalTransportsSchema,
  type TerminalTransports,
} from "@/schemas/wsf-terminals";

// ============================================================================
// Input Schemas & Types
// ============================================================================

export const getTerminalTransportsByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export type GetTerminalTransportsByTerminalIdParams = z.infer<
  typeof getTerminalTransportsByTerminalIdParamsSchema
>;

// ============================================================================
// Output Schemas & Types
// ============================================================================

// ============================================================================
// API Function
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminaltransports/{terminalId}";

export const getTerminalTransportsByTerminalId = zodFetch<
  GetTerminalTransportsByTerminalIdParams,
  TerminalTransports
>(
  ENDPOINT_BY_ID,
  getTerminalTransportsByTerminalIdParamsSchema,
  terminalTransportsSchema
);

// ============================================================================
// TanStack Query Hooks
// ============================================================================

export const terminalTransportsByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getTerminalTransportsByTerminalId,
  queryKey: [
    "wsf",
    "terminals",
    "transports",
    "getTerminalTransportsByTerminalId",
  ],
  cacheStrategy: "DAILY_STATIC",
});
