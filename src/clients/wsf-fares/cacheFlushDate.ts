import { z } from "zod";
import {
  type WsfFaresCacheFlushDate,
  wsfFaresCacheFlushDateSchema,
} from "@/schemas/shared/cacheFlushDate.zod";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

const ENDPOINT = "/ferries/api/fares/rest/cacheflushdate";

export const getFaresCacheFlushDate = zodFetch<
  Record<string, never>,
  WsfFaresCacheFlushDate
>(ENDPOINT, z.object({}), wsfFaresCacheFlushDateSchema);

export const faresCacheFlushDateOptions = createQueryOptions({
  apiFunction: getFaresCacheFlushDate,
  queryKey: ["wsf", "fares", "cacheflushdate", "getCacheFlushDate"],
  cacheStrategy: "DAILY_STATIC",
});
