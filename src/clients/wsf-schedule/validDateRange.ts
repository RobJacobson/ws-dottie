import { z } from "zod";
import {
  type ValidDateRange,
  validDateRangeSchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getValidDateRangeParamsSchema = z.object({});

export type GetValidDateRangeParams = z.infer<
  typeof getValidDateRangeParamsSchema
>;

export { validDateRangeSchema };
export type { ValidDateRange };

export const getScheduleValidDateRange = async (
  params: GetValidDateRangeParams
): Promise<ValidDateRange> =>
  zodFetch({
    endpoint: "/ferries/api/schedule/rest/validdaterange",
    inputSchema: getValidDateRangeParamsSchema,
    outputSchema: validDateRangeSchema,
    params,
  });

export const scheduleValidDateRangeOptions = createQueryOptions({
  apiFunction: getScheduleValidDateRange,
  queryKey: ["wsf", "schedule", "validDateRange", "getValidDateRange"],
  cacheStrategy: "DAILY_STATIC",
});
