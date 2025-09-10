import { z } from "zod";
import { scheduleResponsesArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getScheduleToday */
export const getScheduleTodayParamsSchema = z.object({});

/** GetScheduleToday params type */
export type GetScheduleTodayParams = z.infer<
  typeof getScheduleTodayParamsSchema
>;

/** Endpoint definition for getScheduleToday */
export const getScheduleTodayDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getScheduleToday",
  endpoint: "/ferries/api/schedule/rest/scheduletoday",
  inputSchema: getScheduleTodayParamsSchema,
  outputSchema: scheduleResponsesArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
