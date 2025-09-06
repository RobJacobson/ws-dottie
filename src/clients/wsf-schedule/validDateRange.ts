import { z } from "zod";
import {
  type ValidDateRange,
  validDateRangeSchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getValidDateRangeParamsSchema = z.object({});

export type GetValidDateRangeParams = z.infer<
  typeof getValidDateRangeParamsSchema
>;

export { validDateRangeSchema };
export type { ValidDateRange };

export const getScheduleValidDateRange = zodFetch<
  GetValidDateRangeParams,
  ValidDateRange
>(
  "/ferries/api/schedule/rest/validdaterange",
  getValidDateRangeParamsSchema,
  validDateRangeSchema
);

export const scheduleValidDateRangeOptions = createQueryOptions({
  apiFunction: getScheduleValidDateRange,
  queryKey: ["wsf", "schedule", "validDateRange", "getValidDateRange"],
  cacheStrategy: "DAILY_STATIC",
});
