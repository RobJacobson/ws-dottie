import { z } from "zod";

import {
  type ScheduleTerminal,
  scheduleTerminalsSchema,
} from "@/schemas/wsf-schedule/scheduleTerminal.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getScheduleTerminals */
const scheduleTerminalsInput = z.object({
  TripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

/** Endpoint metadata for getScheduleTerminals */
export const getScheduleTerminalsMeta: EndpointDefinition<
  ScheduleTerminalsInput,
  ScheduleTerminal[]
> = {
  api: "wsf-schedule",
  function: "terminals",
  endpoint: "/ferries/api/schedule/rest/terminals/{TripDate}",
  inputSchema: scheduleTerminalsInput,
  outputSchema: scheduleTerminalsSchema,
  sampleParams: { TripDate: datesHelper.tomorrow() },
  cacheStrategy: "STATIC",
};

// Type exports
export type ScheduleTerminalsInput = z.infer<typeof scheduleTerminalsInput>;
