import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_DAY,
  TWO_DAYS,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

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
): Promise<TerminalLocations> => {
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

export const getTerminalLocationsByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export const getTerminalLocationsParamsSchema = z.object({});

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

export const terminalLocationSchema = z.object({
  TerminalID: z.number().int(),
  TerminalSubjectID: z.number().int(),
  RegionID: z.number().int(),
  TerminalName: z.string(),
  TerminalAbbrev: z.string(),
  SortSeq: z.number().int(),
  AddressLineOne: z.string(),
  AddressLineTwo: z.string().nullable(),
  City: z.string(),
  State: z.string(),
  ZipCode: z.string(),
  Country: z.string(),
  Latitude: z.number(),
  Longitude: z.number(),
  Directions: z.string().nullable(),
  DispGISZoomLoc: z.array(
    z.object({
      Latitude: z.number(),
      Longitude: z.number(),
      ZoomLevel: z.number().int().min(0),
    })
  ),
  MapLink: z.string().nullable(),
});

export type TerminalLocation = z.infer<typeof terminalLocationSchema>;

export const terminalLocationsArraySchema = z.array(terminalLocationSchema);

/**
 * TerminalLocations type - represents an array of terminal location objects
 */
export type TerminalLocations = z.infer<typeof terminalLocationsArraySchema>;

// ============================================================================
// TanStack Query Hooks
//
// useTerminalLocationsByTerminalId (singular item)
// useTerminalLocations (array)
// ============================================================================

export const terminalLocationsByTerminalIdOptions = (
  params: GetTerminalLocationsByTerminalIdParams
) =>
  queryOptions({
    queryKey: [
      "wsf",
      "terminals",
      "locations",
      "getTerminalLocationsByTerminalId",
      params,
    ],
    queryFn: () => getTerminalLocationsByTerminalId(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const terminalLocationsOptions = () =>
  queryOptions({
    queryKey: ["wsf", "terminals", "locations", "getTerminalLocations"],
    queryFn: () => getTerminalLocations({}),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
