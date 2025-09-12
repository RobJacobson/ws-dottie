import { z } from "zod";
import { scheduleTerminalSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Params schema for getScheduleTerminals */
const getScheduleTerminalsParamsSchema = z.object({
  tripDate: z.date(),
});

/** GetScheduleTerminals params type */

/** Endpoint definition for getScheduleTerminals */
export const getScheduleTerminalsDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getScheduleTerminals",
  endpoint: "/ferries/api/schedule/rest/terminals/{tripDate}",
  inputSchema: getScheduleTerminalsParamsSchema,
  outputSchema: z.array(scheduleTerminalSchema),
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
});
