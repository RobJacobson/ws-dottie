import { z } from "zod";
import { validDateRangeSchema } from "@/schemas/shared/validDateRange.zod";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getScheduleValidDateRange */
const getScheduleValidDateRangeParamsSchema = z.object({});

/** GetScheduleValidDateRange params type */

/** Endpoint definition for getScheduleValidDateRange */
export const getScheduleValidDateRangeDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getScheduleValidDateRange",
  endpoint: "/ferries/api/schedule/rest/validdaterange",
  inputSchema: getScheduleValidDateRangeParamsSchema,
  outputSchema: validDateRangeSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
