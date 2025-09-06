import { z } from "zod";
import {
  type ScheduleResponse,
  scheduleResponsesArraySchema as scheduleResponseArraySchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getScheduleByScheduleTerminalsParamsSchema = z.object({
  tripDate: z.date(),
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

export type GetScheduleByScheduleTerminalsParams = z.infer<
  typeof getScheduleByScheduleTerminalsParamsSchema
>;

const ENDPOINT_BY_TERMINALS =
  "/ferries/api/schedule/rest/schedulebyterminals/{tripDate}/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}";

export const getScheduleByScheduleTerminals = zodFetch<
  GetScheduleByScheduleTerminalsParams,
  ScheduleResponse[]
>(
  ENDPOINT_BY_TERMINALS,
  getScheduleByScheduleTerminalsParamsSchema,
  scheduleResponseArraySchema
);

export const scheduleByScheduleTerminalsOptions = createQueryOptions({
  apiFunction: getScheduleByScheduleTerminals,
  queryKey: ["wsf", "schedule", "schedule", "getScheduleByScheduleTerminals"],
  cacheStrategy: "DAILY_STATIC",
});
