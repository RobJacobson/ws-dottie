import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_MINUTE,
  ONE_HOUR,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

// ============================================================================
// API Functions
//
// getTrafficFlowById (single item)
// getTrafficFlows (array)
// ============================================================================

const ENDPOINT_BASE =
  "/traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowAsJson";
const ALL_FLOWS_ENDPOINT =
  "/traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowsAsJson";

export const getTrafficFlowById = async (
  params: GetTrafficFlowByIdParams
): Promise<TrafficFlow> => {
  // Build query string with flowDataID parameter
  const queryParams = new URLSearchParams();
  queryParams.append("FlowDataID", String(params.flowDataID));

  const endpoint = `${ENDPOINT_BASE}?${queryParams.toString()}`;

  return zodFetch(
    endpoint,
    {
      input: getTrafficFlowByIdParamsSchema,
      output: trafficFlowSchema,
    },
    undefined // No URL template interpolation needed since we build the URL ourselves
  );
};

export const getTrafficFlows = async (
  params: GetTrafficFlowsParams
): Promise<TrafficFlows> => {
  return zodFetch(
    ALL_FLOWS_ENDPOINT,
    {
      input: getTrafficFlowsParamsSchema,
      output: trafficFlowArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getTrafficFlowById (single item)
// getTrafficFlows (array)
// ============================================================================

export const getTrafficFlowByIdParamsSchema = z.object({
  flowDataID: z.number(),
});

export type GetTrafficFlowByIdParams = z.infer<
  typeof getTrafficFlowByIdParamsSchema
>;

export const getTrafficFlowsParamsSchema = z.object({});

export type GetTrafficFlowsParams = z.infer<typeof getTrafficFlowsParamsSchema>;

// ============================================================================
// Output Schemas & Types
//
// trafficFlow (shared schema)
// trafficFlowArray (array wrapper)
// ============================================================================

// WSDOT Traffic Flow Reading schema based on ACTUAL API RESPONSE
//
// IMPORTANT: The actual WSDOT API returns FlowReadingValue as numeric values (0, 1, 2, 3, 4),
// not string enum values as shown in the official documentation. This schema uses the actual
// numeric values returned by the API.
//
// Numeric Value Mapping:
// - 0: Unknown/NoData
// - 1: WideOpen (free-flowing traffic)
// - 2: Moderate traffic
// - 3: Heavy traffic
// - 4: StopAndGo (congested traffic)

export const flowStationReadingSchema = z.number().int().min(0).max(4);

export const flowStationLocationSchema = z.object({
  Description: z.string().nullable(),
  Direction: z.string().nullable(),
  Latitude: z.number().nullable(),
  Longitude: z.number().nullable(),
  MilePost: z.number().nullable(),
  RoadName: z.string().nullable(),
});

export const trafficFlowSchema = z.object({
  FlowDataID: z.number().nullable(),
  FlowReadingValue: flowStationReadingSchema.nullable(),
  FlowStationLocation: flowStationLocationSchema.nullable(),
  Region: z.string().nullable(),
  StationName: z.string().nullable(),
  Time: zWsdotDate().nullable(),
});

export const trafficFlowArraySchema = z.array(trafficFlowSchema);

export type FlowStationLocation = z.infer<typeof flowStationLocationSchema>;
export type TrafficFlow = z.infer<typeof trafficFlowSchema>;

export type TrafficFlows = z.infer<typeof trafficFlowArraySchema>;

// ============================================================================
// TanStack Query Options
// ============================================================================

export const trafficFlowByIdOptions = (params: GetTrafficFlowByIdParams) =>
  queryOptions({
    queryKey: ["wsdot", "traffic-flow", "getTrafficFlowById", params],
    queryFn: () => getTrafficFlowById(params),
    staleTime: ONE_MINUTE,
    gcTime: ONE_HOUR,
    refetchInterval: ONE_MINUTE,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const trafficFlowsOptions = (params: GetTrafficFlowsParams) =>
  queryOptions({
    queryKey: ["wsdot", "traffic-flow", "getTrafficFlows", params],
    queryFn: () => getTrafficFlows(params),
    staleTime: ONE_MINUTE,
    gcTime: ONE_HOUR,
    refetchInterval: ONE_MINUTE,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
