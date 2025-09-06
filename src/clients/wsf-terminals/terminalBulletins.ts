import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  terminalBulletinsArraySchema,
  type TerminalBulletinsArray,
} from "@/schemas/wsf-terminals";

// ============================================================================
// Input Schema & Types
// ============================================================================

export const getTerminalBulletinsParamsSchema = z.object({});

export type GetTerminalBulletinsParams = z.infer<
  typeof getTerminalBulletinsParamsSchema
>;

// ============================================================================
// Output Schema & Types
// ============================================================================

// ============================================================================
// API Function
// ============================================================================

const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminalbulletins";

export const getTerminalBulletins = zodFetch<
  GetTerminalBulletinsParams,
  TerminalBulletinsArray
>(ENDPOINT_ALL, getTerminalBulletinsParamsSchema, terminalBulletinsArraySchema);

// ============================================================================
// TanStack Query Hooks
// ============================================================================

export const terminalBulletinsOptions = createQueryOptions({
  apiFunction: getTerminalBulletins,
  queryKey: ["wsf", "terminals", "bulletins", "getTerminalBulletins"],
  cacheStrategy: "DAILY_STATIC",
});
