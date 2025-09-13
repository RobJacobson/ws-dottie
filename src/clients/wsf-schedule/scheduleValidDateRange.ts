import { z } from "zod";
import { validDateRangeSchema } from "@/schemas/shared/validDateRange.zod";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getScheduleValidDateRange */
const scheduleValidDateRangeInput = z.object({});

/** Endpoint metadata for getScheduleValidDateRange */
export const getScheduleValidDateRangeMeta = defineEndpoint({
  api: "wsf-schedule",
  function: "getScheduleValidDateRange",
  endpoint: "/ferries/api/schedule/rest/validdaterange",
  inputSchema: scheduleValidDateRangeInput,
  outputSchema: validDateRangeSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});

// Type exports
export type ScheduleValidDateRangeInput = z.infer<
  typeof scheduleValidDateRangeInput
>;
