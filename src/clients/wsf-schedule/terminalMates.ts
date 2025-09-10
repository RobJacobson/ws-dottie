import { z } from "zod";
import { scheduleTerminalSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { getSampleDates } from "@/shared/utils/dateUtils";

/** Params schema for getTerminalMates */
export const getTerminalMatesParamsSchema = z.object({
  tripDate: z.date(),
  terminalId: z.number().int().positive(),
});

/** GetTerminalMates params type */
export type GetTerminalMatesParams = z.infer<
  typeof getTerminalMatesParamsSchema
>;

/** Endpoint definition for getTerminalMates */
export const getTerminalMatesDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getTerminalMates",
  endpoint: "/ferries/api/schedule/rest/terminalmates/{tripDate}/{terminalId}",
  inputSchema: getTerminalMatesParamsSchema,
  outputSchema: z.array(scheduleTerminalSchema),
  sampleParams: { tripDate: getSampleDates().tomorrow, terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
