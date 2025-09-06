import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  terminalLocationSchema,
  terminalLocationArraySchema,
  type TerminalLocation as FaresTerminalLocation,
  type TerminalLocationArray as FaresTerminalLocationArray,
} from "@/schemas/wsf-terminals";

// ============================================================================
// Input Schema & Types
//
// getFaresTerminalLocationsByFaresTerminalIdParamsSchema
// getFaresTerminalLocationsParamsSchema
// GetFaresTerminalLocationsByFaresTerminalIdParams
// GetFaresTerminalLocationsParams
// ============================================================================

export const getFaresTerminalLocationsByFaresTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export const getFaresTerminalLocationsParamsSchema = z.object({});

export type GetFaresTerminalLocationsByFaresTerminalIdParams = z.infer<
  typeof getFaresTerminalLocationsByFaresTerminalIdParamsSchema
>;

export type GetFaresTerminalLocationsParams = z.infer<
  typeof getFaresTerminalLocationsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// terminalLocationSchema (imported from terminalLocation.zod)
// terminalLocationArraySchema (imported from terminalLocation.zod)
// FaresTerminalLocation (imported from terminalLocation.zod)
// FaresTerminalLocationArray (imported from terminalLocation.zod)
// ============================================================================

export type FaresTerminalLocations = FaresTerminalLocationArray;

// ============================================================================
// API Functions
//
// getFaresTerminalLocationsByFaresTerminalId (singular item)
// getFaresTerminalLocations (array)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminallocations/{terminalId}";
const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminallocations";

export const getFaresTerminalLocationsByFaresTerminalId = zodFetch<
  GetFaresTerminalLocationsByFaresTerminalIdParams,
  FaresTerminalLocation
>(
  ENDPOINT_BY_ID,
  getFaresTerminalLocationsByFaresTerminalIdParamsSchema,
  terminalLocationSchema
);

export const getFaresTerminalLocations = zodFetch<
  GetFaresTerminalLocationsParams,
  FaresTerminalLocations
>(
  ENDPOINT_ALL,
  getFaresTerminalLocationsParamsSchema,
  terminalLocationArraySchema
);

// ============================================================================
// TanStack Query Hooks
//
// useFaresTerminalLocationsByFaresTerminalId (singular item)
// useFaresTerminalLocations (array)
// ============================================================================

export const terminalLocationsByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getFaresTerminalLocationsByFaresTerminalId,
  queryKey: [
    "wsf",
    "terminals",
    "locations",
    "getFaresTerminalLocationsByFaresTerminalId",
  ],
  cacheStrategy: "DAILY_STATIC",
});

export const terminalLocationsOptions = createQueryOptions({
  apiFunction: getFaresTerminalLocations,
  queryKey: ["wsf", "terminals", "locations", "getFaresTerminalLocations"],
  cacheStrategy: "DAILY_STATIC",
});
