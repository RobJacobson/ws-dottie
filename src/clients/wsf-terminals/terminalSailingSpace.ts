import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  terminalSailingSpaceSchema,
  terminalSailingSpaceArraySchema,
  type TerminalSailingSpace as FaresTerminalSailingSpace,
  type TerminalSailingSpaceArray as FaresTerminalSailingSpaceArray,
} from "@/schemas/wsf-terminals";
import {
  departingSpaceSchema,
  type DepartingSpace,
} from "@/schemas/wsf-terminals";
import {
  spaceForArrivalTerminalSchema as spaceForArrivalFaresTerminalSchema,
  type SpaceForArrivalTerminal as SpaceForArrivalFaresTerminal,
} from "@/schemas/wsf-terminals";

// ============================================================================
// Input Schemas & Types
//
// getFaresTerminalSailingSpaceByFaresTerminalIdParamsSchema
// getFaresTerminalSailingSpaceParamsSchema
// GetFaresTerminalSailingSpaceByFaresTerminalIdParams
// GetFaresTerminalSailingSpaceParams
// ============================================================================

export const getFaresTerminalSailingSpaceByFaresTerminalIdParamsSchema =
  z.object({
    terminalId: z.number().int(),
  });

export const getFaresTerminalSailingSpaceParamsSchema = z.object({});

export type GetFaresTerminalSailingSpaceByFaresTerminalIdParams = z.infer<
  typeof getFaresTerminalSailingSpaceByFaresTerminalIdParamsSchema
>;

export type GetFaresTerminalSailingSpaceParams = z.infer<
  typeof getFaresTerminalSailingSpaceParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// terminalSailingSpaceSchema (imported from terminalSailingSpace.zod)
// terminalSailingSpaceArraySchema (imported from terminalSailingSpace.zod)
// departingSpaceSchema (imported from departingSpace.zod)
// spaceForArrivalFaresTerminalSchema (imported from spaceForArrivalFaresTerminal.zod)
// FaresTerminalSailingSpace (imported from terminalSailingSpace.zod)
// DepartingSpace (imported from departingSpace.zod)
// SpaceForArrivalFaresTerminal (imported from spaceForArrivalFaresTerminal.zod)
// ============================================================================

export type FaresTerminalSailingSpaces = FaresTerminalSailingSpaceArray;

// ============================================================================
// API Functions
//
// getFaresTerminalSailingSpaceByFaresTerminalId (singular item)
// getFaresTerminalSailingSpace (array)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminalsailingspace/{terminalId}";
const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminalsailingspace";

export const getFaresTerminalSailingSpaceByFaresTerminalId = zodFetch<
  GetFaresTerminalSailingSpaceByFaresTerminalIdParams,
  FaresTerminalSailingSpace
>(
  ENDPOINT_BY_ID,
  getFaresTerminalSailingSpaceByFaresTerminalIdParamsSchema,
  terminalSailingSpaceSchema
);

export const getFaresTerminalSailingSpace = zodFetch<
  GetFaresTerminalSailingSpaceParams,
  FaresTerminalSailingSpaces
>(
  ENDPOINT_ALL,
  getFaresTerminalSailingSpaceParamsSchema,
  terminalSailingSpaceArraySchema
);

// ============================================================================
// TanStack Query Hooks
//
// useFaresTerminalSailingSpaceByFaresTerminalId (singular item)
// useFaresTerminalSailingSpace (array)
// ============================================================================

export const terminalSailingSpaceByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getFaresTerminalSailingSpaceByFaresTerminalId,
  queryKey: [
    "wsf",
    "terminals",
    "sailingSpace",
    "getFaresTerminalSailingSpaceByFaresTerminalId",
  ],
  cacheStrategy: "DAILY_STATIC",
});

export const terminalSailingSpaceOptions = createQueryOptions({
  apiFunction: getFaresTerminalSailingSpace,
  queryKey: [
    "wsf",
    "terminals",
    "sailingSpace",
    "getFaresTerminalSailingSpace",
  ],
  cacheStrategy: "DAILY_STATIC",
});
