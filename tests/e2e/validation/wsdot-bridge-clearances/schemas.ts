import { z } from "zod";

// Base schemas for common patterns
export const dateSchema = z.union([
  z.date(),
  z.string().transform((val) => new Date(val)),
  z.number().transform((val) => new Date(val)),
]);

export const nullableStringSchema = z.string().nullable();

// WSDOT Bridge Clearances schemas
export const bridgeDataGisSchema = z.object({
  APILastUpdate: dateSchema,
  BridgeNumber: z.string(),
  ControlEntityGuid: z.string(),
  CrossingDescription: z.string(),
  CrossingLocationId: z.number(),
  CrossingRecordGuid: z.string(),
  InventoryDirection: nullableStringSchema,
  Latitude: z.number(),
  LocationGuid: z.string(),
  Longitude: z.number(),
  RouteDate: dateSchema,
  SRMP: z.number(),
  SRMPAheadBackIndicator: nullableStringSchema,
  StateRouteID: z.string(),
  StateStructureId: z.string(),
  VerticalClearanceMaximumFeetInch: z.string(),
  VerticalClearanceMaximumInches: z.number(),
  VerticalClearanceMinimumFeetInch: z.string(),
  VerticalClearanceMinimumInches: z.number(),
});

export const bridgeClearancesArraySchema = z.array(bridgeDataGisSchema);

// Export all schemas
export const schemas = {
  bridgeDataGis: bridgeDataGisSchema,
  bridgeClearancesArray: bridgeClearancesArraySchema,
} as const; 