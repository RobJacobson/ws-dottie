import { z } from "zod";
import type { ValidDateRange } from "@/schemas/shared/validDateRange.zod";
import { validDateRangeSchema } from "@/schemas/shared/validDateRange.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getFaresValidDateRange */
const faresValidDateRangeInput = z.object({});

/** Endpoint metadata for getFaresValidDateRange */
export const getFaresValidDateRangeMeta: Endpoint<
  FaresValidDateRangeInput,
  ValidDateRange
> = {
  api: "wsf-fares",
  function: "getFaresValidDateRange",
  endpoint: "/ferries/api/fares/rest/validdaterange",
  inputSchema: faresValidDateRangeInput,
  outputSchema: validDateRangeSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type FaresValidDateRangeInput = z.infer<typeof faresValidDateRangeInput>;
