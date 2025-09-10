import { z } from "zod";
import { timeAdjustmentsSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTimeAdjustments */
export const getTimeAdjustmentsParamsSchema = z.object({});

/** GetTimeAdjustments params type */
export type GetTimeAdjustmentsParams = z.infer<
  typeof getTimeAdjustmentsParamsSchema
>;

/** Endpoint definition for getTimeAdjustments */
export const getTimeAdjustmentsDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getTimeAdjustments",
  endpoint: "/ferries/api/schedule/rest/timeadj",
  inputSchema: getTimeAdjustmentsParamsSchema,
  outputSchema: timeAdjustmentsSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
