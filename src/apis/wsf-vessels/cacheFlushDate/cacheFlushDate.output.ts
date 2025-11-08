import type { z } from "zod";
import { zDotnetDate } from "@/apis/shared";

/**
 * CacheFlushDate schema
 */
export const cacheFlushDateVesselsSchema = zDotnetDate()
  .optional()
  .describe(
    "Cache flush timestamp indicating when any static endpoint data for the wsf-vessels API was last updated, as a UTC datetime. E.g., '2025-11-02T19:45:00.517Z' when vessel metadata was refreshed."
  );

export type CacheFlushDateVessels = z.infer<typeof cacheFlushDateVesselsSchema>;
