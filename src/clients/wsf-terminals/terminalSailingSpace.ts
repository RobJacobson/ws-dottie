import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  terminalSailingSpaceArraySchema,
  type TerminalSailingSpaceArray,
} from "@/schemas/wsf-terminals";

// ============================================================================
// Input Schemas & Types
//
// getTerminalSailingSpaceParamsSchema
// GetTerminalSailingSpaceParams
// ============================================================================

export const getTerminalSailingSpaceParamsSchema = z.object({});

export type GetTerminalSailingSpaceParams = z.infer<
  typeof getTerminalSailingSpaceParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// terminalSailingSpaceArraySchema (imported from terminalSailingSpace.zod)
// TerminalSailingSpaceArray (imported from terminalSailingSpace.zod)
// ============================================================================

export type FaresTerminalSailingSpaces = TerminalSailingSpaceArray;

// ============================================================================
// API Functions
//
// getTerminalSailingSpace (array)
// ============================================================================

const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminalsailingspace";

export const getTerminalSailingSpace = zodFetch<
  GetTerminalSailingSpaceParams,
  FaresTerminalSailingSpaces
>(
  ENDPOINT_ALL,
  getTerminalSailingSpaceParamsSchema,
  terminalSailingSpaceArraySchema
);

// ============================================================================
// TanStack Query Hooks
//
// useFaresTerminalSailingSpace (array)
// ============================================================================

export const terminalSailingSpaceOptions = createQueryOptions({
  apiFunction: getTerminalSailingSpace,
  queryKey: ["wsf", "terminals", "sailingSpace", "getTerminalSailingSpace"],
  cacheStrategy: "DAILY_STATIC",
});
