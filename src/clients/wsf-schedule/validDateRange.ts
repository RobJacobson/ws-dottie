import { z } from "zod";
import { validDateRangeSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getScheduleValidDateRange */
export const getScheduleValidDateRangeParamsSchema = z.object({});

/** GetScheduleValidDateRange params type */
export type GetScheduleValidDateRangeParams = z.infer<
  typeof getScheduleValidDateRangeParamsSchema
>;

/** Endpoint definition for getScheduleValidDateRange */
export const getScheduleValidDateRangeDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getScheduleValidDateRange",
  endpoint: "/ferries/api/schedule/rest/validdaterange",
  inputSchema: getScheduleValidDateRangeParamsSchema,
  outputSchema: validDateRangeSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
