import { z } from "zod";
import type { ValidDateRange } from "@/schemas/shared/validDateRange.zod";
import { validDateRangeSchema } from "@/schemas/shared/validDateRange.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getFaresValidDateRange */
const faresValidDateRangeInput = z.object({});

/** Endpoint metadata for getFaresValidDateRange */
export const getFaresValidDateRangeMeta: EndpointDefinition<
  FaresValidDateRangeInput,
  ValidDateRange
> = {
  id: "wsf-fares/faresValidDateRange",
  endpoint: "/ferries/api/fares/rest/validdaterange",
  inputSchema: faresValidDateRangeInput,
  outputSchema: validDateRangeSchema,
  sampleParams: {},
  cacheStrategy: "STATIC",
};

// Type exports
export type FaresValidDateRangeInput = z.infer<typeof faresValidDateRangeInput>;
