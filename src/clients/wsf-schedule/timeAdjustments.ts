import { z } from "zod";
import { timeAdjustmentResponsesArraySchema } from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getTimeAdjustmentsParamsSchema = z.object({});

export type GetTimeAdjustmentsParams = z.infer<
  typeof getTimeAdjustmentsParamsSchema
>;

export const getTimeAdjustments = async (
  params: GetTimeAdjustmentsParams
): Promise<z.infer<typeof timeAdjustmentResponsesArraySchema>> =>
  zodFetch({
    endpoint: "/ferries/api/schedule/rest/timeadj",
    inputSchema: getTimeAdjustmentsParamsSchema,
    outputSchema: timeAdjustmentResponsesArraySchema,
    params,
  });

export const timeAdjustmentsOptions = createQueryOptions({
  apiFunction: getTimeAdjustments,
  queryKey: ["wsf", "schedule", "timeadj", "getTimeAdjustments"],
  cacheStrategy: "DAILY_STATIC",
});
