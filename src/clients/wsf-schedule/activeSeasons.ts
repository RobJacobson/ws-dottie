import { z } from "zod";
import { activeSeasonsArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getActiveSeasons */
export const getActiveSeasonsParamsSchema = z.object({});

/** GetActiveSeasons params type */
export type GetActiveSeasonsParams = z.infer<
  typeof getActiveSeasonsParamsSchema
>;

/** Endpoint definition for getActiveSeasons */
export const getActiveSeasonsDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getActiveSeasons",
  endpoint: "/ferries/api/schedule/rest/activeseasons",
  inputSchema: getActiveSeasonsParamsSchema,
  outputSchema: activeSeasonsArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
