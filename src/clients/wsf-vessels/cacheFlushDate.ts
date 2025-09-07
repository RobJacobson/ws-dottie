import { z } from "zod";
import {
  type WsfCacheFlushDate,
  wsfCacheFlushDateSchema,
} from "@/schemas/shared/cacheFlushDate.zod";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getVesselsCacheFlushDateParamsSchema = z.object({});

export type GetVesselsCacheFlushDateParams = z.infer<
  typeof getVesselsCacheFlushDateParamsSchema
>;

export const getVesselsCacheFlushDate = async (
  params: GetVesselsCacheFlushDateParams
): Promise<WsfCacheFlushDate> =>
  zodFetch({
    endpoint: "/ferries/api/vessels/rest/cacheflushdate",
    inputSchema: getVesselsCacheFlushDateParamsSchema,
    outputSchema: wsfCacheFlushDateSchema,
    params,
  });

export const vesselsCacheFlushDateOptions = createQueryOptions({
  apiFunction: getVesselsCacheFlushDate,
  queryKey: ["wsf", "vessels", "cacheflushdate", "getCacheFlushDate"],
  cacheStrategy: "DAILY_STATIC",
});
