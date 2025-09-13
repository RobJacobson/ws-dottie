import { z } from "zod";
import {
  type TimeAdjustment,
  timeAdjustmentsSchema,
} from "@/schemas/wsf-schedule/timeAdjustment.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getTimeAdjustments */
const timeAdjustmentsInput = z.object({});

/** Endpoint metadata for getTimeAdjustments */
export const getTimeAdjustmentsMeta: Endpoint<
  TimeAdjustmentsInput,
  TimeAdjustment[]
> = {
  endpoint: "/ferries/api/schedule/rest/timeadj",
  inputSchema: timeAdjustmentsInput,
  outputSchema: timeAdjustmentsSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type TimeAdjustmentsInput = z.infer<typeof timeAdjustmentsInput>;
