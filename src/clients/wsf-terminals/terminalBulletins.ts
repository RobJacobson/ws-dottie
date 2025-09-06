import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  terminalBulletinsSchema,
  terminalBulletinsArraySchema,
  type TerminalBulletins,
  type TerminalBulletinsArray,
} from "@/schemas/wsf-terminals";

// ============================================================================
// Input Schema & Types
//
// getFaresTerminalBulletinsByFaresTerminalIdParamsSchema
// getFaresTerminalBulletinsParamsSchema
// GetFaresTerminalBulletinsByFaresTerminalIdParams
// GetFaresTerminalBulletinsParams
// ============================================================================

export const getFaresTerminalBulletinsByFaresTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export const getFaresTerminalBulletinsParamsSchema = z.object({});

export type GetFaresTerminalBulletinsByFaresTerminalIdParams = z.infer<
  typeof getFaresTerminalBulletinsByFaresTerminalIdParamsSchema
>;

export type GetFaresTerminalBulletinsParams = z.infer<
  typeof getFaresTerminalBulletinsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// terminalBulletinsSchema (imported from terminalBulletins.zod)
// terminalBulletinsArraySchema (imported from terminalBulletins.zod)
// FaresTerminalBulletins (imported from terminalBulletins.zod)
// FaresTerminalBulletinsArray (imported from terminalBulletins.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getFaresTerminalBulletinsByFaresTerminalId (singular item)
// getFaresTerminalBulletins (array)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminalbulletins/{terminalId}";
const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminalbulletins";

export const getFaresTerminalBulletinsByFaresTerminalId = zodFetch<
  GetFaresTerminalBulletinsByFaresTerminalIdParams,
  TerminalBulletins
>(
  ENDPOINT_BY_ID,
  getFaresTerminalBulletinsByFaresTerminalIdParamsSchema,
  terminalBulletinsSchema
);

export const getFaresTerminalBulletins = zodFetch<
  GetFaresTerminalBulletinsParams,
  TerminalBulletinsArray
>(
  ENDPOINT_ALL,
  getFaresTerminalBulletinsParamsSchema,
  terminalBulletinsArraySchema
);

// ============================================================================
// TanStack Query Hooks
//
// useFaresTerminalBulletinsByFaresTerminalId (singular item)
// useFaresTerminalBulletins (array)
// ============================================================================

export const terminalBulletinsByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getFaresTerminalBulletinsByFaresTerminalId,
  queryKey: [
    "wsf",
    "terminals",
    "bulletins",
    "getFaresTerminalBulletinsByFaresTerminalId",
  ],
  cacheStrategy: "DAILY_STATIC",
});

export const terminalBulletinsOptions = createQueryOptions({
  apiFunction: getFaresTerminalBulletins,
  queryKey: ["wsf", "terminals", "bulletins", "getFaresTerminalBulletins"],
  cacheStrategy: "DAILY_STATIC",
});
