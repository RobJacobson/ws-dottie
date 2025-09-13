import { z } from "zod";
import {
  scheduleBriefResponsesSchema,
  type ScheduleBriefResponses,
} from "@/schemas/wsf-schedule/scheduleBriefResponse";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getActiveSeasons */
const activeSeasonsInput = z.object({});

/** Endpoint metadata for getActiveSeasons */
export const getActiveSeasonsMeta: Endpoint<
  ActiveSeasonsInput,
  ScheduleBriefResponses
> = {
  api: "wsf-schedule",
  function: "getActiveSeasons",
  endpoint: "/ferries/api/schedule/rest/activeseasons",
  inputSchema: activeSeasonsInput,
  outputSchema: scheduleBriefResponsesSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type ActiveSeasonsInput = z.infer<typeof activeSeasonsInput>;
