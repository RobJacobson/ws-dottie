import type { z } from "zod";
import { zDotnetDate } from "@/apis/shared";

/**
 * CacheFlushDate schema
 *
 * Some of the retrieval operations in this service return data that changes infrequently. As a result, you may wish to cache it in your application. Use the `/cacheflushdate` operation to poll for changes. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service.
 */
export const cacheFlushDateSchema = zDotnetDate().describe(
  "The date and time when the cache was last flushed."
);

export type VesselsCacheFlushDate = z.infer<typeof cacheFlushDateSchema>;
