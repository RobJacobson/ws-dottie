import { z } from "zod";
import {
  type ScheduleResponse,
  scheduleResponseSchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getScheduleTodayByScheduleTerminalsParamsSchema = z.object({
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

export type GetScheduleTodayByScheduleTerminalsParams = z.infer<
  typeof getScheduleTodayByScheduleTerminalsParamsSchema
>;

const ENDPOINT_TODAY_BY_TERMINALS =
  "/ferries/api/schedule/rest/scheduletoday/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}/{onlyRemainingTimes}";

export const getScheduleTodayByScheduleTerminals = zodFetch<
  GetScheduleTodayByScheduleTerminalsParams,
  ScheduleResponse
>(
  ENDPOINT_TODAY_BY_TERMINALS,
  getScheduleTodayByScheduleTerminalsParamsSchema,
  scheduleResponseSchema
);

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
