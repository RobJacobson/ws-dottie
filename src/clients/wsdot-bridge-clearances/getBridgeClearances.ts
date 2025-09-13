/**
 * @module WSDOT — Bridge Clearances API
 * @description Bridge height and clearance information across all WSDOT routes.
 *
 * Provides:
 * - Vertical clearance maximum/minimum by bridge/structure for all routes
 * - Crossing metadata, structure identifiers, and location
 *
 * Data includes:
 * - Structure IDs, route/location metadata, clearances (feet/inches), update timestamps (JS Date)
 *
 * @functions
 *   - getBridgeClearances: Returns all bridge clearance data
 *
 * @input
 *   - getBridgeClearances: {}
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
 *   - getBridgeClearances: node dist/cli.mjs getBridgeClearances
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
import {
  bridgeClearancesSchema,
  type BridgeClearances,
} from "@/schemas/wsdot-bridge-clearances/bridgeClearance.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getBridgeClearances */
const bridgeClearancesInput = z.object({});

/** Endpoint metadata for getBridgeClearances */
export const getBridgeClearancesMeta: Endpoint<
  BridgeClearancesInput,
  BridgeClearances
> = {
  api: "wsdot-bridge-clearances",
  function: "getBridgeClearances",
  endpoint: "/Traffic/api/Bridges/ClearanceREST.svc/GetClearancesAsJson",
  inputSchema: bridgeClearancesInput,
  outputSchema: bridgeClearancesSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type BridgeClearancesInput = z.infer<typeof bridgeClearancesInput>;
