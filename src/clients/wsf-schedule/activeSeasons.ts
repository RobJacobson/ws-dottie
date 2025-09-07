import { z } from "zod";
import {
  type ActiveSeason,
  type ActiveSeasonsArray,
  activeSeasonSchema,
  activeSeasonsArraySchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getActiveSeasonsParamsSchema = z.object({});

export type GetActiveSeasonsParams = z.infer<
  typeof getActiveSeasonsParamsSchema
>;

export { activeSeasonSchema, activeSeasonsArraySchema };
export type { ActiveSeason };
export type ActiveSeasons = ActiveSeasonsArray;

export const getActiveSeasons = async (
  params: GetActiveSeasonsParams
): Promise<ActiveSeasons> =>
  zodFetch({
    endpoint: "/ferries/api/schedule/rest/activeseasons",
    inputSchema: getActiveSeasonsParamsSchema,
    outputSchema: activeSeasonsArraySchema,
    params,
  });

export const activeSeasonsOptions = createQueryOptions({
  apiFunction: getActiveSeasons,
  queryKey: ["wsf", "schedule", "activeSeasons", "getActiveSeasons"],
  cacheStrategy: "DAILY_STATIC",
});
