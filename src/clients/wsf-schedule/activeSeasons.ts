import { z } from "zod";
import { activeSeasonsSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getActiveSeasons */
const activeSeasonsInput = z.object({});

/** Endpoint metadata for getActiveSeasons */
export const getActiveSeasonsMeta = defineEndpoint({
  api: "wsf-schedule",
  function: "getActiveSeasons",
  endpoint: "/ferries/api/schedule/rest/activeseasons",
  inputSchema: activeSeasonsInput,
  outputSchema: activeSeasonsSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});

// Type exports
export type ActiveSeasonsInput = z.infer<typeof activeSeasonsInput>;
