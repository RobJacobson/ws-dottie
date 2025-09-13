import { z } from "zod";
import { activeSeasonsSchema } from "@/schemas/wsf-schedule";

/** Input schema for getActiveSeasons */
const activeSeasonsInput = z.object({});

/** Endpoint metadata for getActiveSeasons */
export const getActiveSeasonsMeta = {
  api: "wsf-schedule",
  function: "getActiveSeasons",
  endpoint: "/ferries/api/schedule/rest/activeseasons",
  inputSchema: activeSeasonsInput,
  outputSchema: activeSeasonsSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports
export type ActiveSeasonsInput = z.infer<typeof activeSeasonsInput>;
