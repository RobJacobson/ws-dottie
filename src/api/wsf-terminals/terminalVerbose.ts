import type { UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

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
): Promise<TerminalVerbose[]> => {
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

export const getTerminalVerboseByTerminalIdParamsSchema = z
  .object({
    terminalId: z.number().int().describe(""),
  })
  .describe("");

export const getTerminalVerboseParamsSchema = z.object({}).describe("");

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

export const terminalTransitLinkSchema = z
  .object({
    LinkName: z.string().describe(""),
    LinkURL: z.string().describe(""),
    SortSeq: z.number().int().nullable().describe(""),
  })
  .describe("");

export const terminalVerboseSchema = z
  .object({
    TerminalID: z.number().int().describe(""),
    TerminalSubjectID: z.number().int().describe(""),
    RegionID: z.number().int().describe(""),
    TerminalName: z.string().describe(""),
    TerminalAbbrev: z.string().describe(""),
    SortSeq: z.number().int().describe(""),
    AddressLineOne: z.string().describe(""),
    AddressLineTwo: z.string().nullable().describe(""),
    City: z.string().describe(""),
    State: z.string().describe(""),
    ZipCode: z.string().describe(""),
    Country: z.string().describe(""),
    Latitude: z.number().describe(""),
    Longitude: z.number().describe(""),
    Directions: z.string().nullable().describe(""),
    DispGISZoomLoc: z
      .array(
        z
          .object({
            Latitude: z.number().describe(""),
            Longitude: z.number().describe(""),
            ZoomLevel: z.number().int().min(0).describe(""),
          })
          .describe("")
      )
      .describe(""),
    MapLink: z.string().nullable().describe(""),
    Elevator: z.boolean().describe(""),
    WaitingRoom: z.boolean().describe(""),
    FoodService: z.boolean().describe(""),
    Restroom: z.boolean().describe(""),
    OverheadPassengerLoading: z.boolean().describe(""),
    IsNoFareCollected: z.boolean().nullable().describe(""),
    NoFareCollectedMsg: z.string().nullable().describe(""),
    AdaInfo: z.string().nullable().describe(""),
    AdditionalInfo: z.string().nullable().describe(""),
    AirportInfo: z.string().nullable().describe(""),
    AirportShuttleInfo: z.string().nullable().describe(""),
    BikeInfo: z.string().nullable().describe(""),
    ChamberOfCommerce: terminalTransitLinkSchema.nullable().describe(""),
    ConstructionInfo: z.string().nullable().describe(""),
    FacInfo: z.string().nullable().describe(""),
    FareDiscountInfo: z.string().nullable().describe(""),
    FoodServiceInfo: z.string().nullable().describe(""),
    HovInfo: z.string().nullable().describe(""),
    LostAndFoundInfo: z.string().nullable().describe(""),
    MotorcycleInfo: z.string().nullable().describe(""),
    ParkingInfo: z.string().nullable().describe(""),
    ParkingShuttleInfo: z.string().nullable().describe(""),
    REALTIME_SHUTOFF_FLAG: z.boolean().describe(""),
    REALTIME_SHUTOFF_MESSAGE: z.string().nullable().describe(""),
    RealtimeIntroMsg: z.string().nullable().describe(""),
    ResourceStatus: z.string().nullable().describe(""),
    SecurityInfo: z.string().nullable().describe(""),
    TallySystemInfo: z.string().nullable().describe(""),
    TaxiInfo: z.string().nullable().describe(""),
    TrainInfo: z.string().nullable().describe(""),
    TruckInfo: z.string().nullable().describe(""),
    TypeDesc: z.string().nullable().describe(""),
    VisitorLinks: z.array(z.any()).nullable().describe(""),
    Bulletins: z.array(terminalBulletinItemSchema).describe(""),
    TransitLinks: z.array(terminalTransitLinkSchema).describe(""),
    WaitTimes: z.array(terminalWaitTimeSchema).describe(""),
  })
  .describe("");

export const terminalVerboseArraySchema = z
  .array(terminalVerboseSchema)
  .describe("");

export type TerminalVerbose = z.infer<typeof terminalVerboseSchema>;
export type TerminalTransitLink = z.infer<typeof terminalTransitLinkSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useTerminalVerboseByTerminalId (singular item)
// useTerminalVerbose (array)
// ============================================================================

export const useTerminalVerboseByTerminalId = (
  params: GetTerminalVerboseByTerminalIdParams,
  options?: TanStackOptions<TerminalVerbose>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "verbose", params.terminalId],
    queryFn: () => getTerminalVerboseByTerminalId(params),
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};

export const useTerminalVerbose = (
  options?: TanStackOptions<TerminalVerbose[]>
): UseQueryResult<TerminalVerbose[], Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "verbose"],
    queryFn: getTerminalVerbose,
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
