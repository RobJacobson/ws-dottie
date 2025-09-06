import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  terminalTransportsArraySchema,
  type TerminalTransportsArray,
} from "@/schemas/wsf-terminals";

// ============================================================================
// Input Schemas & Types
// ============================================================================

export const getTerminalTransportsParamsSchema = z.object({});

export type GetTerminalTransportsParams = z.infer<
  typeof getTerminalTransportsParamsSchema
>;

// ============================================================================
// Output Schemas & Types
// ============================================================================

// ============================================================================
// API Function
// ============================================================================

const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminaltransports";

export const getTerminalTransports = zodFetch<
  GetTerminalTransportsParams,
  TerminalTransportsArray
>(
  ENDPOINT_ALL,
  getTerminalTransportsParamsSchema,
  terminalTransportsArraySchema
);

// ============================================================================
// TanStack Query Hooks
// ============================================================================

export const terminalTransportsOptions = createQueryOptions({
  apiFunction: getTerminalTransports,
  queryKey: ["wsf", "terminals", "transports", "getTerminalTransports"],
  cacheStrategy: "DAILY_STATIC",
});
