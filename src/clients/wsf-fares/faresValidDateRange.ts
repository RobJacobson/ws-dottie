import { z } from "zod";
import { validDateRangeSchema } from "@/schemas/shared/validDateRange.zod";

/** Input schema for getFaresValidDateRange */
const faresValidDateRangeInput = z.object({});

/** Endpoint metadata for getFaresValidDateRange */
export const getFaresValidDateRangeMeta = {
  api: "wsf-fares",
  function: "getFaresValidDateRange",
  endpoint: "/ferries/api/fares/rest/validdaterange",
  inputSchema: faresValidDateRangeInput,
  outputSchema: validDateRangeSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports
export type FaresValidDateRangeInput = z.infer<typeof faresValidDateRangeInput>;
