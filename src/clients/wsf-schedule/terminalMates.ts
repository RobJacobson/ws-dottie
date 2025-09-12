import { z } from "zod";
import { scheduleTerminalSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Params schema for getTerminalMates */
const getTerminalMatesParamsSchema = z.object({
  tripDate: z.date(),
  terminalId: z.number().int().positive(),
});

/** GetTerminalMates params type */

/** Endpoint definition for getTerminalMates */
export const getTerminalMatesDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getTerminalMates",
  endpoint: "/ferries/api/schedule/rest/terminalmates/{tripDate}/{terminalId}",
  inputSchema: getTerminalMatesParamsSchema,
  outputSchema: z.array(scheduleTerminalSchema),
  sampleParams: { tripDate: datesHelper.tomorrow(), terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
