import { z } from "zod";
import { scheduleTimeSchema } from "./scheduleTime.zod";

/**
 * Array of schedule times.
 */
export const scheduleTimesSchema = z
  .array(scheduleTimeSchema)
  .describe("Scheduled departure details, including departure times.");

export type ScheduleTimes = z.infer<typeof scheduleTimesSchema>;
