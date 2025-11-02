import type { z } from "zod";
import { zDotnetDate } from "@/apis/shared";

/**
 * CacheFlushDate schema
 *
 * Some of the retrieval operations in this service return data that changes infrequently. As a result, you may wish to cache it in your application. Use the `/cacheflushdate` operation to poll for changes. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service.
 */
export const cacheFlushDateSchema = zDotnetDate().describe(
  "Cache flush timestamp indicating when vessel data was last updated, as a UTC datetime. E.g., '/Date(1757451301100-0700)/' when vessel metadata was refreshed. Use to determine when cached vessel information should be invalidated and refreshed. Poll this endpoint periodically to detect when vessel data changes."
);

export type VesselsCacheFlushDate = z.infer<typeof cacheFlushDateSchema>;
