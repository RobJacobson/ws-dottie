import { z } from "zod";
import {
  type ScheduleResponse,
  scheduleResponseSchema,
} from "@/schemas/wsf-schedule/scheduleResponse.zod";
import type { EndpointMeta } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getScheduleByTerminals */
const scheduleByTerminalsInput = z.object({
  tripDate: z.date(),
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

/** Endpoint metadata for getScheduleByTerminals */
export const getScheduleByTerminalsMeta: EndpointMeta<
  ScheduleByTerminalsInput,
  ScheduleResponse
> = {
  id: "wsf-schedule/scheduleByTerminals",
  endpoint:
    "/ferries/api/schedule/rest/schedule/{tripDate}/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}",
  inputSchema: scheduleByTerminalsInput,
  outputSchema: scheduleResponseSchema,
  sampleParams: {
    tripDate: datesHelper.tomorrow(),
    departingScheduleTerminalId: 1,
    arrivingScheduleTerminalId: 10,
  },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type ScheduleByTerminalsInput = z.infer<typeof scheduleByTerminalsInput>;
