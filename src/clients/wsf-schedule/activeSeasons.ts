import { z } from "zod";
import {
  type ActiveSeason,
  type ActiveSeasonsArray,
  activeSeasonSchema,
  activeSeasonsArraySchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getActiveSeasonsParamsSchema = z.object({});

export type GetActiveSeasonsParams = z.infer<
  typeof getActiveSeasonsParamsSchema
>;

export { activeSeasonSchema, activeSeasonsArraySchema };
export type { ActiveSeason };
export type ActiveSeasons = ActiveSeasonsArray;

export const getActiveSeasons = zodFetch<GetActiveSeasonsParams, ActiveSeasons>(
  "/ferries/api/schedule/rest/activeseasons",
  getActiveSeasonsParamsSchema,
  activeSeasonsArraySchema
);

export const activeSeasonsOptions = createQueryOptions({
  apiFunction: getActiveSeasons,
  queryKey: ["wsf", "schedule", "activeSeasons", "getActiveSeasons"],
  cacheStrategy: "DAILY_STATIC",
});
