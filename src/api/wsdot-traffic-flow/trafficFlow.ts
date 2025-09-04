/**
 * @module WSDOT — Traffic Flow API
 * @description Point-in-time traffic flow readings from WSDOT flow stations.
 *
 * Provides:
 * - Single traffic flow by `FlowDataID`
 * - All current traffic flows
 *
 * Data includes:
 * - Flow station identifier, numeric flow reading (0–4), station location, region, station name, and observation time (JS Date)
 *
 * @functions
 *   - getTrafficFlowById: Returns a single traffic flow by `flowDataID`
 *   - getTrafficFlows: Returns all current traffic flows
 *
 * @input
 *   - getTrafficFlowById:
 *     - flowDataID: Flow data identifier
 *   - getTrafficFlows: {}
 *
 * @output
 *   - getTrafficFlowById: TrafficFlow
 *   - getTrafficFlows: TrafficFlows
 *   - TrafficFlow fields:
 *     - FlowDataID: Flow data identifier (nullable)
 *     - FlowReadingValue: Numeric reading 0–4 (nullable)
 *     - FlowStationLocation: Location details (nullable)
 *     - Region: Region name (nullable)
 *     - StationName: Station identifier (nullable)
 *     - Time: Observation time (JS Date, nullable)
 *
 * @baseType
 *   - TrafficFlow: Traffic flow record
 *   - FlowStationLocation: Station location details
 *
 * @cli
 *   - getTrafficFlows: node dist/cli.mjs getTrafficFlows
 *   - getTrafficFlowById: node dist/cli.mjs getTrafficFlowById '{"flowDataID": 2482}'
 *
 * @exampleResponse
 * {
 *   "FlowDataID": 2482,
 *   "FlowReadingValue": 1,
 *   "FlowStationLocation": {
 *     "Description": "Homeacres Rd",
 *     "Direction": "EB",
 *     "Latitude": 47.978415632,
 *     "Longitude": -122.174701738,
 *     "MilePost": 0.68,
 *     "RoadName": "002"
 *   },
 *   "Region": "Northwest",
 *   "StationName": "002es00068",
 *   "Time": "2025-09-04T00:05:22.000Z"
 * }
 *
 * @see https://wsdot.wa.gov/traffic/api/Documentation/group___traffic_flow.html
 */
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

/** Fetches all current traffic flows */
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
  /** Flow data identifier */
  flowDataID: z.number(),
});

export type GetTrafficFlowByIdParams = z.infer<
  typeof getTrafficFlowByIdParamsSchema
>;

/** Params schema for getTrafficFlows (none) */
export const getTrafficFlowsParamsSchema = z.object({});

export type GetTrafficFlowsParams = z.infer<typeof getTrafficFlowsParamsSchema>;

// ============================================================================
// Output Schemas & Types
//
// trafficFlow (shared schema)
// trafficFlowArray (array wrapper)
// ============================================================================

// WSDOT Traffic Flow Reading numeric mapping based on actual API response
// 0: Unknown/NoData, 1: WideOpen, 2: Moderate, 3: Heavy, 4: StopAndGo
/** Numeric flow reading (0–4) */
export const flowStationReadingSchema = z.number().int().min(0).max(4);

export const flowStationLocationSchema = z.object({
  /** Location description (nullable) */
  Description: z.string().nullable(),
  /** Travel direction (nullable) */
  Direction: z.string().nullable(),
  /** Latitude (nullable) */
  Latitude: z.number().nullable(),
  /** Longitude (nullable) */
  Longitude: z.number().nullable(),
  /** Highway milepost (nullable) */
  MilePost: z.number().nullable(),
  /** Road or route name (nullable) */
  RoadName: z.string().nullable(),
});

export const trafficFlowSchema = z.object({
  /** Flow data identifier (nullable) */
  FlowDataID: z.number().nullable(),
  /** Numeric flow reading 0–4 (nullable) */
  FlowReadingValue: flowStationReadingSchema.nullable(),
  /** Station location details (nullable) */
  FlowStationLocation: flowStationLocationSchema.nullable(),
  /** Region name (nullable) */
  Region: z.string().nullable(),
  /** Station identifier (nullable) */
  StationName: z.string().nullable(),
  /** Observation time (JS Date, nullable) */
  Time: zWsdotDate().nullable(),
});

export const trafficFlowArraySchema = z.array(trafficFlowSchema);

/** FlowStationLocation type */
export type FlowStationLocation = z.infer<typeof flowStationLocationSchema>;
/** TrafficFlow type */
export type TrafficFlow = z.infer<typeof trafficFlowSchema>;

export type TrafficFlows = z.infer<typeof trafficFlowArraySchema>;

// ============================================================================
// TanStack Query Options
// ============================================================================

/** Returns options for a single traffic flow by ID; polls every 60s */
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

/** Returns options for all traffic flows; polls every 60s */
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
