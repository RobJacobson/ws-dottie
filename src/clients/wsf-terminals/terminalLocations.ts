import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  terminalLocationArraySchema,
  type TerminalLocationArray,
} from "@/schemas/wsf-terminals";

// ============================================================================
// Input Schema & Types
// ============================================================================

export const getTerminalLocationsParamsSchema = z.object({});

export type GetTerminalLocationsParams = z.infer<
  typeof getTerminalLocationsParamsSchema
>;

// ============================================================================
// Output Schema & Types
// ============================================================================

// ============================================================================
// API Function
// ============================================================================

const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminallocations";

export const getTerminalLocations = zodFetch<
  GetTerminalLocationsParams,
  TerminalLocationArray
>(ENDPOINT_ALL, getTerminalLocationsParamsSchema, terminalLocationArraySchema);

// ============================================================================
// TanStack Query Hooks
// ============================================================================

export const terminalLocationsOptions = createQueryOptions({
  apiFunction: getTerminalLocations,
  queryKey: ["wsf", "terminals", "locations", "getTerminalLocations"],
  cacheStrategy: "DAILY_STATIC",
});
