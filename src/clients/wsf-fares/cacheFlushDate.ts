import { z } from "zod";
import { wsfStandardCacheFlushDateSchema } from "@/schemas/shared/cacheFlushDate.zod";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getFaresCacheFlushDate */
const faresCacheFlushDateInput = z.object({});

/** Endpoint metadata for getFaresCacheFlushDate */
export const getFaresCacheFlushDateMeta = defineEndpoint({
  api: "wsf-fares",
  function: "getFaresCacheFlushDate",
  endpoint: "/ferries/api/fares/rest/cacheflushdate",
  inputSchema: faresCacheFlushDateInput,
  outputSchema: wsfStandardCacheFlushDateSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});

// Type exports
export type FaresCacheFlushDateInput = z.infer<typeof faresCacheFlushDateInput>;
