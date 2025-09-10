import { z } from "zod";
import { validDateRangeSchema as faresValidDateRangeSchema } from "@/schemas/wsf-fares";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getFaresValidDateRange */
export const getFaresValidDateRangeParamsSchema = z.object({});

/** GetFaresValidDateRange params type */
export type GetFaresValidDateRangeParams = z.infer<
  typeof getFaresValidDateRangeParamsSchema
>;

/** Endpoint definition for getFaresValidDateRange */
export const getFaresValidDateRangeDef = defineEndpoint({
  moduleGroup: "wsf-fares",
  functionName: "getFaresValidDateRange",
  endpoint: "/ferries/api/fares/rest/validdaterange",
  inputSchema: getFaresValidDateRangeParamsSchema,
  outputSchema: faresValidDateRangeSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
