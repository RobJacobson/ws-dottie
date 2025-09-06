import { z } from "zod";
import {
  type WsfCacheFlushDate,
  wsfCacheFlushDateSchema,
} from "@/schemas/shared/cacheFlushDate.zod";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

const ENDPOINT = "/ferries/api/terminals/rest/cacheflushdate";

export const getTerminalsCacheFlushDate = zodFetch<
  Record<string, never>,
  WsfCacheFlushDate
>(ENDPOINT, z.object({}), wsfCacheFlushDateSchema);

export const terminalsCacheFlushDateOptions = createQueryOptions({
  apiFunction: getTerminalsCacheFlushDate,
  queryKey: ["wsf", "terminals", "cacheflushdate", "getCacheFlushDate"],
  cacheStrategy: "DAILY_STATIC",
});
