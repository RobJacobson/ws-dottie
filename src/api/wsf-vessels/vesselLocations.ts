import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import {
  zPositiveInteger,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";
import { createUseQueryWsf, tanstackQueryOptions } from "@/shared/tanstack";

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
): Promise<VesselLocations> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      input: getVesselLocationsParamsSchema,
      output: vesselLocationArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getVesselLocationsByVesselIdParamsSchema
// GetVesselLocationsByVesselIdParams
// ============================================================================

export const getVesselLocationsByVesselIdParamsSchema = z.object({
  vesselId: zPositiveInteger("vessel"),
});

export type GetVesselLocationsByVesselIdParams = z.infer<
  typeof getVesselLocationsByVesselIdParamsSchema
>;

export const getVesselLocationsParamsSchema = z.object({});

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

// Output Schema & Type for getVesselLocationsByVesselId (single item by id):

export const vesselLocationSchema = z.object({
  VesselID: z.number().int().positive(),
  VesselName: z.string().min(1),
  Mmsi: z.number(),
  DepartingTerminalID: z.number(),
  DepartingTerminalName: z.string(),
  DepartingTerminalAbbrev: z.string(),
  ArrivingTerminalID: z.number().nullable(),
  ArrivingTerminalName: z.string().nullable(),
  ArrivingTerminalAbbrev: z.string().nullable(),
  Latitude: z.number().min(-90).max(90),
  Longitude: z.number().min(-180).max(180),
  Speed: z.number().min(0),
  Heading: z.number().min(0).max(359),
  InService: z.boolean(),
  AtDock: z.boolean(),
  LeftDock: zWsdotDate().nullable(),
  Eta: zWsdotDate().nullable(),
  EtaBasis: z.string().nullable(),
  ScheduledDeparture: zWsdotDate().nullable(),
  ManagedBy: z.number().nullable(),
  OpRouteAbbrev: z.array(z.string()).nullable(),
  SortSeq: z.number().nullable(),
  TimeStamp: zWsdotDate(),
  VesselPositionNum: z.number().nullable(),
  VesselWatchMsg: z.string().nullable(),
  VesselWatchShutFlag: z.string(),
  VesselWatchShutID: z.number().nullable(),
  VesselWatchShutMsg: z.string().nullable(),
  VesselWatchStatus: z.string(),
});

export type VesselLocation = z.infer<typeof vesselLocationSchema>;

export const vesselLocationArraySchema = z.array(vesselLocationSchema);

/**
 * VesselLocations type - represents an array of vessel location objects
 */
export type VesselLocations = z.infer<typeof vesselLocationArraySchema>;

// ============================================================================
// TanStack Query Hooks
//
// useVesselLocationsByVesselId (singular item)
// useVesselLocations (array)
// ============================================================================

export const useVesselLocationsByVesselId = createUseQueryWsf({
  queryFn: getVesselLocationsByVesselId,
  queryKeyPrefix: [
    "wsf",
    "vessels",
    "locations",
    "getVesselLocationsByVesselId",
  ],
  defaultOptions: tanstackQueryOptions.FIVE_SEC_POLLING,
  getCacheFlushDate: getCacheFlushDateVessels,
});

export const useVesselLocations = createUseQueryWsf({
  queryFn: getVesselLocations,
  queryKeyPrefix: ["wsf", "vessels", "locations", "getVesselLocations"],
  defaultOptions: tanstackQueryOptions.FIVE_SEC_POLLING,
  getCacheFlushDate: getCacheFlushDateVessels,
});
