import { z } from "zod";
import {
  type ScheduleResponse,
  scheduleResponseSchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getScheduleTodayByScheduleTerminalsParamsSchema = z.object({
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

export type GetScheduleTodayByScheduleTerminalsParams = z.infer<
  typeof getScheduleTodayByScheduleTerminalsParamsSchema
>;

export const getScheduleTodayByScheduleTerminals = async (
  params: GetScheduleTodayByScheduleTerminalsParams
): Promise<ScheduleResponse> =>
  zodFetch({
    endpoint:
      "/ferries/api/schedule/rest/scheduletoday/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}/{onlyRemainingTimes}",
    inputSchema: getScheduleTodayByScheduleTerminalsParamsSchema,
    outputSchema: scheduleResponseSchema,
    params,
  });

export const scheduleTodayByScheduleTerminalsOptions = createQueryOptions({
  apiFunction: getScheduleTodayByScheduleTerminals,
  queryKey: [
    "wsf",
    "schedule",
    "scheduletoday",
    "getScheduleTodayByScheduleTerminals",
  ],
  cacheStrategy: "DAILY_STATIC",
});
