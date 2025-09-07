import { z } from "zod";
import {
  type WsfFaresCacheFlushDate,
  wsfFaresCacheFlushDateSchema,
} from "@/schemas/shared/cacheFlushDate.zod";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getFaresCacheFlushDate = async (
  params: Record<string, never>
): Promise<WsfFaresCacheFlushDate> =>
  zodFetch({
    endpoint: "/ferries/api/fares/rest/cacheflushdate",
    inputSchema: z.object({}),
    outputSchema: wsfFaresCacheFlushDateSchema,
    params,
  });

export const faresCacheFlushDateOptions = createQueryOptions({
  apiFunction: getFaresCacheFlushDate,
  queryKey: ["wsf", "fares", "cacheflushdate", "getCacheFlushDate"],
  cacheStrategy: "DAILY_STATIC",
});
