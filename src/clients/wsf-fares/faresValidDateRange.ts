import { z } from "zod";
import {
  type ValidDateRange as FaresValidDateRange,
  validDateRangeSchema as faresValidDateRangeSchema,
} from "@/schemas/wsf-fares";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getFaresValidDateRangeParamsSchema = z.object({});

export type GetFaresValidDateRangeParams = z.infer<
  typeof getFaresValidDateRangeParamsSchema
>;

export { faresValidDateRangeSchema };
export type { FaresValidDateRange };

const ENDPOINT = "/ferries/api/fares/rest/validdaterange";

export const getFaresValidDateRange = zodFetch<
  GetFaresValidDateRangeParams,
  FaresValidDateRange
>(ENDPOINT, getFaresValidDateRangeParamsSchema, faresValidDateRangeSchema);

export const faresValidDateRangeOptions = createQueryOptions({
  apiFunction: getFaresValidDateRange,
  queryKey: ["wsf", "fares", "validDateRange", "getFaresValidDateRange"],
  cacheStrategy: "DAILY_STATIC",
});
