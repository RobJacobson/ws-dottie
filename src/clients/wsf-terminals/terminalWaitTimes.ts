import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  terminalWaitTimesSchema,
  terminalWaitTimesArraySchema,
  type TerminalWaitTimes as FaresTerminalWaitTimes,
  type TerminalWaitTimesArray as FaresTerminalWaitTimesArray,
} from "@/schemas/wsf-terminals";
import { waitTimeSchema, type WaitTime } from "@/schemas/wsf-terminals";

// ============================================================================
// Input Schemas & Types
//
// getFaresTerminalWaitTimesByFaresTerminalIdParamsSchema
// getFaresTerminalWaitTimesParamsSchema
// GetFaresTerminalWaitTimesByFaresTerminalIdParams
// GetFaresTerminalWaitTimesParams
// ============================================================================

export const getFaresTerminalWaitTimesByFaresTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export const getFaresTerminalWaitTimesParamsSchema = z.object({});

export type GetFaresTerminalWaitTimesByFaresTerminalIdParams = z.infer<
  typeof getFaresTerminalWaitTimesByFaresTerminalIdParamsSchema
>;

export type GetFaresTerminalWaitTimesParams = z.infer<
  typeof getFaresTerminalWaitTimesParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// terminalWaitTimesSchema (imported from terminalWaitTimes.zod)
// terminalWaitTimesArraySchema (imported from terminalWaitTimes.zod)
// waitTimeSchema (imported from waitTime.zod)
// FaresTerminalWaitTimes (imported from terminalWaitTimes.zod)
// WaitTime (imported from waitTime.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getFaresTerminalWaitTimesByFaresTerminalId (singular item)
// getFaresTerminalWaitTimes (array)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminalwaittimes/{terminalId}";
const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminalwaittimes";

export const getFaresTerminalWaitTimesByFaresTerminalId = zodFetch<
  GetFaresTerminalWaitTimesByFaresTerminalIdParams,
  FaresTerminalWaitTimes
>(
  ENDPOINT_BY_ID,
  getFaresTerminalWaitTimesByFaresTerminalIdParamsSchema,
  terminalWaitTimesSchema
);

export const getFaresTerminalWaitTimes = zodFetch<
  GetFaresTerminalWaitTimesParams,
  FaresTerminalWaitTimesArray
>(
  ENDPOINT_ALL,
  getFaresTerminalWaitTimesParamsSchema,
  terminalWaitTimesArraySchema
);

// ============================================================================
// TanStack Query Hooks
//
// useFaresTerminalWaitTimesByFaresTerminalId (singular item)
// useFaresTerminalWaitTimes (array)
// ============================================================================

export const terminalWaitTimesByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getFaresTerminalWaitTimesByFaresTerminalId,
  queryKey: [
    "wsf",
    "terminals",
    "waitTimes",
    "getFaresTerminalWaitTimesByFaresTerminalId",
  ],
  cacheStrategy: "DAILY_STATIC",
});

export const terminalWaitTimesOptions = createQueryOptions({
  apiFunction: getFaresTerminalWaitTimes,
  queryKey: ["wsf", "terminals", "waitTimes", "getFaresTerminalWaitTimes"],
  cacheStrategy: "DAILY_STATIC",
});
