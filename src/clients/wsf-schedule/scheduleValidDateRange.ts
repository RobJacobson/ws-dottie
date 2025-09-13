import { z } from "zod";
import { validDateRangeSchema } from "@/schemas/shared/validDateRange.zod";

/** Input schema for getScheduleValidDateRange */
const scheduleValidDateRangeInput = z.object({});

/** Endpoint metadata for getScheduleValidDateRange */
export const getScheduleValidDateRangeMeta = {
  api: "wsf-schedule",
  function: "getScheduleValidDateRange",
  endpoint: "/ferries/api/schedule/rest/validdaterange",
  inputSchema: scheduleValidDateRangeInput,
  outputSchema: validDateRangeSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports
export type ScheduleValidDateRangeInput = z.infer<
  typeof scheduleValidDateRangeInput
>;
