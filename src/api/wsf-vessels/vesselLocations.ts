import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import {
  zPositiveInteger,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";
import { queryOptions } from "@tanstack/react-query";
import { FIVE_SECONDS, ONE_HOUR } from "@/shared/constants/queryOptions";

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
});

export type VesselLocation = z.infer<typeof vesselLocationSchema>;

export const vesselLocationArraySchema = z.array(vesselLocationSchema);

export type VesselLocations = z.infer<typeof vesselLocationArraySchema>;

// ============================================================================
// TanStack Query Options
// ============================================================================

export const vesselLocationsByVesselIdOptions = (
  params: GetVesselLocationsByVesselIdParams
) =>
  queryOptions({
    queryKey: [
      "wsf",
      "vessels",
      "locations",
      "getVesselLocationsByVesselId",
      params,
    ],
    queryFn: () => getVesselLocationsByVesselId(params),
    staleTime: FIVE_SECONDS,
    gcTime: ONE_HOUR,
    refetchInterval: FIVE_SECONDS,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const vesselLocationsOptions = () =>
  queryOptions({
    queryKey: ["wsf", "vessels", "locations", "getVesselLocations"],
    queryFn: () => getVesselLocations({}),
    staleTime: FIVE_SECONDS,
    gcTime: ONE_HOUR,
    refetchInterval: FIVE_SECONDS,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
