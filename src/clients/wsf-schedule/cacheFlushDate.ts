import { z } from "zod";
import {
  type WsfScheduleCacheFlushDate,
  wsfScheduleCacheFlushDateSchema,
} from "@/schemas/shared/cacheFlushDate.zod";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getScheduleCacheFlushDate = async (
  params: Record<string, never>
): Promise<WsfScheduleCacheFlushDate> =>
  zodFetch({
    endpoint: "/ferries/api/schedule/rest/cacheflushdate",
    inputSchema: z.object({}),
    outputSchema: wsfScheduleCacheFlushDateSchema,
    params,
  });

export const scheduleCacheFlushDateOptions = createQueryOptions({
  apiFunction: getScheduleCacheFlushDate,
  queryKey: ["wsf", "schedule", "cacheflushdate", "getCacheFlushDate"],
  cacheStrategy: "DAILY_STATIC",
});
