import { z } from "zod";
import { scheduleTerminalSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { getSampleDates } from "@/shared/utils/dateUtils";

/** Params schema for getScheduleTerminals */
export const getScheduleTerminalsParamsSchema = z.object({
  tripDate: z.date(),
});

/** GetScheduleTerminals params type */
export type GetScheduleTerminalsParams = z.infer<
  typeof getScheduleTerminalsParamsSchema
>;

/** Endpoint definition for getScheduleTerminals */
export const getScheduleTerminalsDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getScheduleTerminals",
  endpoint: "/ferries/api/schedule/rest/terminals/{tripDate}",
  inputSchema: getScheduleTerminalsParamsSchema,
  outputSchema: z.array(scheduleTerminalSchema),
  sampleParams: { tripDate: getSampleDates().tomorrow },
  cacheStrategy: "DAILY_STATIC",
});
