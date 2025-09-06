import { z } from "zod";
import { scheduleTerminalSchema } from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getScheduleTerminalsParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetScheduleTerminalsParams = z.infer<
  typeof getScheduleTerminalsParamsSchema
>;

export const scheduleTerminalsArraySchema = z.array(scheduleTerminalSchema);
export type ScheduleTerminals = z.infer<typeof scheduleTerminalsArraySchema>;

const ENDPOINT = "/ferries/api/schedule/rest/terminals/{tripDate}";

export const getScheduleTerminals = zodFetch<
  GetScheduleTerminalsParams,
  ScheduleTerminals
>(ENDPOINT, getScheduleTerminalsParamsSchema, scheduleTerminalsArraySchema);

export const scheduleTerminalsOptions = createQueryOptions({
  apiFunction: getScheduleTerminals,
  queryKey: ["wsf", "schedule", "terminals", "getScheduleTerminals"],
  cacheStrategy: "DAILY_STATIC",
});
