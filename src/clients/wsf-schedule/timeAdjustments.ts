import { z } from "zod";
import { timeAdjustmentsSchema } from "@/schemas/wsf-schedule";
import type { TimeAdjustment } from "@/schemas/wsf-schedule/timeAdjustment.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getTimeAdjustments */
const timeAdjustmentsInput = z.object({});

/** Endpoint metadata for getTimeAdjustments */
export const getTimeAdjustmentsMeta: Endpoint<
  TimeAdjustmentsInput,
  TimeAdjustment[]
> = {
  api: "wsf-schedule",
  function: "getTimeAdjustments",
  endpoint: "/ferries/api/schedule/rest/timeadj",
  inputSchema: timeAdjustmentsInput,
  outputSchema: timeAdjustmentsSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type TimeAdjustmentsInput = z.infer<typeof timeAdjustmentsInput>;
