import { z } from "zod";
import { scheduleAlertsSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getScheduleAlerts */
const scheduleAlertsInput = z.object({});

/** Endpoint metadata for getScheduleAlerts */
export const getScheduleAlertsMeta = defineEndpoint({
  api: "wsf-schedule",
  function: "getScheduleAlerts",
  endpoint: "/ferries/api/schedule/rest/alerts",
  inputSchema: scheduleAlertsInput,
  outputSchema: scheduleAlertsSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});

// Type exports
export type ScheduleAlertsInput = z.infer<typeof scheduleAlertsInput>;
