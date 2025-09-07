import { z } from "zod";
import {
  type ScheduleResponse,
  scheduleResponsesArraySchema as scheduleResponseArraySchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getScheduleByScheduleTerminalsParamsSchema = z.object({
  tripDate: z.date(),
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

export type GetScheduleByScheduleTerminalsParams = z.infer<
  typeof getScheduleByScheduleTerminalsParamsSchema
>;

export const getScheduleByScheduleTerminals = async (
  params: GetScheduleByScheduleTerminalsParams
): Promise<ScheduleResponse[]> =>
  zodFetch({
    endpoint:
      "/ferries/api/schedule/rest/schedulebyterminals/{tripDate}/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}",
    inputSchema: getScheduleByScheduleTerminalsParamsSchema,
    outputSchema: scheduleResponseArraySchema,
    params,
  });

export const scheduleByScheduleTerminalsOptions = createQueryOptions({
  apiFunction: getScheduleByScheduleTerminals,
  queryKey: ["wsf", "schedule", "schedule", "getScheduleByScheduleTerminals"],
  cacheStrategy: "DAILY_STATIC",
});
