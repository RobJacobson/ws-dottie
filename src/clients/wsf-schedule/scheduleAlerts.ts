import { z } from "zod";
import { scheduleAlertsArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getScheduleAlerts */
const getScheduleAlertsParamsSchema = z.object({});

/** GetScheduleAlerts params type */

/** Endpoint definition for getScheduleAlerts */
export const getScheduleAlertsDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getScheduleAlerts",
  endpoint: "/ferries/api/schedule/rest/alerts",
  inputSchema: getScheduleAlertsParamsSchema,
  outputSchema: scheduleAlertsArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
