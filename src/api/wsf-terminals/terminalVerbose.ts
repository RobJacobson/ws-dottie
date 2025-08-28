import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createUseQueryWsf, tanstackQueryOptions } from "@/shared/tanstack";

import { getCacheFlushDateTerminals } from "../wsf/cacheFlushDate";
import { terminalBulletinItemSchema } from "./terminalBulletins";
import { terminalWaitTimeSchema } from "./terminalWaitTimes";

// ============================================================================
// API Functions
//
// getTerminalVerboseByTerminalId (singular item)
// getTerminalVerbose (array)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminalverbose/{terminalId}";
const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminalverbose";

export const getTerminalVerboseByTerminalId = async (
  params: GetTerminalVerboseByTerminalIdParams
): Promise<TerminalVerbose> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getTerminalVerboseByTerminalIdParamsSchema,
      output: terminalVerboseSchema,
    },
    params
  );
};

export const getTerminalVerbose = async (
  params: GetTerminalVerboseParams = {}
): Promise<TerminalVerboses> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      input: getTerminalVerboseParamsSchema,
      output: terminalVerboseArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getTerminalVerboseByTerminalIdParamsSchema
// getTerminalVerboseParamsSchema
// GetTerminalVerboseByTerminalIdParams
// GetTerminalVerboseParams
// ============================================================================

export const getTerminalVerboseByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export const getTerminalVerboseParamsSchema = z.object({});

export type GetTerminalVerboseByTerminalIdParams = z.infer<
  typeof getTerminalVerboseByTerminalIdParamsSchema
>;

export type GetTerminalVerboseParams = z.infer<
  typeof getTerminalVerboseParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// terminalTransitLinkSchema
// terminalWaitTimeSchema
// terminalVerboseSchema
// terminalVerboseArraySchema
// TerminalVerbose
// TerminalTransitLink
// TerminalWaitTime
// TerminalBulletinItem (imported from ./terminalBulletins)
// ============================================================================

export const terminalTransitLinkSchema = z.object({
  LinkName: z.string(),
  LinkURL: z.string(),
  SortSeq: z.number().int().nullable(),
});

export const terminalVerboseSchema = z.object({
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
  Elevator: z.boolean(),
  WaitingRoom: z.boolean(),
  FoodService: z.boolean(),
  Restroom: z.boolean(),
  OverheadPassengerLoading: z.boolean(),
  IsNoFareCollected: z.boolean().nullable(),
  NoFareCollectedMsg: z.string().nullable(),
  AdaInfo: z.string().nullable(),
  AdditionalInfo: z.string().nullable(),
  AirportInfo: z.string().nullable(),
  AirportShuttleInfo: z.string().nullable(),
  BikeInfo: z.string().nullable(),
  ChamberOfCommerce: terminalTransitLinkSchema.nullable(),
  ConstructionInfo: z.string().nullable(),
  FacInfo: z.string().nullable(),
  FareDiscountInfo: z.string().nullable(),
  FoodServiceInfo: z.string().nullable(),
  HovInfo: z.string().nullable(),
  LostAndFoundInfo: z.string().nullable(),
  MotorcycleInfo: z.string().nullable(),
  ParkingInfo: z.string().nullable(),
  ParkingShuttleInfo: z.string().nullable(),
  REALTIME_SHUTOFF_FLAG: z.boolean(),
  REALTIME_SHUTOFF_MESSAGE: z.string().nullable(),
  RealtimeIntroMsg: z.string().nullable(),
  ResourceStatus: z.string().nullable(),
  SecurityInfo: z.string().nullable(),
  TallySystemInfo: z.string().nullable(),
  TaxiInfo: z.string().nullable(),
  TrainInfo: z.string().nullable(),
  TruckInfo: z.string().nullable(),
  TypeDesc: z.string().nullable(),
  VisitorLinks: z.array(z.any()).nullable(),
  Bulletins: z.array(terminalBulletinItemSchema),
  TransitLinks: z.array(terminalTransitLinkSchema),
  WaitTimes: z.array(terminalWaitTimeSchema),
});

export const terminalVerboseArraySchema = z.array(terminalVerboseSchema);

export type TerminalVerbose = z.infer<typeof terminalVerboseSchema>;
export type TerminalTransitLink = z.infer<typeof terminalTransitLinkSchema>;

/**
 * TerminalVerboses type - represents an array of terminal verbose objects
 */
export type TerminalVerboses = z.infer<typeof terminalVerboseArraySchema>;

// ============================================================================
// TanStack Query Hooks
//
// useTerminalVerboseByTerminalId (singular item)
// useTerminalVerbose (array)
// ============================================================================

export const useTerminalVerboseByTerminalId = createUseQueryWsf({
  queryFn: getTerminalVerboseByTerminalId,
  queryKeyPrefix: [
    "wsf",
    "terminals",
    "verbose",
    "getTerminalVerboseByTerminalId",
  ],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
  getCacheFlushDate: getCacheFlushDateTerminals,
});

export const useTerminalVerbose = createUseQueryWsf({
  queryFn: getTerminalVerbose,
  queryKeyPrefix: ["wsf", "terminals", "verbose", "getTerminalVerbose"],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
  getCacheFlushDate: getCacheFlushDateTerminals,
});
