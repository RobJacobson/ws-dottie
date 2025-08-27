import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

import { getCacheFlushDateTerminals } from "../wsf/cacheFlushDate";

// ============================================================================
// API Functions
//
// getTerminalLocationsByTerminalId (singular item)
// getTerminalLocations (array)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminallocations/{terminalId}";
const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminallocations";

export const getTerminalLocationsByTerminalId = async (
  params: GetTerminalLocationsByTerminalIdParams
): Promise<TerminalLocation> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getTerminalLocationsByTerminalIdParamsSchema,
      output: terminalLocationSchema,
    },
    params
  );
};

export const getTerminalLocations = async (
  params: GetTerminalLocationsParams = {}
): Promise<TerminalLocation[]> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      input: getTerminalLocationsParamsSchema,
      output: terminalLocationsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTerminalLocationsByTerminalIdParamsSchema
// getTerminalLocationsParamsSchema
// GetTerminalLocationsByTerminalIdParams
// GetTerminalLocationsParams
// ============================================================================

export const getTerminalLocationsByTerminalIdParamsSchema = z
  .object({
    terminalId: z.number().int().describe(""),
  })
  .describe("");

export const getTerminalLocationsParamsSchema = z.object({}).describe("");

export type GetTerminalLocationsByTerminalIdParams = z.infer<
  typeof getTerminalLocationsByTerminalIdParamsSchema
>;
export type GetTerminalLocationsParams = z.infer<
  typeof getTerminalLocationsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// terminalLocationSchema
// terminalLocationsArraySchema
// TerminalLocation
// ============================================================================

export const terminalLocationSchema = z
  .object({
    TerminalID: z.number().int().describe(""),
    TerminalSubjectID: z.number().int().describe(""),
    RegionID: z.number().int().describe(""),
    TerminalName: z.string().describe(""),
    TerminalAbbrev: z.string().describe(""),
    SortSeq: z.number().int().describe(""),
    AddressLineOne: z.string().describe(""),
    AddressLineTwo: z.string().nullable().describe(""),
    City: z.string().describe(""),
    State: z.string().describe(""),
    ZipCode: z.string().describe(""),
    Country: z.string().describe(""),
    Latitude: z.number().describe(""),
    Longitude: z.number().describe(""),
    Directions: z.string().nullable().describe(""),
    DispGISZoomLoc: z
      .array(
        z
          .object({
            Latitude: z.number().describe(""),
            Longitude: z.number().describe(""),
            ZoomLevel: z.number().int().min(0).describe(""),
          })
          .describe("")
      )
      .describe(""),
    MapLink: z.string().nullable().describe(""),
  })
  .describe("");

export type TerminalLocation = z.infer<typeof terminalLocationSchema>;

export const terminalLocationsArraySchema = z.array(terminalLocationSchema);

// ============================================================================
// TanStack Query Hooks
//
// useTerminalLocationsByTerminalId (singular item)
// useTerminalLocations (array)
// ============================================================================

export const useTerminalLocationsByTerminalId = (
  params: GetTerminalLocationsByTerminalIdParams,
  options?: TanStackOptions<TerminalLocation>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "locations", params.terminalId],
    queryFn: () => getTerminalLocationsByTerminalId(params),
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};

export const useTerminalLocations = (
  options?: TanStackOptions<TerminalLocation[]>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "locations"],
    queryFn: getTerminalLocations,
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
