import { z } from "zod";
import {
  type WsfCacheFlushDate,
  wsfCacheFlushDateSchema,
} from "@/schemas/shared/cacheFlushDate.zod";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalsCacheFlushDate = async (
  params: Record<string, never>
): Promise<WsfCacheFlushDate> =>
  zodFetch({
    endpoint: "/ferries/api/terminals/rest/cacheflushdate",
    inputSchema: z.object({}),
    outputSchema: wsfCacheFlushDateSchema,
    params,
  });

export const terminalsCacheFlushDateOptions = createQueryOptions({
  apiFunction: getTerminalsCacheFlushDate,
  queryKey: ["wsf", "terminals", "cacheflushdate", "getCacheFlushDate"],
  cacheStrategy: "DAILY_STATIC",
});
