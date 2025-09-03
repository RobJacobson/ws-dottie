import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import {
  zLatitude,
  zLongitude,
  zNullableString,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";
// tanstackQueryOptions no longer used here after hook removal
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_DAY,
  TWO_DAYS,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

// ============================================================================
// API Functions
// ============================================================================

const ENDPOINT =
  "/Traffic/api/Bridges/ClearanceREST.svc/GetClearancesAsJson?Route={route}";

export const getBridgeClearances = async (
  params: GetBridgeClearancesParams
): Promise<BridgeDataGISArray> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getBridgeClearancesParamsSchema,
      output: bridgeDataGisArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
// ============================================================================

export const getBridgeClearancesParamsSchema = z.object({
  route: z.string().nullable().optional(),
});

export type GetBridgeClearancesParams = z.infer<
  typeof getBridgeClearancesParamsSchema
>;

// ============================================================================
// Output Schemas & Types
// ============================================================================

export const bridgeDataGisSchema = z.object({
  APILastUpdate: zWsdotDate(),
  BridgeNumber: z.string().nullable(),
  ControlEntityGuid: z.string(),
  CrossingDescription: z.string().nullable(),
  CrossingLocationId: z.number(),
  CrossingRecordGuid: z.string(),
  InventoryDirection: zNullableString(),
  Latitude: zLatitude(),
  LocationGuid: z.string(),
  Longitude: zLongitude(),
  RouteDate: zWsdotDate(),
  SRMP: z.number(),
  SRMPAheadBackIndicator: zNullableString(),
  StateRouteID: z.string().nullable(),
  StateStructureId: z.string().nullable(),
  VerticalClearanceMaximumFeetInch: z.string().nullable(),
  VerticalClearanceMaximumInches: z.number(),
  VerticalClearanceMinimumFeetInch: z.string().nullable(),
  VerticalClearanceMinimumInches: z.number(),
});

export type BridgeDataGIS = z.infer<typeof bridgeDataGisSchema>;

export const bridgeDataGisArraySchema = z.array(bridgeDataGisSchema);

export type BridgeDataGISArray = z.infer<typeof bridgeDataGisArraySchema>;

// ==========================================================================
// TanStack Query Options (new pattern)
// ==========================================================================

export const bridgeClearancesOptions = (params: GetBridgeClearancesParams) =>
  queryOptions({
    queryKey: ["wsdot", "bridge-clearances", "getBridgeClearances", params],
    queryFn: () => getBridgeClearances(params),
    // Bridge data updates are infrequent; use one-day cadence
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
