import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import {
  zPositiveInteger,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateVessels } from "../wsf/cacheFlushDate";

// ============================================================================
// API Functions
//
// getVesselLocationsByVesselId (singular item)
// getVesselLocations (array)
// ============================================================================

const ENDPOINT_BY_ID = "/ferries/api/vessels/rest/vessellocations/{vesselId}";
const ENDPOINT_ALL = "/ferries/api/vessels/rest/vessellocations";

export const getVesselLocationsByVesselId = async (
  params: GetVesselLocationsByVesselIdParams
): Promise<VesselLocation> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getVesselLocationsByVesselIdParamsSchema,
      output: vesselLocationSchema,
    },
    params
  );
};

export const getVesselLocations = async (
  params: GetVesselLocationsParams = {}
): Promise<VesselLocation[]> => {
  return zodFetch(ENDPOINT_ALL, {
    input: getVesselLocationsParamsSchema,
    output: vesselLocationArraySchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// getVesselLocationsByVesselIdParamsSchema
// GetVesselLocationsByVesselIdParams
// ============================================================================

export const getVesselLocationsByVesselIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(""),
  })
  .describe("");

export type GetVesselLocationsByVesselIdParams = z.infer<
  typeof getVesselLocationsByVesselIdParamsSchema
>;

export const getVesselLocationsParamsSchema = z.object({}).describe("");

export type GetVesselLocationsParams = z.infer<
  typeof getVesselLocationsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselLocationSchema
// vesselLocationArraySchema
// VesselLocation
// ============================================================================

const zDate = () => zWsdotDate();

// Output Schema & Type for getVesselLocationsByVesselId (single item by id):

export const vesselLocationSchema = z
  .object({
    VesselID: z.number().int().positive().describe(""),
    VesselName: z.string().min(1).describe(""),
    Mmsi: z.number().describe(""),
    DepartingTerminalID: z.number().describe(""),
    DepartingTerminalName: z.string().describe(""),
    DepartingTerminalAbbrev: z.string().describe(""),
    ArrivingTerminalID: z.number().nullable().describe(""),
    ArrivingTerminalName: z.string().nullable().describe(""),
    ArrivingTerminalAbbrev: z.string().nullable().describe(""),
    Latitude: z.number().min(-90).max(90).describe(""),
    Longitude: z.number().min(-180).max(180).describe(""),
    Speed: z.number().min(0).describe(""),
    Heading: z.number().min(0).max(359).describe(""),
    InService: z.boolean().describe(""),
    AtDock: z.boolean().describe(""),
    LeftDock: zDate().nullable().describe(""),
    Eta: zDate().nullable().describe(""),
    EtaBasis: z.string().nullable().describe(""),
    ScheduledDeparture: zDate().nullable().describe(""),
    ManagedBy: z.number().nullable().describe(""),
    OpRouteAbbrev: z.array(z.string()).nullable().describe(""),
    SortSeq: z.number().nullable().describe(""),
    TimeStamp: zDate().describe(""),
    VesselPositionNum: z.number().nullable().describe(""),
    VesselWatchMsg: z.string().nullable().describe(""),
    VesselWatchShutFlag: z.string().describe(""),
    VesselWatchShutID: z.number().nullable().describe(""),
    VesselWatchShutMsg: z.string().nullable().describe(""),
    VesselWatchStatus: z.string().describe(""),
  })
  
  .describe("");

export type VesselLocation = z.infer<typeof vesselLocationSchema>;

export const vesselLocationArraySchema = z
  .array(vesselLocationSchema)
  .describe("");

// ============================================================================
// TanStack Query Hooks
//
// useVesselLocationsByVesselId (singular item)
// useVesselLocations (array)
// ============================================================================

export const useVesselLocationsByVesselId = (
  params: GetVesselLocationsByVesselIdParams,
  options?: TanStackOptions<VesselLocation>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "locations", JSON.stringify(params)],
    queryFn: () => getVesselLocationsByVesselId(params),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.REALTIME_UPDATES, ...options },
    params,
  });
};

export const useVesselLocations = (
  params: GetVesselLocationsParams = {},
  options?: TanStackOptions<VesselLocation[]>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "locations", JSON.stringify(params)],
    queryFn: () => getVesselLocations(params),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.REALTIME_UPDATES, ...options },
    params,
  });
};
