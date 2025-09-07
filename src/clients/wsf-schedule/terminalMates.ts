import { z } from "zod";
import { scheduleTerminalSchema } from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/tanstack/factory";
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

export const getTerminalMates = async (
  params: GetTerminalMatesParams
): Promise<ScheduleTerminalMates> =>
  zodFetch({
    endpoint:
      "/ferries/api/schedule/rest/terminalmates/{tripDate}/{terminalId}",
    inputSchema: getTerminalMatesParamsSchema,
    outputSchema: scheduleTerminalMatesArraySchema,
    params,
  });

export const scheduleTerminalMatesOptions = createQueryOptions({
  apiFunction: getTerminalMates,
  queryKey: ["wsf", "schedule", "terminalmates", "getTerminalMates"],
  cacheStrategy: "DAILY_STATIC",
});
