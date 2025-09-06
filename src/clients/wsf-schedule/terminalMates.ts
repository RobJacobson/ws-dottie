import { z } from "zod";
import { scheduleTerminalSchema } from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalMatesParamsSchema = z.object({
  tripDate: z.date(),
  terminalId: z.number().int().positive(),
});

export type GetTerminalMatesParams = z.infer<
  typeof getTerminalMatesParamsSchema
>;

export const scheduleTerminalMatesArraySchema = z.array(scheduleTerminalSchema);
export type ScheduleTerminalMates = z.infer<
  typeof scheduleTerminalMatesArraySchema
>;

const ENDPOINT =
  "/ferries/api/schedule/rest/terminalmates/{tripDate}/{terminalId}";

export const getTerminalMates = zodFetch<
  GetTerminalMatesParams,
  ScheduleTerminalMates
>(ENDPOINT, getTerminalMatesParamsSchema, scheduleTerminalMatesArraySchema);

export const scheduleTerminalMatesOptions = createQueryOptions({
  apiFunction: getTerminalMates,
  queryKey: ["wsf", "schedule", "terminalmates", "getTerminalMates"],
  cacheStrategy: "DAILY_STATIC",
});
