import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  activeSeasonSchema,
  activeSeasonsArraySchema,
  type ActiveSeason,
  type ActiveSeasonsArray,
} from "@/schemas/wsf-schedule";

// ============================================================================
// Input Schemas & Types
//
// getActiveSeasonsParamsSchema
// GetActiveSeasonsParams
// ============================================================================

export const getActiveSeasonsParamsSchema = z.object({});

export type GetActiveSeasonsParams = z.infer<
  typeof getActiveSeasonsParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// activeSeasonSchema (imported from activeSeason.zod)
// activeSeasonsArraySchema (imported from activeSeason.zod)
// ActiveSeason (imported from activeSeason.zod)
// ============================================================================

// Re-export schemas and types for convenience
export { activeSeasonSchema, activeSeasonsArraySchema };
export type { ActiveSeason };
export type ActiveSeasons = ActiveSeasonsArray;

// ============================================================================
// API Functions
//
// getActiveSeasons
// ============================================================================

export const getActiveSeasons = zodFetch<GetActiveSeasonsParams, ActiveSeasons>(
  "/ferries/api/schedule/rest/activeseasons",
  getActiveSeasonsParamsSchema,
  activeSeasonsArraySchema
);

// ============================================================================
// TanStack Query Hooks
//
// useActiveSeasons
// ============================================================================

export const activeSeasonsOptions = createQueryOptions({
  apiFunction: getActiveSeasons,
  queryKey: ["wsf", "schedule", "activeSeasons", "getActiveSeasons"],
  cacheStrategy: "DAILY_STATIC",
});
