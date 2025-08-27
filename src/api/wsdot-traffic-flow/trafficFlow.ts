import type { UseQueryResult, UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

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
): Promise<TrafficFlow[]> => {
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

export const getTrafficFlowByIdParamsSchema = z
  .object({
    flowDataID: z.number().describe(""),
  })
  .describe("");

export type GetTrafficFlowByIdParams = z.infer<
  typeof getTrafficFlowByIdParamsSchema
>;

export const getTrafficFlowsParamsSchema = z.object({}).describe("");

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

export const flowStationReadingSchema = z
  .number()
  .int()
  .min(0)
  .max(4)
  .describe("");

export const flowStationLocationSchema = z
  .object({
    Description: z.string().nullable().describe(""),
    Direction: z.string().nullable().describe(""),
    Latitude: z.number().nullable().describe(""),
    Longitude: z.number().nullable().describe(""),
    MilePost: z.number().nullable().describe(""),
    RoadName: z.string().nullable().describe(""),
  })
  
  .describe("");

export const trafficFlowSchema = z
  .object({
    FlowDataID: z.number().nullable().describe(""),
    FlowReadingValue: flowStationReadingSchema.nullable().describe(""),
    FlowStationLocation: flowStationLocationSchema.nullable().describe(""),
    Region: z.string().nullable().describe(""),
    StationName: z.string().nullable().describe(""),
    Time: zWsdotDate().nullable().describe(""),
  })
  
  .describe("");

export const trafficFlowArraySchema = z.array(trafficFlowSchema).describe("");

export type FlowStationLocation = z.infer<typeof flowStationLocationSchema>;
export type TrafficFlow = z.infer<typeof trafficFlowSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useTrafficFlowById (single item)
// useTrafficFlows (array)
// ============================================================================

export const useTrafficFlowById = (
  params: GetTrafficFlowByIdParams,
  options?: UseQueryOptions<TrafficFlow, Error>
) => {
  return useQuery({
    queryKey: [
      "wsdot",
      "traffic-flow",
      "getTrafficFlowById",
      JSON.stringify(params),
    ],
    queryFn: () => getTrafficFlowById(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};

export const useTrafficFlows = (
  params: GetTrafficFlowsParams = {},
  options?: UseQueryOptions<TrafficFlow[], Error>
) => {
  return useQuery({
    queryKey: [
      "wsdot",
      "traffic-flow",
      "getTrafficFlows",
      JSON.stringify(params),
    ],
    queryFn: () => getTrafficFlows(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
