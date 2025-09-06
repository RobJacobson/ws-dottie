import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  terminalVerboseSchema,
  terminalVerboseArraySchema,
  type TerminalVerbose as FaresTerminalVerbose,
  type TerminalVerboseArray as FaresTerminalVerboseArray,
} from "@/schemas/wsf-terminals";
import { transitLinkSchema, type TransitLink } from "@/schemas/wsf-terminals";
import { waitTimeSchema, type WaitTime } from "@/schemas/wsf-terminals";

// ============================================================================
// Input Schemas & Types
//
// getFaresTerminalVerboseByFaresTerminalIdParamsSchema
// getFaresTerminalVerboseParamsSchema
// GetFaresTerminalVerboseByFaresTerminalIdParams
// GetFaresTerminalVerboseParams
// ============================================================================

export const getFaresTerminalVerboseByFaresTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export const getFaresTerminalVerboseParamsSchema = z.object({});

export type GetFaresTerminalVerboseByFaresTerminalIdParams = z.infer<
  typeof getFaresTerminalVerboseByFaresTerminalIdParamsSchema
>;

export type GetFaresTerminalVerboseParams = z.infer<
  typeof getFaresTerminalVerboseParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// terminalVerboseSchema (imported from terminalVerbose.zod)
// terminalVerboseArraySchema (imported from terminalVerbose.zod)
// transitLinkSchema (imported from transitLink.zod)
// waitTimeSchema (imported from waitTime.zod)
// FaresTerminalVerbose (imported from terminalVerbose.zod)
// TransitLink (imported from transitLink.zod)
// WaitTime (imported from waitTime.zod)
// ============================================================================

export type FaresTerminalVerboses = FaresTerminalVerboseArray;

// ============================================================================
// API Functions
//
// getFaresTerminalVerboseByFaresTerminalId (singular item)
// getFaresTerminalVerbose (array)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminalverbose/{terminalId}";
const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminalverbose";

export const getFaresTerminalVerboseByFaresTerminalId = zodFetch<
  GetFaresTerminalVerboseByFaresTerminalIdParams,
  FaresTerminalVerbose
>(
  ENDPOINT_BY_ID,
  getFaresTerminalVerboseByFaresTerminalIdParamsSchema,
  terminalVerboseSchema
);

export const getFaresTerminalVerbose = zodFetch<
  GetFaresTerminalVerboseParams,
  FaresTerminalVerboses
>(
  ENDPOINT_ALL,
  getFaresTerminalVerboseParamsSchema,
  terminalVerboseArraySchema
);

// ============================================================================
// TanStack Query Hooks
//
// useFaresTerminalVerboseByFaresTerminalId (singular item)
// useFaresTerminalVerbose (array)
// ============================================================================

export const terminalVerboseByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getFaresTerminalVerboseByFaresTerminalId,
  queryKey: [
    "wsf",
    "terminals",
    "verbose",
    "getFaresTerminalVerboseByFaresTerminalId",
  ],
  cacheStrategy: "DAILY_STATIC",
});

export const terminalVerboseOptions = createQueryOptions({
  apiFunction: getFaresTerminalVerbose,
  queryKey: ["wsf", "terminals", "verbose", "getFaresTerminalVerbose"],
  cacheStrategy: "DAILY_STATIC",
});
