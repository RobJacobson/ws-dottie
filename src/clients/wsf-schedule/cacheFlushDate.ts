import { z } from "zod";
import {
  type WsfScheduleCacheFlushDate,
  wsfScheduleCacheFlushDateSchema,
} from "@/schemas/shared/cacheFlushDate.zod";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

const ENDPOINT = "/ferries/api/schedule/rest/cacheflushdate";

export const getScheduleCacheFlushDate = zodFetch<
  Record<string, never>,
  WsfScheduleCacheFlushDate
>(ENDPOINT, z.object({}), wsfScheduleCacheFlushDateSchema);

export const scheduleCacheFlushDateOptions = createQueryOptions({
  apiFunction: getScheduleCacheFlushDate,
  queryKey: ["wsf", "schedule", "cacheflushdate", "getCacheFlushDate"],
  cacheStrategy: "DAILY_STATIC",
});
