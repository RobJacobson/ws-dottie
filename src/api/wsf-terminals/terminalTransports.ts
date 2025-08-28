import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createUseQueryWsf, tanstackQueryOptions } from "@/shared/tanstack";

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
): Promise<TerminalTransports> => {
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

export const getTerminalTransportsByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export const getTerminalTransportsParamsSchema = z.object({});

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

export const terminalTransportSchema = z.object({
  TerminalID: z.number(),
  TerminalSubjectID: z.number(),
  RegionID: z.number(),
  TerminalName: z.string(),
  TerminalAbbrev: z.string(),
  SortSeq: z.number(),
  ParkingInfo: z.string().nullable(),
  ParkingShuttleInfo: z.string().nullable(),
  AirportInfo: z.string().nullable(),
  AirportShuttleInfo: z.string().nullable(),
  MotorcycleInfo: z.string().nullable(),
  TruckInfo: z.string().nullable(),
  BikeInfo: z.string().nullable(),
  TrainInfo: z.string().nullable(),
  TaxiInfo: z.string().nullable(),
  HovInfo: z.string().nullable(),
  TransitLinks: z.array(terminalTransitLinkSchema),
});

export const terminalTransportsArraySchema = z.array(terminalTransportSchema);

export type TerminalTransport = z.infer<typeof terminalTransportSchema>;

/**
 * TerminalTransports type - represents an array of terminal transport objects
 */
export type TerminalTransports = z.infer<typeof terminalTransportsArraySchema>;

// ============================================================================
// TanStack Query Hooks
//
// useTerminalTransportsByTerminalId (singular item)
// useTerminalTransports (array)
// ============================================================================

export const useTerminalTransportsByTerminalId = createUseQueryWsf({
  queryFn: getTerminalTransportsByTerminalId,
  queryKeyPrefix: [
    "wsf",
    "terminals",
    "transports",
    "getTerminalTransportsByTerminalId",
  ],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
  getCacheFlushDate: getCacheFlushDateTerminals,
});

export const useTerminalTransports = createUseQueryWsf({
  queryFn: getTerminalTransports,
  queryKeyPrefix: ["wsf", "terminals", "transports", "getTerminalTransports"],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
  getCacheFlushDate: getCacheFlushDateTerminals,
});
