import { z } from "zod";
import {
  type ScheduleTerminal,
  scheduleTerminalsSchema,
} from "@/schemas/wsf-schedule/scheduleTerminal.zod";
import type { EndpointMeta } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getScheduleTerminals */
const scheduleTerminalsInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getScheduleTerminals */
export const getScheduleTerminalsMeta: EndpointMeta<
  ScheduleTerminalsInput,
  ScheduleTerminal[]
> = {
  id: "wsf-schedule/terminals",
  endpoint: "/ferries/api/schedule/rest/terminals/{tripDate}",
  inputSchema: scheduleTerminalsInput,
  outputSchema: scheduleTerminalsSchema,
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type ScheduleTerminalsInput = z.infer<typeof scheduleTerminalsInput>;
