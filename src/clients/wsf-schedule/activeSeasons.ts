import { z } from "zod";
import { activeSeasonsArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getActiveSeasons */
const getActiveSeasonsParamsSchema = z.object({});

/** GetActiveSeasons params type */

/** Endpoint definition for getActiveSeasons */
export const getActiveSeasonsDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getActiveSeasons",
  endpoint: "/ferries/api/schedule/rest/activeseasons",
  inputSchema: getActiveSeasonsParamsSchema,
  outputSchema: activeSeasonsArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
