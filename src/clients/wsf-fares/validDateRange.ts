import { z } from "zod";
import { type ValidDateRange, validDateRangeSchema } from "@/schemas/wsf-fares";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

const ENDPOINT = "/ferries/api/fares/rest/validdaterange";

export const getValidDateRange = zodFetch<
  Record<string, never>,
  ValidDateRange
>(ENDPOINT, z.object({}), validDateRangeSchema);

export const validDateRangeOptions = createQueryOptions({
  apiFunction: getValidDateRange,
  queryKey: ["wsf", "fares", "validdaterange", "getValidDateRange"],
  cacheStrategy: "DAILY_STATIC",
});
