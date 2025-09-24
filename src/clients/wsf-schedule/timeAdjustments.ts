import { z } from "zod";

import {
  type TimeAdjustment,
  timeAdjustmentsSchema,
} from "@/schemas/wsf-schedule/timeAdjustment.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getTimeAdjustments */
const timeAdjustmentsInput = z.object({}).strict();

/** Endpoint metadata for getTimeAdjustments */
export const getTimeAdjustmentsMeta: EndpointDefinition<
  TimeAdjustmentsInput,
  TimeAdjustment[]
> = {
  id: "wsf-schedule:timeAdjustments",
  endpoint: "/ferries/api/schedule/rest/timeadj",
  inputSchema: timeAdjustmentsInput,
  outputSchema: timeAdjustmentsSchema,
  sampleParams: {},
  cacheStrategy: "STATIC",
};

// Type exports
export type TimeAdjustmentsInput = z.infer<typeof timeAdjustmentsInput>;
