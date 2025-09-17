import { z } from "zod";
import type { ValidDateRange } from "@/schemas/shared/validDateRange.zod";
import { validDateRangeSchema } from "@/schemas/shared/validDateRange.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getScheduleValidDateRange */
const scheduleValidDateRangeInput = z.object({});

/** Endpoint metadata for getScheduleValidDateRange */
export const getScheduleValidDateRangeMeta: EndpointDefinition<
  ScheduleValidDateRangeInput,
  ValidDateRange
> = {
  id: "wsf-schedule/scheduleValidDateRange",
  endpoint: "/ferries/api/schedule/rest/validdaterange",
  inputSchema: scheduleValidDateRangeInput,
  outputSchema: validDateRangeSchema,
  sampleParams: {},
  cacheStrategy: "STATIC",
};

// Type exports
export type ScheduleValidDateRangeInput = z.infer<
  typeof scheduleValidDateRangeInput
>;
