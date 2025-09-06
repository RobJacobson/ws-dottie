import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  terminalTransportsSchema,
  terminalTransportsArraySchema,
  type TerminalTransports as FaresTerminalTransports,
  type TerminalTransportsArray as FaresTerminalTransportsArray,
} from "@/schemas/wsf-terminals";
import { transitLinkSchema, type TransitLink } from "@/schemas/wsf-terminals";

// ============================================================================
// Input Schemas & Types
//
// getFaresTerminalTransportsByFaresTerminalIdParamsSchema
// getFaresTerminalTransportsParamsSchema
// GetFaresTerminalTransportsByFaresTerminalIdParams
// GetFaresTerminalTransportsParams
// ============================================================================

export const getFaresTerminalTransportsByFaresTerminalIdParamsSchema = z.object(
  {
    terminalId: z.number().int(),
  }
);

export const getFaresTerminalTransportsParamsSchema = z.object({});

export type GetFaresTerminalTransportsByFaresTerminalIdParams = z.infer<
  typeof getFaresTerminalTransportsByFaresTerminalIdParamsSchema
>;

export type GetFaresTerminalTransportsParams = z.infer<
  typeof getFaresTerminalTransportsParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// terminalTransportsSchema (imported from terminalTransports.zod)
// terminalTransportsArraySchema (imported from terminalTransports.zod)
// transitLinkSchema (imported from transitLink.zod)
// FaresTerminalTransports (imported from terminalTransports.zod)
// TransitLink (imported from transitLink.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getFaresTerminalTransportsByFaresTerminalId (singular item)
// getFaresTerminalTransports (array)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminaltransports/{terminalId}";
const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminaltransports";

export const getFaresTerminalTransportsByFaresTerminalId = zodFetch<
  GetFaresTerminalTransportsByFaresTerminalIdParams,
  FaresTerminalTransports
>(
  ENDPOINT_BY_ID,
  getFaresTerminalTransportsByFaresTerminalIdParamsSchema,
  terminalTransportsSchema
);

export const getFaresTerminalTransports = zodFetch<
  GetFaresTerminalTransportsParams,
  FaresTerminalTransportsArray
>(
  ENDPOINT_ALL,
  getFaresTerminalTransportsParamsSchema,
  terminalTransportsArraySchema
);

// ============================================================================
// TanStack Query Hooks
//
// useFaresTerminalTransportsByFaresTerminalId (singular item)
// useFaresTerminalTransports (array)
// ============================================================================

export const terminalTransportsByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getFaresTerminalTransportsByFaresTerminalId,
  queryKey: [
    "wsf",
    "terminals",
    "transports",
    "getFaresTerminalTransportsByFaresTerminalId",
  ],
  cacheStrategy: "DAILY_STATIC",
});

export const terminalTransportsOptions = createQueryOptions({
  apiFunction: getFaresTerminalTransports,
  queryKey: ["wsf", "terminals", "transports", "getFaresTerminalTransports"],
  cacheStrategy: "DAILY_STATIC",
});
