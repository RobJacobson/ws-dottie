import { z } from "zod";
import { timeAdjustmentsSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTimeAdjustments */
const getTimeAdjustmentsParamsSchema = z.object({});

/** GetTimeAdjustments params type */

/** Endpoint definition for getTimeAdjustments */
export const getTimeAdjustmentsDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getTimeAdjustments",
  endpoint: "/ferries/api/schedule/rest/timeadj",
  inputSchema: getTimeAdjustmentsParamsSchema,
  outputSchema: timeAdjustmentsSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
