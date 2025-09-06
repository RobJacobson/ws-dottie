import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  terminalBasicsSchema,
  terminalBasicsArraySchema,
  type TerminalBasics,
  type TerminalBasicsArray,
} from "@/schemas/wsf-terminals";

// ============================================================================
// Input Schema & Types
//
// getFaresTerminalBasicsByFaresTerminalIdParamsSchema
// getFaresTerminalBasicsParamsSchema
// GetFaresTerminalBasicsByFaresTerminalIdParams
// GetFaresTerminalBasicsParams
// ============================================================================

export const getFaresTerminalBasicsByFaresTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export const getFaresTerminalBasicsParamsSchema = z.object({});

export type GetFaresTerminalBasicsByFaresTerminalIdParams = z.infer<
  typeof getFaresTerminalBasicsByFaresTerminalIdParamsSchema
>;

export type GetFaresTerminalBasicsParams = z.infer<
  typeof getFaresTerminalBasicsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// terminalBasicsSchema (imported from terminalBasics.zod)
// terminalBasicsArraySchema (imported from terminalBasics.zod)
// FaresTerminalBasics (imported from terminalBasics.zod)
// FaresTerminalBasicsArray (imported from terminalBasics.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getFaresTerminalBasicsByFaresTerminalId (singular item)
// getFaresTerminalBasics (array)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminalbasics/{terminalId}";
const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminalbasics";

export const getFaresTerminalBasicsByFaresTerminalId = zodFetch<
  GetFaresTerminalBasicsByFaresTerminalIdParams,
  TerminalBasics
>(
  ENDPOINT_BY_ID,
  getFaresTerminalBasicsByFaresTerminalIdParamsSchema,
  terminalBasicsSchema
);

export const getFaresTerminalBasics = zodFetch<
  GetFaresTerminalBasicsParams,
  TerminalBasicsArray
>(ENDPOINT_ALL, getFaresTerminalBasicsParamsSchema, terminalBasicsArraySchema);

// ============================================================================
// TanStack Query Hooks
//
// useFaresTerminalBasicsByFaresTerminalId (singular item)
// useFaresTerminalBasics (array)
// ============================================================================

export const terminalBasicsByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getFaresTerminalBasicsByFaresTerminalId,
  queryKey: [
    "wsf",
    "terminals",
    "basics",
    "getFaresTerminalBasicsByFaresTerminalId",
  ],
  cacheStrategy: "DAILY_STATIC",
});

export const terminalBasicsOptions = createQueryOptions({
  apiFunction: getFaresTerminalBasics,
  queryKey: ["wsf", "terminals", "basics", "getFaresTerminalBasics"],
  cacheStrategy: "DAILY_STATIC",
});
