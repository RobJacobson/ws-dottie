import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
import {
  type TimeAdjustmentsInput,
  timeAdjustmentsInputSchema,
} from "./shared/timeAdjustments.input";
import {
  type TimeAdjustment,
  timeAdjustmentSchema,
} from "./shared/timeAdjustments.output";

/**
 * Metadata for the fetchTimeAdjustments endpoint
 */
export const timeAdjustmentsMeta = {
  functionName: "fetchTimeAdjustments",
  endpoint: "/timeadj",
  inputSchema: timeAdjustmentsInputSchema,
  outputSchema: timeAdjustmentSchema.array(),
  sampleParams: {},
  endpointDescription: "List all time adjustments across all routes.",
} satisfies EndpointMeta<TimeAdjustmentsInput, TimeAdjustment[]>;

/**
 * Factory result for time adjustments
 */
const timeAdjustmentsFactory = createFetchAndHook<
  TimeAdjustmentsInput,
  TimeAdjustment[]
>({
  api: wsfScheduleApiMeta,
  endpoint: timeAdjustmentsMeta,
  getEndpointGroup: () =>
    require("./shared/timeAdjustments.endpoints").timeAdjustmentsGroup,
});

/**
 * Fetch function and React Query hook for retrieving all time adjustments across all routes
 */
export const { fetch: fetchTimeAdjustments, hook: useTimeAdjustments } =
  timeAdjustmentsFactory;
