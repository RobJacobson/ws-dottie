import { z } from "zod";
import { scheduleResponseSchema } from "./scheduleResponse.zod";

/**
 * Array of schedule responses.
 */
export const scheduleResponsesSchema = z
  .array(scheduleResponseSchema)
  .describe(
    "Departure times for either a trip date and route or a trip date and terminal combination."
  );

export type ScheduleResponses = z.infer<typeof scheduleResponsesSchema>;
