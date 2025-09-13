import { z } from "zod";
import {
  type ScheduleBriefResponses,
  scheduleBriefResponsesSchema,
} from "@/schemas/wsf-schedule/scheduleBriefResponse";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getActiveSeasons */
const activeSeasonsInput = z.object({});

/** Endpoint metadata for getActiveSeasons */
export const getActiveSeasonsMeta: Endpoint<
  ActiveSeasonsInput,
  ScheduleBriefResponses
> = {
  endpoint: "/ferries/api/schedule/rest/activeseasons",
  inputSchema: activeSeasonsInput,
  outputSchema: scheduleBriefResponsesSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type ActiveSeasonsInput = z.infer<typeof activeSeasonsInput>;
