import { z } from "zod";
import { scheduleTerminalSchema } from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getScheduleTerminalsParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetScheduleTerminalsParams = z.infer<
  typeof getScheduleTerminalsParamsSchema
>;

export const scheduleTerminalsArraySchema = z.array(scheduleTerminalSchema);
export type ScheduleTerminals = z.infer<typeof scheduleTerminalsArraySchema>;

export const getScheduleTerminals = async (
  params: GetScheduleTerminalsParams
): Promise<ScheduleTerminals> =>
  zodFetch({
    endpoint: "/ferries/api/schedule/rest/terminals/{tripDate}",
    inputSchema: getScheduleTerminalsParamsSchema,
    outputSchema: scheduleTerminalsArraySchema,
    params,
  });

export const scheduleTerminalsOptions = createQueryOptions({
  apiFunction: getScheduleTerminals,
  queryKey: ["wsf", "schedule", "terminals", "getScheduleTerminals"],
  cacheStrategy: "DAILY_STATIC",
});
