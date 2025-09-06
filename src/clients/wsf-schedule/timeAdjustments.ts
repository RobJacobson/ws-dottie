import { z } from "zod";
import { timeAdjustmentResponsesArraySchema } from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getTimeAdjustmentsParamsSchema = z.object({});

export type GetTimeAdjustmentsParams = z.infer<
  typeof getTimeAdjustmentsParamsSchema
>;

const ENDPOINT = "/ferries/api/schedule/rest/timeadj";

export const getTimeAdjustments = zodFetch<
  GetTimeAdjustmentsParams,
  z.infer<typeof timeAdjustmentResponsesArraySchema>
>(ENDPOINT, getTimeAdjustmentsParamsSchema, timeAdjustmentResponsesArraySchema);

export const timeAdjustmentsOptions = createQueryOptions({
  apiFunction: getTimeAdjustments,
  queryKey: ["wsf", "schedule", "timeadj", "getTimeAdjustments"],
  cacheStrategy: "DAILY_STATIC",
});
