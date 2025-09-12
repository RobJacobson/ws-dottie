import { z } from "zod";
import { validDateRangeSchema } from "@/schemas/shared/validDateRange.zod";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getFaresValidDateRange */
const getFaresValidDateRangeParamsSchema = z.object({});

/** GetFaresValidDateRange params type */

/** Endpoint definition for getFaresValidDateRange */
export const getFaresValidDateRangeDef = defineEndpoint({
  api: "wsf-fares",
  function: "getFaresValidDateRange",
  endpoint: "/ferries/api/fares/rest/validdaterange",
  inputSchema: getFaresValidDateRangeParamsSchema,
  outputSchema: validDateRangeSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
