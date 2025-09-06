import { z } from "zod";
import {
  type WsfCacheFlushDate,
  wsfCacheFlushDateSchema,
} from "@/schemas/shared/cacheFlushDate.zod";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

const ENDPOINT = "/ferries/api/vessels/rest/cacheflushdate";

export const getVesselsCacheFlushDate = zodFetch<
  Record<string, never>,
  WsfCacheFlushDate
>(ENDPOINT, z.object({}), wsfCacheFlushDateSchema);

export const vesselsCacheFlushDateOptions = createQueryOptions({
  apiFunction: getVesselsCacheFlushDate,
  queryKey: ["wsf", "vessels", "cacheflushdate", "getCacheFlushDate"],
  cacheStrategy: "DAILY_STATIC",
});
