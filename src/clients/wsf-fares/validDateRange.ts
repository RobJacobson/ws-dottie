import { z } from "zod";
import { type ValidDateRange, validDateRangeSchema } from "@/schemas/wsf-fares";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getValidDateRange = async (
  params: Record<string, never>
): Promise<ValidDateRange> =>
  zodFetch({
    endpoint: "/ferries/api/fares/rest/validdaterange",
    inputSchema: z.object({}),
    outputSchema: validDateRangeSchema,
    params,
  });

export const validDateRangeOptions = createQueryOptions({
  apiFunction: getValidDateRange,
  queryKey: ["wsf", "fares", "validdaterange", "getValidDateRange"],
  cacheStrategy: "DAILY_STATIC",
});
