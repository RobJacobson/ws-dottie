/**
 * @module WSDOT — Bridge Clearances API
 * @description Bridge height and clearance information by WSDOT route.
 *
 * Provides:
 * - Vertical clearance maximum/minimum by bridge/structure
 * - Crossing metadata, structure identifiers, and location
 *
 * Data includes:
 * - Structure IDs, route/location metadata, clearances (feet/inches), update timestamps (JS Date)
 *
 * @functions
 *   - getBridgeClearances: Returns bridge clearance data for a route
 *
 * @input
 *   - getBridgeClearances:
 *     - route: WSDOT route string (e.g., "005"); optional/nullable
 *
 * @output
 *   - getBridgeClearances: BridgeDataGISArray
 *   - BridgeDataGIS fields:
 *     - APILastUpdate: API last update time (JS Date)
 *     - BridgeNumber: Bridge number (nullable)
 *     - ControlEntityGuid: Control entity GUID
 *     - CrossingDescription: Crossing description (nullable)
 *     - CrossingLocationId: Crossing location identifier
 *     - CrossingRecordGuid: Crossing record GUID
 *     - InventoryDirection: Inventory direction (nullable)
 *     - Latitude: Latitude in decimal degrees
 *     - LocationGuid: Location GUID
 *     - Longitude: Longitude in decimal degrees
 *     - RouteDate: Route date (JS Date)
 *     - SRMP: State Route Mile Post
 *     - SRMPAheadBackIndicator: Ahead/back indicator (nullable)
 *     - StateRouteID: State route identifier (nullable)
 *     - StateStructureId: State structure identifier (nullable)
 *     - VerticalClearanceMaximumFeetInch: Max clearance in feet/inches (nullable)
 *     - VerticalClearanceMaximumInches: Max clearance in inches
 *     - VerticalClearanceMinimumFeetInch: Min clearance in feet/inches (nullable)
 *     - VerticalClearanceMinimumInches: Min clearance in inches
 *
 * @baseType
 *   - BridgeDataGIS: Bridge clearance record
 *
 * @cli
 *   - getBridgeClearances: node dist/cli.mjs getBridgeClearances '{"route": "005"}'
 *
 * @exampleResponse
 * {
 *   "APILastUpdate": "2025-09-03T10:30:02.200Z",
 *   "BridgeNumber": "5/629A",
 *   "ControlEntityGuid": "88ba5341-b39c-43c9-95a5-bc9584b2d798",
 *   "CrossingDescription": "I-5 RAMPS UNDER BROADWAY AVE",
 *   "CrossingLocationId": 6192,
 *   "CrossingRecordGuid": "9b764b55-9fc1-4448-8b0b-3f35b83d6f5f",
 *   "InventoryDirection": "I",
 *   "Latitude": 47.961343,
 *   "LocationGuid": "dad9f2c9-ae79-4efb-8f3e-587e402e0f80",
 *   "Longitude": -122.200516,
 *   "RouteDate": "2016-12-31T08:00:00.000Z",
 *   "SRMP": 0,
 *   "SRMPAheadBackIndicator": "A",
 *   "StateRouteID": "005S119195",
 *   "StateStructureId": "0003842B",
 *   "VerticalClearanceMaximumFeetInch": "14 ft 5 in",
 *   "VerticalClearanceMaximumInches": 173,
 *   "VerticalClearanceMinimumFeetInch": "14 ft 1 in",
 *   "VerticalClearanceMinimumInches": 169
 * }
 *
 * @see https://wsdot.wa.gov/traffic/api/Documentation/class_clearance.html
 */
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

/** Fetches bridge clearance data for a route */
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

/** Params schema for getBridgeClearances */
export const getBridgeClearancesParamsSchema = z.object({
  /** WSDOT route string (e.g., "005"); optional/nullable */
  route: z.string().nullable().optional(),
});

/** GetBridgeClearances params type */
export type GetBridgeClearancesParams = z.infer<
  typeof getBridgeClearancesParamsSchema
>;

// ============================================================================
// Output Schemas & Types
// ============================================================================

/** Bridge clearance item schema */
export const bridgeDataGisSchema = z.object({
  /** API last update time (JS Date) */
  APILastUpdate: zWsdotDate(),
  /** Bridge number (nullable) */
  BridgeNumber: z.string().nullable(),
  /** Control entity GUID */
  ControlEntityGuid: z.string(),
  /** Crossing description (nullable) */
  CrossingDescription: z.string().nullable(),
  /** Crossing location identifier */
  CrossingLocationId: z.number(),
  /** Crossing record GUID */
  CrossingRecordGuid: z.string(),
  /** Inventory direction (nullable) */
  InventoryDirection: zNullableString(),
  /** Latitude in decimal degrees */
  Latitude: zLatitude(),
  /** Location GUID */
  LocationGuid: z.string(),
  /** Longitude in decimal degrees */
  Longitude: zLongitude(),
  /** Route date (JS Date) */
  RouteDate: zWsdotDate(),
  /** State Route Mile Post */
  SRMP: z.number(),
  /** Ahead/back indicator (nullable) */
  SRMPAheadBackIndicator: zNullableString(),
  /** State route identifier (nullable) */
  StateRouteID: z.string().nullable(),
  /** State structure identifier (nullable) */
  StateStructureId: z.string().nullable(),
  /** Maximum vertical clearance (feet/inches text, nullable) */
  VerticalClearanceMaximumFeetInch: z.string().nullable(),
  /** Maximum vertical clearance (inches) */
  VerticalClearanceMaximumInches: z.number(),
  /** Minimum vertical clearance (feet/inches text, nullable) */
  VerticalClearanceMinimumFeetInch: z.string().nullable(),
  /** Minimum vertical clearance (inches) */
  VerticalClearanceMinimumInches: z.number(),
});

/** BridgeDataGIS type */
export type BridgeDataGIS = z.infer<typeof bridgeDataGisSchema>;

/** Bridge clearance array schema */
export const bridgeDataGisArraySchema = z.array(bridgeDataGisSchema);

/** BridgeDataGISArray type */
export type BridgeDataGISArray = z.infer<typeof bridgeDataGisArraySchema>;

// ==========================================================================
// TanStack Query Options (new pattern)
// ==========================================================================

/** Returns options for bridge clearances by route; polls daily */
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
