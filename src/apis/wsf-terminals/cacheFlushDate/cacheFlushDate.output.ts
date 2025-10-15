/**
 * @fileoverview WSF Terminals API Output Schemas
 *
 * This module provides Zod schemas for validating output data from the WSF
 * Terminals API endpoints.
 */

import type { z } from "zod";
import { zDotnetDate } from "@/apis/shared";

/**
 * CacheFlushDate schema
 *
 * Some of the retrieval operations in this service return data that changes infrequently. As a result, you may wish to cache it in your application. Use the `/cacheflushdate` operation to poll for changes. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service.
 */
export const cacheFlushDateSchema = zDotnetDate().describe(
  "If present, notes the date that certain service data was last changed (see description)."
);

export type TerminalsCacheFlushDate = z.infer<typeof cacheFlushDateSchema>;
