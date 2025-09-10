import { z } from "zod";
import { scheduleAlertsArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getScheduleAlerts */
export const getScheduleAlertsParamsSchema = z.object({});

/** GetScheduleAlerts params type */
export type GetScheduleAlertsParams = z.infer<
  typeof getScheduleAlertsParamsSchema
>;

/** Endpoint definition for getScheduleAlerts */
export const getScheduleAlertsDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getScheduleAlerts",
  endpoint: "/ferries/api/schedule/rest/alerts",
  inputSchema: getScheduleAlertsParamsSchema,
  outputSchema: scheduleAlertsArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
