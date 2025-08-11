import { z } from "zod";

import { zNullableString, zWsdotDate } from "@/shared/validation";

export const bridgeDataGisSchema = z
  .object({
    APILastUpdate: zWsdotDate(),
    BridgeNumber: z.string(),
    ControlEntityGuid: z.string(),
    CrossingDescription: z.string(),
    CrossingLocationId: z.number(),
    CrossingRecordGuid: z.string(),
    InventoryDirection: zNullableString(),
    Latitude: z.number(),
    LocationGuid: z.string(),
    Longitude: z.number(),
    RouteDate: zWsdotDate(),
    SRMP: z.number(),
    SRMPAheadBackIndicator: zNullableString(),
    StateRouteID: z.string(),
    StateStructureId: z.string(),
    VerticalClearanceMaximumFeetInch: z.string(),
    VerticalClearanceMaximumInches: z.number(),
    VerticalClearanceMinimumFeetInch: z.string(),
    VerticalClearanceMinimumInches: z.number(),
  })
  .catchall(z.unknown());

export const bridgeDataGisArraySchema = z.array(bridgeDataGisSchema);

export type BridgeDataGIS = z.infer<typeof bridgeDataGisSchema>;
