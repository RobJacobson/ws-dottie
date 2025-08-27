import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

import { getCacheFlushDateTerminals } from "../wsf/cacheFlushDate";
import { terminalTransitLinkSchema } from "./terminalVerbose";

// ============================================================================
// API Functions
//
// getTerminalTransportsByTerminalId (singular item)
// getTerminalTransports (array)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminaltransports/{terminalId}";
const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminaltransports";

export const getTerminalTransportsByTerminalId = async (
  params: GetTerminalTransportsByTerminalIdParams
): Promise<TerminalTransport> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getTerminalTransportsByTerminalIdParamsSchema,
      output: terminalTransportSchema,
    },
    params
  );
};

export const getTerminalTransports = async (
  params: GetTerminalTransportsParams = {}
): Promise<TerminalTransport[]> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      input: getTerminalTransportsParamsSchema,
      output: terminalTransportsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getTerminalTransportsByTerminalIdParamsSchema
// getTerminalTransportsParamsSchema
// GetTerminalTransportsByTerminalIdParams
// GetTerminalTransportsParams
// ============================================================================

export const getTerminalTransportsByTerminalIdParamsSchema = z
  .object({
    terminalId: z.number().int().describe(""),
  })
  .describe("");

export const getTerminalTransportsParamsSchema = z.object({}).describe("");

export type GetTerminalTransportsByTerminalIdParams = z.infer<
  typeof getTerminalTransportsByTerminalIdParamsSchema
>;

export type GetTerminalTransportsParams = z.infer<
  typeof getTerminalTransportsParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// terminalTransitLinkSchema
// terminalTransportSchema
// terminalTransportsArraySchema
// TerminalTransport
// TerminalTransitLink
// ============================================================================

export const terminalTransportSchema = z
  .object({
    TerminalID: z.number().describe(""),
    TerminalSubjectID: z.number().describe(""),
    RegionID: z.number().describe(""),
    TerminalName: z.string().describe(""),
    TerminalAbbrev: z.string().describe(""),
    SortSeq: z.number().describe(""),
    ParkingInfo: z.string().nullable().describe(""),
    ParkingShuttleInfo: z.string().nullable().describe(""),
    AirportInfo: z.string().nullable().describe(""),
    AirportShuttleInfo: z.string().nullable().describe(""),
    MotorcycleInfo: z.string().nullable().describe(""),
    TruckInfo: z.string().nullable().describe(""),
    BikeInfo: z.string().nullable().describe(""),
    TrainInfo: z.string().nullable().describe(""),
    TaxiInfo: z.string().nullable().describe(""),
    HovInfo: z.string().nullable().describe(""),
    TransitLinks: z.array(terminalTransitLinkSchema).describe(""),
  })
  .describe("");

export const terminalTransportsArraySchema = z.array(terminalTransportSchema);

export type TerminalTransport = z.infer<typeof terminalTransportSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useTerminalTransportsByTerminalId (singular item)
// useTerminalTransports (array)
// ============================================================================

export const useTerminalTransportsByTerminalId = (
  params: GetTerminalTransportsByTerminalIdParams,
  options?: TanStackOptions<TerminalTransport>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "transports", params.terminalId],
    queryFn: () => getTerminalTransportsByTerminalId(params),
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};

export const useTerminalTransports = (
  options?: TanStackOptions<TerminalTransport[]>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "transports"],
    queryFn: getTerminalTransports,
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
