import { z } from "zod";
import {
  type ValidDateRange as FaresValidDateRange,
  validDateRangeSchema as faresValidDateRangeSchema,
} from "@/schemas/wsf-fares";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getFaresValidDateRangeParamsSchema = z.object({});

export type GetFaresValidDateRangeParams = z.infer<
  typeof getFaresValidDateRangeParamsSchema
>;

export { faresValidDateRangeSchema };
export type { FaresValidDateRange };

export const getFaresValidDateRange = async (
  params: GetFaresValidDateRangeParams
): Promise<FaresValidDateRange> =>
  zodFetch({
    endpoint: "/ferries/api/fares/rest/validdaterange",
    inputSchema: getFaresValidDateRangeParamsSchema,
    outputSchema: faresValidDateRangeSchema,
    params,
  });

export const faresValidDateRangeOptions = createQueryOptions({
  apiFunction: getFaresValidDateRange,
  queryKey: ["wsf", "fares", "validDateRange", "getFaresValidDateRange"],
  cacheStrategy: "DAILY_STATIC",
});
