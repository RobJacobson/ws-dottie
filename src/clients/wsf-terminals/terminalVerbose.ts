import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  terminalVerboseArraySchema,
  type TerminalVerboseArray,
} from "@/schemas/wsf-terminals";

// ============================================================================
// Input Schemas & Types
//
// getTerminalVerboseParamsSchema
// GetTerminalVerboseParams
// ============================================================================

export const getTerminalVerboseParamsSchema = z.object({});

export type GetTerminalVerboseParams = z.infer<
  typeof getTerminalVerboseParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// terminalVerboseArraySchema (imported from terminalVerbose.zod)
// TerminalVerboseArray (imported from terminalVerbose.zod)
// ============================================================================

export type FaresTerminalVerboses = TerminalVerboseArray;

// ============================================================================
// API Functions
//
// getTerminalVerbose (array)
// ============================================================================

const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminalverbose";

export const getTerminalVerbose = zodFetch<
  GetTerminalVerboseParams,
  FaresTerminalVerboses
>(ENDPOINT_ALL, getTerminalVerboseParamsSchema, terminalVerboseArraySchema);

// ============================================================================
// TanStack Query Hooks
//
// useFaresTerminalVerbose (array)
// ============================================================================

export const terminalVerboseOptions = createQueryOptions({
  apiFunction: getTerminalVerbose,
  queryKey: ["wsf", "terminals", "verbose", "getTerminalVerbose"],
  cacheStrategy: "DAILY_STATIC",
});
